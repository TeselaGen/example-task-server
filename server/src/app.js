var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const bodyParser = require("body-parser");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

const dotenv = require("dotenv");

dotenv.config();

const initDb = require("./initDb");
const initGraphQL = require("./initGraphQL");
const initClient = require("./initClient");

const { graphqlExpress, graphiqlExpress } = require("graphql-server-express");
const {
  loadResolvers,
  loadSchemaStr,
  loadMockResolvers,
  loadDataLib,
  refreshSchema,
  dropAndSyncDatabase
} = require("oradm-to-gql");

const { initLocalS3 } = require("./initLocalS3");

const config = require("./config");
const extendTableMap = require("./extendTableMap");
const Promise = require("bluebird");
const queueManager = require("@teselagen/queue-middleware");
const { S3UploadProvider } = require("@teselagen/s3-uploads");

async function initApp() {
  const appConfig = await config();
  //generate db schema, graphql schema, data lib, and resolvers based on configs
  if (appConfig.refreshSchema) {
    await refreshSchema(appConfig, {
      log: logger,
      extendTableMap,
      timestamps: { created: "createdAt", modified: "updatedAt" }
    });
    await dropAndSyncDatabase(
      appConfig,
      () => {
        return Promise.resolve();
      },
      { log: console.log }
    );
  } else {
    await initDb(appConfig);
  }

  var app = express();
  // view engine setup
  app.set("views", path.join(__dirname, "views"));
  app.set("view engine", "jade");

  app.use(bodyParser.json());

  await initLocalS3(app, appConfig);

  const s3Uploader = new S3UploadProvider(appConfig);
  app.set("s3Uploader", s3Uploader);

  app.use(logger("dev"));

  // app.use(express.static(path.join(__dirname, 'public')));

  const { DataLib, db } = loadDataLib(appConfig);
  app.set("DataLib", DataLib);
  app.set("db", db);

  initGraphQL(app, appConfig, DataLib, db);

  // app.use('/', indexRouter);
  // app.use('/users', usersRouter);

  queueManager.initRoutes(app, appConfig);

  initClient(app, appConfig);

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
  });

  console.log(`Configured app`);

  return app;
}

module.exports = initApp;

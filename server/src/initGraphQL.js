const bodyParser = require("body-parser");
const {
  makeExecutableSchema,
  addMockFunctionsToSchema
} = require("graphql-tools");

const { graphqlExpress, graphiqlExpress } = require("graphql-server-express");
const {
  loadResolvers,
  loadSchemaStr
} = require("oradm-to-gql");

module.exports = function initGraphQL(app, appConfig, DataLib, db){
    const resolvers = loadResolvers({ DataLib, db }, appConfig);
  
    const graphQLSchemaStr = loadSchemaStr(appConfig.graphql.schemaPath, {
      enableMockResolvers: appConfig.graphql.enableMockResolvers
    });
    
    const gqlSchema = makeExecutableSchema({
      typeDefs: graphQLSchemaStr,
      resolvers: resolvers
    });
    
    //app.set("gqlSchema", gqlSchema);
    
    app.use(
      "/graphql",
      [bodyParser.json()],
      graphqlExpress(req => {
        return {
          schema: gqlSchema,
          context: { req: req },
          formatError: error => {
            console.error("operationName:", req.body.operationName);
            console.error("query:", req.body.query);
            console.error(
              "req.body.variables:",
              JSON.stringify(req.body.variables, null, 4)
            );
            if (error.originalError) {
              console.log(
                "error.originalError.stack:",
                error.originalError.stack
              );
              console.log("error.originalError.path:", error.originalError.path);
              console.log(
                "error.originalError.stack:",
                error.originalError.stack
              );
            }
            console.log("Error (graphql):", error.originalError || error);
            console.log("error.stack:", error.stack);
            console.log("error.path:", error.path);
            console.log("error.stack:", error.stack);
            return {
              message: error.message,
              locations: error.locations,
              stack: error.stack,
              path: error.path
            };
          }
        };
      })
    );
    
    
    app.use(
      "/graphiql",
      graphiqlExpress({
        endpointURL: `/graphql`
      })
    );
}
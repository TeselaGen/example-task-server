const nwbMiddleware = require("nwb/express");
const express = require("express");
const path = require("path");

module.exports = function initClient(app, appConfig) {
  const clientMode = appConfig.web.clientMode;
  const pathToClient = path.resolve(__dirname, "../../client");
  if (clientMode === "prod" || clientMode === "production") {
    const pathToClientIndex = path.join(pathToClient, "index.html");
    const pathToDist = path.join(pathToClient, "dist");
    console.log(`Serving static version of client from ${pathToDist}`);
    console.log(`Serving default document ${pathToClientIndex}`);

    const staticClientMiddleware = express.static(pathToClient);
    app.use("/", staticClientMiddleware);
    app.get("*", function(req, res) {
      res.sendFile(pathToClientIndex);
    });
  } else if (clientMode === "dev" || clientMode === "development") {
    console.log("Serving development version of client");
    let devConfig = {
        config: path.join(pathToClient, "nwb.config.js"),
        hmre: true,
        install: true,
        reload: true,
        entry: path.join(pathToClient, "src/index.js"),
    };

    app.use(nwbMiddleware(express, devConfig));
  }
};

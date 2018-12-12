// Copyright (C) 2018 TeselaGen Biotechnology, Inc.

const Promise = require("bluebird");
// const dbConfig = require('../ora-db.config.js');
const dbConfig = require("../pg-db.config.js");
const path = require("path");

module.exports = function(configName) {
  configName = configName || "default";

  // let customDbConfig;
  console.log("Starting Backend...");
  // if (process.env.config) {
  //   customDbConfig = require(`../${process.env.config}`);
  // }

  const config = {
    db: dbConfig,
    refreshSchema: false,
    qa: false,
    workflowSeed: false,
    cleanDB: false,
    generateFakeData: false,
    resetDBContainer: false,
    truncateAndSeedDatabase: false,
    seedData: false,
    web: {
      port: process.env.PORT || 3030
    },
    graphql: {
      datamodelCSVPath: path.resolve(__dirname, "../datamodel-csv-export"),
      resolversPath: path.resolve(__dirname, "../graphql/resolvers"),
      schemaPath: path.resolve(__dirname, "../graphql/schema"),
      mockResolversPath: path.resolve(__dirname, "../graphql/mock-resolvers"),
      dataLibPath: path.resolve(__dirname, "../data-lib"),
      enableMockResolvers: false,
      enableModelResolvers: true
    },
    codeGenerationPassword: "joi12o3bjk123npj1"
  };

  // Environment variables overrides
  if (process.env.refreshSchema) {
    console.log("refreshSchema=1");
    config.refreshSchema = true;
  }
  if (process.env.qa) {
    console.log("qa=1");
    config.qa = true;
  }
  if (process.env.workflow) {
    console.log("workflow=1");
    config.workflowSeed = true;
  }
  if (process.env.cleanDB) {
    console.log("cleanDB=1");
    config.cleanDB = true;
  }
  if (process.env.generateFakeData) {
    console.log("generateFakeData=1");
    config.generateFakeData = true;
  }
  if (process.env.resetDBContainer) {
    console.log("resetDBContainer=1");
    config.resetDBContainer = true;
  }
  if (process.env.enableMockResolvers) {
    console.log("enableMockResolvers=1");
    config.enableMockResolvers = true;
  }
  if (process.env.enableModelResolvers) {
    console.log("enableModelResolvers=1");
    config.enableModelResolvers = true;
  }
  if (process.env.truncate) {
    console.log("truncate=1");
    config.truncateAndSeedDatabase = true;
  }

  if (process.env.seed) {
    console.log("seed=1");
    config.seedData = true;
  }

  if(process.env.CLIENT_MODE){
    config.web.clientMode = process.env.CLIENT_MODE;
  }
  
  console.log("DB Host: ", config.db.app.connection.host);
  console.log("DB Name: ", config.db.dbName);

  return Promise.resolve(config);
};

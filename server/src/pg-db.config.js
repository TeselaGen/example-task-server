// Copyright (C) 2018 TeselaGen Biotechnology, Inc.
const { parse } = require('pg-connection-string');
const dbName = process.env.DB_NAME || 'lims'
const host = process.env.DB_HOST || 'localhost'
const user = process.env.DB_USER || 'postgres'
const pass = process.env.DB_PASS || 'Teselagen123'
const appSchema = 'app'

let dbConfig = {
  dbName,
  appSchema,
  dialect: 'postgres',
  sys: {
    client: 'pg',
    connection: {
      host: host,
      user: user,
      password: pass,
      database: 'postgres' //this must be postgres in case the hde database has not yet been created
    },
    debug: false,
    searchPath: 'public'
  },
  app: {
    client: 'pg',
    connection: {
      host: host,
      user: user,
      password: pass,
      database: dbName
    },
    debug: false,
    searchPath: [`${appSchema}`,`public`]
  }
};

if(process.env.DATABASE_URL){
  let config = parse(process.env.DATABASE_URL);
  dbConfig.dbName = config.database;
  dbConfig.sys.connection = process.env.DATABASE_URL + "?ssl=true";
  dbConfig.app.connection = process.env.DATABASE_URL + "?ssl=true";
}

module.exports = dbConfig;
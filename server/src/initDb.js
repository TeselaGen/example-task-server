
const knex = require("knex");
const { refreshSchema, dropAndSyncDatabase } = require('oradm-to-gql');
const extendTableMap = require('./extendTableMap');

module.exports = async function initDb(appConfig){
    if(process.env.TG_INIT_DB){
        console.log("Setting watchdog for 5 minute " + new Date());
        setTimeout(() => {
            console.log("Watchdog is terminating deployment" + new Date());
            process.exit(15)
        }, 300000);
        if(process.env.DATABASE_URL){ //we're on heroku don't try to use sys
            const {
                db: {
                    appSchema
                }
            } = appConfig;

            const db = knex({
                client: "pg",
                connection: process.env.DATABASE_URL + "?ssl=true"
            })

            let result = await db.raw(`select schema_name from information_schema.schemata where schema_name = '${appSchema}'`);
            console.log(result);

            let exists = (result && result.rows && result.rows.length === 1);

            if(!exists){
                console.log("No schema detected. Refreshing schema.");
                await refreshSchema(appConfig, {
                    log: console.log,
                    extendTableMap,
                    timestamps: { created: 'createdAt', modified: 'updatedAt' }
                });
                console.log("Dropping and syncing database.");
                await dropAndSyncDatabase(appConfig);
            }else{
                console.log("Schema found no database initialization needed.")
            }                           

        }
    }
}
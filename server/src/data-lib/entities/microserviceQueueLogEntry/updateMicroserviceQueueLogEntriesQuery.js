const {
    each,
    assign,
    pick,
    uniq,
    has
} = require('lodash');

const Promise = require('bluebird');

const getCidReferences = require('../../core/getCidReferences');
const resolveCidReferences = require('../../core/resolveCidReferences');
const applyFilter = require('../../core/applyFilter');
const appendFilter = require('../../core/appendFilter');

async function updateMicroserviceQueueLogEntriesQuery(updateStatements, trx, opts){

    let allowQuery = await Promise.resolve(this.entities.microserviceQueueLogEntry.extensions.onUpdateQuery.allow.call(this, opts));

    if(!allowQuery) return Promise.resolve([]);

    let statements = await Promise.resolve(this.entities.microserviceQueueLogEntry.extensions.onUpdateQuery.statements.call(this, updateStatements, opts));

    let qry = this.db;

    
    

    let updatedIds = [];

    return Promise.each(statements, async (stmt) =>
    {
        let values = {
            channel: stmt.values.channel,
            details: stmt.values.details,
            level: stmt.values.level,
            message: stmt.values.message,
            metadata: has(stmt.values, "metadata") ? JSON.stringify(stmt.values.metadata) : undefined,
            createdAt: stmt.values.createdAt,
            updatedAt: stmt.values.updatedAt,
            cid: stmt.values.cid,
        };

        let relatedObjects = {
            microserviceQueue: {
                modelName: "microserviceQueue",
                referenceKey: "microserviceQueueId",
                targetTable: "microserviceQueue",
                targetKeyColumn: "id"   
            },
        };
        
        let columnMap = {
            channel: "channel",
            details: "details",
            id: "id",
            level: "level",
            message: "message",
            metadata: "metadata",
            microserviceQueueId: "microserviceQueueId",
            createdAt: "createdAt",
            updatedAt: "updatedAt",
            cid: "cid",
        };


        let cidsToResolve = getCidReferences([values], columnMap, relatedObjects, "id");
        await resolveCidReferences(cidsToResolve, qry, true);

        let updateFilter = stmt.where;

        let additionalFilter = await Promise.resolve(this.entities.microserviceQueueLogEntry.extensions.onUpdateQuery.appendFilter.call(this, opts));
        if(additionalFilter) updateFilter = appendFilter(updateFilter, "microserviceQueueLogEntry", additionalFilter)

        
        return applyFilter(qry("microserviceQueueLogEntry"), "microserviceQueueLogEntry", stmt.where)
                .update(values)
                .then(() => {
                    return applyFilter(qry("microserviceQueueLogEntry").select("id"), "microserviceQueueLogEntry", updateFilter);
                })
                .then((results) => {
                    results.forEach((row) => {
                        updatedIds.push(row.id);
                    });
                    return Promise.resolve();
                });
    })
    .then(() => {
        return Promise.resolve(uniq(updatedIds));
    });

}

module.exports = updateMicroserviceQueueLogEntriesQuery;
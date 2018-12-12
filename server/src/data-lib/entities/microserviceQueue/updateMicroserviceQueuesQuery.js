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

async function updateMicroserviceQueuesQuery(updateStatements, trx, opts){

    let allowQuery = await Promise.resolve(this.entities.microserviceQueue.extensions.onUpdateQuery.allow.call(this, opts));

    if(!allowQuery) return Promise.resolve([]);

    let statements = await Promise.resolve(this.entities.microserviceQueue.extensions.onUpdateQuery.statements.call(this, updateStatements, opts));

    let qry = this.db;

    
    

    let updatedIds = [];

    return Promise.each(statements, async (stmt) =>
    {
        let values = {
            authToken: stmt.values.authToken,
            checkInInterval: stmt.values.checkInInterval,
            controlToken: stmt.values.controlToken,
            input: has(stmt.values, "input") ? JSON.stringify(stmt.values.input) : undefined,
            lastCheckIn: stmt.values.lastCheckIn,
            missedCheckInCount: stmt.values.missedCheckInCount,
            result: has(stmt.values, "result") ? JSON.stringify(stmt.values.result) : undefined,
            resultStatus: stmt.values.resultStatus,
            service: stmt.values.service,
            serviceUrl: stmt.values.serviceUrl,
            startedOn: stmt.values.startedOn,
            status: stmt.values.status,
            taskId: stmt.values.taskId,
            trackingId: stmt.values.trackingId,
            createdAt: stmt.values.createdAt,
            updatedAt: stmt.values.updatedAt,
            cid: stmt.values.cid,
        };

        let relatedObjects = {
        };
        
        let columnMap = {
            authToken: "authToken",
            checkInInterval: "checkInInterval",
            controlToken: "controlToken",
            id: "id",
            input: "input",
            lastCheckIn: "lastCheckIn",
            missedCheckInCount: "missedCheckInCount",
            result: "result",
            resultStatus: "resultStatus",
            service: "service",
            serviceUrl: "serviceUrl",
            startedOn: "startedOn",
            status: "status",
            taskId: "taskId",
            trackingId: "trackingId",
            createdAt: "createdAt",
            updatedAt: "updatedAt",
            cid: "cid",
        };


        let cidsToResolve = getCidReferences([values], columnMap, relatedObjects, "id");
        await resolveCidReferences(cidsToResolve, qry, true);

        let updateFilter = stmt.where;

        let additionalFilter = await Promise.resolve(this.entities.microserviceQueue.extensions.onUpdateQuery.appendFilter.call(this, opts));
        if(additionalFilter) updateFilter = appendFilter(updateFilter, "microserviceQueue", additionalFilter)

        
        return applyFilter(qry("microserviceQueue"), "microserviceQueue", stmt.where)
                .update(values)
                .then(() => {
                    return applyFilter(qry("microserviceQueue").select("id"), "microserviceQueue", updateFilter);
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

module.exports = updateMicroserviceQueuesQuery;
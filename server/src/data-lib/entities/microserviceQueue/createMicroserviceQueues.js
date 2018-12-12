const {
    each,
    assign,
    pick,
    map,
    startsWith,
    has
} = require('lodash');

const Promise = require('bluebird');
const getNestedParentRecords = require('../../core/getNestedParentRecords');
const insertParentRecords = require('../../core/insertParentRecords');
const getCidReferences = require('../../core/getCidReferences');
const resolveCidReferences = require('../../core/resolveCidReferences');
const mapAttributesToColumns = require('../../core/mapAttributesToColumns');

async function createMicroserviceQueues(createRecords, trx, opts){
    let allowQuery = await Promise.resolve(this.entities.microserviceQueue.extensions.onCreate.allow.call(this, opts));

    if(!allowQuery) return Promise.resolve([]);

    let records = await Promise.resolve(this.entities.microserviceQueue.extensions.onCreate.records.call(this, createRecords, opts));

    let qry = this.db;

    let dataAccessLib = this;

    let createdTimestamp = new Date();
    records.forEach((rec) => {
            //validate record key values
            if(rec.id && startsWith(rec.id, "&")) 
                throw new Error("Primary key microserviceQueue.id = " + rec.id + " starts with the reserved character & ");
            //stringify json
            if(has(rec, "input")) rec.input = JSON.stringify(rec.input);
            //stringify json
            if(has(rec, "result")) rec.result = JSON.stringify(rec.result);
            //set timestamps
            rec.createdAt = createdTimestamp;
            //set timestamps
            rec.updatedAt = createdTimestamp;
        });

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

    let nestedParentRecords = getNestedParentRecords(relatedObjects, records);
    await insertParentRecords(nestedParentRecords, dataAccessLib, qry);

    let cidsToResolve = getCidReferences(records, columnMap, relatedObjects, "id")
    await resolveCidReferences(cidsToResolve, qry);

    let recordsToInsert = mapAttributesToColumns(records, columnMap);

    return qry
        .batchInsert('microserviceQueue', recordsToInsert, 500)
        .returning('id')
        .then((ids) => {
            return this.entities.microserviceQueue.createNestedRecords(qry, ids, records)
                .then(()=> {
                        return Promise.resolve(ids);
                });
        });

}

module.exports = createMicroserviceQueues;
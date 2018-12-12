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

async function createMicroserviceIOFiles(createRecords, trx, opts){
    let allowQuery = await Promise.resolve(this.entities.microserviceIoFile.extensions.onCreate.allow.call(this, opts));

    if(!allowQuery) return Promise.resolve([]);

    let records = await Promise.resolve(this.entities.microserviceIoFile.extensions.onCreate.records.call(this, createRecords, opts));

    let qry = this.db;

    let dataAccessLib = this;

    let createdTimestamp = new Date();
    records.forEach((rec) => {
            //validate record key values
            if(rec.id && startsWith(rec.id, "&")) 
                throw new Error("Primary key microserviceIoFile.id = " + rec.id + " starts with the reserved character & ");
            //set timestamps
            rec.createdAt = createdTimestamp;
            //set timestamps
            rec.updatedAt = createdTimestamp;
        });

    let relatedObjects = {
        microserviceQueue: {
            modelName: "microserviceQueue",
            referenceKey: "microserviceQueueId",
            targetTable: "microserviceQueue",
            targetKeyColumn: "id"   
        },
    };
    
    let columnMap = {
        fileUrl: "fileUrl",
        id: "id",
        microserviceQueueId: "microserviceQueueId",
        type: "type",
        destinationPath: "destinationPath",
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
        .batchInsert('microserviceIoFile', recordsToInsert, 500)
        .returning('id')
        .then((ids) => {
            return this.entities.microserviceIoFile.createNestedRecords(qry, ids, records)
                .then(()=> {
                        return Promise.resolve(ids);
                });
        });

}

module.exports = createMicroserviceIOFiles;
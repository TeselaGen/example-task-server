const populateNestedObjectsForCreate = require('../../core/populateNestedObjectsForCreate');

function createNestedMicroserviceQueueRecords(db, recordIds, records){
    let nestedObjects = {
        microserviceIoFiles: {
            name: "microserviceIoFile",
            referenceKey: "microserviceQueueId",
            list:[]
        },
        microserviceQueueLogEntries: {
            name: "microserviceQueueLogEntry",
            referenceKey: "microserviceQueueId",
            list:[]
        },
    };
    
    nestedObjects = populateNestedObjectsForCreate(nestedObjects, records, recordIds);
    
    return this.createNestedObjects(db, nestedObjects);
}

module.exports = createNestedMicroserviceQueueRecords;
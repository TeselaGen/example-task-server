 const populateNestedObjectsForUpdate = require('../../core/populateNestedObjectsForUpdate');

 function updateNestedMicroserviceQueueRecords(db, records){
 
    let nestedObjects = {
        microserviceIoFiles: {
            name: "microserviceIoFile",
            hasFkFilter: true,
            referenceKey: "microserviceQueueId",
            targetKey: "id",
            list:[]
        },
        microserviceQueueLogEntries: {
            name: "microserviceQueueLogEntry",
            hasFkFilter: true,
            referenceKey: "microserviceQueueId",
            targetKey: "id",
            list:[]
        },
    };

    nestedObjects = populateNestedObjectsForUpdate(nestedObjects, records, "microserviceQueue");

    return this.updateNestedObjects(db, nestedObjects);
}

module.exports = updateNestedMicroserviceQueueRecords;
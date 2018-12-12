 const populateNestedObjectsForUpdate = require('../../core/populateNestedObjectsForUpdate');

 function updateNestedMicroserviceQueueLogEntryRecords(db, records){
 
    let nestedObjects = {
        microserviceQueue: {
            name: "microserviceQueue",
            hasFkFilter: false,
            targetKey: "id",
            referenceKey: "microserviceQueueId",
            list:[]
        },
    };

    nestedObjects = populateNestedObjectsForUpdate(nestedObjects, records, "microserviceQueueLogEntry");

    return this.updateNestedObjects(db, nestedObjects);
}

module.exports = updateNestedMicroserviceQueueLogEntryRecords;
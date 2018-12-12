 const populateNestedObjectsForUpdate = require('../../core/populateNestedObjectsForUpdate');

 function updateNestedMicroserviceIOFileRecords(db, records){
 
    let nestedObjects = {
        microserviceQueue: {
            name: "microserviceQueue",
            hasFkFilter: false,
            targetKey: "id",
            referenceKey: "microserviceQueueId",
            list:[]
        },
    };

    nestedObjects = populateNestedObjectsForUpdate(nestedObjects, records, "microserviceIoFile");

    return this.updateNestedObjects(db, nestedObjects);
}

module.exports = updateNestedMicroserviceIOFileRecords;
const populateNestedObjectsForDelete = require('../../core/populateNestedObjectsForDelete');

function deleteNestedMicroserviceQueueRecords(db, records){
        let nestedObjects = {
            microserviceIoFiles: {
                name: "microserviceIoFile",
                list:[]
            },
            microserviceQueueLogEntries: {
                name: "microserviceQueueLogEntry",
                list:[]
            },
        };

        nestedObjects = populateNestedObjectsForDelete(nestedObjects, records);

        return this.deleteNestedObjects(db, nestedObjects);
}

module.exports = deleteNestedMicroserviceQueueRecords;
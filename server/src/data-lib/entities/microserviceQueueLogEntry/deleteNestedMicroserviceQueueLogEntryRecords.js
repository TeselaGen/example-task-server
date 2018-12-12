const populateNestedObjectsForDelete = require('../../core/populateNestedObjectsForDelete');

function deleteNestedMicroserviceQueueLogEntryRecords(db, records){
        let nestedObjects = {
            microserviceQueue: {
                name: "microserviceQueue",
                list:[]
            },
        };

        nestedObjects = populateNestedObjectsForDelete(nestedObjects, records);

        return this.deleteNestedObjects(db, nestedObjects);
}

module.exports = deleteNestedMicroserviceQueueLogEntryRecords;
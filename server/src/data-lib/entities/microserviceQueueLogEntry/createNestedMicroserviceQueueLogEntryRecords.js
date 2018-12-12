const populateNestedObjectsForCreate = require('../../core/populateNestedObjectsForCreate');

function createNestedMicroserviceQueueLogEntryRecords(db, recordIds, records){
    let nestedObjects = {
    };
    
    nestedObjects = populateNestedObjectsForCreate(nestedObjects, records, recordIds);
    
    return this.createNestedObjects(db, nestedObjects);
}

module.exports = createNestedMicroserviceQueueLogEntryRecords;
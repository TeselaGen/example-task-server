 const populateNestedObjectsForUpdate = require('../../core/populateNestedObjectsForUpdate');

 function updateNestedUserRecords(db, records){
 
    let nestedObjects = {
    };

    nestedObjects = populateNestedObjectsForUpdate(nestedObjects, records, "user");

    return this.updateNestedObjects(db, nestedObjects);
}

module.exports = updateNestedUserRecords;
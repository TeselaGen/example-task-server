const populateNestedObjectsForDelete = require('../../core/populateNestedObjectsForDelete');

function deleteNestedUserRecords(db, records){
        let nestedObjects = {
        };

        nestedObjects = populateNestedObjectsForDelete(nestedObjects, records);

        return this.deleteNestedObjects(db, nestedObjects);
}

module.exports = deleteNestedUserRecords;
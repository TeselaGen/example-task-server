const queryMicroserviceIOFile = require('./queryMicroserviceIOFile');
const countMicroserviceIOFile = require('./countMicroserviceIOFile');
const getMicroserviceIOFile = require('./getMicroserviceIOFile');
const createMicroserviceIOFiles = require('./createMicroserviceIOFiles');
const updateMicroserviceIOFiles = require('./updateMicroserviceIOFiles');
const updateMicroserviceIOFilesQuery = require('./updateMicroserviceIOFilesQuery');
const deleteMicroserviceIOFiles = require('./deleteMicroserviceIOFiles');
const deleteMicroserviceIOFilesQuery = require('./deleteMicroserviceIOFilesQuery');

const createNestedMicroserviceIOFileRecords = require('./createNestedMicroserviceIOFileRecords');
const updateNestedMicroserviceIOFileRecords = require('./updateNestedMicroserviceIOFileRecords');
const deleteNestedMicroserviceIOFileRecords = require('./deleteNestedMicroserviceIOFileRecords');

module.exports = {
        tableName: "microserviceIoFile",
        
        attributes: {
            fileUrl: "fileUrl",
            id: "id",
            microserviceQueueId: "microserviceQueueId",
            type: "type",
            destinationPath: "destinationPath",
            createdAt: "createdAt",
            updatedAt: "updatedAt",
            cid: "cid",
        },

        extensions: {
            onCreate: {
                records: (records) => records,
                allow: () => true
            },
            onUpdate: {
                records: (records) => records,
                allow: () => true,
                filter: (filter) => filter,
                appendFilter: () => ({})
            },
            onUpdateQuery: {
                allow: () => true,
                statements: (stmts) => stmts,
                appendFilter: () => ({})
            },
            onDelete: {
                allow: () => true,
                filter: (filter) => filter,
                appendFilter: () => ({})
            },
            onDeleteQuery: {
                allow: () => true,
                statements: (stmts) => stmts,
                appendFilter: () => ({})
            },
            //called by both get, count, and query
            onSelect: {
                fields: (fields) => fields,
                allow: () => true,
                filter: (filter) => filter,
                appendFilter: () => ({})
            },
            onGet: {
                fields: (fields) => fields,
                allow: (key) => true,
                filter: (filter) => filter,
                appendFilter: () => ({})
            },
            //called by count and query
            onQuery: {
                fields: (fields) => fields,
                allow: () => true,
                filter: (filter) => filter,
                appendFilter: () => ({})
            }
        },

        query: queryMicroserviceIOFile,

        count: countMicroserviceIOFile,

        get: getMicroserviceIOFile,

        create: createMicroserviceIOFiles,

        update: updateMicroserviceIOFiles,

        updateQuery: updateMicroserviceIOFilesQuery,

        delete: deleteMicroserviceIOFiles,

        deleteQuery: deleteMicroserviceIOFilesQuery,

        createNestedRecords: createNestedMicroserviceIOFileRecords,

        updateNestedRecords: updateNestedMicroserviceIOFileRecords,

        deleteNestedRecords: deleteNestedMicroserviceIOFileRecords
}
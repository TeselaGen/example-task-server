const queryMicroserviceQueueLogEntry = require('./queryMicroserviceQueueLogEntry');
const countMicroserviceQueueLogEntry = require('./countMicroserviceQueueLogEntry');
const getMicroserviceQueueLogEntry = require('./getMicroserviceQueueLogEntry');
const createMicroserviceQueueLogEntries = require('./createMicroserviceQueueLogEntries');
const updateMicroserviceQueueLogEntries = require('./updateMicroserviceQueueLogEntries');
const updateMicroserviceQueueLogEntriesQuery = require('./updateMicroserviceQueueLogEntriesQuery');
const deleteMicroserviceQueueLogEntries = require('./deleteMicroserviceQueueLogEntries');
const deleteMicroserviceQueueLogEntriesQuery = require('./deleteMicroserviceQueueLogEntriesQuery');

const createNestedMicroserviceQueueLogEntryRecords = require('./createNestedMicroserviceQueueLogEntryRecords');
const updateNestedMicroserviceQueueLogEntryRecords = require('./updateNestedMicroserviceQueueLogEntryRecords');
const deleteNestedMicroserviceQueueLogEntryRecords = require('./deleteNestedMicroserviceQueueLogEntryRecords');

module.exports = {
        tableName: "microserviceQueueLogEntry",
        
        attributes: {
            channel: "channel",
            details: "details",
            id: "id",
            level: "level",
            message: "message",
            metadata: "metadata",
            microserviceQueueId: "microserviceQueueId",
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

        query: queryMicroserviceQueueLogEntry,

        count: countMicroserviceQueueLogEntry,

        get: getMicroserviceQueueLogEntry,

        create: createMicroserviceQueueLogEntries,

        update: updateMicroserviceQueueLogEntries,

        updateQuery: updateMicroserviceQueueLogEntriesQuery,

        delete: deleteMicroserviceQueueLogEntries,

        deleteQuery: deleteMicroserviceQueueLogEntriesQuery,

        createNestedRecords: createNestedMicroserviceQueueLogEntryRecords,

        updateNestedRecords: updateNestedMicroserviceQueueLogEntryRecords,

        deleteNestedRecords: deleteNestedMicroserviceQueueLogEntryRecords
}
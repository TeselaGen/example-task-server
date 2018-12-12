const queryMicroserviceQueue = require('./queryMicroserviceQueue');
const countMicroserviceQueue = require('./countMicroserviceQueue');
const getMicroserviceQueue = require('./getMicroserviceQueue');
const createMicroserviceQueues = require('./createMicroserviceQueues');
const updateMicroserviceQueues = require('./updateMicroserviceQueues');
const updateMicroserviceQueuesQuery = require('./updateMicroserviceQueuesQuery');
const deleteMicroserviceQueues = require('./deleteMicroserviceQueues');
const deleteMicroserviceQueuesQuery = require('./deleteMicroserviceQueuesQuery');

const createNestedMicroserviceQueueRecords = require('./createNestedMicroserviceQueueRecords');
const updateNestedMicroserviceQueueRecords = require('./updateNestedMicroserviceQueueRecords');
const deleteNestedMicroserviceQueueRecords = require('./deleteNestedMicroserviceQueueRecords');

module.exports = {
        tableName: "microserviceQueue",
        
        attributes: {
            authToken: "authToken",
            checkInInterval: "checkInInterval",
            controlToken: "controlToken",
            id: "id",
            input: "input",
            lastCheckIn: "lastCheckIn",
            missedCheckInCount: "missedCheckInCount",
            result: "result",
            resultStatus: "resultStatus",
            service: "service",
            serviceUrl: "serviceUrl",
            startedOn: "startedOn",
            status: "status",
            taskId: "taskId",
            trackingId: "trackingId",
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

        query: queryMicroserviceQueue,

        count: countMicroserviceQueue,

        get: getMicroserviceQueue,

        create: createMicroserviceQueues,

        update: updateMicroserviceQueues,

        updateQuery: updateMicroserviceQueuesQuery,

        delete: deleteMicroserviceQueues,

        deleteQuery: deleteMicroserviceQueuesQuery,

        createNestedRecords: createNestedMicroserviceQueueRecords,

        updateNestedRecords: updateNestedMicroserviceQueueRecords,

        deleteNestedRecords: deleteNestedMicroserviceQueueRecords
}
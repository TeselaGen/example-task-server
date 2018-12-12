
const typeUpdateEntityDef = require('./typeUpdate');
const microserviceQueueEntityDef = require('./microserviceQueue');
const microserviceQueueLogEntryEntityDef = require('./microserviceQueueLogEntry');
const microserviceIoFileEntityDef = require('./microserviceIoFile');
const userEntityDef = require('./user');

const entityMethods = [
    "query",
    "count",
    "get",
    "create",
    "update",
    "updateQuery",
    "delete",
    "deleteQuery",
    "createNestedRecords",
    "updateNestedRecords",
    "deleteNestedRecords"
];

function initEntities(dataLib) {
    dataLib.entities.typeUpdate = {
        ...typeUpdateEntityDef,
        extensions: getDefaultExtensions(typeUpdateEntityDef)
    };
    entityMethods.forEach((methodName) => {
        dataLib.entities.typeUpdate[methodName] = typeUpdateEntityDef[methodName].bind(dataLib);
    });

    dataLib.entities.microserviceQueue = {
        ...microserviceQueueEntityDef,
        extensions: getDefaultExtensions(microserviceQueueEntityDef)
    };
    entityMethods.forEach((methodName) => {
        dataLib.entities.microserviceQueue[methodName] = microserviceQueueEntityDef[methodName].bind(dataLib);
    });

    dataLib.entities.microserviceQueueLogEntry = {
        ...microserviceQueueLogEntryEntityDef,
        extensions: getDefaultExtensions(microserviceQueueLogEntryEntityDef)
    };
    entityMethods.forEach((methodName) => {
        dataLib.entities.microserviceQueueLogEntry[methodName] = microserviceQueueLogEntryEntityDef[methodName].bind(dataLib);
    });

    dataLib.entities.microserviceIoFile = {
        ...microserviceIoFileEntityDef,
        extensions: getDefaultExtensions(microserviceIoFileEntityDef)
    };
    entityMethods.forEach((methodName) => {
        dataLib.entities.microserviceIoFile[methodName] = microserviceIoFileEntityDef[methodName].bind(dataLib);
    });

    dataLib.entities.user = {
        ...userEntityDef,
        extensions: getDefaultExtensions(userEntityDef)
    };
    entityMethods.forEach((methodName) => {
        dataLib.entities.user[methodName] = userEntityDef[methodName].bind(dataLib);
    });

}

module.exports = initEntities;


function getDefaultExtensions(entityDef){
    let {
        onCreate,
        onUpdate,
        onUpdateQuery,
        onDelete,
        onDeleteQuery,
        onQuery,
        onGet,
        onSelect
    } = entityDef.extensions;
    return {
        onCreate: { ...onCreate },
        onUpdate: { ...onUpdate },
        onUpdateQuery: { ...onUpdateQuery },
        onDelete: { ...onDelete },
        onDeleteQuery: { ...onDeleteQuery },
        onQuery: { ...onQuery },
        onGet: { ...onGet },
        onSelect: { ...onSelect }
    }
}

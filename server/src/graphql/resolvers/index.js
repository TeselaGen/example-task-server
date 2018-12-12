const _ = require('lodash');
const Promise = require('bluebird');
const graphqlFields = require('graphql-fields');
const dumpster = require('dumpster');
const path = require('path');
const fse = require('fs-extra');
const queryResolver = require('tg-knex-query-resolver');
const getResultsCursor = require('./core/getResultsCursor');

function log(obj){
    console.log(dumpster.dump(obj));
}

module.exports = function generateCoreResolver(db, DataLib, opts){

    let resolvers = {
        Query: {},
        Mutation: {}
    };

    let nestedResolvers;

    function getDataLibWithContext(db, context){
        return new DataLib(db, context, opts);
    }



    resolvers.Query.typeUpdates = function(root, { filter, sort, pageNumber, pageSize }, context, info ){
        let dataLib = getDataLibWithContext(db, context);
        return getResultsCursor("typeUpdate","code", filter, sort, pageNumber, pageSize, info, dataLib, { root: true });
    }

    resolvers.Query.typeUpdate = function(root, args, context, info ){
        let dataLib = getDataLibWithContext(db, context);
        let fields = Object.keys(graphqlFields(info));
        return dataLib.entities.typeUpdate.get(args.code, fields, { root: true });
    }

    resolvers.Mutation.createTypeUpdate = function( root, { input }, context, info){
        let dataLib = getDataLibWithContext(db, context);
        return dataLib.entities.typeUpdate.create(input, undefined, { root: true })
               .then((ids) => {
                return Promise.resolve({ ids: ids});
               });
    }

    resolvers.createTypeUpdatePayload = {
        createdItemsCursor: function( parent, { filter, sort, pageNumber, pageSize }, context, info){
            let dataLib = getDataLibWithContext(db, context);
            let pkFilter = { code: parent.ids };

            filter = appendFilter(filter, "typeUpdate", pkFilter);

            return getResultsCursor("typeUpdate","code", filter, sort, pageNumber, pageSize, info, dataLib, { root: true });
        }
    }

    resolvers.Mutation.updateTypeUpdate = function( root, { input }, context, info){
        let dataLib = getDataLibWithContext(db, context);
        return dataLib.entities.typeUpdate.update(input, undefined, undefined, { root: true })
               .then((ids) => {
                return Promise.resolve({ ids: ids});
               });
    }

    

    resolvers.updateTypeUpdatePayload = {
        updatedItemsCursor: function( parent, { filter, sort, pageNumber, pageSize }, context, info){
            let dataLib = getDataLibWithContext(db, context);
            let pkFilter = { code: parent.ids };
            
            filter = appendFilter(filter, "typeUpdate", pkFilter);

            return getResultsCursor("typeUpdate","code", filter, sort, pageNumber, pageSize, info, dataLib, { root: true });
        }
    }

    resolvers.Mutation.updateTypeUpdatesWithQuery = function( root, { input }, context, info){
        let dataLib = getDataLibWithContext(db, context);
        return dataLib.entities.typeUpdate.updateQuery(input.updateQueries, undefined, { root: true })
            .then((ids) => {
                    return Promise.resolve({ ids: ids});
            });

    }
    

    resolvers.updateTypeUpdatesWithQueryPayload = {
        updatedItemsCursor: function( parent, { filter, sort, pageNumber, pageSize }, context, info){
            let dataLib = getDataLibWithContext(db, context);
            let pkFilter = { code: parent.ids };
            
            filter = appendFilter(filter, "typeUpdate", pkFilter);

            return getResultsCursor("typeUpdate","code", filter, sort, pageNumber, pageSize, info, dataLib, { root: true });
        }
    }

    resolvers.Mutation.deleteTypeUpdate = function( root, { input }, context, info){
        let dataLib = getDataLibWithContext(db, context);
        return dataLib.entities.typeUpdate.delete(input, undefined, { root: true })
               .then((count) => {
                return getDeleteResult(count, info);
               });
    }

    resolvers.Mutation.deleteTypeUpdatesWithQuery = function( root, { input }, context, info){
        let dataLib = getDataLibWithContext(db, context);
        return dataLib.entities.typeUpdate.deleteQuery(input.deleteQueries, undefined, { root: true })
            .then((count) => {
                return getDeleteResult(count, info, dataLib);
            });
    }
    

    nestedResolvers = {
    };

    if(Object.keys(nestedResolvers).length > 0){
        resolvers.typeUpdate = nestedResolvers;
    }


    resolvers.Query.microserviceQueues = function(root, { filter, sort, pageNumber, pageSize }, context, info ){
        let dataLib = getDataLibWithContext(db, context);
        return getResultsCursor("microserviceQueue","id", filter, sort, pageNumber, pageSize, info, dataLib, { root: true });
    }

    resolvers.Query.microserviceQueue = function(root, args, context, info ){
        let dataLib = getDataLibWithContext(db, context);
        let fields = Object.keys(graphqlFields(info));
        return dataLib.entities.microserviceQueue.get(args.id, fields, { root: true });
    }

    resolvers.Mutation.createMicroserviceQueue = function( root, { input }, context, info){
        let dataLib = getDataLibWithContext(db, context);
        return dataLib.entities.microserviceQueue.create(input, undefined, { root: true })
               .then((ids) => {
                return Promise.resolve({ ids: ids});
               });
    }

    resolvers.createMicroserviceQueuePayload = {
        createdItemsCursor: function( parent, { filter, sort, pageNumber, pageSize }, context, info){
            let dataLib = getDataLibWithContext(db, context);
            let pkFilter = { id: parent.ids };

            filter = appendFilter(filter, "microserviceQueue", pkFilter);

            return getResultsCursor("microserviceQueue","id", filter, sort, pageNumber, pageSize, info, dataLib, { root: true });
        }
    }

    resolvers.Mutation.updateMicroserviceQueue = function( root, { input }, context, info){
        let dataLib = getDataLibWithContext(db, context);
        return dataLib.entities.microserviceQueue.update(input, undefined, undefined, { root: true })
               .then((ids) => {
                return Promise.resolve({ ids: ids});
               });
    }

    

    resolvers.updateMicroserviceQueuePayload = {
        updatedItemsCursor: function( parent, { filter, sort, pageNumber, pageSize }, context, info){
            let dataLib = getDataLibWithContext(db, context);
            let pkFilter = { id: parent.ids };
            
            filter = appendFilter(filter, "microserviceQueue", pkFilter);

            return getResultsCursor("microserviceQueue","id", filter, sort, pageNumber, pageSize, info, dataLib, { root: true });
        }
    }

    resolvers.Mutation.updateMicroserviceQueuesWithQuery = function( root, { input }, context, info){
        let dataLib = getDataLibWithContext(db, context);
        return dataLib.entities.microserviceQueue.updateQuery(input.updateQueries, undefined, { root: true })
            .then((ids) => {
                    return Promise.resolve({ ids: ids});
            });

    }
    

    resolvers.updateMicroserviceQueuesWithQueryPayload = {
        updatedItemsCursor: function( parent, { filter, sort, pageNumber, pageSize }, context, info){
            let dataLib = getDataLibWithContext(db, context);
            let pkFilter = { id: parent.ids };
            
            filter = appendFilter(filter, "microserviceQueue", pkFilter);

            return getResultsCursor("microserviceQueue","id", filter, sort, pageNumber, pageSize, info, dataLib, { root: true });
        }
    }

    resolvers.Mutation.deleteMicroserviceQueue = function( root, { input }, context, info){
        let dataLib = getDataLibWithContext(db, context);
        return dataLib.entities.microserviceQueue.delete(input, undefined, { root: true })
               .then((count) => {
                return getDeleteResult(count, info);
               });
    }

    resolvers.Mutation.deleteMicroserviceQueuesWithQuery = function( root, { input }, context, info){
        let dataLib = getDataLibWithContext(db, context);
        return dataLib.entities.microserviceQueue.deleteQuery(input.deleteQueries, undefined, { root: true })
            .then((count) => {
                return getDeleteResult(count, info, dataLib);
            });
    }
    

    nestedResolvers = {
        microserviceIoFiles: function(microserviceQueue, { filter, sort, pageNumber, pageSize }, context, info ){
            let dataLib = getDataLibWithContext(db, context);
            if(microserviceQueue.id != null){
                let fields = Object.keys(graphqlFields(info));
                let fkFilter = { microserviceQueueId: microserviceQueue.id };
                
                filter = appendFilter(filter, "microserviceIoFile", fkFilter);

                return dataLib.entities.microserviceIoFile.query(fields, filter, sort, pageNumber, pageSize);
            }
            return Promise.resolve([]);
        },
        microserviceIoFilesCursor: function(microserviceQueue, { filter, sort, pageNumber, pageSize }, context, info ){
            let dataLib = getDataLibWithContext(db, context);
            if(microserviceQueue.id != null){
                let fields = Object.keys(graphqlFields(info));
                let fkFilter = { microserviceQueueId: microserviceQueue.id };
                
                filter = appendFilter(filter, "microserviceIoFile", fkFilter);

                return getResultsCursor("microserviceIoFile","id", filter, sort, pageNumber, pageSize, info, dataLib);
            }
            return Promise.resolve(null);
        },
        microserviceQueueLogEntries: function(microserviceQueue, { filter, sort, pageNumber, pageSize }, context, info ){
            let dataLib = getDataLibWithContext(db, context);
            if(microserviceQueue.id != null){
                let fields = Object.keys(graphqlFields(info));
                let fkFilter = { microserviceQueueId: microserviceQueue.id };
                
                filter = appendFilter(filter, "microserviceQueueLogEntry", fkFilter);

                return dataLib.entities.microserviceQueueLogEntry.query(fields, filter, sort, pageNumber, pageSize);
            }
            return Promise.resolve([]);
        },
        microserviceQueueLogEntriesCursor: function(microserviceQueue, { filter, sort, pageNumber, pageSize }, context, info ){
            let dataLib = getDataLibWithContext(db, context);
            if(microserviceQueue.id != null){
                let fields = Object.keys(graphqlFields(info));
                let fkFilter = { microserviceQueueId: microserviceQueue.id };
                
                filter = appendFilter(filter, "microserviceQueueLogEntry", fkFilter);

                return getResultsCursor("microserviceQueueLogEntry","id", filter, sort, pageNumber, pageSize, info, dataLib);
            }
            return Promise.resolve(null);
        },
    };

    if(Object.keys(nestedResolvers).length > 0){
        resolvers.microserviceQueue = nestedResolvers;
    }


    resolvers.Query.microserviceQueueLogEntries = function(root, { filter, sort, pageNumber, pageSize }, context, info ){
        let dataLib = getDataLibWithContext(db, context);
        return getResultsCursor("microserviceQueueLogEntry","id", filter, sort, pageNumber, pageSize, info, dataLib, { root: true });
    }

    resolvers.Query.microserviceQueueLogEntry = function(root, args, context, info ){
        let dataLib = getDataLibWithContext(db, context);
        let fields = Object.keys(graphqlFields(info));
        return dataLib.entities.microserviceQueueLogEntry.get(args.id, fields, { root: true });
    }

    resolvers.Mutation.createMicroserviceQueueLogEntry = function( root, { input }, context, info){
        let dataLib = getDataLibWithContext(db, context);
        return dataLib.entities.microserviceQueueLogEntry.create(input, undefined, { root: true })
               .then((ids) => {
                return Promise.resolve({ ids: ids});
               });
    }

    resolvers.createMicroserviceQueueLogEntryPayload = {
        createdItemsCursor: function( parent, { filter, sort, pageNumber, pageSize }, context, info){
            let dataLib = getDataLibWithContext(db, context);
            let pkFilter = { id: parent.ids };

            filter = appendFilter(filter, "microserviceQueueLogEntry", pkFilter);

            return getResultsCursor("microserviceQueueLogEntry","id", filter, sort, pageNumber, pageSize, info, dataLib, { root: true });
        }
    }

    resolvers.Mutation.updateMicroserviceQueueLogEntry = function( root, { input }, context, info){
        let dataLib = getDataLibWithContext(db, context);
        return dataLib.entities.microserviceQueueLogEntry.update(input, undefined, undefined, { root: true })
               .then((ids) => {
                return Promise.resolve({ ids: ids});
               });
    }

    

    resolvers.updateMicroserviceQueueLogEntryPayload = {
        updatedItemsCursor: function( parent, { filter, sort, pageNumber, pageSize }, context, info){
            let dataLib = getDataLibWithContext(db, context);
            let pkFilter = { id: parent.ids };
            
            filter = appendFilter(filter, "microserviceQueueLogEntry", pkFilter);

            return getResultsCursor("microserviceQueueLogEntry","id", filter, sort, pageNumber, pageSize, info, dataLib, { root: true });
        }
    }

    resolvers.Mutation.updateMicroserviceQueueLogEntriesWithQuery = function( root, { input }, context, info){
        let dataLib = getDataLibWithContext(db, context);
        return dataLib.entities.microserviceQueueLogEntry.updateQuery(input.updateQueries, undefined, { root: true })
            .then((ids) => {
                    return Promise.resolve({ ids: ids});
            });

    }
    

    resolvers.updateMicroserviceQueueLogEntriesWithQueryPayload = {
        updatedItemsCursor: function( parent, { filter, sort, pageNumber, pageSize }, context, info){
            let dataLib = getDataLibWithContext(db, context);
            let pkFilter = { id: parent.ids };
            
            filter = appendFilter(filter, "microserviceQueueLogEntry", pkFilter);

            return getResultsCursor("microserviceQueueLogEntry","id", filter, sort, pageNumber, pageSize, info, dataLib, { root: true });
        }
    }

    resolvers.Mutation.deleteMicroserviceQueueLogEntry = function( root, { input }, context, info){
        let dataLib = getDataLibWithContext(db, context);
        return dataLib.entities.microserviceQueueLogEntry.delete(input, undefined, { root: true })
               .then((count) => {
                return getDeleteResult(count, info);
               });
    }

    resolvers.Mutation.deleteMicroserviceQueueLogEntriesWithQuery = function( root, { input }, context, info){
        let dataLib = getDataLibWithContext(db, context);
        return dataLib.entities.microserviceQueueLogEntry.deleteQuery(input.deleteQueries, undefined, { root: true })
            .then((count) => {
                return getDeleteResult(count, info, dataLib);
            });
    }
    

    nestedResolvers = {
        microserviceQueue: function(microserviceQueueLogEntry, { filter, sort, pageNumber, pageSize }, context, info ){
            let dataLib = getDataLibWithContext(db, context);
            if(microserviceQueueLogEntry.microserviceQueueId != null){
                let fields = Object.keys(graphqlFields(info));
                let fkFilter = { id: microserviceQueueLogEntry.microserviceQueueId };
                
                filter = appendFilter(filter, "microserviceQueue", fkFilter);

                return dataLib.entities.microserviceQueue.query(fields, filter, sort, pageNumber, pageSize).then(returnFirstResult);
            }
            return Promise.resolve(null);
        },
    };

    if(Object.keys(nestedResolvers).length > 0){
        resolvers.microserviceQueueLogEntry = nestedResolvers;
    }


    resolvers.Query.microserviceIoFiles = function(root, { filter, sort, pageNumber, pageSize }, context, info ){
        let dataLib = getDataLibWithContext(db, context);
        return getResultsCursor("microserviceIoFile","id", filter, sort, pageNumber, pageSize, info, dataLib, { root: true });
    }

    resolvers.Query.microserviceIoFile = function(root, args, context, info ){
        let dataLib = getDataLibWithContext(db, context);
        let fields = Object.keys(graphqlFields(info));
        return dataLib.entities.microserviceIoFile.get(args.id, fields, { root: true });
    }

    resolvers.Mutation.createMicroserviceIoFile = function( root, { input }, context, info){
        let dataLib = getDataLibWithContext(db, context);
        return dataLib.entities.microserviceIoFile.create(input, undefined, { root: true })
               .then((ids) => {
                return Promise.resolve({ ids: ids});
               });
    }

    resolvers.createMicroserviceIoFilePayload = {
        createdItemsCursor: function( parent, { filter, sort, pageNumber, pageSize }, context, info){
            let dataLib = getDataLibWithContext(db, context);
            let pkFilter = { id: parent.ids };

            filter = appendFilter(filter, "microserviceIoFile", pkFilter);

            return getResultsCursor("microserviceIoFile","id", filter, sort, pageNumber, pageSize, info, dataLib, { root: true });
        }
    }

    resolvers.Mutation.updateMicroserviceIoFile = function( root, { input }, context, info){
        let dataLib = getDataLibWithContext(db, context);
        return dataLib.entities.microserviceIoFile.update(input, undefined, undefined, { root: true })
               .then((ids) => {
                return Promise.resolve({ ids: ids});
               });
    }

    

    resolvers.updateMicroserviceIoFilePayload = {
        updatedItemsCursor: function( parent, { filter, sort, pageNumber, pageSize }, context, info){
            let dataLib = getDataLibWithContext(db, context);
            let pkFilter = { id: parent.ids };
            
            filter = appendFilter(filter, "microserviceIoFile", pkFilter);

            return getResultsCursor("microserviceIoFile","id", filter, sort, pageNumber, pageSize, info, dataLib, { root: true });
        }
    }

    resolvers.Mutation.updateMicroserviceIoFilesWithQuery = function( root, { input }, context, info){
        let dataLib = getDataLibWithContext(db, context);
        return dataLib.entities.microserviceIoFile.updateQuery(input.updateQueries, undefined, { root: true })
            .then((ids) => {
                    return Promise.resolve({ ids: ids});
            });

    }
    

    resolvers.updateMicroserviceIoFilesWithQueryPayload = {
        updatedItemsCursor: function( parent, { filter, sort, pageNumber, pageSize }, context, info){
            let dataLib = getDataLibWithContext(db, context);
            let pkFilter = { id: parent.ids };
            
            filter = appendFilter(filter, "microserviceIoFile", pkFilter);

            return getResultsCursor("microserviceIoFile","id", filter, sort, pageNumber, pageSize, info, dataLib, { root: true });
        }
    }

    resolvers.Mutation.deleteMicroserviceIoFile = function( root, { input }, context, info){
        let dataLib = getDataLibWithContext(db, context);
        return dataLib.entities.microserviceIoFile.delete(input, undefined, { root: true })
               .then((count) => {
                return getDeleteResult(count, info);
               });
    }

    resolvers.Mutation.deleteMicroserviceIoFilesWithQuery = function( root, { input }, context, info){
        let dataLib = getDataLibWithContext(db, context);
        return dataLib.entities.microserviceIoFile.deleteQuery(input.deleteQueries, undefined, { root: true })
            .then((count) => {
                return getDeleteResult(count, info, dataLib);
            });
    }
    

    nestedResolvers = {
        microserviceQueue: function(microserviceIoFile, { filter, sort, pageNumber, pageSize }, context, info ){
            let dataLib = getDataLibWithContext(db, context);
            if(microserviceIoFile.microserviceQueueId != null){
                let fields = Object.keys(graphqlFields(info));
                let fkFilter = { id: microserviceIoFile.microserviceQueueId };
                
                filter = appendFilter(filter, "microserviceQueue", fkFilter);

                return dataLib.entities.microserviceQueue.query(fields, filter, sort, pageNumber, pageSize).then(returnFirstResult);
            }
            return Promise.resolve(null);
        },
    };

    if(Object.keys(nestedResolvers).length > 0){
        resolvers.microserviceIoFile = nestedResolvers;
    }


    resolvers.Query.users = function(root, { filter, sort, pageNumber, pageSize }, context, info ){
        let dataLib = getDataLibWithContext(db, context);
        return getResultsCursor("user","id", filter, sort, pageNumber, pageSize, info, dataLib, { root: true });
    }

    resolvers.Query.user = function(root, args, context, info ){
        let dataLib = getDataLibWithContext(db, context);
        let fields = Object.keys(graphqlFields(info));
        return dataLib.entities.user.get(args.id, fields, { root: true });
    }

    resolvers.Mutation.createUser = function( root, { input }, context, info){
        let dataLib = getDataLibWithContext(db, context);
        return dataLib.entities.user.create(input, undefined, { root: true })
               .then((ids) => {
                return Promise.resolve({ ids: ids});
               });
    }

    resolvers.createUserPayload = {
        createdItemsCursor: function( parent, { filter, sort, pageNumber, pageSize }, context, info){
            let dataLib = getDataLibWithContext(db, context);
            let pkFilter = { id: parent.ids };

            filter = appendFilter(filter, "user", pkFilter);

            return getResultsCursor("user","id", filter, sort, pageNumber, pageSize, info, dataLib, { root: true });
        }
    }

    resolvers.Mutation.updateUser = function( root, { input }, context, info){
        let dataLib = getDataLibWithContext(db, context);
        return dataLib.entities.user.update(input, undefined, undefined, { root: true })
               .then((ids) => {
                return Promise.resolve({ ids: ids});
               });
    }

    

    resolvers.updateUserPayload = {
        updatedItemsCursor: function( parent, { filter, sort, pageNumber, pageSize }, context, info){
            let dataLib = getDataLibWithContext(db, context);
            let pkFilter = { id: parent.ids };
            
            filter = appendFilter(filter, "user", pkFilter);

            return getResultsCursor("user","id", filter, sort, pageNumber, pageSize, info, dataLib, { root: true });
        }
    }

    resolvers.Mutation.updateUsersWithQuery = function( root, { input }, context, info){
        let dataLib = getDataLibWithContext(db, context);
        return dataLib.entities.user.updateQuery(input.updateQueries, undefined, { root: true })
            .then((ids) => {
                    return Promise.resolve({ ids: ids});
            });

    }
    

    resolvers.updateUsersWithQueryPayload = {
        updatedItemsCursor: function( parent, { filter, sort, pageNumber, pageSize }, context, info){
            let dataLib = getDataLibWithContext(db, context);
            let pkFilter = { id: parent.ids };
            
            filter = appendFilter(filter, "user", pkFilter);

            return getResultsCursor("user","id", filter, sort, pageNumber, pageSize, info, dataLib, { root: true });
        }
    }

    resolvers.Mutation.deleteUser = function( root, { input }, context, info){
        let dataLib = getDataLibWithContext(db, context);
        return dataLib.entities.user.delete(input, undefined, { root: true })
               .then((count) => {
                return getDeleteResult(count, info);
               });
    }

    resolvers.Mutation.deleteUsersWithQuery = function( root, { input }, context, info){
        let dataLib = getDataLibWithContext(db, context);
        return dataLib.entities.user.deleteQuery(input.deleteQueries, undefined, { root: true })
            .then((count) => {
                return getDeleteResult(count, info, dataLib);
            });
    }
    

    nestedResolvers = {
    };

    if(Object.keys(nestedResolvers).length > 0){
        resolvers.user = nestedResolvers;
    }

    
    //tnr: allow for resolver overrides/additions here. 
    //Note: /ext/index.js must return the resolvers object
    let extResolverPath = path.resolve(__dirname, './ext/index.js');
    if(fse.existsSync(extResolverPath)){
        resolvers = require(extResolverPath)({
            db,
            DataLib,
            opts,
            resolvers,
            getResultsCursor,
            returnFirstResult,
            appendFilter,
        });
    }

    return resolvers;

    function returnFirstResult(result){
        return Promise.resolve(result[0]);
    }


    function addLastFetchedDate(lastFetchedDate){
        return function addLastFetched(result){
            if(Array.isArray(result)){
                return Promise.resolve(result.map((rec) => {
                    rec.lastFetched = lastFetchedDate;
                    return rec;
                }));
            }
            result.lastFetched = lastFetchedDate;
            return Promise.resolve(result);
        }
    }

    function appendFilter(filter, modelName, additionalFilter){
        if(filter != null && additionalFilter != null){
            let f1 = queryResolver.convertSimpleFilter(modelName, filter);
            let f2 = queryResolver.convertSimpleFilter(modelName, additionalFilter);
            return queryResolver.combineQueries(f1, f2);
        }else if(filter != null){
            return queryResolver.convertSimpleFilter(modelName, filter);
        }else if(additionalFilter != null){
            return queryResolver.convertSimpleFilter(modelName, additionalFilter);
        }else{
            return;
        }
    }

    function getDeleteResult(deletedCount, info, dataLib){

        let fields = graphqlFields(info);
        let result = { deletedCount };
        let qry = Promise.resolve(result);

        if(fields.typeUpdates){
            let typeUpdateSelectFields = Object.keys(fields.typeUpdates);
            qry = qry.then((result) => {
                return dataLib.entities['typeUpdate'].query(typeUpdateSelectFields, {}, ['code'], 1, 100000)
                    .then((results) => {
                        result.typeUpdates = results;
                        return Promise.resolve(result);
                    });
            });
        }

        return qry;
    }
}

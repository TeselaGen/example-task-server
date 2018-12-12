const {
    each,
    assign,
    pick,
    uniq,
    has
} = require('lodash');

const Promise = require('bluebird');

const getCidReferences = require('../../core/getCidReferences');
const resolveCidReferences = require('../../core/resolveCidReferences');
const applyFilter = require('../../core/applyFilter');
const appendFilter = require('../../core/appendFilter');

async function updateMicroserviceIOFilesQuery(updateStatements, trx, opts){

    let allowQuery = await Promise.resolve(this.entities.microserviceIoFile.extensions.onUpdateQuery.allow.call(this, opts));

    if(!allowQuery) return Promise.resolve([]);

    let statements = await Promise.resolve(this.entities.microserviceIoFile.extensions.onUpdateQuery.statements.call(this, updateStatements, opts));

    let qry = this.db;

    
    

    let updatedIds = [];

    return Promise.each(statements, async (stmt) =>
    {
        let values = {
            fileUrl: stmt.values.fileUrl,
            type: stmt.values.type,
            destinationPath: stmt.values.destinationPath,
            createdAt: stmt.values.createdAt,
            updatedAt: stmt.values.updatedAt,
            cid: stmt.values.cid,
        };

        let relatedObjects = {
            microserviceQueue: {
                modelName: "microserviceQueue",
                referenceKey: "microserviceQueueId",
                targetTable: "microserviceQueue",
                targetKeyColumn: "id"   
            },
        };
        
        let columnMap = {
            fileUrl: "fileUrl",
            id: "id",
            microserviceQueueId: "microserviceQueueId",
            type: "type",
            destinationPath: "destinationPath",
            createdAt: "createdAt",
            updatedAt: "updatedAt",
            cid: "cid",
        };


        let cidsToResolve = getCidReferences([values], columnMap, relatedObjects, "id");
        await resolveCidReferences(cidsToResolve, qry, true);

        let updateFilter = stmt.where;

        let additionalFilter = await Promise.resolve(this.entities.microserviceIoFile.extensions.onUpdateQuery.appendFilter.call(this, opts));
        if(additionalFilter) updateFilter = appendFilter(updateFilter, "microserviceIoFile", additionalFilter)

        
        return applyFilter(qry("microserviceIoFile"), "microserviceIoFile", stmt.where)
                .update(values)
                .then(() => {
                    return applyFilter(qry("microserviceIoFile").select("id"), "microserviceIoFile", updateFilter);
                })
                .then((results) => {
                    results.forEach((row) => {
                        updatedIds.push(row.id);
                    });
                    return Promise.resolve();
                });
    })
    .then(() => {
        return Promise.resolve(uniq(updatedIds));
    });

}

module.exports = updateMicroserviceIOFilesQuery;
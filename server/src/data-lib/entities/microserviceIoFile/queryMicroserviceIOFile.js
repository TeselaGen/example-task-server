const {
    each,
    assign,
    pick,
    has
} = require('lodash');

const Promise = require('bluebird');
const buildQuery = require('../../core/buildQuery');
const appendFilter = require('../../core/appendFilter');

async function queryMicroserviceIOFile(selectFields = [], queryFilter, sortBy, pageNumber, pageSize, opts){

    let allowQuery = await Promise.resolve(this.entities.microserviceIoFile.extensions.onSelect.allow.call(this, opts));

    if(!allowQuery) return Promise.resolve([]);

    let fields = await Promise.resolve(this.entities.microserviceIoFile.extensions.onSelect.fields.call(this, selectFields, opts));

    let tableColumns = {
        fileUrl: "fileUrl",
        id: "id",
        microserviceQueueId: "microserviceQueueId",
        type: "type",
        destinationPath: "destinationPath",
        createdAt: "createdAt",
        updatedAt: "updatedAt",
        cid: "cid",
    };

    let alwaysSelect = {
        id: "id",
        microserviceQueueId: "microserviceQueueId",
    };

    let selectMap = assign(pick(tableColumns, fields), alwaysSelect);
    
    let select = [];
    each(selectMap, (columnName, attributeName) => {
        select.push(`${columnName} as ${attributeName}`);
    });


    let qry = Promise.resolve();

    if(fields.indexOf('lastFetched') > -1){
        qry = this.getCurrentTimestamp();
    }


    let filter = await Promise.resolve(this.entities.microserviceIoFile.extensions.onSelect.filter.call(this, queryFilter, opts));
    filter = await Promise.resolve(this.entities.microserviceIoFile.extensions.onQuery.filter.call(this, queryFilter, opts));

    let additionalFilter = await Promise.resolve(this.entities.microserviceIoFile.extensions.onSelect.appendFilter.call(this, opts));
    if(additionalFilter) filter = appendFilter(filter, "microserviceIoFile", additionalFilter)

    additionalFilter = await Promise.resolve(this.entities.microserviceIoFile.extensions.onQuery.appendFilter.call(this, opts));
    if(additionalFilter) filter = appendFilter(filter, "microserviceIoFile", additionalFilter)

    return qry.then((cts) => {
        return buildQuery(this.db, tableColumns,  "MicroserviceIOFile", "microserviceIoFile", select, filter, sortBy, pageNumber, pageSize)
                .then((results) => {
                    results = results.map((rec) => {
                        if(cts) rec.lastFetched = cts;
                        return rec;
                    })
                    return Promise.resolve(results);
                });
    });   
}

module.exports = queryMicroserviceIOFile;

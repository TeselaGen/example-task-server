const {
    each,
    assign,
    pick,
    has
} = require('lodash');

const Promise = require('bluebird');
const buildQuery = require('../../core/buildQuery');
const appendFilter = require('../../core/appendFilter');

async function queryMicroserviceQueueLogEntry(selectFields = [], queryFilter, sortBy, pageNumber, pageSize, opts){

    let allowQuery = await Promise.resolve(this.entities.microserviceQueueLogEntry.extensions.onSelect.allow.call(this, opts));

    if(!allowQuery) return Promise.resolve([]);

    let fields = await Promise.resolve(this.entities.microserviceQueueLogEntry.extensions.onSelect.fields.call(this, selectFields, opts));

    let tableColumns = {
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

    let convertJsonToText = this.db.client.config.client !== 'pg';

    let filter = await Promise.resolve(this.entities.microserviceQueueLogEntry.extensions.onSelect.filter.call(this, queryFilter, opts));
    filter = await Promise.resolve(this.entities.microserviceQueueLogEntry.extensions.onQuery.filter.call(this, queryFilter, opts));

    let additionalFilter = await Promise.resolve(this.entities.microserviceQueueLogEntry.extensions.onSelect.appendFilter.call(this, opts));
    if(additionalFilter) filter = appendFilter(filter, "microserviceQueueLogEntry", additionalFilter)

    additionalFilter = await Promise.resolve(this.entities.microserviceQueueLogEntry.extensions.onQuery.appendFilter.call(this, opts));
    if(additionalFilter) filter = appendFilter(filter, "microserviceQueueLogEntry", additionalFilter)

    return qry.then((cts) => {
        return buildQuery(this.db, tableColumns,  "MicroserviceQueueLogEntry", "microserviceQueueLogEntry", select, filter, sortBy, pageNumber, pageSize)
                .then((results) => {
                    results = results.map((rec) => {
                        if(cts) rec.lastFetched = cts;
                        if(convertJsonToText){
                            if(has(rec, "metadata")) rec.metadata = JSON.parse(rec.metadata);
                        }
                        return rec;
                    })
                    return Promise.resolve(results);
                });
    });   
}

module.exports = queryMicroserviceQueueLogEntry;

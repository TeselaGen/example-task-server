const {
    each,
    assign,
    pick,
    has
} = require('lodash');

const Promise = require('bluebird');
const buildQuery = require('../../core/buildQuery');
const appendFilter = require('../../core/appendFilter');

async function queryMicroserviceQueue(selectFields = [], queryFilter, sortBy, pageNumber, pageSize, opts){

    let allowQuery = await Promise.resolve(this.entities.microserviceQueue.extensions.onSelect.allow.call(this, opts));

    if(!allowQuery) return Promise.resolve([]);

    let fields = await Promise.resolve(this.entities.microserviceQueue.extensions.onSelect.fields.call(this, selectFields, opts));

    let tableColumns = {
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
    };

    let alwaysSelect = {
        id: "id",
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

    let filter = await Promise.resolve(this.entities.microserviceQueue.extensions.onSelect.filter.call(this, queryFilter, opts));
    filter = await Promise.resolve(this.entities.microserviceQueue.extensions.onQuery.filter.call(this, queryFilter, opts));

    let additionalFilter = await Promise.resolve(this.entities.microserviceQueue.extensions.onSelect.appendFilter.call(this, opts));
    if(additionalFilter) filter = appendFilter(filter, "microserviceQueue", additionalFilter)

    additionalFilter = await Promise.resolve(this.entities.microserviceQueue.extensions.onQuery.appendFilter.call(this, opts));
    if(additionalFilter) filter = appendFilter(filter, "microserviceQueue", additionalFilter)

    return qry.then((cts) => {
        return buildQuery(this.db, tableColumns,  "MicroserviceQueue", "microserviceQueue", select, filter, sortBy, pageNumber, pageSize)
                .then((results) => {
                    results = results.map((rec) => {
                        if(cts) rec.lastFetched = cts;
                        if(convertJsonToText){
                            if(has(rec, "input")) rec.input = JSON.parse(rec.input);
                            if(has(rec, "result")) rec.result = JSON.parse(rec.result);
                        }
                        return rec;
                    })
                    return Promise.resolve(results);
                });
    });   
}

module.exports = queryMicroserviceQueue;

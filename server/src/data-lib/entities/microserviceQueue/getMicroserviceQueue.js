const {
    each,
    assign,
    pick,
    startsWith,
    has
} = require('lodash');

const Promise = require('bluebird');

async function getMicroserviceQueue(key, selectFields = [], opts){

    let allowQuery = await Promise.resolve(this.entities.microserviceQueue.extensions.onSelect.allow.call(this, opts));
    if(!allowQuery) return Promise.resolve();

    let allowGet = await Promise.resolve(this.entities.microserviceQueue.extensions.onGet.allow.call(this, key, opts));
    if(!allowGet) return Promise.resolve();

    if(key == null || typeof key === 'undefined') return Promise.resolve();

    let fields = await Promise.resolve(this.entities.microserviceQueue.extensions.onSelect.fields.call(this, selectFields, opts));
    fields = await Promise.resolve(this.entities.microserviceQueue.extensions.onGet.fields.call(this, selectFields, opts));
    
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

    if(startsWith(key, "&")){
        return qry.then((cts) => {
            return this.db("microserviceQueue").first(select).where({ cid: key.substr(1) })
            .then((rec) => {
                return processResult(rec, cts, convertJsonToText);
            });
        });
    }
    
    return qry.then((cts) => {
        return this.db("microserviceQueue").first(select).where({ id: key })
                .then((rec) => {
                    return processResult(rec, cts, convertJsonToText);
                });
        });
}

module.exports = getMicroserviceQueue;

function processResult(rec, cts, convertJsonToText){
    if(rec){
        if(cts) rec.lastFetched = cts;
        if(convertJsonToText){
            if(has(rec, "input")) rec.input = JSON.parse(rec.input);
            if(has(rec, "result")) rec.result = JSON.parse(rec.result);
        }
    }
    return Promise.resolve(rec);
}
const {
    each,
    assign,
    pick,
    startsWith,
    has
} = require('lodash');

const Promise = require('bluebird');

async function getMicroserviceQueueLogEntry(key, selectFields = [], opts){

    let allowQuery = await Promise.resolve(this.entities.microserviceQueueLogEntry.extensions.onSelect.allow.call(this, opts));
    if(!allowQuery) return Promise.resolve();

    let allowGet = await Promise.resolve(this.entities.microserviceQueueLogEntry.extensions.onGet.allow.call(this, key, opts));
    if(!allowGet) return Promise.resolve();

    if(key == null || typeof key === 'undefined') return Promise.resolve();

    let fields = await Promise.resolve(this.entities.microserviceQueueLogEntry.extensions.onSelect.fields.call(this, selectFields, opts));
    fields = await Promise.resolve(this.entities.microserviceQueueLogEntry.extensions.onGet.fields.call(this, selectFields, opts));
    
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

    if(startsWith(key, "&")){
        return qry.then((cts) => {
            return this.db("microserviceQueueLogEntry").first(select).where({ cid: key.substr(1) })
            .then((rec) => {
                return processResult(rec, cts, convertJsonToText);
            });
        });
    }
    
    return qry.then((cts) => {
        return this.db("microserviceQueueLogEntry").first(select).where({ id: key })
                .then((rec) => {
                    return processResult(rec, cts, convertJsonToText);
                });
        });
}

module.exports = getMicroserviceQueueLogEntry;

function processResult(rec, cts, convertJsonToText){
    if(rec){
        if(cts) rec.lastFetched = cts;
        if(convertJsonToText){
            if(has(rec, "metadata")) rec.metadata = JSON.parse(rec.metadata);
        }
    }
    return Promise.resolve(rec);
}
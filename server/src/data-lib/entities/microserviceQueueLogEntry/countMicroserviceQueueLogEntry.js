const {
    each,
    assign,
    pick
} = require('lodash');

const Promise = require('bluebird');
const applyFilter = require('../../core/applyFilter');
const appendFilter = require('../../core/appendFilter');

async function countMicroserviceQueueLogEntry(queryFilter, opts){

    let allowQuery = await Promise.resolve(this.entities.microserviceQueueLogEntry.extensions.onSelect.allow.call(this, opts));

    if(!allowQuery) return Promise.resolve();

    let filter = await Promise.resolve(this.entities.microserviceQueueLogEntry.extensions.onSelect.filter.call(this, queryFilter, opts));
    filter = await Promise.resolve(this.entities.microserviceQueueLogEntry.extensions.onQuery.filter.call(this, filter, opts));

    let additionalFilter = await Promise.resolve(this.entities.microserviceQueueLogEntry.extensions.onSelect.appendFilter.call(this, opts));
    if(additionalFilter) filter = appendFilter(filter, "microserviceQueueLogEntry", additionalFilter)

    additionalFilter = await Promise.resolve(this.entities.microserviceQueueLogEntry.extensions.onQuery.appendFilter.call(this, opts));
    if(additionalFilter) filter = appendFilter(filter, "microserviceQueueLogEntry", additionalFilter)

    let qry = this.db("microserviceQueueLogEntry").count('* as count');
    
    qry = applyFilter(qry, "microserviceQueueLogEntry", filter);

    return qry;
}

module.exports = countMicroserviceQueueLogEntry;
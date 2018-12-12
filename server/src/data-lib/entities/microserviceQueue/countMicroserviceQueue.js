const {
    each,
    assign,
    pick
} = require('lodash');

const Promise = require('bluebird');
const applyFilter = require('../../core/applyFilter');
const appendFilter = require('../../core/appendFilter');

async function countMicroserviceQueue(queryFilter, opts){

    let allowQuery = await Promise.resolve(this.entities.microserviceQueue.extensions.onSelect.allow.call(this, opts));

    if(!allowQuery) return Promise.resolve();

    let filter = await Promise.resolve(this.entities.microserviceQueue.extensions.onSelect.filter.call(this, queryFilter, opts));
    filter = await Promise.resolve(this.entities.microserviceQueue.extensions.onQuery.filter.call(this, filter, opts));

    let additionalFilter = await Promise.resolve(this.entities.microserviceQueue.extensions.onSelect.appendFilter.call(this, opts));
    if(additionalFilter) filter = appendFilter(filter, "microserviceQueue", additionalFilter)

    additionalFilter = await Promise.resolve(this.entities.microserviceQueue.extensions.onQuery.appendFilter.call(this, opts));
    if(additionalFilter) filter = appendFilter(filter, "microserviceQueue", additionalFilter)

    let qry = this.db("microserviceQueue").count('* as count');
    
    qry = applyFilter(qry, "microserviceQueue", filter);

    return qry;
}

module.exports = countMicroserviceQueue;
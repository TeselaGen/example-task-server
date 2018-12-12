const {
    each,
    assign,
    pick
} = require('lodash');

const Promise = require('bluebird');
const applyFilter = require('../../core/applyFilter');
const appendFilter = require('../../core/appendFilter');

async function countMicroserviceIOFile(queryFilter, opts){

    let allowQuery = await Promise.resolve(this.entities.microserviceIoFile.extensions.onSelect.allow.call(this, opts));

    if(!allowQuery) return Promise.resolve();

    let filter = await Promise.resolve(this.entities.microserviceIoFile.extensions.onSelect.filter.call(this, queryFilter, opts));
    filter = await Promise.resolve(this.entities.microserviceIoFile.extensions.onQuery.filter.call(this, filter, opts));

    let additionalFilter = await Promise.resolve(this.entities.microserviceIoFile.extensions.onSelect.appendFilter.call(this, opts));
    if(additionalFilter) filter = appendFilter(filter, "microserviceIoFile", additionalFilter)

    additionalFilter = await Promise.resolve(this.entities.microserviceIoFile.extensions.onQuery.appendFilter.call(this, opts));
    if(additionalFilter) filter = appendFilter(filter, "microserviceIoFile", additionalFilter)

    let qry = this.db("microserviceIoFile").count('* as count');
    
    qry = applyFilter(qry, "microserviceIoFile", filter);

    return qry;
}

module.exports = countMicroserviceIOFile;
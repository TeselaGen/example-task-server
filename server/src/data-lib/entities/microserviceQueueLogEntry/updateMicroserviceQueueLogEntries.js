
const {
    each,
    assign,
    pick,
    reduce,
    startsWith,
    uniq,
    has
} = require('lodash');

const Promise = require('bluebird');

const getCidReferences = require('../../core/getCidReferences');
const resolveCidReferences = require('../../core/resolveCidReferences');
const applyFilter = require('../../core/applyFilter');
const appendFilter = require('../../core/appendFilter');

async function updateMicroserviceQueueLogEntries(updateRecords, fkFilter, trx, opts){

    let allowQuery = await Promise.resolve(this.entities.microserviceQueueLogEntry.extensions.onUpdate.allow.call(this, opts));

    if(!allowQuery) return Promise.resolve([]);

    let records = await Promise.resolve(this.entities.microserviceQueueLogEntry.extensions.onUpdate.records.call(this, updateRecords, opts));

    let qry = this.db;

    let dataLib = this;

    
    
    let ids = [];
    let modifiedTimestamp = new Date();
    return Promise.each(records, async (updateRecord) =>
    {
        let recordId = updateRecord.id;

        if (Object.keys(updateRecord).length <= 1) {
            return Promise.resolve() //no values are actually being updated (just the primary key is getting passed on updateRecord object)
        }

        if(startsWith(recordId, "&")){
            let rec = await qry("microserviceQueueLogEntry").first("id").where({ cid: recordId.substr(1) });
            recordId = rec.id;
            updateRecord.id = recordId;
        }

        let values = {
                    
            channel: updateRecord.channel,
                    
            details: updateRecord.details,
                    
            level: updateRecord.level,
                    
            message: updateRecord.message,
                    
            metadata: has(updateRecord, "metadata") ? JSON.stringify(updateRecord.metadata) : undefined,
                    
            microserviceQueueId: updateRecord.microserviceQueueId,
                    
            createdAt: updateRecord.createdAt,
                    
            updatedAt: updateRecord.updatedAt,
                    
            cid: updateRecord.cid,
        };

        values = reduce(values, (result, value, key) => {
            if(typeof value !== 'undefined'){
                result[key] = value;
            }
            return result;
        }, {});

        let select = [
            "id",
            "microserviceQueueId",
        ];

        let updateFilter = {
            id: recordId 
        };

        //this is just being used as a linker record
        //no values are actually being updated
        if (Object.keys(values).length < 1) {
            qry("microserviceQueueLogEntry")
                    .select(select)
                    .where(updateFilter)
                    .first()
            .then((result) => {
                if(result) ids.push(result.id);
                assign(updateRecord, result);
                return Promise.resolve();
            });
        }

        values.updatedAt = modifiedTimestamp;


        if(startsWith(recordId, "&")){
            updateFilter = {
                cid: recordId.substr(1)
            };
        }

        if(fkFilter){
            let fkField = Object.keys(fkFilter)[0];
            delete values[fkField];
            updateFilter[fkField] = fkFilter[fkField];
        }

        updateFilter = await Promise.resolve(dataLib.entities.microserviceQueueLogEntry.extensions.onUpdate.filter.call(dataLib, updateFilter, opts));

        let additionalFilter = await Promise.resolve(this.entities.microserviceQueueLogEntry.extensions.onUpdate.appendFilter.call(this, opts));
        if(additionalFilter) updateFilter = appendFilter(updateFilter, "microserviceQueueLogEntry", additionalFilter)


        let relatedObjects = {
            microserviceQueue: {
                modelName: "microserviceQueue",
                referenceKey: "microserviceQueueId",
                targetTable: "microserviceQueue",
                targetKeyColumn: "id"   
            },
        };
        
        let columnMap = {
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


        let cidsToResolve = getCidReferences([values], columnMap, relatedObjects, "id")
        await resolveCidReferences(cidsToResolve, qry, true);

        return applyFilter(qry("microserviceQueueLogEntry"), "microserviceQueueLogEntry", updateFilter)
                .update(values)
                .then(() => {
                    return applyFilter(qry("microserviceQueueLogEntry").select(select), "microserviceQueueLogEntry", updateFilter)
                           .first();
                })
                .then((result) => {
                    if(result) ids.push(result.id);
                    assign(updateRecord, result);
                    return Promise.resolve();
                });
    })
    .then(() => {
        return this.entities.microserviceQueueLogEntry.updateNestedRecords(qry, records);;
    })
    .then(() => {
        return Promise.resolve(uniq(ids));
    });
}

module.exports = updateMicroserviceQueueLogEntries;
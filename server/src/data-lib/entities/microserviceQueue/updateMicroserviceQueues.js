
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

async function updateMicroserviceQueues(updateRecords, fkFilter, trx, opts){

    let allowQuery = await Promise.resolve(this.entities.microserviceQueue.extensions.onUpdate.allow.call(this, opts));

    if(!allowQuery) return Promise.resolve([]);

    let records = await Promise.resolve(this.entities.microserviceQueue.extensions.onUpdate.records.call(this, updateRecords, opts));

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
            let rec = await qry("microserviceQueue").first("id").where({ cid: recordId.substr(1) });
            recordId = rec.id;
            updateRecord.id = recordId;
        }

        let values = {
                    
            authToken: updateRecord.authToken,
                    
            checkInInterval: updateRecord.checkInInterval,
                    
            controlToken: updateRecord.controlToken,
                    
            input: has(updateRecord, "input") ? JSON.stringify(updateRecord.input) : undefined,
                    
            lastCheckIn: updateRecord.lastCheckIn,
                    
            missedCheckInCount: updateRecord.missedCheckInCount,
                    
            result: has(updateRecord, "result") ? JSON.stringify(updateRecord.result) : undefined,
                    
            resultStatus: updateRecord.resultStatus,
                    
            service: updateRecord.service,
                    
            serviceUrl: updateRecord.serviceUrl,
                    
            startedOn: updateRecord.startedOn,
                    
            status: updateRecord.status,
                    
            taskId: updateRecord.taskId,
                    
            trackingId: updateRecord.trackingId,
                    
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
        ];

        let updateFilter = {
            id: recordId 
        };

        //this is just being used as a linker record
        //no values are actually being updated
        if (Object.keys(values).length < 1) {
            qry("microserviceQueue")
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

        updateFilter = await Promise.resolve(dataLib.entities.microserviceQueue.extensions.onUpdate.filter.call(dataLib, updateFilter, opts));

        let additionalFilter = await Promise.resolve(this.entities.microserviceQueue.extensions.onUpdate.appendFilter.call(this, opts));
        if(additionalFilter) updateFilter = appendFilter(updateFilter, "microserviceQueue", additionalFilter)


        let relatedObjects = {
        };
        
        let columnMap = {
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


        let cidsToResolve = getCidReferences([values], columnMap, relatedObjects, "id")
        await resolveCidReferences(cidsToResolve, qry, true);

        return applyFilter(qry("microserviceQueue"), "microserviceQueue", updateFilter)
                .update(values)
                .then(() => {
                    return applyFilter(qry("microserviceQueue").select(select), "microserviceQueue", updateFilter)
                           .first();
                })
                .then((result) => {
                    if(result) ids.push(result.id);
                    assign(updateRecord, result);
                    return Promise.resolve();
                });
    })
    .then(() => {
        return this.entities.microserviceQueue.updateNestedRecords(qry, records);;
    })
    .then(() => {
        return Promise.resolve(uniq(ids));
    });
}

module.exports = updateMicroserviceQueues;
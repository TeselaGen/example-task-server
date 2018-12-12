
jest.mock('../../core/applyFilter');

const deleteMicroserviceQueueLogEntries = require('./deleteMicroserviceQueueLogEntries');
const applyFilter = require('../../core/applyFilter');

describe("deleteMicroserviceQueueLogEntries", () => {
    it("deleteMicroserviceQueueLogEntries deletes records", async () => {
        let records = [
            {
                id: "123"
            }
        ];

        let mockAllow = jest.fn(() => true);
        let mockFilter = jest.fn((filter) => filter);
        let mockDel = jest.fn(() => Promise.resolve(1));
        let mockDeleteNestedRecords = jest.fn(() => Promise.resolve(1));
        let mockDb = jest.fn(() => "mock db");

        let ctx = {
            db: mockDb,
            entities: {
                microserviceQueueLogEntry: {
                    extensions: {
                        onDelete: {
                            allow: mockAllow,
                            filter: mockFilter
                        }
                    },
                    deleteNestedRecords: mockDeleteNestedRecords
                }
            }
        };

        applyFilter.mockReturnValue({
            del: mockDel
        });
 
        let result = await deleteMicroserviceQueueLogEntries.call(ctx, records);

        expect(mockAllow).toHaveBeenCalled();
        expect(mockFilter).toHaveBeenCalled();
        expect(mockDeleteNestedRecords).toHaveBeenCalled();
        expect(applyFilter).toHaveBeenCalled();
        expect(mockDb).toHaveBeenCalled();
        expect(mockDel).toHaveBeenCalled();
        expect(result).toEqual(2);
    });

    it("deleteMicroserviceQueueLogEntries returns undefined", async () => {
        let records = [
            {
                id: "123"
            }
        ];

        let ctx = {
            entities: {
                microserviceQueueLogEntry: {
                    extensions: {
                        onDelete: {
                            allow: () => false
                        }
                    }
                }
            }
        };
 
        let result = await deleteMicroserviceQueueLogEntries.call(ctx, records);

        expect(result).toBeUndefined();
    });
})
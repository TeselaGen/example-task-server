
jest.mock('../../core/applyFilter');

const deleteMicroserviceQueueLogEntriesQuery = require('./deleteMicroserviceQueueLogEntriesQuery');
const applyFilter = require('../../core/applyFilter');

describe("deleteMicroserviceQueueLogEntriesQuery", () => {
    it("deleteMicroserviceQueueLogEntriesQuery deletes records via a query", async () => {
        let statements = [
            {
                id: "123"
            }
        ];

        let mockAllow = jest.fn(() => true);
        let mockStatements = jest.fn((stmts) => stmts);
        let mockDel = jest.fn(() => Promise.resolve(1));
        let mockDb = jest.fn(() => "mock db");

        let ctx = {
            db: mockDb,
            entities: {
                microserviceQueueLogEntry: {
                    extensions: {
                        onDeleteQuery: {
                            allow: mockAllow,
                            statements: mockStatements
                        }
                    }
                }
            }
        };

        applyFilter.mockReturnValue({
            del: mockDel
        });
 
        let result = await deleteMicroserviceQueueLogEntriesQuery.call(ctx, statements);

        expect(mockAllow).toHaveBeenCalled();
        expect(mockStatements).toHaveBeenCalled();
        expect(applyFilter).toHaveBeenCalled();
        expect(mockDb).toHaveBeenCalled();
        expect(mockDel).toHaveBeenCalled();
        expect(result).toEqual(1);
    });

    it("deleteMicroserviceQueueLogEntriesQuery returns undefined", async () => {
        let statements = [
            {
                id: "123"
            }
        ];

        let ctx = {
            entities: {
                microserviceQueueLogEntry: {
                    extensions: {
                        onDeleteQuery: {
                            allow: () => false
                        }
                    }
                }
            }
        };
 
        let result = await deleteMicroserviceQueueLogEntriesQuery.call(ctx, statements);

        expect(result).toBeUndefined();
    });
})
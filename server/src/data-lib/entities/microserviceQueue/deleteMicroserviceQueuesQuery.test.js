
jest.mock('../../core/applyFilter');

const deleteMicroserviceQueuesQuery = require('./deleteMicroserviceQueuesQuery');
const applyFilter = require('../../core/applyFilter');

describe("deleteMicroserviceQueuesQuery", () => {
    it("deleteMicroserviceQueuesQuery deletes records via a query", async () => {
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
                microserviceQueue: {
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
 
        let result = await deleteMicroserviceQueuesQuery.call(ctx, statements);

        expect(mockAllow).toHaveBeenCalled();
        expect(mockStatements).toHaveBeenCalled();
        expect(applyFilter).toHaveBeenCalled();
        expect(mockDb).toHaveBeenCalled();
        expect(mockDel).toHaveBeenCalled();
        expect(result).toEqual(1);
    });

    it("deleteMicroserviceQueuesQuery returns undefined", async () => {
        let statements = [
            {
                id: "123"
            }
        ];

        let ctx = {
            entities: {
                microserviceQueue: {
                    extensions: {
                        onDeleteQuery: {
                            allow: () => false
                        }
                    }
                }
            }
        };
 
        let result = await deleteMicroserviceQueuesQuery.call(ctx, statements);

        expect(result).toBeUndefined();
    });
})

jest.mock('../../core/applyFilter');

const countMicroserviceQueueLogEntry = require('./countMicroserviceQueueLogEntry');
const applyFilter = require('../../core/applyFilter');

describe("countMicroserviceQueueLogEntry", () => {
    it("countMicroserviceQueueLogEntry executes count", async () => {

        let mockCount = jest.fn();
        let mockAllow = jest.fn(() => true);
        let mockFilter = jest.fn((filter) => filter);
        let mockCountQuery = "mock count query";

        let ctx = {
            db: () => ({ count: mockCount }),
            entities: {
                microserviceQueueLogEntry: {
                    extensions: {
                        onSelect: {
                            allow: mockAllow,
                            filter: mockFilter
                        }
                    }
                }
            }
        };

        applyFilter.mockReturnValue(mockCountQuery);
 
        let result = await countMicroserviceQueueLogEntry.call(ctx, {});

        expect(mockCount).toHaveBeenCalled();
        expect(mockAllow).toHaveBeenCalled();
        expect(mockFilter).toHaveBeenCalled();
        expect(result).toEqual(mockCountQuery);
    });

    it("countMicroserviceQueueLogEntry returns undefined if disallowed", async () => {
        let ctx = {
            db: () => ({ count: () => "qry" }),
            entities: {
                microserviceQueueLogEntry: {
                    extensions: {
                        onSelect: {
                            allow: () => false,
                            filter: (filter) => filter
                        }
                    }
                }
            }
        };
 
        let result = await countMicroserviceQueueLogEntry.call(ctx, {});

        expect(result).toBeUndefined();
    });
})
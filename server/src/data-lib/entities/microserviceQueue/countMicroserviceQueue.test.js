
jest.mock('../../core/applyFilter');

const countMicroserviceQueue = require('./countMicroserviceQueue');
const applyFilter = require('../../core/applyFilter');

describe("countMicroserviceQueue", () => {
    it("countMicroserviceQueue executes count", async () => {

        let mockCount = jest.fn();
        let mockAllow = jest.fn(() => true);
        let mockFilter = jest.fn((filter) => filter);
        let mockCountQuery = "mock count query";

        let ctx = {
            db: () => ({ count: mockCount }),
            entities: {
                microserviceQueue: {
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
 
        let result = await countMicroserviceQueue.call(ctx, {});

        expect(mockCount).toHaveBeenCalled();
        expect(mockAllow).toHaveBeenCalled();
        expect(mockFilter).toHaveBeenCalled();
        expect(result).toEqual(mockCountQuery);
    });

    it("countMicroserviceQueue returns undefined if disallowed", async () => {
        let ctx = {
            db: () => ({ count: () => "qry" }),
            entities: {
                microserviceQueue: {
                    extensions: {
                        onSelect: {
                            allow: () => false,
                            filter: (filter) => filter
                        }
                    }
                }
            }
        };
 
        let result = await countMicroserviceQueue.call(ctx, {});

        expect(result).toBeUndefined();
    });
})
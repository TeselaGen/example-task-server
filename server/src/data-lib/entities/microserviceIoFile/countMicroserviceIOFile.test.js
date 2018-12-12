
jest.mock('../../core/applyFilter');

const countMicroserviceIOFile = require('./countMicroserviceIOFile');
const applyFilter = require('../../core/applyFilter');

describe("countMicroserviceIOFile", () => {
    it("countMicroserviceIOFile executes count", async () => {

        let mockCount = jest.fn();
        let mockAllow = jest.fn(() => true);
        let mockFilter = jest.fn((filter) => filter);
        let mockCountQuery = "mock count query";

        let ctx = {
            db: () => ({ count: mockCount }),
            entities: {
                microserviceIoFile: {
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
 
        let result = await countMicroserviceIOFile.call(ctx, {});

        expect(mockCount).toHaveBeenCalled();
        expect(mockAllow).toHaveBeenCalled();
        expect(mockFilter).toHaveBeenCalled();
        expect(result).toEqual(mockCountQuery);
    });

    it("countMicroserviceIOFile returns undefined if disallowed", async () => {
        let ctx = {
            db: () => ({ count: () => "qry" }),
            entities: {
                microserviceIoFile: {
                    extensions: {
                        onSelect: {
                            allow: () => false,
                            filter: (filter) => filter
                        }
                    }
                }
            }
        };
 
        let result = await countMicroserviceIOFile.call(ctx, {});

        expect(result).toBeUndefined();
    });
})
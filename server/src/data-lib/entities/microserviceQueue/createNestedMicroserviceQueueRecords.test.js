const populateNestedObjectsForCreate = require('../../core/populateNestedObjectsForCreate');

const createNestedMicroserviceQueueRecords = require('./createNestedMicroserviceQueueRecords');

jest.mock('../../core/populateNestedObjectsForCreate')

describe("createNestedMicroserviceQueueRecords", () => {
    it("exports function", () => {
        expect(typeof createNestedMicroserviceQueueRecords).toBe('function');
    });

    it("populates nested objects and calls base method", () => {
        jest.clearAllMocks();
        const mockCreateNestedObjects = jest.fn(() => "nested objects");
        let ctx = {
            createNestedObjects: mockCreateNestedObjects
        };

        populateNestedObjectsForCreate.mockImplementation(() => {
            return "populated nested objects";
        });

        let result = createNestedMicroserviceQueueRecords.call(ctx, "db", "recordId", "records");

        expect(result).toEqual("nested objects");
        expect(populateNestedObjectsForCreate).toBeCalled();
        expect(mockCreateNestedObjects).toBeCalled();

    });
});
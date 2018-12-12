const populateNestedObjectsForCreate = require('../../core/populateNestedObjectsForCreate');

const createNestedMicroserviceQueueLogEntryRecords = require('./createNestedMicroserviceQueueLogEntryRecords');

jest.mock('../../core/populateNestedObjectsForCreate')

describe("createNestedMicroserviceQueueLogEntryRecords", () => {
    it("exports function", () => {
        expect(typeof createNestedMicroserviceQueueLogEntryRecords).toBe('function');
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

        let result = createNestedMicroserviceQueueLogEntryRecords.call(ctx, "db", "recordId", "records");

        expect(result).toEqual("nested objects");
        expect(populateNestedObjectsForCreate).toBeCalled();
        expect(mockCreateNestedObjects).toBeCalled();

    });
});
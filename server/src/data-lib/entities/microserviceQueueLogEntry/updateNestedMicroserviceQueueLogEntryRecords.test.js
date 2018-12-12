const populateNestedObjectsForUpdate = require('../../core/populateNestedObjectsForUpdate');

const updateNestedMicroserviceQueueLogEntryRecords = require('./updateNestedMicroserviceQueueLogEntryRecords');

jest.mock('../../core/populateNestedObjectsForUpdate')

describe("updateNestedMicroserviceQueueLogEntryRecords", () => {
    it("exports function", () => {
        expect(typeof updateNestedMicroserviceQueueLogEntryRecords).toBe('function');
    });

    it("populates nested objects and calls base method", () => {
        jest.clearAllMocks();
        const mockUpdateNestedObjects = jest.fn(() => "nested objects");
        let ctx = {
            updateNestedObjects: mockUpdateNestedObjects
        };

        populateNestedObjectsForUpdate.mockImplementation(() => {
            return "populated nested objects";
        });

        let result = updateNestedMicroserviceQueueLogEntryRecords.call(ctx, "db", "recordId", "records");

        expect(result).toEqual("nested objects");
        expect(populateNestedObjectsForUpdate).toBeCalled();
        expect(mockUpdateNestedObjects).toBeCalled();

    });
});
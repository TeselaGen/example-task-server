const populateNestedObjectsForDelete = require('../../core/populateNestedObjectsForDelete');

const deleteNestedMicroserviceQueueLogEntryRecords = require('./deleteNestedMicroserviceQueueLogEntryRecords');

jest.mock('../../core/populateNestedObjectsForDelete')

describe("deleteNestedMicroserviceQueueLogEntryRecords", () => {
    it("exports function", () => {
        expect(typeof deleteNestedMicroserviceQueueLogEntryRecords).toBe('function');
    });

    it("populates nested objects and calls base method", () => {
        jest.clearAllMocks();
        const mockDeleteNestedObjects = jest.fn(() => "nested objects");
        let ctx = {
            deleteNestedObjects: mockDeleteNestedObjects
        };

        populateNestedObjectsForDelete.mockImplementation(() => {
            return "populated nested objects";
        });

        let result = deleteNestedMicroserviceQueueLogEntryRecords.call(ctx, "db", "recordId", "records");

        expect(result).toEqual("nested objects");
        expect(populateNestedObjectsForDelete).toBeCalled();
        expect(mockDeleteNestedObjects).toBeCalled();

    });
});
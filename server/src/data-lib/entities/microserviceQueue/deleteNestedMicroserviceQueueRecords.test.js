const populateNestedObjectsForDelete = require('../../core/populateNestedObjectsForDelete');

const deleteNestedMicroserviceQueueRecords = require('./deleteNestedMicroserviceQueueRecords');

jest.mock('../../core/populateNestedObjectsForDelete')

describe("deleteNestedMicroserviceQueueRecords", () => {
    it("exports function", () => {
        expect(typeof deleteNestedMicroserviceQueueRecords).toBe('function');
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

        let result = deleteNestedMicroserviceQueueRecords.call(ctx, "db", "recordId", "records");

        expect(result).toEqual("nested objects");
        expect(populateNestedObjectsForDelete).toBeCalled();
        expect(mockDeleteNestedObjects).toBeCalled();

    });
});
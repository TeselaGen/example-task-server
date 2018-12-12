const populateNestedObjectsForDelete = require('../../core/populateNestedObjectsForDelete');

const deleteNestedMicroserviceIOFileRecords = require('./deleteNestedMicroserviceIOFileRecords');

jest.mock('../../core/populateNestedObjectsForDelete')

describe("deleteNestedMicroserviceIOFileRecords", () => {
    it("exports function", () => {
        expect(typeof deleteNestedMicroserviceIOFileRecords).toBe('function');
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

        let result = deleteNestedMicroserviceIOFileRecords.call(ctx, "db", "recordId", "records");

        expect(result).toEqual("nested objects");
        expect(populateNestedObjectsForDelete).toBeCalled();
        expect(mockDeleteNestedObjects).toBeCalled();

    });
});
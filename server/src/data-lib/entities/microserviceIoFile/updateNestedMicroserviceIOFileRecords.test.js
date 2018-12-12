const populateNestedObjectsForUpdate = require('../../core/populateNestedObjectsForUpdate');

const updateNestedMicroserviceIOFileRecords = require('./updateNestedMicroserviceIOFileRecords');

jest.mock('../../core/populateNestedObjectsForUpdate')

describe("updateNestedMicroserviceIOFileRecords", () => {
    it("exports function", () => {
        expect(typeof updateNestedMicroserviceIOFileRecords).toBe('function');
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

        let result = updateNestedMicroserviceIOFileRecords.call(ctx, "db", "recordId", "records");

        expect(result).toEqual("nested objects");
        expect(populateNestedObjectsForUpdate).toBeCalled();
        expect(mockUpdateNestedObjects).toBeCalled();

    });
});
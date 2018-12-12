const populateNestedObjectsForCreate = require('../../core/populateNestedObjectsForCreate');

const createNestedMicroserviceIOFileRecords = require('./createNestedMicroserviceIOFileRecords');

jest.mock('../../core/populateNestedObjectsForCreate')

describe("createNestedMicroserviceIOFileRecords", () => {
    it("exports function", () => {
        expect(typeof createNestedMicroserviceIOFileRecords).toBe('function');
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

        let result = createNestedMicroserviceIOFileRecords.call(ctx, "db", "recordId", "records");

        expect(result).toEqual("nested objects");
        expect(populateNestedObjectsForCreate).toBeCalled();
        expect(mockCreateNestedObjects).toBeCalled();

    });
});

jest.mock('../../core/applyFilter');

const deleteMicroserviceIOFiles = require('./deleteMicroserviceIOFiles');
const applyFilter = require('../../core/applyFilter');

describe("deleteMicroserviceIOFiles", () => {
    it("deleteMicroserviceIOFiles deletes records", async () => {
        let records = [
            {
                id: "123"
            }
        ];

        let mockAllow = jest.fn(() => true);
        let mockFilter = jest.fn((filter) => filter);
        let mockDel = jest.fn(() => Promise.resolve(1));
        let mockDeleteNestedRecords = jest.fn(() => Promise.resolve(1));
        let mockDb = jest.fn(() => "mock db");

        let ctx = {
            db: mockDb,
            entities: {
                microserviceIoFile: {
                    extensions: {
                        onDelete: {
                            allow: mockAllow,
                            filter: mockFilter
                        }
                    },
                    deleteNestedRecords: mockDeleteNestedRecords
                }
            }
        };

        applyFilter.mockReturnValue({
            del: mockDel
        });
 
        let result = await deleteMicroserviceIOFiles.call(ctx, records);

        expect(mockAllow).toHaveBeenCalled();
        expect(mockFilter).toHaveBeenCalled();
        expect(mockDeleteNestedRecords).toHaveBeenCalled();
        expect(applyFilter).toHaveBeenCalled();
        expect(mockDb).toHaveBeenCalled();
        expect(mockDel).toHaveBeenCalled();
        expect(result).toEqual(2);
    });

    it("deleteMicroserviceIOFiles returns undefined", async () => {
        let records = [
            {
                id: "123"
            }
        ];

        let ctx = {
            entities: {
                microserviceIoFile: {
                    extensions: {
                        onDelete: {
                            allow: () => false
                        }
                    }
                }
            }
        };
 
        let result = await deleteMicroserviceIOFiles.call(ctx, records);

        expect(result).toBeUndefined();
    });
})
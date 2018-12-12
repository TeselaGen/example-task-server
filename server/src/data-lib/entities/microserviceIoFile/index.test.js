
const microserviceIoFile = require('../microserviceIoFile');

describe("microserviceIoFile", () => {
    

    it("exports entity definition", () => {
        expect(microserviceIoFile.tableName).toBeDefined();
        expect(microserviceIoFile.attributes).toBeDefined();
        expect(microserviceIoFile.extensions).toBeDefined();
        expect(typeof microserviceIoFile.query).toBe('function');
        expect(typeof microserviceIoFile.count).toBe('function');
        expect(typeof microserviceIoFile.get).toBe('function');
        expect(typeof microserviceIoFile.create).toBe('function');
        expect(typeof microserviceIoFile.update).toBe('function');
        expect(typeof microserviceIoFile.updateQuery).toBe('function');
        expect(typeof microserviceIoFile.delete).toBe('function');
        expect(typeof microserviceIoFile.deleteQuery).toBe('function');
        expect(typeof microserviceIoFile.createNestedRecords).toBe('function');
        expect(typeof microserviceIoFile.updateNestedRecords).toBe('function');
        expect(typeof microserviceIoFile.deleteNestedRecords).toBe('function');
    });

    describe("microserviceIoFile default extensions", () => {
        it("onCreate -> records returns records", async () => {
            let mockRecords = [
                {
                    id: 123
                },
                {
                    id: 124
                }
            ];
            let result = await microserviceIoFile.extensions.onCreate.records(mockRecords);
            expect(result).toEqual(mockRecords);
        });

        it("onCreate -> allow returns true", async () => {
            let result = await microserviceIoFile.extensions.onCreate.allow();
            expect(result).toBeTruthy();
        });

        it("onUpdate -> records returns records", async () => {
            let mockRecords = [
                {
                    id: 123
                },
                {
                    id: 124
                }
            ];
            let result = await microserviceIoFile.extensions.onUpdate.records(mockRecords);
            expect(result).toEqual(mockRecords);
        });

        it("onUpdate -> filter returns filter", async () => {
            let mockFilter = {
                id: [123, 124]
            };
            let result = await microserviceIoFile.extensions.onUpdate.filter(mockFilter);
            expect(result).toEqual(mockFilter);
        });

        it("onUpdate -> allow returns true", async () => {
            let result = await microserviceIoFile.extensions.onUpdate.allow();
            expect(result).toBeTruthy();
        });

        it("onUpdateQuery -> statements returns statements", async () => {
            let mockStatemetns = [
                {
                    values: {
                        status: "completed"
                    },
                    where: {
                        id: [123, 124]
                    }
                }
            ];
            let result = await microserviceIoFile.extensions.onUpdateQuery.statements(mockStatemetns);
            expect(result).toEqual(mockStatemetns);
        });

        it("onUpdateQuery -> allow returns true", async () => {
            let result = await microserviceIoFile.extensions.onUpdateQuery.allow();
            expect(result).toBeTruthy();
        });

        it("onDelete -> filter returns filter", async () => {
            let mockFilter = {
                id: [123, 124]
            };
            let result = await microserviceIoFile.extensions.onDelete.filter(mockFilter);
            expect(result).toEqual(mockFilter);
        });

        it("onDelete -> allow returns true", async () => {
            let result = await microserviceIoFile.extensions.onDelete.allow();
            expect(result).toBeTruthy();
        });

        it("onDeleteQuery -> statements returns statements", async () => {
            let mockStatemetns = [
                {
                    values: {
                        status: "completed"
                    },
                    where: {
                        id: [123, 124]
                    }
                }
            ];
            let result = await microserviceIoFile.extensions.onDeleteQuery.statements(mockStatemetns);
            expect(result).toEqual(mockStatemetns);
        });

        it("onDeleteQuery -> allow returns true", async () => {
            let result = await microserviceIoFile.extensions.onDeleteQuery.allow();
            expect(result).toBeTruthy();
        });

        it("onSelect -> fields returns fields", async () => {
            let mockFields = [
                "id",
                "status",
                "name"
            ];
            let result = await microserviceIoFile.extensions.onSelect.fields(mockFields);
            expect(result).toEqual(mockFields);
        });

        it("onSelect -> filter returns filter", async () => {
            let mockFilter = {
                id: [123, 124]
            };
            let result = await microserviceIoFile.extensions.onSelect.filter(mockFilter);
            expect(result).toEqual(mockFilter);
        });

        it("onSelect -> allow returns true", async () => {
            let result = await microserviceIoFile.extensions.onSelect.allow();
            expect(result).toBeTruthy();
        });
    });
});

const microserviceQueue = require('../microserviceQueue');

describe("microserviceQueue", () => {
    

    it("exports entity definition", () => {
        expect(microserviceQueue.tableName).toBeDefined();
        expect(microserviceQueue.attributes).toBeDefined();
        expect(microserviceQueue.extensions).toBeDefined();
        expect(typeof microserviceQueue.query).toBe('function');
        expect(typeof microserviceQueue.count).toBe('function');
        expect(typeof microserviceQueue.get).toBe('function');
        expect(typeof microserviceQueue.create).toBe('function');
        expect(typeof microserviceQueue.update).toBe('function');
        expect(typeof microserviceQueue.updateQuery).toBe('function');
        expect(typeof microserviceQueue.delete).toBe('function');
        expect(typeof microserviceQueue.deleteQuery).toBe('function');
        expect(typeof microserviceQueue.createNestedRecords).toBe('function');
        expect(typeof microserviceQueue.updateNestedRecords).toBe('function');
        expect(typeof microserviceQueue.deleteNestedRecords).toBe('function');
    });

    describe("microserviceQueue default extensions", () => {
        it("onCreate -> records returns records", async () => {
            let mockRecords = [
                {
                    id: 123
                },
                {
                    id: 124
                }
            ];
            let result = await microserviceQueue.extensions.onCreate.records(mockRecords);
            expect(result).toEqual(mockRecords);
        });

        it("onCreate -> allow returns true", async () => {
            let result = await microserviceQueue.extensions.onCreate.allow();
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
            let result = await microserviceQueue.extensions.onUpdate.records(mockRecords);
            expect(result).toEqual(mockRecords);
        });

        it("onUpdate -> filter returns filter", async () => {
            let mockFilter = {
                id: [123, 124]
            };
            let result = await microserviceQueue.extensions.onUpdate.filter(mockFilter);
            expect(result).toEqual(mockFilter);
        });

        it("onUpdate -> allow returns true", async () => {
            let result = await microserviceQueue.extensions.onUpdate.allow();
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
            let result = await microserviceQueue.extensions.onUpdateQuery.statements(mockStatemetns);
            expect(result).toEqual(mockStatemetns);
        });

        it("onUpdateQuery -> allow returns true", async () => {
            let result = await microserviceQueue.extensions.onUpdateQuery.allow();
            expect(result).toBeTruthy();
        });

        it("onDelete -> filter returns filter", async () => {
            let mockFilter = {
                id: [123, 124]
            };
            let result = await microserviceQueue.extensions.onDelete.filter(mockFilter);
            expect(result).toEqual(mockFilter);
        });

        it("onDelete -> allow returns true", async () => {
            let result = await microserviceQueue.extensions.onDelete.allow();
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
            let result = await microserviceQueue.extensions.onDeleteQuery.statements(mockStatemetns);
            expect(result).toEqual(mockStatemetns);
        });

        it("onDeleteQuery -> allow returns true", async () => {
            let result = await microserviceQueue.extensions.onDeleteQuery.allow();
            expect(result).toBeTruthy();
        });

        it("onSelect -> fields returns fields", async () => {
            let mockFields = [
                "id",
                "status",
                "name"
            ];
            let result = await microserviceQueue.extensions.onSelect.fields(mockFields);
            expect(result).toEqual(mockFields);
        });

        it("onSelect -> filter returns filter", async () => {
            let mockFilter = {
                id: [123, 124]
            };
            let result = await microserviceQueue.extensions.onSelect.filter(mockFilter);
            expect(result).toEqual(mockFilter);
        });

        it("onSelect -> allow returns true", async () => {
            let result = await microserviceQueue.extensions.onSelect.allow();
            expect(result).toBeTruthy();
        });
    });
});
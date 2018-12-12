
const microserviceQueueLogEntry = require('../microserviceQueueLogEntry');

describe("microserviceQueueLogEntry", () => {
    

    it("exports entity definition", () => {
        expect(microserviceQueueLogEntry.tableName).toBeDefined();
        expect(microserviceQueueLogEntry.attributes).toBeDefined();
        expect(microserviceQueueLogEntry.extensions).toBeDefined();
        expect(typeof microserviceQueueLogEntry.query).toBe('function');
        expect(typeof microserviceQueueLogEntry.count).toBe('function');
        expect(typeof microserviceQueueLogEntry.get).toBe('function');
        expect(typeof microserviceQueueLogEntry.create).toBe('function');
        expect(typeof microserviceQueueLogEntry.update).toBe('function');
        expect(typeof microserviceQueueLogEntry.updateQuery).toBe('function');
        expect(typeof microserviceQueueLogEntry.delete).toBe('function');
        expect(typeof microserviceQueueLogEntry.deleteQuery).toBe('function');
        expect(typeof microserviceQueueLogEntry.createNestedRecords).toBe('function');
        expect(typeof microserviceQueueLogEntry.updateNestedRecords).toBe('function');
        expect(typeof microserviceQueueLogEntry.deleteNestedRecords).toBe('function');
    });

    describe("microserviceQueueLogEntry default extensions", () => {
        it("onCreate -> records returns records", async () => {
            let mockRecords = [
                {
                    id: 123
                },
                {
                    id: 124
                }
            ];
            let result = await microserviceQueueLogEntry.extensions.onCreate.records(mockRecords);
            expect(result).toEqual(mockRecords);
        });

        it("onCreate -> allow returns true", async () => {
            let result = await microserviceQueueLogEntry.extensions.onCreate.allow();
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
            let result = await microserviceQueueLogEntry.extensions.onUpdate.records(mockRecords);
            expect(result).toEqual(mockRecords);
        });

        it("onUpdate -> filter returns filter", async () => {
            let mockFilter = {
                id: [123, 124]
            };
            let result = await microserviceQueueLogEntry.extensions.onUpdate.filter(mockFilter);
            expect(result).toEqual(mockFilter);
        });

        it("onUpdate -> allow returns true", async () => {
            let result = await microserviceQueueLogEntry.extensions.onUpdate.allow();
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
            let result = await microserviceQueueLogEntry.extensions.onUpdateQuery.statements(mockStatemetns);
            expect(result).toEqual(mockStatemetns);
        });

        it("onUpdateQuery -> allow returns true", async () => {
            let result = await microserviceQueueLogEntry.extensions.onUpdateQuery.allow();
            expect(result).toBeTruthy();
        });

        it("onDelete -> filter returns filter", async () => {
            let mockFilter = {
                id: [123, 124]
            };
            let result = await microserviceQueueLogEntry.extensions.onDelete.filter(mockFilter);
            expect(result).toEqual(mockFilter);
        });

        it("onDelete -> allow returns true", async () => {
            let result = await microserviceQueueLogEntry.extensions.onDelete.allow();
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
            let result = await microserviceQueueLogEntry.extensions.onDeleteQuery.statements(mockStatemetns);
            expect(result).toEqual(mockStatemetns);
        });

        it("onDeleteQuery -> allow returns true", async () => {
            let result = await microserviceQueueLogEntry.extensions.onDeleteQuery.allow();
            expect(result).toBeTruthy();
        });

        it("onSelect -> fields returns fields", async () => {
            let mockFields = [
                "id",
                "status",
                "name"
            ];
            let result = await microserviceQueueLogEntry.extensions.onSelect.fields(mockFields);
            expect(result).toEqual(mockFields);
        });

        it("onSelect -> filter returns filter", async () => {
            let mockFilter = {
                id: [123, 124]
            };
            let result = await microserviceQueueLogEntry.extensions.onSelect.filter(mockFilter);
            expect(result).toEqual(mockFilter);
        });

        it("onSelect -> allow returns true", async () => {
            let result = await microserviceQueueLogEntry.extensions.onSelect.allow();
            expect(result).toBeTruthy();
        });
    });
});
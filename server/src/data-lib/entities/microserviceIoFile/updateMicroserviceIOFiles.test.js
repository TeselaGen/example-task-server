const updateMicroserviceIOFiles = require('./updateMicroserviceIOFiles');

jest.mock('../../core/getCidReferences');
jest.mock('../../core/resolveCidReferences');

const getCidReferences = require('../../core/getCidReferences');
const resolveCidReferences = require('../../core/resolveCidReferences');

describe("updateMicroserviceIOFiles", () => {
    it("updateMicroserviceIOFiles updates records", async () => {

        jest.clearAllMocks();

        let updatingCreatedAtDate = new Date();

        let records = [
            {
                id: "123",
                createdAt: updatingCreatedAtDate
            }
        ];

        let mockAllow = jest.fn(() => true);
        let mockRecords = jest.fn((recs) => recs);
        let mockFilter = jest.fn((filter) => filter);
        let mockUpdateNestedRecords = jest.fn(() => Promise.resolve());
        let mockUpdate = jest.fn(() => Promise.resolve());
        let mockFirst = jest.fn(() => Promise.resolve({ id: "123" }))
        let mockWhere = jest.fn(() => {
            return {
                update: mockUpdate
            }
        });

        let mockSelectWhere = jest.fn(() => {
            return {
                first: mockFirst
            }
        });


        let mockSelect = jest.fn(() => {
            return {
                where: mockSelectWhere
            }
        });
        
        let mockDb = jest.fn(() => {
            return {
                where: mockWhere,
                select: mockSelect
            };
        });

        let ctx = {
            db: mockDb,
            entities: {
                microserviceIoFile: {
                    extensions: {
                        onUpdate: {
                            allow: mockAllow,
                            filter: mockFilter,
                            records: mockRecords
                        }
                    },
                    updateNestedRecords: mockUpdateNestedRecords
                }
            }
        };

        let result = await updateMicroserviceIOFiles.call(ctx, records);

        expect(mockAllow).toHaveBeenCalled();
        expect(mockRecords).toHaveBeenCalled();
        expect(mockFilter).toHaveBeenCalled();
        
        expect(getCidReferences).toHaveBeenCalled();
        expect(resolveCidReferences).toHaveBeenCalled();

        expect(mockWhere).toHaveBeenCalled();
        expect(mockUpdate).toHaveBeenCalled();
        expect(mockSelect).toHaveBeenCalled();
        expect(mockSelectWhere).toHaveBeenCalled();
        expect(mockFirst).toHaveBeenCalled();
        
        expect(mockUpdateNestedRecords).toHaveBeenCalled();
        
        expect(result).toEqual(["123"]);
    });

    it("updateMicroserviceIOFiles doesn't return update count for records that weren't updated", async () => {

        jest.clearAllMocks();

        let updatingCreatedAtDate = new Date();

        let records = [
            {
                id: "123",
                createdAt: updatingCreatedAtDate
            }
        ];

        let mockAllow = jest.fn(() => true);
        let mockRecords = jest.fn((recs) => recs);
        let mockFilter = jest.fn((filter) => filter);
        let mockUpdateNestedRecords = jest.fn(() => Promise.resolve());
        let mockUpdate = jest.fn(() => Promise.resolve());
        let mockFirst = jest.fn(() => Promise.resolve())
        let mockWhere = jest.fn(() => {
            return {
                update: mockUpdate
            }
        });

        let mockSelectWhere = jest.fn(() => {
            return {
                first: mockFirst
            }
        });


        let mockSelect = jest.fn(() => {
            return {
                where: mockSelectWhere
            }
        });
        
        let mockDb = jest.fn(() => {
            return {
                where: mockWhere,
                select: mockSelect
            };
        });

        let ctx = {
            db: mockDb,
            entities: {
                microserviceIoFile: {
                    extensions: {
                        onUpdate: {
                            allow: mockAllow,
                            filter: mockFilter,
                            records: mockRecords
                        }
                    },
                    updateNestedRecords: mockUpdateNestedRecords
                }
            }
        };

        let result = await updateMicroserviceIOFiles.call(ctx, records);

        expect(mockAllow).toHaveBeenCalled();
        expect(mockRecords).toHaveBeenCalled();
        expect(mockFilter).toHaveBeenCalled();
        
        expect(getCidReferences).toHaveBeenCalled();
        expect(resolveCidReferences).toHaveBeenCalled();

        expect(mockWhere).toHaveBeenCalled();
        expect(mockUpdate).toHaveBeenCalled();
        expect(mockSelect).toHaveBeenCalled();
        expect(mockSelectWhere).toHaveBeenCalled();
        expect(mockFirst).toHaveBeenCalled();
        
        expect(mockUpdateNestedRecords).toHaveBeenCalled();
        
        expect(result).toEqual([]);
    });

    it("updateMicroserviceIOFiles updates records via cid", async () => {

        jest.clearAllMocks();

        let updatingCreatedAtDate = new Date();

        let records = [
            {
                id: "&123",
                createdAt: updatingCreatedAtDate
            }
        ];

        let mockAllow = jest.fn(() => true);
        let mockRecords = jest.fn((recs) => recs);
        let mockFilter = jest.fn((filter) => filter);
        let mockUpdateNestedRecords = jest.fn(() => Promise.resolve());
        let mockUpdate = jest.fn(() => Promise.resolve());
        let mockFirst = jest.fn(() => Promise.resolve({ id: "123" }))
        let mockWhere = jest.fn(() => {
            return {
                update: mockUpdate
            }
        });

        let mockSelectWhere = jest.fn(() => {
            return {
                first: mockFirst
            }
        });


        let mockSelect = jest.fn(() => {
            return {
                where: mockSelectWhere
            }
        });
        
        let mockDb = jest.fn(() => {
            return {
                where: mockWhere,
                select: mockSelect
            };
        });

        let ctx = {
            db: mockDb,
            entities: {
                microserviceIoFile: {
                    extensions: {
                        onUpdate: {
                            allow: mockAllow,
                            filter: mockFilter,
                            records: mockRecords
                        }
                    },
                    updateNestedRecords: mockUpdateNestedRecords
                }
            }
        };

        let result = await updateMicroserviceIOFiles.call(ctx, records);

        expect(mockAllow).toHaveBeenCalled();
        expect(mockRecords).toHaveBeenCalled();
        expect(mockFilter).toHaveBeenCalled();
        
        expect(getCidReferences).toHaveBeenCalled();
        expect(resolveCidReferences).toHaveBeenCalled();

        expect(mockWhere).toHaveBeenCalled();
        expect(mockUpdate).toHaveBeenCalled();
        expect(mockSelect).toHaveBeenCalled();
        expect(mockSelectWhere).toHaveBeenCalled();
        expect(mockFirst).toHaveBeenCalled();
        
        expect(mockUpdateNestedRecords).toHaveBeenCalled();
        
        expect(result).toEqual(["123"]);
    });

    it("updateMicroserviceIOFiles updates records via foreign key filter", async () => {

        jest.clearAllMocks();

        let updatingCreatedAtDate = new Date();

        let records = [
            {
                id: "123",
                createdAt: updatingCreatedAtDate
            }
        ];

        let mockAllow = jest.fn(() => true);
        let mockRecords = jest.fn((recs) => recs);
        let mockFilter = jest.fn((filter) => filter);
        let mockUpdateNestedRecords = jest.fn(() => Promise.resolve());
        let mockUpdate = jest.fn(() => Promise.resolve());
        let mockFirst = jest.fn(() => Promise.resolve({ id: "123" }))
        let mockWhere = jest.fn(() => {
            return {
                update: mockUpdate
            }
        });

        let mockSelectWhere = jest.fn(() => {
            return {
                first: mockFirst
            }
        });


        let mockSelect = jest.fn(() => {
            return {
                where: mockSelectWhere
            }
        });
        
        let mockDb = jest.fn(() => {
            return {
                where: mockWhere,
                select: mockSelect
            };
        });

        let ctx = {
            db: mockDb,
            entities: {
                microserviceIoFile: {
                    extensions: {
                        onUpdate: {
                            allow: mockAllow,
                            filter: mockFilter,
                            records: mockRecords
                        }
                    },
                    updateNestedRecords: mockUpdateNestedRecords
                }
            }
        };

        let result = await updateMicroserviceIOFiles.call(ctx, records, { fkAttr: "124" });

        expect(mockAllow).toHaveBeenCalled();
        expect(mockRecords).toHaveBeenCalled();
        expect(mockFilter).toHaveBeenCalled();
        
        expect(getCidReferences).toHaveBeenCalled();
        expect(resolveCidReferences).toHaveBeenCalled();

        expect(mockWhere).toHaveBeenCalled();
        expect(mockUpdate).toHaveBeenCalled();
        expect(mockSelect).toHaveBeenCalled();
        expect(mockSelectWhere).toHaveBeenCalled();
        expect(mockFirst).toHaveBeenCalled();
        
        expect(mockUpdateNestedRecords).toHaveBeenCalled();
        
        expect(result).toEqual(["123"]);
    });

    it("updateMicroserviceIOFiles doesn't update records if only child records are sent", async () => {

        jest.clearAllMocks();

        let updatingCreatedAtDate = new Date();

        let records = [
            {
                id: "123",
                childAttr: { }
            }
        ];

        let mockAllow = jest.fn(() => true);
        let mockRecords = jest.fn((recs) => recs);
        let mockFilter = jest.fn((filter) => filter);
        let mockUpdateNestedRecords = jest.fn(() => Promise.resolve());
        let mockUpdate = jest.fn(() => Promise.resolve());
        let mockFirst = jest.fn(() => Promise.resolve({ id: "123" }))
        let mockWhere = jest.fn(() => {
            return {
                update: mockUpdate
            }
        });

        let mockSelectWhere = jest.fn(() => {
            return {
                first: mockFirst
            }
        });


        let mockSelect = jest.fn(() => {
            return {
                where: mockSelectWhere
            }
        });
        
        let mockDb = jest.fn(() => {
            return {
                where: mockWhere,
                select: mockSelect
            };
        });

        let ctx = {
            db: mockDb,
            entities: {
                microserviceIoFile: {
                    extensions: {
                        onUpdate: {
                            allow: mockAllow,
                            filter: mockFilter,
                            records: mockRecords
                        }
                    },
                    updateNestedRecords: mockUpdateNestedRecords
                }
            }
        };

        let result = await updateMicroserviceIOFiles.call(ctx, records);

        expect(mockAllow).toHaveBeenCalled();
        expect(mockRecords).toHaveBeenCalled();
        expect(mockFilter).not.toHaveBeenCalled();
        
        expect(getCidReferences).not.toHaveBeenCalled();
        expect(resolveCidReferences).not.toHaveBeenCalled();

        expect(mockWhere).not.toHaveBeenCalled();
        expect(mockUpdate).not.toHaveBeenCalled();
        expect(mockSelect).toHaveBeenCalled();
        expect(mockSelectWhere).toHaveBeenCalled();
        expect(mockFirst).toHaveBeenCalled();
        
        expect(mockUpdateNestedRecords).toHaveBeenCalled();
        
        expect(result).toEqual(["123"]);
    });

    it("updateMicroserviceIOFiles doesn't return invalid update id's if only child records are sent", async () => {

        jest.clearAllMocks();

        let updatingCreatedAtDate = new Date();

        let records = [
            {
                id: "123",
                childAttr: { }
            }
        ];

        let mockAllow = jest.fn(() => true);
        let mockRecords = jest.fn((recs) => recs);
        let mockFilter = jest.fn((filter) => filter);
        let mockUpdateNestedRecords = jest.fn(() => Promise.resolve());
        let mockUpdate = jest.fn(() => Promise.resolve());
        let mockFirst = jest.fn(() => Promise.resolve())
        let mockWhere = jest.fn(() => {
            return {
                update: mockUpdate
            }
        });

        let mockSelectWhere = jest.fn(() => {
            return {
                first: mockFirst
            }
        });


        let mockSelect = jest.fn(() => {
            return {
                where: mockSelectWhere
            }
        });
        
        let mockDb = jest.fn(() => {
            return {
                where: mockWhere,
                select: mockSelect
            };
        });

        let ctx = {
            db: mockDb,
            entities: {
                microserviceIoFile: {
                    extensions: {
                        onUpdate: {
                            allow: mockAllow,
                            filter: mockFilter,
                            records: mockRecords
                        }
                    },
                    updateNestedRecords: mockUpdateNestedRecords
                }
            }
        };

        let result = await updateMicroserviceIOFiles.call(ctx, records);

        expect(mockAllow).toHaveBeenCalled();
        expect(mockRecords).toHaveBeenCalled();
        expect(mockFilter).not.toHaveBeenCalled();
        
        expect(getCidReferences).not.toHaveBeenCalled();
        expect(resolveCidReferences).not.toHaveBeenCalled();

        expect(mockWhere).not.toHaveBeenCalled();
        expect(mockUpdate).not.toHaveBeenCalled();
        expect(mockSelect).toHaveBeenCalled();
        expect(mockSelectWhere).toHaveBeenCalled();
        expect(mockFirst).toHaveBeenCalled();
        
        expect(mockUpdateNestedRecords).toHaveBeenCalled();
        
        expect(result).toEqual([]);
    });

    it("updateMicroserviceIOFiles returns empty array", async () => {
        let records = [
            {
                id: "123"
            }
        ];

        let ctx = {
            entities: {
                microserviceIoFile: {
                    extensions: {
                        onUpdate: {
                            allow: () => false
                        }
                    }
                }
            }
        };
 
        let result = await updateMicroserviceIOFiles.call(ctx, records);

        expect(result).toEqual([]);
    });

    it("updateMicroserviceIOFiles throws error on cid as primary key", async () => {
        expect.assertions(1);

        let records = [
            {
                id: "&123"
            }
        ];

        let ctx = {
            entities: {
                microserviceIoFile: {
                    extensions: {
                        onUpdate: {
                            allow: () => true,
                            records: (rec) => rec
                        }
                    }
                }
            }
        };
        
        try{
            await updateMicroserviceIOFiles.call(ctx, records)
        }catch(err){
            expect(err).toBeDefined();
        }
    });
})
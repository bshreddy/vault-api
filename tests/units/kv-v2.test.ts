import vault from '../../lib';
import VaultInvalidConfigError from '../../lib/helper/invalid-config-error';
import {readData, writeData, readMetadata} from '../server';
import {parseMock, toMatchSchema} from '../utils';
import {
    KVv2ConfigSchema, KVv2ReadSchema, KVv2WriteSchema, vaultKv2CmdResponseSchema,
    KVv2ListSchema, KVv2ReadMetadataSchema, KVv2ReadMetadataCmdSchema
} from './schemas/kv-v2-schema';

beforeAll(async () => {
    writeData('secret/test_data', 'kv-v2_v1.json', true);
    writeData('secret/test_data', 'kv-v2_v2.json', true);
    writeData('secret/test_data', 'kv-v2_v3.json', true);

    writeData('secret/more_data', 'kv-v2_v1.json', true);
    writeData('secret/even_more_data', 'kv-v2_v1.json', true);
});

expect.extend({toMatchSchema});

test('Get Config', async () => {
    const data = {
        cas_required: false,
        delete_version_after: '0s',
        max_versions: 0
    };

    const res = await vault({
        path: 'secret',
        method: 'config'
    });

    expect(res).toMatchSchema(KVv2ConfigSchema);
    expect(res.data).toStrictEqual(data);
});

test('Set Config', async () => {
    const data = {
        max_versions: 5,
        cas_required: false,
        delete_version_after: '3h25m19s'
    };

    const res = await vault({
        path: 'secret',
        method: 'setConfig',
        data
    });

    expect(res.statusCode).toBe(204);
});

test('Attempting to Set Config without data', async () => {
    async function setConfigWithoutData() {
        await vault({
            path: 'secret',
            method: 'setConfig'
        });
    }

    await expect(setConfigWithoutData).rejects.toThrow(VaultInvalidConfigError);
});

test("Read Latest Version of 'secret/test_data'", async () => {
    const res = await vault({
        path: 'secret/test_data',
        method: 'read'
    });

    expect(res).toMatchSchema(KVv2ReadSchema);
    expect(res.data).toStrictEqual(parseMock('kv-v2_v3.json'));
});

test("Read Specific Version of 'secret/test_data'", async () => {
    const res = await vault({
        path: 'secret/test_data',
        method: 'read',
        version: 2
    });

    expect(res).toMatchSchema(KVv2ReadSchema);
    expect(res.data).toStrictEqual(parseMock('kv-v2_v2.json'));
});

test("Write new version of 'secret/test_data'", async () => {
    const res = await vault({
        path: 'secret/test_data',
        method: 'write',
        data: parseMock('kv-v2_v4.json')
    });

    expect(res).toMatchSchema(KVv2WriteSchema);

    const writtenData = readData('secret/test_data', true);

    expect(writtenData).toMatchSchema(vaultKv2CmdResponseSchema);
    expect(writtenData.data.data).toStrictEqual(parseMock('kv-v2_v4.json'));
    expect(writtenData.data.metadata).toStrictEqual(res.data);
});

test('Attempting to Write without data', async () => {
    async function writeWithoutData() {
        await vault({
            path: 'secret/test_data',
            method: 'write',
        });
    }

    await expect(writeWithoutData).rejects.toThrow(VaultInvalidConfigError);
});

test("Delete Latest Version of 'secret/test_data'", async () => {
    const res = await vault({
        path: 'secret/test_data',
        method: 'delete',
    });

    expect(res.statusCode).toBe(204);
});

test("Delete Secret Versions of 'secret/test_data'", async () => {
    const res = await vault({
        path: 'secret/test_data',
        method: 'deleteVersions',
        data: {
            versions: [1, 2]
        }
    });

    expect(res.statusCode).toBe(204);
});

test('Attempting to Delete Secret Versions without data', async () => {
    async function deleteVersionsWithoutData() {
        await vault({
            path: 'secret/test_data',
            method: 'deleteVersions',
        });
    }

    await expect(deleteVersionsWithoutData).rejects.toThrow(VaultInvalidConfigError);
});

test("Undelete Secret Versions of 'secret/test_data'", async () => {
    const res = await vault({
        path: 'secret/test_data',
        method: 'undeleteVersions',
        data: {
            versions: [1, 2]
        }
    });

    expect(res.statusCode).toBe(204);
});

test('Attempting to Undelete Secret Versions without data', async () => {
    async function undeleteVersionsWithoutData() {
        await vault({
            path: 'secret/test_data',
            method: 'undeleteVersions',
        });
    }

    await expect(undeleteVersionsWithoutData).rejects.toThrow(VaultInvalidConfigError);
});

test("Destroy Secret Versions of 'secret/test_data'", async () => {
    const res = await vault({
        path: 'secret/test_data',
        method: 'destroy',
        data: {
            versions: [1, 2]
        }
    });

    expect(res.statusCode).toBe(204);
});

test('Attempting to Destroy Secret Versions without data', async () => {
    async function destroyVersionsWithoutData() {
        await vault({
            path: 'secret/test_data',
            method: 'destroy',
        });
    }

    await expect(destroyVersionsWithoutData).rejects.toThrow(VaultInvalidConfigError);
});

test('List Secrets', async () => {
    const expectedKeys = ['even_more_data', 'more_data', 'test_data'];
    const res = await vault({
        path: 'secret',
        method: 'list'
    });

    expect(res).toMatchSchema(KVv2ListSchema);
    expect(res.data.keys).toStrictEqual(expectedKeys);
});

test("Read Secret Metadata of 'secret/test_data'", async () => {
    const res = await vault({
        path: 'secret/test_data',
        method: 'readMetadata'
    });

    expect(res).toMatchSchema(KVv2ReadMetadataSchema);

    const writtenData = readMetadata('secret/test_data');

    expect(writtenData).toMatchSchema(KVv2ReadMetadataCmdSchema);
    expect(writtenData.data).toStrictEqual(res.data);
});

test("Create/Update Metadata of 'secret/test_data'", async () => {
    const data = {
        max_versions: 5,
        cas_required: false,
        delete_version_after: '3h25m19s'
    };

    const res = await vault({
        path: 'secret/test_data',
        method: 'writeMetadata',
        data
    });

    expect(res.statusCode).toBe(204);

    let writtenData = readMetadata('secret/test_data');

    expect(writtenData).toMatchSchema(KVv2ReadMetadataCmdSchema);

    writtenData = {
        max_versions: writtenData.data.max_versions,
        cas_required: writtenData.data.cas_required,
        delete_version_after: writtenData.data.delete_version_after
    };
    expect(writtenData).toEqual(data);
});

test('Attempting to Create/Update Metadata without data', async () => {
    async function writeMetadataWithoutData() {
        await vault({
            path: 'secret/test_data',
            method: 'writeMetadata',
        });
    }

    await expect(writeMetadataWithoutData).rejects.toThrow(VaultInvalidConfigError);
});

test("Delete Metadata and All Versions of 'secret/test_data'", async () => {
    const res = await vault({
        path: 'secret/test_data',
        method: 'deleteMetadata'
    });

    expect(res.statusCode).toBe(204);
});

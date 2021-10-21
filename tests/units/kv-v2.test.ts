import vault from '../../lib';
import {readData, writeData} from '../server';
import {parseMock, toMatchSchema} from '../utils';
import {KVv2ConfigSchema, KVv2ReadSchema, KVv2WriteSchema, vaultKv2CmdResponseSchema} from './schemas/kv-v2-schema';

beforeAll(async () => {
    writeData('secret/test_data', 'kv-v2_v1.json', true);
    writeData('secret/test_data', 'kv-v2_v2.json', true);
    writeData('secret/test_data', 'kv-v2_v3.json', true);

    writeData('secret/more_data', 'kv-v2_v1.json', true);
    writeData('secret/even_more_data', 'kv-v2_v1.json', true);
});

expect.extend({toMatchSchema});

test('KV v2 - Get Config', async () => {
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

test('KV v2 - Set Config', async () => {
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

test("KV v2 - Read Latest Version of 'secret/test_data'", async () => {
    const res = await vault({
        path: 'secret/test_data',
        method: 'read'
    });

    expect(res).toMatchSchema(KVv2ReadSchema);
    expect(res.data).toStrictEqual(parseMock('kv-v2_v3.json'));
});

test("KV v2 - Read Specific Version of 'secret/test_data'", async () => {
    const res = await vault({
        path: 'secret/test_data',
        method: 'read',
        version: 2
    });

    expect(res).toMatchSchema(KVv2ReadSchema);
    expect(res.data).toStrictEqual(parseMock('kv-v2_v2.json'));
});

test("KV v2 - Write new version of 'secret/test_data'", async () => {
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

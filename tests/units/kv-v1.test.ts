import vault from '../../lib';
import {enableEngine, writeData, readData} from '../server';
import {KVv1Schema} from './schemas/kv-v1-schema';
import {parseMock, toMatchSchema} from '../utils';

expect.extend({toMatchSchema});

beforeAll(async () => {
    enableEngine('kv', 'kv');
    writeData('kv/secret', 'kv-v1.json');
    writeData('kv/secretBackup', 'kv-v1.json');
    writeData('kv/moresecret', 'kv-v1.json');
});

test('Reading secret from KV v1', async () => {
    const res = await vault({
        path: 'kv/secret',
        method: 'read'
    });

    expect(res).toMatchSchema(KVv1Schema);
    expect(res.data).toStrictEqual(parseMock('kv-v1.json'));
});

test("Listing path 'kv' from KV v1", async () => {
    const expectedRes = {keys: ['moresecret', 'secret', 'secretBackup']};

    const res = await vault({
        path: 'kv',
        method: 'list'
    });

    expect(res).toMatchSchema(KVv1Schema);
    expect(res.data).toStrictEqual(expectedRes);
});

test('Delete secret from KV v1', async () => {
    const res = await vault({
        path: 'kv/secret',
        method: 'delete'
    });

    expect(res.statusCode).toBe(204);
});

test('Write secret to KV v1', async () => {
    const res = await vault({
        path: 'kv/secret',
        method: 'write',
        data: parseMock('kv-v1.json')
    });

    expect(res.statusCode).toBe(204);

    const writtenData = readData('kv/secret');

    expect(writtenData).toMatchSchema(KVv1Schema);
    expect(writtenData.data).toStrictEqual(parseMock('kv-v1.json'));
});

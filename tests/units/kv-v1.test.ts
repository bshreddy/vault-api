import vault from '../../lib';
import VaultInvalidConfigError from '../../lib/helper/invalid-config-error';
import {enableEngine, writeData, readData} from '../server';
import {parseMock, toMatchSchema} from '../utils';
import {KVv1Schema} from './schemas/kv-v1-schema';
import {vaultCmdResponseSchema} from './schemas/vault-response-schema';

expect.extend({toMatchSchema});

beforeAll(async () => {
    enableEngine('kv', 'kv');
    writeData('kv/secret', 'kv-v1.json');
    writeData('kv/secretBackup', 'kv-v1.json');
    writeData('kv/moresecret', 'kv-v1.json');
});

test('KV v1 - Read secret', async () => {
    const res = await vault({
        path: 'kv/secret',
        method: 'read'
    });

    expect(res).toMatchSchema(KVv1Schema);
    expect(res.data).toStrictEqual(parseMock('kv-v1.json'));
});

test("KV v1 - Listing path 'kv'", async () => {
    const expectedRes = {keys: ['moresecret', 'secret', 'secretBackup']};

    const res = await vault({
        path: 'kv',
        method: 'list'
    });

    expect(res).toMatchSchema(KVv1Schema);
    expect(res.data).toStrictEqual(expectedRes);
});

test('KV v1 - Delete secret', async () => {
    const res = await vault({
        path: 'kv/secret',
        method: 'delete'
    });

    expect(res.statusCode).toBe(204);
});

test('KV v1 - Write secret', async () => {
    const res = await vault({
        path: 'kv/secret',
        method: 'write',
        data: parseMock('kv-v1.json')
    });

    expect(res.statusCode).toBe(204);

    const writtenData = readData('kv/secret');

    expect(writtenData).toMatchSchema(vaultCmdResponseSchema);
    expect(writtenData.data).toStrictEqual(parseMock('kv-v1.json'));
});

test('KV v1 - Attempt to Write without data', async () => {
    async function vaultWriteWithoutData() {
        await vault({
            path: 'kv/secret',
            method: 'write',
        });
    }

    await expect(vaultWriteWithoutData).rejects.toThrow(VaultInvalidConfigError);
});

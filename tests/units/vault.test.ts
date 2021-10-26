import vault from '../../lib';
import VaultInvalidConfigError from '../../lib/helper/invalid-config-error';
import VaultUnknownEngineError from '../../lib/helper/unknown-engine-error';
import {enableEngine, writeData, readData} from '../server';
import {parseMock, toMatchSchema} from '../utils';
import {KVv1Schema} from './schemas/kv-v1-schema';
import {vaultCmdResponseSchema} from './schemas/vault-response-schema';

expect.extend({toMatchSchema});

beforeAll(async () => {
    enableEngine('kv', 'kv1');
    writeData('kv1/vault_test', 'kv-v1.json');
    writeData('kv1/more_vault_test', 'kv-v1.json');
});

test('Check for exception with undefined token', async () => {
    async function invalidToken() {
        await vault({
            path: 'secret',
            method: 'config',
            token: undefined,
        });
    }

    await expect(invalidToken).rejects.toThrow(VaultInvalidConfigError);
});

test('Check for exception with undefined engine', async () => {
    async function invalidEngine() {
        await vault({
            path: 'secret',
            method: 'config',
            engine: undefined,
        });
    }

    await expect(invalidEngine).rejects.toThrow(VaultInvalidConfigError);
});

test('Check for exception with invalid engine', async () => {
    async function invalidEngine() {
        await vault({
            path: 'secret',
            method: 'config',
            engine: 'invalid',
        });
    }

    await expect(invalidEngine).rejects.toThrow(VaultUnknownEngineError);
});

test("Read secret using 'read' method", async () => {
    const res = await vault.read('kv1/vault_test');

    expect(res).toMatchSchema(KVv1Schema);
    expect(res.data).toStrictEqual(parseMock('kv-v1.json'));
});

test("Write secret using 'write' method", async () => {
    const res = await vault.write('kv1/writeSecret', parseMock('kv-v1.json'));

    expect(res.statusCode).toBe(204);

    const writtenData = readData('kv1/writeSecret');

    expect(writtenData).toMatchSchema(vaultCmdResponseSchema);
    expect(writtenData.data).toStrictEqual(parseMock('kv-v1.json'));
});

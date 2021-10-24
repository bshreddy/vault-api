import vault from '../../lib';
import VaultInvalidConfigError from '../../lib/helper/invalid-config-error';
import VaultUnknownEngineError from '../../lib/helper/unknown-engine-error';

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

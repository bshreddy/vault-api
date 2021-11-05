import {VaultServer} from '.';

export function stopServer(vaultServer: VaultServer | null): Promise<void> {
    return new Promise((resolve, reject) => {
        if (vaultServer?.server?.killed) { resolve(); }

        vaultServer?.server?.on('close', () => {
            vaultServer = null;
            delete process.env.VAULT_ADDR;
            delete process.env.TOKEN;
            delete process.env.UNSEAL_KEY;

            console.log('Vault server stopped');
            resolve();
        });

        if (!vaultServer?.server?.kill()) { reject(); }
    });
}

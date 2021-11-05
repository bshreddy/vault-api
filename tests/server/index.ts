import {ChildProcess} from 'child_process';
import {startServer as _startServer} from './start-server';
import {stopServer as _stopServer} from './stop-server';

export interface VaultServer {
    server?: ChildProcess;
    vaultAddr: string;
    token: string;
    unsealKey: string;
}

let vaultServer: (VaultServer | null) = null;

export async function startServer(): Promise<void> {
    if (vaultServer) { return; }

    if (process.env.CI) {
        const vaultAddr = 'http://127.0.0.1:8200';
        const token = 'vaultGHCITestToken';
        const unsealKey = '57CzRWOX6KT6H7iWo7BdI6G5LRphDUZIZNk97OYPbhWSAGHL8EHXvHHjc98g20dtWz';

        process.env.VAULT_ADDR = vaultAddr;
        process.env.VAULT_TOKEN = token;
        process.env.UNSEAL_KEY = unsealKey;

        vaultServer = {
            server: undefined,
            vaultAddr,
            token,
            unsealKey
        };
    } else {
        vaultServer = await _startServer();
    }
}

export async function stopServer(): Promise<void> {
    if (!process.env.CI) {
        await _stopServer(vaultServer);
    }
}

export * from './enable-engine';
export * from './write-data';
export * from './read-data';
export * from './read-metadata';

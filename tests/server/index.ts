import {ChildProcess} from 'child_process';
import {startServer as _startServer} from './start-server';
import {stopServer as _stopServer} from './stop-server';

export interface VaultServer {
    server: ChildProcess;
    vaultAddr: string;
    token: string;
    unsealKey: string;
}

let vaultServer: (VaultServer | null) = null;

export async function startServer(): Promise<void> {
    if (vaultServer) { return; }
    vaultServer = await _startServer();
}

export async function stopServer(): Promise<void> {
    await _stopServer(vaultServer);
}

export * from './enable-engine';
export * from './write-data';

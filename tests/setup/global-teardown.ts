import {stopServer} from '../server';

export async function globalTeardown(): Promise<void> {
    await stopServer();
}

export default globalTeardown;

import {stopServer} from '../server';

export async function globalTeardown(): Promise<void> {
    console.log('globalTeardown');

    await stopServer();
}

export default globalTeardown;

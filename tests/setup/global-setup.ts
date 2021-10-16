import {startServer} from '../server';

export async function globalSetup(): Promise<void> {
    await startServer();
}

export default globalSetup;

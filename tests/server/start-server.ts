import {exec} from 'child_process';
import {createInterface} from 'readline';
import {VaultServer} from '.';
import {delay} from '../../lib/utils/index';

export async function startServer(): Promise<VaultServer | null> {
    let token: string | undefined;
    let unsealKey: string | undefined;
    let vaultAddr: string | undefined;

    console.log(`\nWaiting for Vault Server to Start.....`);
    const server = exec('vault server -dev -dev-no-store-token', {encoding: 'utf8'});

    console.log(`Started Vault Dev Server (pid: ${server.pid})`);

    // @ts-ignore Some issue with ts-jest
    const rl = createInterface({input: server.stdout});

    rl.on('line', (line) => {
        vaultAddr = vaultAddr ?? line.match(/\$ export VAULT_ADDR='(.*)'/i)?.[1];
        unsealKey = unsealKey ?? line.match(/Unseal Key: (.*)/i)?.[1];
        token = token ?? line.match(/Root Token: (.*)/i)?.[1];
    });
    await delay(5000);

    process.env.VAULT_ADDR = vaultAddr;
    process.env.VAULT_TOKEN = token;
    process.env.UNSEAL_KEY = unsealKey;

    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    return {
        server,
        vaultAddr: vaultAddr!,
        token: token!,
        unsealKey: unsealKey!
    };
    /* eslint-enable @typescript-eslint/no-non-null-assertion */
}

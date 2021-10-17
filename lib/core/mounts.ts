import {Dictionary, Config} from '../types';

let mounts: Dictionary<Dictionary<string>> = {};

// TODO: Switch to using 'system' engine later
async function loadMounts(config: Config): Promise<void> {
    const {axios, apiVersion, isVaultRequest} = config;
    const address = typeof config.address === 'function' ? await config.address(config) : config.address;
    const token = typeof config.token === 'function' ? await config.token(config) : config.token;

    if (!axios || !address || !apiVersion || !token) { return; }

    const headers: Dictionary<any> = {
        'X-Vault-Token': token,
        ...config.headers,
    };

    if (isVaultRequest) { headers['X-Vault-Request'] = 'true'; }

    const res = (await axios({
        method: 'get',
        url: `${address}/${apiVersion}/sys/internal/ui/mounts`,
        headers
    })).data;

    const secret = res.data.secret;

    if (!secret) { return; }

    Object.keys(secret).map((path: string) => {
        secret[path] = `${secret[path].type}${secret[path].options?.version ?? ''}`;
    });

    mounts[address] = secret;
}

export async function getEngineName(config: Config): Promise<string | undefined> {
    // @ts-ignore config.address is always defined here
    const address: string = config.address;
    const mount = config.path.split('/')[0];

    if (!mounts[address] || !mounts[address][`${mount}/`]) { await loadMounts(config); }

    return mounts[address][`${mount}/`];
}

export function invalidateMountsCache(): void {
    mounts = {};
}

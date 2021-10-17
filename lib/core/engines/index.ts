import {RequestConfig, Engine, Dictionary, Config} from '../../types';
import {engine as kv} from './kv';
import {engine as kv2} from './kv2';

// eslint-disable-next-line no-unused-vars
const engines: Dictionary<Engine> = {
    kv, kv1: kv, kv2
};

let mounts: Dictionary<Dictionary<string>> = {};

export function register(name: string, engine: Engine): void {
    engines[name] = engine;
}

export function get(name: string): Engine {
    return engines[name];
}

export function request(name: string, config: RequestConfig): RequestConfig {
    return engines[name](config);
}

// TODO: Switch to using 'system' engine later
async function getMounts(config: Config): Promise<void> {
    const {axios, apiVersion, isVaultRequest} = config;
    const address = typeof config.address === 'function' ? await config.address() : config.address;
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
    console.log({mounts});
}

export async function getEngineName(config: Config): Promise<string | undefined> {
    const address = typeof config.address === 'function' ? await config.address() : config.address;
    const mount = (config.pathIncludesMount) ? config.path.split('/')[0] : config.mount;

    if (!address) { return; }
    if (!mounts[address] || !mounts[address][`${mount}/`]) { await getMounts(config); }

    config.engine = mounts[address][`${mount}/`];

    return config.engine;
}

export function invalidateMountsCache(): void {
    mounts = {};
}

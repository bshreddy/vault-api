import {Config, DefaultConfig, Dictionary, RequestConfig, VaultFunc, VaultResponse} from '../types';
import {request} from './engines';

export class Vault {
    private defaults: DefaultConfig;

    public vault!: VaultFunc;

    constructor(instanceConfig: DefaultConfig) {
        this.defaults = instanceConfig;

        this.vault = Object.assign(this._vault.bind(this), {});
    }

    private async _vault(config: Config): Promise<VaultResponse> {
        config = {...this.defaults, ...config};
        const {axios, apiVersion} = config;
        const address = typeof config.address === 'function' ? await config.address() : config.address;
        const token = typeof config.token === 'function' ? await config.token(config) : config.token;
        const engine = typeof config.engine === 'function' ? await config.engine(config) : config.engine;

        if (!axios || !address || !apiVersion || !token || !engine) {
            throw new Error('Vault: Missing required configuration');
        }

        if (config.method === 'help') {
            (config as RequestConfig).requestPath = (config.pathIncludesMount)
                ? `${config.path}?help=1`
                : `${config.mount}/${config.path}?help=1`;
        } else {request(engine, config);}

        const {axiosMethod, requestPath} = (config as RequestConfig);

        if (!axiosMethod || !requestPath) { throw new Error('Vault: Missing required configuration'); }

        const headers: Dictionary<any> = {
            'X-Vault-Token': token,
            ...config.headers,
        };

        if (config.isVaultRequest) { headers['X-Vault-Request'] = 'true'; }

        // @ts-ignore Some of the axios methods are not available in the typescript typings
        const res = await axios({
            method: axiosMethod,
            url: `${address}/${apiVersion}/${requestPath}`,
            headers,
            data: config.data,
        });

        return {
            ...res.data,
            statusCode: res.status
        };
    }
}

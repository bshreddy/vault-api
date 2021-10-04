import {request} from '../engines';
import {Config, DefaultConfig, RequestConfig} from '../types';

/* eslint-disable no-unused-vars */
type FunctionWithoutData = (path: string) => Promise<any>;
type FunctionWithData = (path: string, data: any) => Promise<any>;

interface IVault {
    [key: string]: any;

    read: FunctionWithoutData,
    list: FunctionWithoutData,
    delete: FunctionWithoutData,
    help: FunctionWithoutData,

    write: FunctionWithData,
}

export interface VaultFunc extends IVault {
    (config: Config): Promise<any>,
    create?: (defaultConfig: DefaultConfig) => VaultFunc;
}
/* eslint-enable no-unused-vars */

export class Vault implements IVault {
    // eslint-disable-next-line no-undef
    [key: string]: any;

    private defaults: DefaultConfig;

    private methodsWithoutData = ['read', 'list', 'delete', 'help'];
    private methodsWithData = ['write'];

    public read!: FunctionWithoutData;
    public list!: FunctionWithoutData;
    public delete!: FunctionWithoutData;
    public help!: FunctionWithoutData;
    public write!: FunctionWithData;
    public vault!: VaultFunc;

    constructor(instanceConfig: DefaultConfig) {
        this.defaults = instanceConfig;

        this.methodsWithoutData.forEach((method) => {
            this[method] = async (path: string): Promise<any> => {
                return this.vault({method, path});
            };
        });

        this.methodsWithData.forEach((method) => {
            this[method] = async (path: string, data: any): Promise<any> => {
                return this.vault({method, path, data});
            };
        });

        // #TODO: Update this with loops
        this.vault = Object.assign(this._vault.bind(this), {
            read: this.read,
            list: this.list,
            'delete': this.delete,
            help: this.help,
            write: this.write,
        });
    }

    private async _vault(config: Config): Promise<any> {
        config = {...this.defaults, ...config};
        const {axios, apiVersion, engine} = config;
        const address = typeof this.defaults.address === 'function' ? this.defaults.address() : this.defaults.address;
        const token = typeof this.defaults.token === 'function'
            ? this.defaults.token(config)
            : this.defaults.token;

        if (!axios || !address || !apiVersion || !token || !engine) {
            throw new Error('Vault: Missing required configuration');
        }

        if (config.method === 'help') {
            (config as RequestConfig).requestPath = (config.pathIncludesMount)
                ? `${config.path}?help=1`
                : `${config.mount}/${config.path}?help=1`;
        } else {request(engine, config);}

        const {axiosMethod, requestPath} = (config as RequestConfig);

        if (!axiosMethod) { throw new Error('Vault: Missing required configuration'); }

        const headers: {[key: string]: any} = {
            'X-Vault-Token': token,
            ...config.headers,
        };

        if (config.isVaultRequest) { headers['X-Vault-Request'] = 'true'; }

        // @ts-ignore Some of the axios methods are not available in the typescript typings
        return (await axios({
            method: axiosMethod,
            url: `${address}/${apiVersion}/${requestPath}`,
            headers,
            data: config.data,
        })).data;
    }
}

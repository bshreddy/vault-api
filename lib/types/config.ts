import DefaultConfig from './default-config';

/**
 * @interface Config
 * @description Configuration used for Vault requests.
 * @extends DefaultConfig
 *
 * @property {string} [method] - Vault request method.
 * @property {string} [path] - Vault request path.
 * @property {any} [data] - Vault request data.
 */
export interface Config extends DefaultConfig {
    method: string,
    path: string,
    mount?: string,
    data?: any,
}

export default Config;

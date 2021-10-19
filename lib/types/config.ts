import DefaultConfig from './default-config';
import {Dictionary} from '.';

/**
 * @interface Config
 * @description Configuration used for Vault requests.
 * @extends DefaultConfig
 *
 * @property {string} [method] - Vault request method.
 * @property {string} [path] - Vault request path.
 * @property {any} [data] - Vault request data.
 */
export interface Config extends DefaultConfig, Dictionary<any> {
    method: string,
    path: string,
    data?: any,
    version?: number
}

export default Config;

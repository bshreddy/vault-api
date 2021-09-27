import Config from './config';

/**
 * @interface VaultRequestConfig
 * @description Configuration used for Axios requests.
 * @extends VaultConfig
 *
 * @property {string} [axiosMethod] - Axios request method.
 */
export interface RequestConfig extends Config {
    axiosMethod?: string,
}

export default RequestConfig;

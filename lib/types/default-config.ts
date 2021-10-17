/* eslint-disable no-unused-vars */
import {AxiosInstance} from 'axios';
import Config from './config';
import {Dictionary} from '.';

/**
 * @interface DefaultConfig
 * @description Default configurations for any Vault instance.
 *
 * @property {AxiosInstance} [axios] - Axios instance to use for requests.
 * @property {string | (() => string)} [address] - Vault Server Address.
 * @property {string} [apiVersion] - Vault API version.
 * @property {string} [tokenPath] - Path to the vault-token file.
 * @property {string | ((config: VaultConfig) => string)} [token] - Vault token.
 * @property {string} [engine] - Vault Secrets Engine. (This will be automatically detected in the future)
 * @property {Dictionary} [headers] - Headers to be sent with every request.
 * @property {boolean} [pathIncludesMount] - Whether the given path includes the mount point or not.
 * @property {boolean} [isVaultRequest] - Whether `X-Vault-Request` header should be sent with every request or not.
 *
 * @property {string} [caCert] - Path to the CA certificate. **FUTURE IMPROVEMENT**
 * @property {string} [caPath] - Path to the CA certificate directory. **FUTURE IMPROVEMENT**
 * @property {string} [cert] - Path to the client certificate. **FUTURE IMPROVEMENT**
 * @property {string} [key] - Path to the client key. **FUTURE IMPROVEMENT**
 * @property {string} [dhparam] - A path to a DH parameter file. **FUTURE IMPROVEMENT**
 *
 * TODO: Add CA configs
 */
export interface DefaultConfig {
    // Main configs
    axios?: AxiosInstance,

    // API configs
    address?: string | (() => Promise<string | undefined>),
    apiVersion?: string,
    tokenPath?: string,
    token?: string | ((config: Config) => Promise<string | undefined>),
    engine?: string | ((config: Config) => Promise<string | undefined>),
    headers?: Dictionary<any>,

    // Options
    pathIncludesMount?: boolean,
    isVaultRequest?: boolean,
}

export default DefaultConfig;

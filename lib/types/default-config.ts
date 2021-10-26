/* eslint-disable no-unused-vars */
import {AxiosInstance} from 'axios';
import Config from './config';
import {Dictionary} from '.';

export interface DefaultConfig extends Dictionary<any> {
    // Main configs
    axios?: AxiosInstance;

    // API configs
    address?: string | ((config: Config) => Promise<string | undefined>);
    apiVersion?: string;
    tokenPath?: string;
    token?: string | ((config: Config) => Promise<string | undefined>);
    engine?: string | ((config: Config) => Promise<string | undefined>);
    headers?: Dictionary<any>;

    // Options
    isVaultRequest?: boolean;
}

export default DefaultConfig;

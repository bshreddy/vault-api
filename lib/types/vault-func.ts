/* eslint-disable no-unused-vars */
import Config from './config';
import DefaultConfig from './default-config';
import VaultResponse from './vault-response';

export type VaultFunctionWithoutData = (path: string) => Promise<any>;
export type VaultFunctionWithData = (path: string, data: any) => Promise<any>;

export interface VaultFunc {
    (config: Config): Promise<VaultResponse>,
    create?: (defaultConfig: DefaultConfig) => VaultFunc;

    read: VaultFunctionWithoutData,
    list: VaultFunctionWithoutData,
    delete: VaultFunctionWithoutData,
    help: VaultFunctionWithoutData,

    write: VaultFunctionWithData,
}

export default VaultFunc;

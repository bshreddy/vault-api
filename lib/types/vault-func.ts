/* eslint-disable no-unused-vars */
import Config from './config';
import DefaultConfig from './default-config';
import VaultResponse from './vault-response';

export interface VaultFunc{
    (config: Config): Promise<VaultResponse>,
    create?: (defaultConfig: DefaultConfig) => VaultFunc;
}

export default VaultFunc;

import {defaultConfigs as masterDefaultConfigs} from './config';
import {Vault} from './core/vault';
import {DefaultConfig, VaultFunc} from './types';

function createInstance(defaultConfigs: DefaultConfig): VaultFunc {
    return new Vault({...masterDefaultConfigs, ...defaultConfigs}).vault;
}

// Create the default instance to be exported.
export const vault = createInstance(masterDefaultConfigs);

// Expose `createInstance` to allow for custom instances.
vault.create = createInstance;

export default vault;

import {Vault, VaultFunc} from './core/vault';
import {defaultConfigs} from './config';
import {DefaultConfig} from './types';

/**
 * Create an instance of Vault.
 *
 * @param {DefaultConfig} defaultConfig The default config for the instance.
 * @returns {VaultFunc} A new instance of Vault.
 */
function createInstance(defaultConfig: DefaultConfig): VaultFunc {
    return new Vault({...defaultConfigs, ...defaultConfig}).vault;
}

// Create the default instance to be exported.
const vault = createInstance(defaultConfigs);

// Expose `createInstance` to allow for custom instances.
vault.create = createInstance;

export default vault;

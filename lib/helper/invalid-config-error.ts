import {RequestConfig} from '../types';

export class VaultInvalidConfigError extends Error {
    constructor(config: RequestConfig, message = 'Vault: Missing required configuration') {
        super(`${message}\n${JSON.stringify(config, null, 2)}`);
    }
}

export default VaultInvalidConfigError;

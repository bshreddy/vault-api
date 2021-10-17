import * as fs from 'fs';
import axios from 'axios';
import {getEngineName} from './core/engines';
import {Config, DefaultConfig} from './types';

export const defaultConfigs: DefaultConfig = {
    axios,

    address: async () => process.env.VAULT_ADDR ?? '',
    apiVersion: 'v1',
    async token(config: Config): Promise<string> {
        if (config.tokenPath) { return fs.readFileSync(config.tokenPath, 'utf8'); }
        return process.env.VAULT_TOKEN ?? '';
    },
    engine: getEngineName,
    headers: {},

    pathIncludesMount: true,
    isVaultRequest: true,
};

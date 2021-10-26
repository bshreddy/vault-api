import * as fs from 'fs';
import axios from 'axios';
import {getEngineName} from './core/mounts';
import {Config, DefaultConfig} from './types';

export const defaultConfigs: DefaultConfig = {
    axios,

    address: async () => process.env.VAULT_ADDR,
    apiVersion: 'v1',
    async token(config: Config): Promise<string | undefined> {
        return (config.tokenPath)
            ? fs.readFileSync(config.tokenPath, 'utf8')
            : process.env.VAULT_TOKEN;
    },
    engine: getEngineName,
    headers: {},

    isVaultRequest: true,
};

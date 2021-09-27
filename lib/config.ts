import axios from 'axios';
import * as fs from 'fs';

import {DefaultConfig, Config} from './types';

export const defaultConfigs: DefaultConfig = {
    axios,

    address: () => process.env.VAULT_ADDR ?? '',
    apiVersion: 'v1',
    token(config: Config): string {
        if (config.tokenPath) { return fs.readFileSync(config.tokenPath, 'utf8'); }
        return process.env.VAULT_TOKEN ?? '';
    },
    engine: 'kv',
    headers: {},

    pathIncludesMount: true,
    isVaultRequest: true,
};

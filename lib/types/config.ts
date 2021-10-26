import DefaultConfig from './default-config';

export interface Config extends DefaultConfig {
    method: string,
    path: string,
    data?: any,

    // KV v2 Specific
    options?: any,
    version?: number
}

export default Config;

import {Method} from 'axios';
import {RequestConfig, Engine} from '../types';

const axiosMethod: { [key: string]: Method; } = {
    read: 'get',
    list: 'get',
    'delete': 'delete',
    write: 'post',
    help: 'get',
};

export const engine: Engine = function kv(config: RequestConfig): RequestConfig {
    if (config.method === 'help') { config.path = `${config.path}?help=1`; }
    if (config.method === 'list') { config.path = `${config.path}?list=true`; }

    config.axiosMethod = axiosMethod[config.method];

    return config;
};

export default engine;

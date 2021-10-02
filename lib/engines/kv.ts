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
    config.requestPath = (config.pathIncludesMount)
        ? config.path
        : `${config.mount}/${config.path}`;

    if (config.method === 'help') { config.requestPath = `${config.requestPath}?help=1`; }
    if (config.method === 'list') { config.requestPath = `${config.requestPath}?list=true`; }

    config.axiosMethod = axiosMethod[config.method];

    return config;
};

export default engine;

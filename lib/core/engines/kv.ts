import {Method} from 'axios';
import VaultInvalidConfigError from '../../helper/invalid-config-error';
import {RequestConfig, Dictionary} from '../../types';

const axiosMethod: Dictionary<Method> = {
    read: 'get',
    list: 'get',
    'delete': 'delete',
    write: 'post'
};

export function preRequest(config: RequestConfig): RequestConfig {
    config.requestPath = config.path;

    if (config.method === 'list') { config.requestPath = `${config.requestPath}?list=true`; }
    if (config.method === 'write' && !config.data) { throw new VaultInvalidConfigError(config); }

    config.axiosMethod = axiosMethod[config.method];
    config.requestData = config.data;

    return config;
}

export default {
    preRequest
};

import {RequestConfig, Engine, Dictionary} from '../../types';

const axiosMethod: Dictionary<string> = {
    config: 'get',
    setConfig: 'post',
    read: 'get',
    readMetadata: 'get',
    list: 'list',
    'delete': 'delete',
    deleteVersions: 'post',
    deleteMetadata: 'delete',
    undeleteVersions: 'post',
    destroy: 'post',
    write: 'post',
    writeMetadata: 'post'
};

const prePath: Dictionary<string> = {
    config: 'config',
    setConfig: 'config',
    read: 'data',
    readMetadata: 'metadata',
    list: 'metadata',
    'delete': 'data',
    deleteVersions: 'delete',
    deleteMetadata: 'metadata',
    undeleteVersions: 'undelete',
    destroy: 'destroy',
    write: 'data',
    writeMetadata: 'metadata',
};

export const engine: Engine = function kv(config: RequestConfig): RequestConfig {
    if (config.pathIncludesMount) {
        const splitPath = config.path.split('/');

        config.mount = splitPath[0];
        config.path = splitPath.slice(1).join('/');
    }

    config.requestPath = `${config.mount}/${prePath[config.method]}/${config.path}`;
    config.axiosMethod = axiosMethod[config.method];

    return config;
};

export default engine;

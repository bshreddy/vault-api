import VaultInvalidConfigError from '../../helper/invalid-config-error';
import {RequestConfig, Engine, Dictionary} from '../../types';

const methods: Dictionary<[
    axiosMethod: string,
    prePath: string,
    dataRequired?: boolean,
    defaultVersion?: number
]> = {
    config: ['get', 'config'],
    setConfig: ['post', 'config', true],
    read: ['get', 'data', false, 0],
    write: ['post', 'data', true],
    'delete': ['delete', 'data'],
    deleteVersions: ['post', 'delete', true],
    undeleteVersions: ['post', 'undelete', true],
    destroy: ['post', 'destroy', true],
    list: ['list', 'metadata'],
    readMetadata: ['get', 'metadata'],
    writeMetadata: ['post', 'metadata', true],
    deleteMetadata: ['delete', 'metadata']
};

export const engine: Engine = function kv(config: RequestConfig): RequestConfig {
    const splitPath = config.path.split('/');
    const mount = splitPath[0];
    const version = (methods[config.method][3])
        ? `?version=${config.version ?? methods[config.method][3]}`
        : '';

    config.path = splitPath.slice(1).join('/');
    config.axiosMethod = methods[config.method][0];
    config.requestPath = (config.method === 'config' || config.method === 'setConfig')
        ? `${mount}/${methods[config.method][1]}`
        : `${mount}/${methods[config.method][1]}/${config.path}${version}`;

    if (methods[config.method][2] && !config.data) { throw new VaultInvalidConfigError(config); }

    return config;
};

export default engine;

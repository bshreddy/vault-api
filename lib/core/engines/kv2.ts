import VaultInvalidConfigError from '../../helper/invalid-config-error';
import {RequestConfig, Dictionary} from '../../types';

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
    patch: ['patch', 'data', true],
    'delete': ['delete', 'data'],
    deleteVersions: ['post', 'delete', true],
    undeleteVersions: ['post', 'undelete', true],
    destroy: ['post', 'destroy', true],
    list: ['list', 'metadata'],
    readMetadata: ['get', 'metadata'],
    writeMetadata: ['post', 'metadata', true],
    deleteMetadata: ['delete', 'metadata']
};

export function preRequest(config: RequestConfig): void {
    const splitPath = config.path.split('/');
    const mount = splitPath[0];
    const version = (typeof methods[config.method][3] !== 'undefined')
        ? `?version=${config.version ?? methods[config.method][3]}`
        : '';

    config.path = splitPath.slice(1).join('/');
    config.axiosMethod = methods[config.method][0];
    config.requestPath = (config.method === 'config' || config.method === 'setConfig')
        ? `${mount}/${methods[config.method][1]}`
        : `${mount}/${methods[config.method][1]}/${config.path}${version}`;

    config.headers = {
        ...((config.method === 'patch')
            ? {'Content-Type': 'application/merge-patch+json'}
            : {}
        ),
        ...config.headers
    };

    if (methods[config.method][2] && !config.data) { throw new VaultInvalidConfigError(config); }

    config.requestData = (config.method === 'write')
        ? {data: config.data, options: config.options}
        : config.data;
}

export function postRequest(config: RequestConfig): void {
    config.response = {
        ...config.response.data,
        ...((config.method === 'read') ? config.response.data.data : {}),
        ...((config.method === 'read') ? config.response.data.metadata : {}),
        statusCode: config.response.status
    };
}

export default {
    preRequest,
    postRequest
};

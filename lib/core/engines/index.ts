import VaultUnknownEngineError from '../../helper/unknown-engine-error';
import {RequestConfig, Engine, Dictionary} from '../../types';
import {default as kv} from './kv';
import {default as kv2} from './kv2';

// eslint-disable-next-line no-unused-vars
const engines: Dictionary<Engine> = {
    kv, kv1: kv, generic: kv, kv2
};

function defaultPostRequest(config: RequestConfig) {
    config.response = {
        ...config.response.data,
        statusCode: config.response.status
    };

    return config;
}

export function register(name: string, engine: Engine): void {
    engines[name.toLowerCase()] = engine;
}

export function getEngine(name: string): Engine {
    name = name.toLowerCase();

    if (!engines[name]) {
        throw new VaultUnknownEngineError(name);
    } else {
        return engines[name];
    }
}

export function preRequest(name: string, config: RequestConfig): RequestConfig {
    name = name.toLowerCase();

    if (config.method === 'help') {
        config.requestPath = `${config.path}?help=1`;
        config.axiosMethod = 'get';
        return config;
    } else if (!engines[name]) {
        throw new VaultUnknownEngineError(name);
    } else {
        return engines[name].preRequest(config);
    }
}

export function postRequest(name: string, config: RequestConfig): RequestConfig {
    name = name.toLowerCase();

    return (config.method === 'help')
        ? defaultPostRequest(config)
        : engines[name].postRequest?.(config) ?? defaultPostRequest(config);
}

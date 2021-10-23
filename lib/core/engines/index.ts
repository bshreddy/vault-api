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
    engines[name] = engine;
}

export function get(name: string): Engine {
    if (!engines[name]) {
        throw new VaultUnknownEngineError(name);
    } else {
        return engines[name];
    }
}

export function preRequest(name: string, config: RequestConfig): RequestConfig {
    if (config.method === 'help') {
        config.requestPath = `${config.path}?help=1`;
        return config;
    } else if (!engines[name]) {
        throw new VaultUnknownEngineError(name);
    } else {
        return engines[name].preRequest(config);
    }
}

export function postRequest(name: string, config: RequestConfig): RequestConfig {
    return (config.method === 'help')
        ? defaultPostRequest(config)
        : engines[name].postRequest?.(config) ?? defaultPostRequest(config);
}

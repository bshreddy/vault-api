import {RequestConfig, Engine} from '../types';
import {engine as kv} from './kv';

// eslint-disable-next-line no-unused-vars
const engines: { [key: string]: Engine } = {
    kv,
};

export function register(name: string, engine: Engine): void {
    engines[name] = engine;
}

export function get(name: string): Engine {
    return engines[name];
}

export function request(name: string, config: RequestConfig): RequestConfig {
    return engines[name](config);
}

import {RequestConfig, Engine, Dictionary} from '../../types';
import {engine as kv} from './kv';
import {engine as kv2} from './kv2';

// eslint-disable-next-line no-unused-vars
const engines: Dictionary<Engine> = {
    kv, kv1: kv, generic: kv, kv2
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

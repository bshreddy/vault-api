import {execSync} from 'child_process';
import {Dictionary} from '../../lib/types';

export function readData(vaultPath: string, isKV = false, options: Dictionary<string> = {}): any {
    const cmd = (isKV) ? 'kv get' : 'read';
    const args = Object.keys(options).map(key => `-${key}=${options[key]}`).join(' ');

    return JSON.parse(execSync(`vault ${cmd} -format=json ${args} ${vaultPath}`, {encoding: 'utf8'}));
}

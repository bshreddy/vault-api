import {execSync} from 'child_process';
import {Dictionary} from '../../lib/types';

export function readMetadata(vaultPath: string, options: Dictionary<string> = {}): any {
    const args = Object.keys(options).map(key => `-${key}=${options[key]}`).join(' ');

    return JSON.parse(execSync(`vault kv metadata get -format=json ${args} ${vaultPath}`, {encoding: 'utf8'}));
}

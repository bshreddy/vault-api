import {execSync} from 'child_process';
import {Dictionary} from '../../lib/types';
import {getPathForMock} from '../utils';

export function writeData(vaultPath: string, filePath: string, isKV = false, options: Dictionary<string> = {}): string {
    const cmd = (isKV) ? 'kv put' : 'write';
    const args = Object.keys(options).map(key => `-${key}=${options[key]}`).join(' ');

    return execSync(`vault ${cmd} ${vaultPath} ${args} @${getPathForMock(filePath)}`, {encoding: 'utf8'});
}

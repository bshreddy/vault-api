import {execSync} from 'child_process';
import {getPathForMock} from '../utils';

export function writeData(vaultPath: string, filePath: string, isKV = false): void {
    const cmd = (isKV) ? 'kv put' : 'write';

    console.log(execSync(`vault ${cmd} ${vaultPath} @${getPathForMock(filePath)}`, {encoding: 'utf8'}));
}

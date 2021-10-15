import {execSync} from 'child_process';

export function readData(vaultPath: string, isKV = false): any {
    const cmd = (isKV) ? 'kv get' : 'read';

    return JSON.parse(execSync(`vault ${cmd} -format=json ${vaultPath}`, {encoding: 'utf8'}));
}

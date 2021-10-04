import {execSync} from 'child_process';

export function writeData(vaultPath: string, filePath: string, isKV = false): void {
    filePath = `${__dirname}/../mocks/${filePath}`;
    const cmd = (isKV) ? 'kv put' : 'write';

    console.log(execSync(`vault ${cmd} ${vaultPath} @${filePath}`, {encoding: 'utf8'}));
}

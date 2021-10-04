import {execSync} from 'child_process';

export function enableEngine(engine: string, path: string): void {
    console.log(execSync(`vault secrets enable -path=${path} ${engine}`, {encoding: 'utf8'}));
}

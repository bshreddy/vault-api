import {execSync} from 'child_process';

export function enableEngine(engine: string, path: string): string {
    return execSync(`vault secrets enable -path=${path} ${engine}`, {encoding: 'utf8'});
}

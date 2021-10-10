import * as fs from 'fs';

export function getPathForMock(filePath: string): string {
    return `${__dirname}/../mocks/${filePath}`;
}

export function parseMock(filePath: string): any {
    return JSON.parse(fs.readFileSync(getPathForMock(filePath), {encoding: 'utf8'}));
}

export * from './to-match-schema';

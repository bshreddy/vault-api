import * as fs from 'fs';

export function getPathForMock(filePath: string): string {
    return `${__dirname}/../mocks/${filePath}`;
}

export function readMock(filePath: string): string {
    return fs.readFileSync(getPathForMock(filePath), {encoding: 'utf8'});
}

export function parseMock(filePath: string): any {
    return JSON.parse(readMock(filePath));
}

export * from './to-match-schema';

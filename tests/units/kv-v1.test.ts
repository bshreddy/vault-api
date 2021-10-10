import vault from '../../lib';
import {enableEngine, writeData} from '../server';
import {readSchema} from './schemas/kv-v1';
import {parseMock, toMatchSchema} from '../utils';

expect.extend({toMatchSchema});

beforeAll(async () => {
    enableEngine('kv', 'kv');
    writeData('kv/secret', 'kv-v1.json');
    writeData('kv/secretBackup', 'kv-v1.json');
    writeData('kv/moresecret', 'kv-v1.json');
});

test('Reading secret from KV v1', async () => {
    const res = await vault({
        path: 'kv/secret',
        method: 'read'
    });

    expect(res).toMatchSchema(readSchema);
    expect(res.data).toStrictEqual(parseMock('kv-v1.json'));
});

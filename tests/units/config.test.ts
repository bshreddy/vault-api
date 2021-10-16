import {defaultConfigs} from '../../lib/config';
import {toMatchSchema, getPathForMock} from '../utils';
import {defaultConfigSchema, defaultConfigStaticSchema} from './schemas/default-config-schema';

expect.extend({toMatchSchema});

test('defaultConfigs Schema', () => {
    expect(defaultConfigs).toMatchSchema(defaultConfigSchema);

    //@ts-ignore address will be a Function here.
    expect(defaultConfigs.address()).toBe(process.env.VAULT_ADDR);
});

test('defaultConfigs with tokenPath set', () => {
    const configs = {
        ...defaultConfigs,
        tokenPath: getPathForMock('vault-token')
    };

    //@ts-ignore token will be a Function here.
    expect(configs.token(configs)).toBe('s.vaultTokenJestTest');
});

test('defaultConfigs without env.VAULT_TOKEN and env.VAULT_ADDR', () => {
    const vaultToken = process.env.VAULT_TOKEN;
    const vaultAddr = process.env.VAULT_ADDR;

    delete process.env.VAULT_TOKEN;
    delete process.env.VAULT_ADDR;

    //@ts-ignore token will be a Function here.
    expect(defaultConfigs.token(defaultConfigs)).toBe('');

    //@ts-ignore address will be a Function here.
    expect(defaultConfigs.address()).toBe('');

    process.env.VAULT_TOKEN = vaultToken;
    process.env.VAULT_ADDR = vaultAddr;
});

test('token and address are strings', () => {
    const configs = {
        ...defaultConfigs,
        token: 's.vaultTokenJestTest',
        address: 'https://localhost:8200'
    };

    expect(configs).toMatchSchema(defaultConfigStaticSchema);
});

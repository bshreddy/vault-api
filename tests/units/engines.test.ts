import {register, getEngine, preRequest, postRequest} from '../../lib/core/engines';
import VaultUnknownEngineError from '../../lib/helper/unknown-engine-error';
import vault from '../../lib/index';
import {Engine, RequestConfig} from '../../lib/types';
import {toMatchSchema} from '../utils';
import {helpSchema} from './schemas/help-schema';

expect.extend({toMatchSchema});

class MockEngine implements Engine {
    preRequest(config: RequestConfig): RequestConfig {
        config.requestPath = 'MockEngine';
        return config;
    }


    postRequest(config: RequestConfig): RequestConfig {
        config.requestData = {key: 'value'};
        return config;
    }
}


test('Register Mock Engine', () => {
    register('Mock', new MockEngine());

    const engine = getEngine('mock');
    const config: RequestConfig = {path: 'test', method: 'read'};

    expect(engine).toBeInstanceOf(MockEngine);
    expect(engine.preRequest(config).requestPath).toEqual('MockEngine');
    expect(engine.postRequest?.(config).requestData).toStrictEqual({key: 'value'});

    expect(preRequest('mock', config).requestPath).toEqual('MockEngine');
    expect(postRequest('mock', config).requestData).toStrictEqual({key: 'value'});

    function invalidEngine() {
        getEngine('Invalid');
    }

    expect(invalidEngine).toThrow(VaultUnknownEngineError);
});

test('Vault Help Method', async () => {
    const res = await vault({
        path: 'secret',
        method: 'help',
    });

    expect(res).toMatchSchema(helpSchema);
});

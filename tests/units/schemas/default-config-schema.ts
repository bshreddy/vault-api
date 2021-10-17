import * as Joi from 'joi';

export const defaultConfigSchema = Joi.object({
    axios: Joi.function(),
    address: Joi.function(),
    apiVersion: Joi.string().valid('v1'),
    token: Joi.function(),
    engine: Joi.function(),
    headers: Joi.object(),
    pathIncludesMount: Joi.bool().valid(true),
    isVaultRequest: Joi.bool().valid(true),
});

export const defaultConfigStaticSchema = defaultConfigSchema.keys({
    token: Joi.string().valid('s.vaultTokenJestTest'),
    address: Joi.string().valid('https://localhost:8200')
});

import * as Joi from 'joi';

export const vaultCmdResponseSchema = Joi.object({
    request_id: Joi.string().guid().required(),
    lease_id: Joi.string().guid().allow('').required(),
    renewable: Joi.bool().required(),
    lease_duration: Joi.number().required(),
    data: Joi.object().required(),
    warnings: Joi.object().allow(null).required(),
});

export const vaultResponseSchema = vaultCmdResponseSchema.keys({
    wrap_info: Joi.object().allow(null).required(),
    auth: Joi.object().allow(null).required(),
    statusCode: Joi.number().required()
});

export default vaultResponseSchema;

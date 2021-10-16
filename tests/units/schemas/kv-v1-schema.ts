import * as Joi from 'joi';

export const KVv1Schema = Joi.object({
    request_id: Joi.string(),
    lease_id: Joi.string().guid().empty(''),
    renewable: Joi.bool(),
    lease_duration: Joi.number(),
    data: Joi.object(),
    wrap_info: Joi.object().allow(null),
    warnings: Joi.object().allow(null),
    auth: Joi.object().allow(null),
    statusCode: Joi.number()
});

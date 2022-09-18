import * as Joi from 'joi';

export const helpSchema = Joi.object({
    help: Joi.string().required(),
    openapi: Joi.object({
        openapi: Joi.string().required(),
        info: Joi.object({
            title: Joi.string().required(),
            description: Joi.string().required(),
            version: Joi.string().required(),
            license: Joi.object({
                name: Joi.string().required(),
                url: Joi.string().required(),
            }).required(),
        }).required(),
        paths: Joi.object().pattern(Joi.string(), Joi.object()).required(),
        components: Joi.object().pattern(Joi.string(), Joi.object()).required(),
    }).required(),
    see_also: Joi.object().allow(null),
    statusCode: Joi.number().valid(200).required(),
});

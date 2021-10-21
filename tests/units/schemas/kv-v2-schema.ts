import * as Joi from 'joi';
import {vaultResponseSchema, vaultCmdResponseSchema} from './vault-response-schema';

export const vaultKv2CmdResponseSchema = vaultCmdResponseSchema.keys({
    data: Joi.object({
        data: Joi.object().required(),
        metadata: Joi.object({
            created_time: Joi.string().isoDate().required(),
            deletion_time: Joi.string().isoDate().allow('').required(),
            destroyed: Joi.boolean().required(),
            version: Joi.number().required(),
        }).required(),
    }).required(),
});


export const KVv2ConfigSchema = vaultResponseSchema.keys({
    data: Joi.object({
        cas_required: Joi.boolean(),
        delete_version_after: Joi.string(),
        max_versions: Joi.number()
    })
});

export const KVv2ReadSchema = vaultResponseSchema.keys({
    metadata: Joi.object({
        created_time: Joi.string().isoDate().required(),
        deletion_time: Joi.string().isoDate().allow('').required(),
        destroyed: Joi.boolean().required(),
        version: Joi.number().required(),
    })
});

export const KVv2WriteSchema = vaultResponseSchema.keys({
    data: Joi.object({
        created_time: Joi.string().isoDate().required(),
        deletion_time: Joi.string().isoDate().allow('').required(),
        destroyed: Joi.boolean().required(),
        version: Joi.number().required(),
    }),
    statusCode: Joi.number().valid(200).required()
});

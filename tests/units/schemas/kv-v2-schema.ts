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

export const KVv2ListSchema = vaultResponseSchema.keys({
    data: Joi.object({
        keys: Joi.array().required(),
    }),
});

export const KVv2ReadMetadataCmdSchema = vaultCmdResponseSchema.keys({
    data: Joi.object({
        cas_required: Joi.boolean().required(),
        created_time: Joi.string().isoDate().required(),
        current_version: Joi.number().required(),
        delete_version_after: Joi.string().required(),
        max_versions: Joi.number().required(),
        oldest_version: Joi.number().required(),
        updated_time: Joi.string().isoDate().required(),
        versions: Joi.object().pattern(Joi.number(), {
            created_time: Joi.string().isoDate().required(),
            deletion_time: Joi.string().isoDate().allow('').required(),
            destroyed: Joi.boolean().required(),
        }).required(),
    }),
});

export const KVv2ReadMetadataSchema = vaultResponseSchema.keys({
    data: Joi.object({
        cas_required: Joi.boolean().required(),
        created_time: Joi.string().isoDate().required(),
        current_version: Joi.number().required(),
        delete_version_after: Joi.string().required(),
        max_versions: Joi.number().required(),
        oldest_version: Joi.number().required(),
        updated_time: Joi.string().isoDate().required(),
        versions: Joi.object().pattern(Joi.number(), {
            created_time: Joi.string().isoDate().required(),
            deletion_time: Joi.string().isoDate().allow('').required(),
            destroyed: Joi.boolean().required(),
        }).required(),
    }),
});

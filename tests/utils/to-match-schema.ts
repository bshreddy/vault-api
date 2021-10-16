import * as Joi from 'joi';

// TODO: Fix this. I don't like eslint-disable
/* eslint-disable @typescript-eslint/no-namespace, no-unused-vars */
declare global {
    namespace jest {
        interface Matchers<R> {
            toMatchSchema(schema: Joi.Schema, options?: Joi.ValidationOptions): R;
        }
    }
}
/* eslint-enable @typescript-eslint/no-namespace, no-unused-vars */
export function toMatchSchema(this: jest.MatcherContext, data: unknown,
    schema: Joi.Schema, options?: Joi.ValidationOptions): jest.CustomMatcherResult {

    const {error, warning} = schema.validate(data, options);

    if (error) {
        return {
            message: () => {
                const {details} = error;
                const message = details.map((detail) => ({
                    message: detail.message,
                    path: detail.path,
                    validationFailed: detail.type.split('.').pop()
                }));

                return JSON.stringify(message, null, 4);
            },
            pass: false
        };
    } else {
        return {
            message: () => {
                if (warning) {
                    const {details} = warning;
                    const message = details.map((detail) => ({
                        message: detail.message,
                        path: detail.path,
                        validationFailed: detail.type.split('.').pop()
                    }));

                    return JSON.stringify(message, null, 4);
                }

                return 'Success';
            },
            pass: true
        };
    }

}

export default toMatchSchema;

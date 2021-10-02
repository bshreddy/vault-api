import Config from './config';

/**
 * @interface RequestConfig
 * @description Configuration used for Axios requests.
 * @extends Config
 *
 * @property {string} [axiosMethod] - Axios request method.
 */
export interface RequestConfig extends Config {
    axiosMethod?: string,
}

export default RequestConfig;

/* eslint-disable no-unused-vars */
import RequestConfig from './request-config';

export interface Engine {
    preRequest: (config: RequestConfig) => RequestConfig;
    postRequest?: (config: RequestConfig) => RequestConfig;
}

export default Engine;

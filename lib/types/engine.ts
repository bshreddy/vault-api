/* eslint-disable no-unused-vars */
import RequestConfig from './request-config';

export interface Engine {
    preRequest: (config: RequestConfig) => void;
    postRequest?: (config: RequestConfig) => void;
}

export default Engine;

/* eslint-disable no-unused-vars */
import RequestConfig from './request-config';

export interface Engine {
    (config: RequestConfig): RequestConfig;
}

export default Engine;

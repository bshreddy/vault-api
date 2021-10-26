import Config from './config';

export interface RequestConfig extends Config {
    axiosMethod?: string,
    requestPath?: string,
    requestData?: any,
    response?: any
}

export default RequestConfig;

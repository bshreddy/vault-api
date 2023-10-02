import {Dictionary} from '.';

export type WrapInfo = {
    token: string,
    accessor: string,
    ttl: number,
    creation_time: string,
    creation_path: string,
    wrapped_accessor: string,
}

export interface VaultResponse extends Dictionary<any> {
    request_id: string;
    lease_id: string;
    renewable: boolean;
    lease_duration: number;
    data: Dictionary<any> | null;
    metadata?: Dictionary<any>;
    wrap_info?: WrapInfo | null;
    warnings?: any | null;
    auth?: any | null;
    statusCode: number;
}

export default VaultResponse;

import {Dictionary} from '.';

export interface VaultResponse {
    request_id: string;
    lease_id: string;
    renewable: boolean;
    lease_duration: number;
    data: Dictionary<any>;
    wrap_info?: Dictionary<any> | null;
    warnings?: any | null;
    auth?: any | null;
    statusCode: number;
}

export default VaultResponse;

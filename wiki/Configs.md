This page of the documentation describes the different config properties available when calling the `vault` function.

As this module is implemented in TypeScript, the config properties are defined as 3 types that inherited from the each other.

## Table of Contents
- [`DefaultConfig`](#DefaultConfig)
- [`Config`](#Config)
- [`RequestConfig`](#RequestConfig)

## `DefaultConfig`
This is the default config object. This is the parameter that is passed to the `vault.create` function when creating a custom vault instance. `DefaultConfig` extends `Dictionary<any>` type, to allow for extensibility with custom `Engine` implementations.

All values in the `DefaultConfig` object are optional and have a default value. For default values, see the [Default Values](#default-values) section.

##### Properties
|Property|Type|Description|Default Value|
|--------|----|-----------|-------------|
|axios|`AxiosInstance`|`axios` instance that is used to make requests. Any custom `axios` instance can be used.|Default `axios` instance from axios package|
|address|`string \| function`|The address of the Vault server. This can be a string or a function that returns a string. If a function is used, the function is called with the `config` object passed to `vault` function.|`process.env.VAULT_ADDR`|
|apiVersion|`string`|API version of the Vault server.|`'v1'`|
|tokenPath|`string`|Path to the file containing the token. This is only used if the token is not passed in the `config` object.|None|
|token|`string \| function`|Token used for all requests to the Vault server. This can be a string or a function that returns a string. If a function is used, the function is called with the `config` object passed to `vault` function.|Function that returns contents file at `tokenPath` if `tokenPath` is set else returns `process.env.VAULT_TOKEN`|
|engine|`string \| function`|Name of the backend engine for which the request is intended for. This can be a string or a function that returns a string. If a function is used, the function is called with the `config` object passed to `vault` function.|[Internal `getEngineName` function](../wiki/Advanced#getenginename-function)|
|headers|`Dictionary<any>`|HTTP headers that are passed to `axios` function while making a HTTP request.|None|
|isVaultRequest|`boolean`|Requests that are sent to a Vault Agent that is configured to use the `require_request_header` option must set this value to `true`.|`true`|

##### Source Code
```ts
export interface DefaultConfig extends Dictionary<any> {
    axios?: AxiosInstance;
    address?: string | ((config: Config) => Promise<string | undefined>);
    apiVersion?: string;
    tokenPath?: string;
    token?: string | ((config: Config) => Promise<string | undefined>);
    engine?: string | ((config: Config) => Promise<string | undefined>);
    headers?: Dictionary<any>;
    isVaultRequest?: boolean;
}
```

##### Default Values
```ts
{
    axios,
    address: async () => process.env.VAULT_ADDR,
    apiVersion: 'v1',
    async token(config: Config): Promise<string | undefined> {
        return (config.tokenPath)
            ? fs.readFileSync(config.tokenPath, 'utf8')
            : process.env.VAULT_TOKEN;
    },
    engine: getEngineName,
    headers: {},
    isVaultRequest: true,
}
```

## `Config`
This is the config object that is passed to the `vault` function for each request. This config object is merged with the default config object passed in the `vault.create` function. `Config` extends `DefaultConfig` type, allowing overriding of default values set in `vault.create` for specific requests. This also means any custom properties can be added to `Config` by custom `Engine` implementations.

##### Properties
|Property|Type|Description|Default Value|
|--------|----|-----------|-------------|
|method|`string`|Vault method for the request.|&lt;required&gt;|
|path|`string`|Vault path for the request.|&lt;required&gt;|
|data|`any`|Data to be sent in the request body.|None|
|options|`any`|Options for KV2 `write` method. For valid options, see [KV v2 Create/Update Secret](../wiki/Key-Value-Version-2#create-update-secret).|None|
|version|`number`|Version of the secret to be read. Used by [KV v2 Read Secret Version](../wiki/Key-Value-Version-2#read-secret-version).|None|

##### Source Code
```ts
export interface Config extends DefaultConfig {
    method: string,
    path: string,
    data?: any,

    // KV v2 Specific
    options?: any,
    version?: number
}
```

## `RequestConfig`
This is the config object that is used internally by `Engine.preRequest` and `Engine.postRequest` functions. `response` property of the `RequestConfig` object is returned by `vault` function.

##### Properties
|Property|Type|Description|Default Value|
|--------|----|-----------|-------------|
|axiosMethod|`string`|HTTP method used by axios. Set in `Engine.preRequest`|&lt;required&gt;|
|requestPath|`string`|Part of request URL used by axios. `<address>/<apiVersion>/<requestPath>` is used by axios for the request. Set in `Engine.preRequest`|&lt;required&gt;|
|requestData|`any`|Data to be sent in the request body. Only set if `config.data` is set. Set in `Engine.preRequest`|Only required if `config.data` is defined|
|response|`any`|Data that will to be returned by `vault` function. This stores the axios response but is manipulated by `Engine.postRequest` before begin returned by `vault` function.|&lt;required&gt;|

##### Source Code
```ts
export interface RequestConfig extends Config {
    axiosMethod?: string,
    requestPath?: string,
    requestData?: any,
    response?: any
}
```

## Response Schema
`vault` function returns a `Promise<VaultResponse>`. `data` property in `VaultResponse` depends on the secret engine.

##### Properties
|Property|Type|Description|
|--------|----|-----------|
|request_id|`string`|UUID of the request|
|lease_id|`string`|UUID of the lease. (Only set for dynamic secrets)|
|renewable|`boolean`|Whether the lease is renewable|
|lease_duration|`number`|Duration of the lease|
|data|`any`|Secret data. Exact value depends on the secret engine|
|metadata|`any`|Metadata of the secret. (As of now, only used for KV v2)|
|wrap_info|`any`|Information about Vault Response Wrapping.|
|warnings|`any`|Warnings from the request.|
|auth|`any`|Authentication information.|
|statusCode|`number`|HTTP status code of the response.|

##### Source Code
```ts
export interface VaultResponse extends Dictionary<any> {
    request_id: string;
    lease_id: string;
    renewable: boolean;
    lease_duration: number;
    data: Dictionary<any>;
    metadata?: Dictionary<any>;
    wrap_info?: Dictionary<any> | null;
    warnings?: any | null;
    auth?: any | null;
    statusCode: number;
}
```

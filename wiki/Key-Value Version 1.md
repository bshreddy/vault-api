This page of the documentation describes the API for KV v1 secrets engine.

For general information about the usage and operation of the KV v1 secrets engine, please see the [Vault KV v1 documentation](https://www.vaultproject.io/docs/secrets/kv/kv-v1). For information about HTTP API for the KV v1 secrets engine, please see the [Vault KV v1 API documentation](https://www.vaultproject.io/api-docs/secret/kv/kv-v1).

This documentation assumes the KV secrets engine is enabled at the `/secret` path in Vault. Since it is possible to enable secrets engines at any location, please update your `vault` calls accordingly.

## Table of Contents
- [Read Secret](#read-secret)
- [List Secrets](#list-secrets)
- [Create/Update Secret](#create-update-secret)
- [Delete Secret](#delete-secret)

## Read Secret
This function reads a secret from the KV v1 secrets engine at the given path.

### Parameters
- `method` `(string: <required>)` – Must be `read`.
- `path` `(string: <required>)` – Specifies the path of the secret to read.

### Example
```ts
const secret = await vault({
    method: 'read',
    path: 'secret/api-keys/webApp'
});
```

#### Output
```ts
{
    request_id: 'fc1777d8-58d9-cd23-883e-5f95d083dc75',
    lease_id: '',
    renewable: false,
    lease_duration: 2764800,
    data: {
        name: 'vault-api',
        secret: '899d353b-c562-4fc9-9906-d307800db742',
        token: '3ee5a702-a4d1-4846-ba7e-13437e8d873d'
    },
    wrap_info: null,
    warnings: null,
    auth: null,
    statusCode: 200
}
```

## List Secrets
This function returns a list of key names at the specified location. Folders are suffixed with `/`. The specified `path` must be a folder.

### Parameters
- `method` `(string: <required>)` – Must be `list`.
- `path` `(string: <required>)` – Specifies the path of the secret to list. (Must be a folder.)

### Example
```ts
const res = await vault({
    method: 'list',
    path: 'secret/api-keys'
});
```

#### Output
```ts
{
    request_id: '79f4ac64-fd2b-8db6-b216-4931241e9efa',
    lease_id: '',
    renewable: false,
    lease_duration: 0,
    data: {
      keys: ['user/', 'test', 'webApp' ]
    },
    wrap_info: null,
    warnings: null,
    auth: null,
    statusCode: 200
}
```

## Create/Update Secret
This function creates or updates a secret at the specified location. If the token calling does not have permission to create or update the secret, an error is thrown.

### Parameters
- `method` `(string: <required>)` – Must be `write`.
- `path` `(string: <required>)` – Specifies the path of the secret to create or update.
- `data` `(map: <required>)` – Specifies the key-value secret data to be created or updated.

### Example
```ts
const res = await vault({
    method: 'write',
    path: 'secret/api-keys/webApp',
    data: {
        "name": "vault-api",
        "secret": "899d353b-c562-4fc9-9906-d307800db742",
        "token": "3ee5a702-a4d1-4846-ba7e-13437e8d873d"
    }
});
```

#### Output
```ts
{ statusCode: 204 }
```

## Delete Secret
This function deletes a secret at the specified path.

### Parameters
- `method` `(string: <required>)` – Must be `delete`.
- `path` `(string: <required>)` – Specifies the path of the secret to delete.

### Example
```ts
const secret = await vault({
    method: 'delete',
    path: 'secret/api-keys/webApp'
});
```

#### Output
```ts
{ statusCode: 204 }
```

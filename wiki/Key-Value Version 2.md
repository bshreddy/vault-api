This page of the documentation describes the API for Key-Value version 2.

For general information about the usage and operation of the KV v2 secrets engine, please see the [Vault KV v2 documentation](https://www.vaultproject.io/docs/secrets/kv/kv-v2). For information about HTTP API for the KV v2 secrets engine, please see the [Vault KV v2 API documentation](https://www.vaultproject.io/api-docs/secret/kv/kv-v2).

This documentation assumes the KV secrets engine is enabled at the `/secret` path in Vault. Since it is possible to enable secrets engines at any location, please update your `vault` calls accordingly.

## Table of Contents
- [Configure the KV Engine](#configure-the-kv-engine)
- [Read KV Engine configuration](#read-kv-engine-configuration)
- [Read Secret Version](#read-secret-version)
- [Create/Update Secret](#create-update-secret)
- [Delete Latest Version of Secret](#delete-latest-version-of-secret)
- [Delete Secret Versions](#delete-secret-versions)
- [Undelete Secret Versions](#undelete-secret-versions)
- [Destroy Secret Versions](#destroy-secret-versions)
- [List Secrets](#list-secrets)
- [Read Secret Metadata](#read-secret-metadata)
- [Create/Update Metadata](#create-update-metadata)
- [Delete Metadata and All Versions](#delete-metadata-and-all-versions)

## Configure the KV Engine
This function configures backend level settings that are applied to every key in the key-value store.

### Paramaters
- `method` `(string: <required>)` – Must be `setConfig`.
- `path` `(string: <required>)` – Must be the path at with KV v2 is enabled. (In the example, it is `/secret`.)
- `data` `(map: <required>)` – The configuration data. The following fields are allowed:
  - `max_versions` `(int: 0)` – The number of versions to keep per key. This value applies to all keys, but a key's metadata setting can overwrite this value. Once a key has more than the configured allowed versions the oldest version will be permanently deleted. When 0 is used or the value is unset, Vault will keep 10 versions.
  - `cas_required` `(bool: false)` – If true all keys will require the `cas` parameter to be set on all write requests.
  - `delete_version_after` `(string: "0s")` – If set, specifies the length of time before a version is deleted. Accepts [Go duration format string](https://golang.org/pkg/time/#ParseDuration)

### Example
```ts
const res = await vault({
    method: 'setConfig',
    path: 'secret',
    data: {
        max_versions: 5,
        cas_required: true,
        delete_version_after: '3h25m19s'
    }
});
```

#### Output
```ts
{ statusCode: 204 }
```

## Read KV Engine configuration
This function returns the current backend configuration for the secrets backend enabled at a given path.

### Parameters
- `method` `(string: <required>)` – Must be `config`.
- `path` `(string: <required>)` – Must be the path at with KV v2 is enabled. (In the example, it is `secret`.)

### Example
```ts
const config = await vault({
    method: 'config',
    path: 'secret'
});
```

#### Output
```ts
{
    request_id: 'd1a22eed-b3ea-dc34-26a0-b7f7d44ca2bd',
    lease_id: '',
    renewable: false,
    lease_duration: 0,
    data: {
        max_versions: 5,
        cas_required: true,
        delete_version_after: '3h25m19s'
    },
    wrap_info: null,
    warnings: null,
    auth: null,
    statusCode: 200
}
```

## Read Secret Version
This function reads the secret version at the given path. The metadata returned are version specific. It should not be confused with the response from the [`readMetadata` function](#read-secret-metadata).

### Parameters
- `method` `(string: <required>)` – Must be `read`.
- `path` `(string: <required>)` – Specifies the path of the secret to read.
- `version` `(int: 0)` - Specifies the version to return. If not set the latest version is returned.

### Example 1
```ts
const secret = await vault({
    method: 'read',
    path: 'secret/api-keys/webApp',
});
```

#### Output
```ts
{
    request_id: 'ea839522-3b2a-cce5-56b6-2094e3d68190',
    lease_id: '',
    renewable: false,
    lease_duration: 0,
    data: {
        name: 'vault-api',
        secret: '899d353b-c562-4fc9-9906-d307800db742',
        token: '3ee5a702-a4d1-4846-ba7e-13437e8d873d'
    },
    wrap_info: null,
    warnings: null,
    auth: null,
    metadata: {
        created_time: '2021-10-30T13:25:45.187416563Z',
        deletion_time: '',
        destroyed: false,
        version: 2
    },
    statusCode: 200
}
```

### Example 2
```ts
const secret = await vault({
    method: 'read',
    path: 'secret/api-keys/webApp',
    version: 2
});
```

#### Output
```ts
{
    request_id: '1296405b-0175-d818-adf9-e7e36417835b',
    lease_id: '',
    renewable: false,
    lease_duration: 0,
    data: {
        name: 'vault-api',
        secret: '899d353b-c562-4fc9-9906-d307800db742',
        token: '3ee5a702-a4d1-4846-ba7e-13437e8d873d'
    },
    wrap_info: null,
    warnings: null,
    auth: null,
    metadata: {
        created_time: '2021-10-30T13:25:45.187416563Z',
        deletion_time: '',
        destroyed: false,
        version: 2
    },
    statusCode: 200
}
```

## Create/Update Secret
This function creates a new version of the secret at the given path. If the token calling does not have permission to create or update the secret, an error is thrown.

### Parameters
- `method` `(string: <required>)` – Must be `write`.
- `path` `(string: <required>)` – Specifies the path of the secret to create or update.
- `options` `(Map: <optional>)` – Options for the write operation.
  - `cas` `(int: <optional>)` - This flag is required if `cas_required` is set to `true` on either the secret or the engine's config. In order for a write to be successful, `cas` must be set to the current version of the secret. If `cas` is set to 0, the write will only be allowed if the key doesn't exist.
- `data` `(Map: <required>)` – Specifies the key-value secret data to be created or updated.

### Example
```ts
const res = await vault({
    method: 'write',
    path: 'secret/api-keys/webApp',
    data: {
        "name": "vault-api",
        "secret": "899d353b-c562-4fc9-9906-d307800db742",
        "token": "3ee5a702-a4d1-4846-ba7e-13437e8d873d"
    },
    options: {
        cas: 1,
    }
});
```

#### Output
```ts
{
    request_id: 'e0813cef-13e5-306b-aba1-cad9775f5902',
    lease_id: '',
    renewable: false,
    lease_duration: 0,
    data: {
        created_time: '2021-10-30T13:25:45.187416563Z',
        deletion_time: '',
        destroyed: false,
        version: 2
    },
    wrap_info: null,
    warnings: null,
    auth: null,
    statusCode: 200
}
```

## Delete Latest Version of Secret
This function issues a soft delete of the secret's latest version at the specified path. This marks the version as deleted and will stop it from being returned by the [`read` function](#read-secret-version), but the underlying data will not be removed. A delete can be undone using the [`undelete` function](#undelete-secret-versions).

### Parameters
- `method` `(string: <required>)` – Must be `delete`.
- `path` `(string: <required>)` – Specifies the path of the secret to delete.

### Example
```ts
const res = await vault({
    method: 'delete',
    path: 'secret/api-keys/webApp',
});
```

#### Output
```ts
{ statusCode: 204 }
```

## Delete Secret Versions
This function issues a soft delete of the specified versions of the secret. Its similar to the [`delete` function](#delete-latest-version-of-secret) except it can soft-delete multiple versions.

### Parameters
- `method` `(string: <required>)` – Must be `deleteVersions`.
- `path` `(string: <required>)` – Specifies the path of the secret to delete.
- `data` `(map: <required>)` – Has only 1 field, `versions`, which is an array of version numbers to delete.
  - `versions` `([int]: <required>)` - The versions to be soft-deleted.

### Example
```ts
const res = await vault({
    method: 'deleteVersions',
    path: 'secret/api-keys/webApp',
    data: {
        versions: [1, 2]
    }
});
```

#### Output
```ts
{ statusCode: 204 }
```

## Undelete Secret Versions
This function "undeletes" the data for the provided version and path in the key-value store. This restores the data, allowing it to be returned by the [`read` function](#read-secret-version).

### Parameters
- `method` `(string: <required>)` – Must be `undeleteVersions`.
- `path` `(string: <required>)` – Specifies the path of the secret to undelete.
- `data` `(map: <required>)` – Has only 1 field, `versions`, which is an array of version numbers to undelete.
  - `versions` `([int]: <required>)` - The versions to be undeleted.

### Example
```ts
const res = await vault({
    method: 'undeleteVersions',
    path: 'secret/api-keys/webApp',
    data: {
        versions: [1, 2]
    }
});
```

#### Output
```ts
{ statusCode: 204 }
```

## Destroy Secret Versions
This function permanently deletes (hard delete) the specified version data for the provided path and versions from the key-value store. This cannot be undone unlike the [`delete` function](#delete-latest-version-of-secret) or [`deleteVersions` function](#delete-secret-versions), which can be undone.

### Parameters
- `method` `(string: <required>)` – Must be `destroy`.
- `path` `(string: <required>)` – Specifies the path of the secret to hard delete.
- `data` `(map: <required>)` – Has only 1 field, `versions`, which is an array of version numbers to hard-delete.
  - `versions` `([int]: <required>)` - The versions to be hard-deleted.

### Example
```ts
const res = await vault({
    method: 'destroy',
    path: 'secret/api-keys/webApp',
    data: {
        versions: [1, 2]
    }
});
```

#### Output
```ts
{ statusCode: 204 }
```

## List Secrets
This function returns a list of key names at the specified location. Folders are suffixed with `/`. The `path` must be a folder.

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

## Read Secret Metadata
This function returns the metadata and versions for the secret at the specified path. Metadata is version-agnostic.

### Parameters
- `method` `(string: <required>)` – Must be `readMetadata`.
- `path` `(string: <required>)` – Specifies the path of the secret for which metadata is to be retrieved.

### Example
```ts
const metadata = await vault({
    method: 'readMetadata',
    path: 'secret/api-keys/webApp',
});
```

#### Output
```ts
{
    request_id: '1a4f9f2e-0643-5b35-bb5b-43e6028acabc',
    lease_id: '',
    renewable: false,
    lease_duration: 0,
    data: {
        cas_required: false,
        created_time: '2021-10-30T16:53:33.754291357Z',
        current_version: 3,
        delete_version_after: '0s',
        max_versions: 0,
        oldest_version: 0,
        updated_time: '2021-10-30T16:55:05.01307553Z',
        versions: {
            '1': {
                created_time: '2021-10-30T16:53:33.754291357Z',
                deletion_time: '',
                destroyed: false
            },
            '2': {
                created_time: '2021-10-30T16:53:33.797185437Z',
                deletion_time: '',
                destroyed: false
            },
            '3': {
                created_time: '2021-10-30T16:55:05.01307553Z',
                deletion_time: '',
                destroyed: false
            }
        }
    },
    wrap_info: null,
    warnings: null,
    auth: null,
    statusCode: 200
}
```

## Create/Update Metadata
This function creates or updates the metadata of a secret at the specified path. It does not create a new version. This function is similar to the [`setConfig` function](#configure-the-kv-engine) but the metadata is updated/created for a specific path rather than all the secrets.

### Parameters
- `method` `(string: <required>)` – Must be `writeMetadata`.
- `path` `(string: <required>)` – Specifies the path of the secret for which metadata is to be created/updated.
- `data` `(map: <required>)` – The metadata. The following fields are allowed:
  - `max_versions` `(int: 0)` – The number of versions to keep per key. This value applies to all keys, but a key's metadata setting can overwrite this value. Once a key has more than the configured allowed versions the oldest version will be permanently deleted. When 0 is used or the value is unset, Vault will keep 10 versions.
  - `cas_required` `(bool: false)` – If true all keys will require the cas parameter to be set on all write requests.
  - `delete_version_after` `(string: "0s")` – If set, specifies the length of time before a version is deleted. Accepts [Go duration format string](https://golang.org/pkg/time/#ParseDuration)

### Example
```ts
const res = await vault({
    method: 'writeMetadata',
    path: 'secret/api-keys/webApp',
    data: {
        max_versions: 7,
        cas_required: false,
        delete_version_after: '3h25m19s'
    },
});
```

#### Output
```ts
{ statusCode: 204 }
```

## Delete Metadata and All Versions
This function deletes the metadata and all versions of the secret at the specified path. All version history will be removed.

### Parameters
- `method` `(string: <required>)` – Must be `deleteMetadata`.
- `path` `(string: <required>)` – Specifies the path for which metadata and all versions are to be deleted.

### Example
```ts
const res = await vault({
    method: 'deleteMetadata',
    path: 'secret/api-keys/webApp',
});
```

#### Output
```ts
{ statusCode: 204 }
```

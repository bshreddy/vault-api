The `vault-api` gives access to [Vault](https://www.vaultproject.io/) via HTTP.

## `X-Vault-Request` Header
Requests that are sent to a **Vault Agent** that is configured to use the `require_request_header` option must include the `X-Vault-Request` header entry. In, `vault-api`, `isVaultRequest` config is used to determine if `X-Vault-Request` header is added. This is added by default, unless `isVaultRequest` is set to `false`.

Example code with `isVaultRequest` set to `false`:
```ts
const res = await vault({
    method: 'read',
    path: 'kv/secret',
    isVaultRequest: false,
});
```

This can also be changed when creating a new `vault` instance:
```ts
const instance = vault.create({
  isVaultRequest: false
});
```

## `help` Method
To retrieve the help for any API/Path within Vault, including mounted backends, auth methods, etc. use `help` method, with any path. If you have valid permission to access the path, then the help text will be return a markdown-formatted block in the `help` attribute of the response.

Example Code:
```ts
const res = await vault({
    method: 'help',
    path: 'kv/secret',
});
```

## Natively Supported Engines:
  - [Key/Value Version 1](../wiki/Key-Value-Version-1)
  - [Key/Value Version 2](../wiki/Key-Value-Version-2)

## Secrets Engines

Each secrets engine has its own set of API paths and methods, with are supported by different engines. These methods are documented in this section. Secrets engines can be enabled at any path, but the documentation will assume the default paths for simplicity. If you are enabled at a different path, you should adjust your API calls accordingly.

For the API documentation for a specific secrets engine, please choose a secrets engine from the sidebar.

If the secrets engine isn't supported natively, the support can be added by creating a custom engine. For API reference about how to add your own engine, please check the sidebar under [Advanced](../wiki/Advanced) Section.

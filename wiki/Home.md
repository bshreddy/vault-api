`vault-api` is an axios-like API client for the [Hashicorp Vault](https://www.vaultproject.io/) secrets management system. It is designed to be easy to use and easy to extend. The goal is to provide a solid foundation for building applications that interact with the Vault.

Currently, the following features are supported:
  * Secrets Engine:
    * Key/Value Version 1 & 2

```ts
import vault from 'vault-api';

...

const res = await vault({
    method: 'read',
    path: 'kv/secret',
});
```

## Installation

`vault-api` require Node.js >= v8.17.0.

```bash
npm install vault-api
```

## Basic Usage

Requests can be made by passing the relevant config to `vault` function.

##### Importing
```ts
import vault from 'vault-api';

// (or)
// import {vault} from 'vault-api';
// const {vault} = require('vault-api');
```

##### vault(config)
```ts
// Write data to vault
vault({
    method: 'write',
    path: 'secret/apiKey',
    data: {
        webApp: '5cfdf55e-cfa9-5da8-b2b2-64f30a462a09value'
    }
});
```

```ts
// Read data from vault
vault({
    method: 'read', // method paramaeter is case-sensitive.
    path: 'secret/apiKey'
});
```

### Request method aliases
For convenience aliases have been provided for common methods.

##### `vault.read(url [, config])`
##### `vault.list(url [, config])`
##### `vault.delete(url [, config])`
##### `vault.help(url [, config])`
##### `vault.write(path [, data [, config]])`

###### NOTE
When using the alias methods `path`, `method`, and `data` properties don't need to be specified in config.

### Creating an instance

You can create a new instance of vault api with a custom default config.

##### vault.create([defaultConfig])

```js
const instance = vault.create({
  axios: customAxiosInstance,
  address: 'https://vault.example.com',
  tokenPath: `${process.env.HOME}/.vault-token`,
});
```

Any custom vault instance has the same methods as the default instance, but with different default config.

Default vault instance from import has the following config:
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

`getEngineName` is an internal function that returns the name of the engine from the path using `/sys/internal/ui/mounts` API endpoint.

## Detailed Usage
Please visit the sidebar on the right to check the detailed usage for different engines supported by `vault-api`.

You can also find all the Config Properties, Response Types in the sidebar.

This module is written with extensibility in mind. You can add your own engines to work with `vault-api`. For API reference about how to add your own engine, please check the sidebar under [Advanced](../wiki/Advanced) Section. <!--visit [#TODO](#TODO).-->

## Resources

* [Changelog](https://github.com/SaiHemanthBR/vault-api/blob/master/CHANGELOG.md)
* [Contributing Guide](https://github.com/SaiHemanthBR/vault-api/blob/master/CONTRIBUTING.md)
* [Code of Conduct](https://github.com/SaiHemanthBR/vault-api/blob/master/CODE_OF_CONDUCT.md)

## Credits
`vault-api` is heavily inspired by [`axios`](https://github.com/axios/axios). I was inspired by the simplicity of the `axios` and wanted to make a similar library for [Hashicorp Vault](https://www.vaultproject.io/). The ultimate goal of this library is to provide a simple, easy to use, extensible API for interacting with Hashicorp Vault. I hope you enjoy using it!

## License

[MIT](https://github.com/SaiHemanthBR/vault-api/blob/master/LICENSE.md)

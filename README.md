# Vault-API

Axios-like NodeJS API for Hashicorp Vault.

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
    method: 'read',
    path: 'secret/apiKey'
});
```

## Docs
  Documentation and guides are available at [Repo's Github Wiki](https://github.com/SaiHemanthBR/vault-api)

## Supported Secrets Engines
  * Key/Value Version 1
  * Key/Value Version 2

## Contributing
  See [CONTRIBUTING.md](./CONTRIBUTING.md) for Contributing guidelines.

## Code of Conduct
  See [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) for Code of Conduct guidelines.

## License
  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE.md)

  Checkout the project license at [LICENSE.md](./LICENSE.md).

## Credits
`vault-api` is heavily inspired by [`axios`](https://github.com/axios/axios). I was inspired by the simplicity of the `axios` and wanted to make a similar library for [Hashicorp Vault](https://www.vaultproject.io/). The ultimate goal of this library is to provide a simple, easy to use, extensible API for interacting with Hashicorp Vault. I hope you enjoy using it!

## Resources

* [Changelog](https://github.com/SaiHemanthBR/vault-api/blob/master/CHANGELOG.md)
* [Contributing Guide](https://github.com/SaiHemanthBR/vault-api/blob/master/CONTRIBUTING.md)
* [Code of Conduct](https://github.com/SaiHemanthBR/vault-api/blob/master/CODE_OF_CONDUCT.md)

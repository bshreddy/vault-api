# Welcome to `vault-api` Contributing Guide.
Hi There! 😊 Thank you for investing your time in contributing to the `vault-api` project! We are very excited to have you join us. Any contributions you make to the `vault-api` project, small or large, will help us to make it better.

Read our [Code of Conduct](./CODE_OF_CONDUCT.md) to keep our community approachable and respectable. By contributing to the `vault-api` project, you agree to abide by our [Code of Conduct](./CODE_OF_CONDUCT.md).

In this guide you will get an overview of the contribution workflow from opening an issue, creating a PR, reviewing, and merging the PR.

## Getting started
To familiarize yourself with the codebase, see the [Advanced Section in Docs](https://github.com/SaiHemanthBR/vault-api/wiki/Advanced).

### Code Style
Please ensure that your code passes the linters and adheres to the coding standards. See [eslint config](./.eslintrc.json) for more details. If your code does not adhere to the coding standards, your PR will be rejected.

### Issues
#### Create a new issue
If you spot any bug or problem with `vault-api`, search if any similar issue has already exists. If not, create a new issue. Please follow the Issue Template, otherwise your issue will be rejected. <!-- #TODO: Add Issue template url -->

#### Solve an issue
Scan through our [existing issues](https://github.com/SaiHemanthBR/vault-api/issues) to find one that interests you. You can narrow down the search using labels as filters. As a general rule, we don’t assign issues to anyone. If you find an issue to work on, you are welcome to open a PR with a fix.

### Make Changes
Please send a GitHub Pull Request with a clear list of what you've done. When you send a pull request, we will love you forever if you
follow the coding style and use good commit messages, as described in [Commit Messages Section](#commit-messages). And Make sure all of your commits are atomic (one feature per commit).

#### Make changes locally
1. Fork this repository. Clone it locally and create a new branch (please use an appropriate name).
2. Install all the dependencies.
3. Make the changes in the code.
4. Once you make the changes, make sure the code is passing the linter and all the tests.
5. Once you are satisfied with the changes, push the changes to your remote repository.
6. Create a PR to `master` branch. (please follow the PR template) <!-- #TODO: Add PR template url -->

Any PR that doesn't pass the linter or the tests will be rejected or doesn't follow the PR template will be rejected.

#### Commit Messages.
- Make surer your commits messages are clear and concise.
- Commit messages should start with a verb. Like,
  - `Added ...`
  - `Updated ...`
  - `Removed ...`
  - `Fixed ...`
- Include the issue number if you are fixing an issue. Like `Fixed #123: ...` or `#123: Fixed ...`

#### Testing
Please update the tests to reflect your code changes. Pull requests will not be accepted if the tests are failing.

#### Documentation
Please update the [docs](https://github.com/SaiHemanthBR/vault-api) accordingly so that there are no discrepancies between the API and the documentation.

---
Thanks! ❤️ ❤️ ❤️
Vault-API Team

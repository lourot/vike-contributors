<!-- WARNING: keep links absolute in this file so they work on NPM too -->

[<img src="https://vike.dev/vike-readme.svg" align="right" height="90">](https://vike.dev)
[![npm version](https://img.shields.io/npm/v/vike-contributors)](https://www.npmjs.com/package/vike-contributors)

Sorted list of all contributors to all [Vike](https://vike.dev)-related repositories.

## Usage

```bash
npm install vike-contributors
```

```ts
import { contributors } from 'vike-contributors'
console.log(contributors)
```

```js
[
    {
      login: "brillout",
      avatarUrl: "https://avatars.githubusercontent.com/u/1005638?v=4",
      contributions: 8448
    },
    // ...
]
```

## Updating the list of contributors and publishing

```bash
git clone https://github.com/AurelienLourot/vike-contributors
cd vike-contributors/
npm install
npm run fetch
git commit -am "update contributors"
npm run release
```

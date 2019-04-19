<h1 align="center">
  <br>
  <br>
  async-encrypted-disk-cache
  <br>
</h1>

<h4 align="center">An encrypted async disk caching module</h4>

<p align="center">
  <a href="https://travis-ci.com/LukeGarrigan/async-encrypted-disk-cache.svg?branch=master">
      <img src="https://travis-ci.com/LukeGarrigan/async-encrypted-disk-cache.svg?branch=master">
  </a>
  
  <a href='https://coveralls.io/github/LukeGarrigan/async-encrypted-disk-cache?branch=master'>
      <img src='https://coveralls.io/repos/github/LukeGarrigan/async-encrypted-disk-cache/badge.svg?branch=master' alt='Coverage Status'>
  </a>
</p>

## Install

```bash
$ npm install encrypt-async-cache
```

## Usage

```js
const FileSystemCache = require("encrypt-async-cache").FileSystemCache;
```

## Example

```js const FileSystemCache = require("encrypt-async-cache").FileSystemCache;


const myCache = new FileSystemCache("my-cache", "my-secret-key");

myCache.set("firstCache", "This is the data").then(success => {
  success === true;
  // item is put into cache
});


myCache.get("firstCache").then(cachedItem => {
  cachedItem === "This is the data";
  // item is retrieved from the cache
});


myCache.remove("firstCache").then(hasRemoved => {
  hasRemoved === true;
  // item is removed from the cache directory
});

myCache.clear().then(hasCleared => {
  hasCleared === true;
  // your cache directory has been cleared
});
```

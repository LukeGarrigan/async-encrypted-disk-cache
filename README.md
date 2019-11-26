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

<a href="https://twitter.com/codeheir">
    <img src="https://codeheir.files.wordpress.com/2019/04/untitled-1.png?w=400&h=400&crop=1" alt="codeheir logo" title="Codeheir" align="right" height="100" />
</a>



A module to add/retrieve encrypted data to/from your local temp folder. More information on the inspiration of this module can be found <a href="https://codeheir.com/2019/04/19/creating-a-node-module-with-typescript/">here</a>. There are plans to remove the unnecessary dependencies in the near future.

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

# todo
Issue with set-value, github has raised as an issue

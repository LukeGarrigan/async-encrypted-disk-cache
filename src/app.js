"use strict";
exports.__esModule = true;
var FileSystemCache_1 = require("./FileSystemCache");
var cache = new FileSystemCache_1.FileSystemCache("my-cache-folder", "secretKey");
cache.set("key", "value").then(function (hasSet) {
    console.log(hasSet);
});
//# sourceMappingURL=app.js.map
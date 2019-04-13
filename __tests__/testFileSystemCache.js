"use strict";
exports.__esModule = true;
var FileSystemCache_1 = require("../src/FileSystemCache");
describe('adding a new cache', function () {
    var myCache = new FileSystemCache_1.FileSystemCache("test-cache-folder", "mySecretKey");
    test('successful', function (done) {
        return myCache.set("test", "This is the value").then(function (hasSet) {
            expect(hasSet).toBe(true);
            done();
        });
    });
    test('successfully set and retrieve', function (done) {
        return myCache.set("test", "This is the value").then(function (hasSet) {
            return myCache.get("test");
        }).then(function (value) {
            expect(value).toBe("This is the value");
            done();
        });
    });
});
describe('removing from the cache', function () {
    var myCache = new FileSystemCache_1.FileSystemCache("test-cache-folder", "mySecretKey");
    test('set cache then remove it', function (done) {
        return myCache.set("test", "This is the value").then(function (hasSet) {
            return myCache.remove("test");
        }).then(function (hasBeenRemoved) {
            expect(hasBeenRemoved).toBe(true);
            done();
        });
    });
});
//# sourceMappingURL=testFileSystemCache.js.map
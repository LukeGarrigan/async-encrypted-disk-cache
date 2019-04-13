"use strict";
exports.__esModule = true;
var FileSystemCache_1 = require("../src/FileSystemCache");
var myCache = new FileSystemCache_1.FileSystemCache("test-cache-folder", "mySecretKey");
describe('adding a new cache', function () {
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
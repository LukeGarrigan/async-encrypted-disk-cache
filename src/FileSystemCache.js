"use strict";
exports.__esModule = true;
var fs = require("fs");
var os = require("os");
var Cryptr = require("cryptr");
var path = require("path");
var FileSystemCache = (function () {
    function FileSystemCache(folderName, secretKey) {
        this.cryptr = new Cryptr(secretKey);
        this.folderName = folderName;
        this.directoryPath = path.normalize(os.tmpdir() + "/" + this.folderName);
        if (!fs.existsSync(this.directoryPath)) {
            fs.mkdirSync(this.directoryPath);
        }
    }
    FileSystemCache.prototype.set = function (id, value) {
        var _this = this;
        var encryptedValue = this.encrypt(value);
        return new Promise(function (resolve, reject) {
            return fs.writeFile(path.normalize(_this.directoryPath + "/") + id, encryptedValue, function (err) {
                if (err) {
                    reject(false);
                }
                else {
                    resolve(true);
                }
            });
        });
    };
    FileSystemCache.prototype.get = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            return fs.readFile(path.normalize(_this.directoryPath + "/") + id, function (err, data) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(_this.decrypt(data.toString()));
                }
            });
        });
    };
    FileSystemCache.prototype.remove = function (id) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var fileToRemove = _this.directoryPath + "/" + id;
            fileToRemove = path.normalize(fileToRemove);
            fs.unlink(fileToRemove, function (err) {
                err ? reject(false) : resolve(true);
            });
        });
    };
    FileSystemCache.prototype.clear = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            fs.readdir(_this.directoryPath, function (err, files) {
                if (err) {
                    reject(false);
                }
                var removeFilePromises = [];
                for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
                    var file = files_1[_i];
                    removeFilePromises.push(_this.remove(file));
                }
                Promise.all(removeFilePromises).then(function () {
                    resolve(true);
                })["catch"](function () {
                    reject(false);
                });
            });
        });
    };
    FileSystemCache.prototype.encrypt = function (value) {
        return this.cryptr.encrypt(JSON.stringify(value));
    };
    FileSystemCache.prototype.decrypt = function (value) {
        return JSON.parse(this.cryptr.decrypt(value));
    };
    return FileSystemCache;
}());
exports.FileSystemCache = FileSystemCache;
//# sourceMappingURL=FileSystemCache.js.map
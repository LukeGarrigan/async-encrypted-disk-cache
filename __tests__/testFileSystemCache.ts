import {FileSystemCache} from "../src/FileSystemCache";
import {MyCache} from "../src/MyCache";
import * as fs from "fs";
let  os = require("os");
const myCache: MyCache = new FileSystemCache("test-cache-folder", "mySecretKey");
describe("adding a new cache", () => {

    test("successful", (done) => {
        return myCache.set("test", "This is the value").then(hasSet => {
            expect(hasSet).toBe(true);
            done();
        });
    });

    test("fail to cache", (done) => {
        return myCache.set("fdsa./zxc/3242/.~~", "This is the value").catch(hasSet => {
            expect(hasSet).toBe(false);
            done();
        });
    });

    test("successfully set and retrieve", (done) => {
        return myCache.set("test", "This is the value").then(hasSet => {
            return myCache.get("test");
        }).then(value => {
            expect(value).toBe("This is the value");
            done();
        });
    });

    test("adding an object to cache", (done) => {

        let myObject = {
            age: 15,
            name: "Scott"
        };

        return myCache.set("my-object-id", JSON.stringify(myObject)).then(successful => {
            return myCache.get("my-object-id");
        }).then(retrievedObject => {
            expect(JSON.parse(retrievedObject)).toEqual(myObject);
            done();
        })


    });

});


describe("removing from the cache", () => {
    test("set cache then remove it", (done) => {
        return myCache.set("test", "This is the value").then(hasSet => {
            return myCache.remove("test");
        }).then(hasBeenRemoved => {
            expect(hasBeenRemoved).toBe(true);
            done();
        });
    });


    test("fail to remove", (done) => {
        return myCache.remove("test").catch(hasRemoved  => {
            expect(hasRemoved).toBe(false);
            done();
        });
    });
});

describe("clearing the entire cache directory", () => {
    test("set cache then remove directory", (done) => {
        return myCache.set("test", "This is the value").then(hasSet => {
            return myCache.clear();
        }).then(hasBeenRemoved => {
            expect(hasBeenRemoved).toBe(true);
            done();
        });
    });

    test("setting multiple cache items then clearing" ,(done) => {
        return myCache.set("test", "This is the value").then(hasSet => {
            return myCache.set("second", "this is the second value");
        }).then(hasSet => {
            return myCache.clear();
        }).then(hasCleared => {
            expect(hasCleared).toBe(true);
            done();
        });
    });




});


describe("removing the cache folder", () => {


    test("remove the cache to create a new one", () => {

        const existingCache: MyCache = new FileSystemCache("test-cache-folder", "mySecretKey");

        fs.rmdirSync(os.tmpdir() + "/"+ "test-cache-folder");

        const newCache: MyCache = new FileSystemCache("test-cache-folder", "mySecretKey");


    });



});


describe("getting a cache", () => {

    test("fail to get a cache", (done) => {

        myCache.get("I don't exist").catch(err  => {
            done();
        });
    });

});

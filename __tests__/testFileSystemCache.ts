import {FileSystemCache} from "../src/FileSystemCache";
import {MyCache} from "../src/MyCache";

const myCache: MyCache = new FileSystemCache("test-cache-folder", "mySecretKey");
describe('adding a new cache', () => {

    test('successful', (done) => {
        return myCache.set("test", "This is the value").then(hasSet => {
            expect(hasSet).toBe(true);
            done();
        });
    });

    test('fail to cache', (done) => {
        return myCache.set("fdsa./zxc/3242/.~~", "This is the value").catch(hasSet => {
            expect(hasSet).toBe(false);
            done();
        });
    });

    test('successfully set and retrieve', (done) => {
        return myCache.set("test", "This is the value").then(hasSet => {
            return myCache.get("test");
        }).then(value => {
            expect(value).toBe("This is the value");
            done();
        });
    });
});


describe('removing from the cache', () => {
    test('set cache then remove it', (done) => {
        return myCache.set("test", "This is the value").then(hasSet => {
            return myCache.remove("test");
        }).then(hasBeenRemoved => {
            expect(hasBeenRemoved).toBe(true);
            done();
        });
    });


    test('fail to remove', (done) => {
        return myCache.remove("test").catch(hasRemoved  => {
            expect(hasRemoved).toBe(false);
            done();
        });
    });
});

describe('clearing the entire cache directory', () => {
    test('set cache then remove directory', (done) => {
        return myCache.set("test", "This is the value").then(hasSet => {
            return myCache.clear();
        }).then(hasBeenRemoved => {
            expect(hasBeenRemoved).toBe(true);
            done();
        });
    });

    test('setting multiple cache items then clearing' ,(done) => {
        return myCache.set("test", "This is the value").then(hasSet => {
            return myCache.set("second", "this is the second value");
        }).then(hasSet => {
            return myCache.clear();
        }).then(hasCleared => {
            expect(hasCleared).toBe(true);
            done();
        })
    })
});
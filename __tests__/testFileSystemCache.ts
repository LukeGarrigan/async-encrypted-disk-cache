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
});
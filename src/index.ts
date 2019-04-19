import {EncryptedCache} from "./EncryptedCache";
import * as fs from "fs";
import * as os from "os";
import * as Cryptr from "cryptr";
import * as path from "path";


export class FileSystemCache implements EncryptedCache {



    readonly cryptr: Cryptr;
    readonly folderName: string;
    readonly directoryPath: string;

    constructor(folderName: string, secretKey: string) {
        this.cryptr = new Cryptr(secretKey);
        this.folderName = folderName;
        this.directoryPath = path.normalize(os.tmpdir() + "/" + this.folderName);

        if (!fs.existsSync(this.directoryPath)) {
            fs.mkdirSync(this.directoryPath);
        }
    }

    /**
     * Encrypt an item and put it in the cache
     * @param {string} id
     * @param {string} value
     * @returns {Promise<boolean>}
     */
    set(id: string, value: string): Promise<boolean> {
        const encryptedValue = this.encrypt(value);
        return new Promise<boolean>((resolve, reject) => {
            return fs.writeFile(path.normalize(this.directoryPath + "/") + id, encryptedValue, (err) => {
                err ? reject(false) : resolve(true);
            });

        });
    }

    /**
     * Retrieve an item from the cache and decrypt it
     * @param {string} id
     * @returns {Promise<string>}
     */
    get(id: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            return fs.readFile(path.normalize(this.directoryPath + "/") + id, (err, data) => {
                err ? reject(false) : resolve(this.decrypt(data.toString()));
            });
        });
    }

    /**
     * Delete an item in the cache using the specified id
     * @param {string} id
     * @returns {Promise<boolean>}
     */
    remove(id: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            let fileToRemove = `${this.directoryPath}/${id}`;
            fileToRemove = path.normalize(fileToRemove);
            fs.unlink(fileToRemove, err => {
                err ? reject(false) : resolve(true);
            });
        });
    }

    /**
     * Clears all the files within the cache directory
     * @returns {Promise<boolean>}
     */
    clear(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {

            fs.readdir(this.directoryPath, (err, files) => {
                if (err) {
                    reject(false);
                }
                const removeFilePromises = this.getRemoveFilePromises(files);
                Promise.all(removeFilePromises).then(() => {
                    resolve(true);
                }).catch(() => {
                    reject(false);
                });
            });

        });
    }


    private getRemoveFilePromises(files) {
        const removeFilePromises: Array<Promise<boolean>> = [];

        for (const file of files) {
            removeFilePromises.push(this.remove(file));
        }
        return removeFilePromises;
    }

    private encrypt(value): string {
        return this.cryptr.encrypt(JSON.stringify(value));
    }

    private decrypt(value): string {
        return JSON.parse(this.cryptr.decrypt(value));
    }
}




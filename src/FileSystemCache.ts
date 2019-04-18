import {MyCache} from "./MyCache";
import * as fs from "fs";
import * as os from "os";
import * as Cryptr from "cryptr";
import * as path from "path";


export class FileSystemCache implements MyCache {



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

    set(id: string, value: string): Promise<boolean> {
        const encryptedValue = this.encrypt(value);
        return new Promise<boolean>((resolve, reject) => {
            return fs.writeFile(path.normalize(this.directoryPath + "/") + id, encryptedValue, (err) => {
                if (err) {
                    reject(false);
                } else {
                    resolve(true);
                }
            });

        });
    }

    get(id: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            return fs.readFile(path.normalize(this.directoryPath + "/") + id, (err, data) => {

                if (err) {
                    reject(err);
                } else {
                    resolve(this.decrypt(data.toString()));
                }
            });
        });
    }

    remove(id: string): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            let fileToRemove = `${this.directoryPath}/${id}`;
            fileToRemove = path.normalize(fileToRemove);
            fs.unlink(fileToRemove, err => {
                err ? reject(false) : resolve(true);
            });
        });
    }

    clear(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {

            fs.readdir(this.directoryPath, (err, files) => {
                if (err  ) {
                    reject(false);
                }




                const removeFilePromises : Array<Promise<boolean>> = [];

                for (const file of files) {
                    removeFilePromises.push(this.remove(file));
                }

                Promise.all(removeFilePromises).then(() => {
                    resolve(true);
                }).catch(() => {
                    reject(false);
                });
            });

        });
    }


    private encrypt(value): string {
        return this.cryptr.encrypt(JSON.stringify(value));
    }

    private decrypt(value): string {
        return JSON.parse(this.cryptr.decrypt(value));
    }
}




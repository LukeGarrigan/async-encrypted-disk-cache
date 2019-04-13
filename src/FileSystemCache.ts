import {MyCache} from "./MyCache";
import * as fs from "fs";
import * as os from "os";
import * as jsonFile from "jsonfile";
import * as Cryptr from "cryptr";


export class FileSystemCache implements MyCache {


    readonly cryptr: Cryptr;
    readonly folderName: string;
    readonly fileName: string;
    readonly directoryPath: string;

    constructor(folderName: string, secretKey: string) {
        this.cryptr = new Cryptr(secretKey);
        this.folderName = folderName;
        this.directoryPath = os.tmpdir() + "\\" + this.folderName;

        if (!fs.existsSync(this.directoryPath)) {
            fs.mkdirSync(this.directoryPath);
        }
    }

    set(id: string, value: string): Promise<boolean> {
        const encryptedValue = this.encrypt(value);
        return new Promise<boolean>((resolve, reject) => {
            return fs.writeFile(this.directoryPath + "\\" + id, encryptedValue, (err) => {
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
            return fs.readFile(this.directoryPath + "\\" + id, (err, data) => {

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
            const fileToRemove = `${this.directoryPath}\\${id}`;
            fs.unlink(fileToRemove, err => {
                err ? reject(false) : resolve(true);
            });
        });
    }


    private encrypt(value) : string {
        return this.cryptr.encrypt(JSON.stringify(value));
    }

    private decrypt(value) : string {
        return JSON.parse(this.cryptr.decrypt(value));
    }
}




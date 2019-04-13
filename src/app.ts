import {FileSystemCache} from "./FileSystemCache";


const cache = new FileSystemCache("my-cache-folder", "secretKey");



cache.set("key", "value").then(hasSet => {
   console.log(hasSet);
});


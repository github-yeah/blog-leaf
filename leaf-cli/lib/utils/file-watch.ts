import { PathLike, Stats, watchFile } from "fs";



export const watcherOf = (directory: PathLike, options: { persistent?: boolean; interval?: number; } = { interval: 20 }) => new Promise<{ event: string, file: Stats }>(
    (resolve, reject) => {

        try {
            watchFile(directory, options,
                (curr, prev) => {
                    console.log(curr.isFile());
                    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxx");
                    console.log(prev.isFile());



                }
            );

        } catch (error) {
            reject(error);
        }
    }
);
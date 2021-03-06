import * as vinylfs from "vinyl-fs";


// src
export const src = vinylfs.src;

// dest
export const dest = vinylfs.dest;

// VinylFileLike
export interface VinylFileLike {
    contents: Buffer | NodeJS.ReadableStream;
    cwd: string;
    base: string;
    path: string;
    dirname: string;
    basename: string;
    stem: string;
    extname: string;
    sourceMap?: any;
}






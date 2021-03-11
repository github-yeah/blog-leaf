import { Duplex } from 'node:stream';
import { Readable, Writable } from 'stream';
import * as vinylfs from "vinyl-fs";
import * as vinyl from "vinyl";

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


/** @description 创建 Readable*/
export const createReadable = () => {
    const stm = new Readable({ objectMode: true });
    stm._read = (size: number) => { };
    return stm;
};


/** @description 创建 VinylFile*/
export const createVinylFile = (path: string, contents: string, base: string) => new vinyl(
    {
        path,
        contents: Buffer.from(contents),
        cwd: base,
        base
    }
);

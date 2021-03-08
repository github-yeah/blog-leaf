import { Writable } from 'stream';
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


/**
 * @description VinylFileReader
 * @author xfy
 * @interface VinylFileReader
 */
export interface VinylFileReader extends NodeJS.WritableStream {
    readonly files: readonly VinylFileLike[];
}

type _VinylFileReader = Writable & {
    files: VinylFileLike[];
};

export namespace VinylFileReader {
    /** @description create*/
    export const of = (): VinylFileReader => {
        const reader: _VinylFileReader = new Writable({ objectMode: true }) as any as _VinylFileReader;
        reader.files = [];
        reader._write = _write;
        return reader;
    };

    function _write(this: _VinylFileReader, file: VinylFileLike, encoding: string, callback: (err?: any) => void): void {
        // 处理 buffer
        if (Buffer.isBuffer(file.contents)) {
            this.files.push(file);
            callback();
            return;
        }

        if (file === null) {
            callback();
            return;
        }

        callback(new Error('暂时不支持这种类型的数据'));
    }
}
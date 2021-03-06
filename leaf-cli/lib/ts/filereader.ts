import { Writable } from 'stream';
import { VinylFileLike } from './vfs';

/**
 * @description 文件读取
 * @author xfy
 * @interface FileReader
 * @extends {Writable}
 */
interface FileReader extends Writable {
    readonly files: VinylFileLike[];
}

// 文件读取 实现类
class FileReaderImpl extends Writable {
    constructor(
        readonly files: VinylFileLike[] = []
    ) {
        super({ objectMode: true })
    }

    // 子类实现 _write
    _write(chunk: VinylFileLike, encoding: string, callback: (err?: any) => void): void {
        // buffer
        if (Buffer.isBuffer(chunk.contents)) {
            console.log("读取数据:", chunk.path);
            this.files.push(chunk);
            callback();
            return;
        }

        if (chunk === null) {
            callback();
            return;
        }

        callback(new Error('暂时不支持这种类型的数据'));
    }

    end(chunk: any, encoding?: any, callback?: any) {
        super.end(chunk, encoding, callback);
        console.log('数据读取完成-------------------------------');

    }
}

// FileReader Constructor
const FileReader = FileReaderImpl;


export default FileReader;







// create FileReader 测试用的
const of = (files?: VinylFileLike[]): FileReader => {
    const reader = new Writable({ objectMode: true }) as any as { files: VinylFileLike[] } & Writable;
    reader.files = files || [];
    reader._write = FileReader.prototype._write;
    return reader;
};

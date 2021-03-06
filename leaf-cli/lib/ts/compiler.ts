import { CompilerHost } from './host';
import File from './file';
import * as ts from "typescript";
import * as path from 'path';
import { Project } from "./project";
import { dest, src, VinylFileLike } from './vfs';
import FileReader from './filereader';
import { Duplex, Readable, Writable } from 'stream';

import * as VinylFile from 'vinyl';



export class StreamCompiler extends Duplex {

    // 从流中读取的源文件
    readonly sourceFiles: VinylFileLike[] = [];

    get rootNames(): string[] {
        return this.sourceFiles.map(file => file.path);
    }

    constructor(
        readonly project: Project,
        readonly full: Readable
    ) {
        super({ objectMode: true })
    }

    // 创建 program
    protected _createProgram() {
        const rootNames = this.sourceFiles.map(file => file.path);
        const cwd = this.project.directory;
        const base = this.project.directory;

        this.project.compileFiles(rootNames,
            (path, data) => {
                this.full.push(new VinylFile(
                    {
                        path,
                        contents: Buffer.from(data),
                        cwd,
                        base
                    }
                ));
            }
        );
    }

    // 写入源文件
    _write(file: VinylFileLike, encoding: string, callback: (err?: any) => void): void {
        // 处理 buffer
        if (Buffer.isBuffer(file.contents)) {
            this.sourceFiles.push(file);
            callback();
            return;
        }

        if (file === null) {
            callback();
            return;
        }

        callback(new Error('暂时不支持这种类型的数据'));
    }
    _read = (size: number) => { };

    // 源文件写入完成
    end(file: any, encoding?: any, callback?: any) {
        super.end(file, encoding, callback);
        // this._createProgram();

        this.project.compile(this, this);


    }

    wirteFile: ts.WriteFileCallback = (path, data) => {
        this.push(new VinylFile(
            {
                path,
                contents: Buffer.from(data),
                cwd: this.project.directory,
                base: this.project.directory
            }
        ));
    };
}






export async function testCompiler(files?: string[], compilerOptions?: ts.CompilerOptions) {

    // console.log(files, compilerOptions, '111111111111'); return;


    // Project.of('actions').src().pipe(new FileReader());
    // return;

    const full = new Readable({ objectMode: true });
    full._read = size => { };

    const project = Project.create();
    src('D:/test/lib/**/*.ts')
        .pipe(new StreamCompiler(project, full))
        .pipe(dest('dist12345'));
}




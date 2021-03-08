import * as ts from "typescript";
import { Project } from "./project";
import { dest, src, VinylFileLike, VinylFileReader } from './vfs';
import { Duplex, Readable, Writable } from 'stream';

import * as VinylFile from 'vinyl';


/**
 * @description 编译文件
 * @author xfy
 * @param {ts.CompilerOptions} compilerOptions 如果有 `project` 选项，表示要编译`project`对应的项目
 * @param {string[]} [rootNames] 将要编译的文件列表，如果为空，则编译project.config.fileNames
 * @param {ts.WriteFileCallback} [writFile] 如果为空则默认按照编译选项直接编译
 */
function compileFiles(compilerOptions: ts.CompilerOptions, rootNames?: string[], writFile?: ts.WriteFileCallback): void {
    // 如果有 `project` 选项，表示要编译`project`对应的项目
    if (compilerOptions.project || !rootNames || rootNames.length === 0) {
        const project = Project.create(compilerOptions.project || '', compilerOptions);
        compilerOptions = project.config.options;
        rootNames ||= project.config.fileNames;
    }

    // 设置compilerOptions缺省值
    compilerOptions.target ||= ts.ScriptTarget.ES5;
    compilerOptions.newLine ||= ts.NewLineKind.CarriageReturnLineFeed;
    compilerOptions.skipDefaultLibCheck ||= true;
    compilerOptions.noErrorTruncation ||= true;

    // 设置 rootNames 缺省值
    const program = ts.createProgram(rootNames, compilerOptions);
    program.emit(undefined, writFile);
}


export class StreamCompiler extends Duplex {

    // 从流中读取的源文件
    readonly sourceFiles: VinylFileLike[] = [];

    constructor(
        readonly compilerOptions: ts.CompilerOptions,
        readonly projectDirectory: string,
    ) {
        super({ objectMode: true })
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

    // read
    _read = (size: number) => { };

    // 源文件写入完成
    end(file: any, encoding?: any, callback?: any) {
        super.end(file, encoding, callback);
        const rootNames = this.sourceFiles.map(file => file.path);
        compileFiles(this.compilerOptions, rootNames, this._wirteFile);
    }

    // 写入编译后的文件
    private _wirteFile: ts.WriteFileCallback = (path, data) => {
        this.push(new VinylFile(
            {
                path,
                contents: Buffer.from(data),
                cwd: this.projectDirectory,
                base: this.projectDirectory
            }
        ));
    };
}



function test() {
    const proj = Project.create({ outDir: 'dist-123' })

    proj.src()
        .pipe(new StreamCompiler({}, proj.directory))
        .pipe(dest('dist-123'))
}

// test();

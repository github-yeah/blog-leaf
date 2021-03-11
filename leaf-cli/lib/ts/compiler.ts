import * as ts from "typescript";
import { Project } from "./project";
import { createReadable, VinylFileLike, createVinylFile } from './stream';
import { Readable, Writable } from 'stream';
import { getCommonPathOf, getExtname } from "./utils";

/**
 * @description 编译文件
 * @author xfy
 * @template T
 * @param {ts.CompilerOptions} compilerOptions 编译选项
 * @param {string[]} [rootNames]    待编译文件列表
 * @param {ts.WriteFileCallback} [writeFile]  接收编译后的文件内容，不设置则默认执行ts.createCompilerHost().writeFile，把编译后的文件写入硬盘
 * @returns {void}
 */
function compileFiles<T>(compilerOptions: ts.CompilerOptions, rootNames?: string[], writeFile?: ts.WriteFileCallback): void {
    if (compilerOptions.project) {
        // 有project，表示编译整个项目
        const project = Project.read(compilerOptions.project, compilerOptions);
        compilerOptions = project.config.options;
        rootNames ||= project.config.fileNames;
    }

    // 设置CompilerOptions缺省值
    compilerOptions.target ||= ts.ScriptTarget.ES5;
    compilerOptions.newLine ||= ts.NewLineKind.CarriageReturnLineFeed;
    compilerOptions.skipDefaultLibCheck ||= true;
    compilerOptions.noErrorTruncation ||= true;

    if (rootNames && rootNames.length > 0) {
        ts.createProgram(rootNames, compilerOptions).emit(undefined, writeFile);
    }
}


type StreamCompilationResult = Record<'Js' | 'Dts' | 'All', Readable>;

export interface StreamCompiler extends NodeJS.WritableStream {
    // 从流中读取的源文件
    readonly sourceFiles: VinylFileLike[];
    // 编译结果
    readonly compilationResult: Readonly<StreamCompilationResult>;

    // 编译文件
    compileFiles(rootNames: string[]): StreamCompilationResult;
}

export namespace StreamCompiler {
    export const create = (compilerOptions: ts.CompilerOptions): StreamCompiler => {
        return new StreamCompilerImpl(compilerOptions);
    }
}


/**
 * @description 流编译器 （读取文件流，并且把编译后的文件流写入本身）
 * @author xfy
 * @export
 * @class StreamCompiler
 * @extends {Duplex}
 */
class StreamCompilerImpl extends Writable {

    // 从流中读取的源文件
    readonly sourceFiles: VinylFileLike[] = [];

    // 编译结果
    private _compilationResult: StreamCompilationResult;

    // 编译结果
    get compilationResult(): Readonly<StreamCompilationResult> {
        return this._compilationResult;
    }

    constructor(readonly options: ts.CompilerOptions) {
        super({ objectMode: true })

        this._compilationResult = {
            Js: createReadable(),
            Dts: createReadable(),
            All: createReadable()
        };
    }

    /**
     * @description 编译文件生成流
     * @param {string[]} rootNames 文件列表
     * @returns {this}
     */
    compileFiles(rootNames: string[]): StreamCompilationResult {
        const directory = getCommonPathOf(rootNames);
        const { Js, Dts, All } = this._compilationResult;
        compileFiles(this.options, rootNames,
            (fileName, data, writeByteOrderMark) => {
                const extname = getExtname(fileName, ts.Extension.Dts);
                const file = createVinylFile(fileName, data, directory);
                switch (extname) {
                    case ts.Extension.Dts:
                        Dts.push(file);
                        All.push(file);
                        break;
                    case ts.Extension.Js:
                        Js.push(file);
                        All.push(file);
                        break;
                }
            }
        );
        return this._compilationResult;
    }

    // 读取源文件并记录
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

    // 源文件写入完成并开始编译文件
    end(file: any, encoding?: any, callback?: any) {
        super.end(file, encoding, callback);
        this.compileFiles(this.sourceFiles.map(file => file.path));
    }
}




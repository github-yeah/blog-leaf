import { Readable } from 'stream';
import * as ts from 'typescript';
import * as VinylFile from 'vinyl';
import { createReadable, createVinylFile } from './stream';
import { getExtname } from './utils';



export interface CompilationHost<T> extends ts.CompilerHost {
    readonly compilationResult: T;
};

export interface CompilationResult<T> {
    readonly All: T;
    readonly Js: T;
    readonly Dts: T;
}

export namespace CompilationHost {
    export function createDefaultCompilerHost(compilerOptions: ts.CompilerOptions): CompilationHost<void> {
        return ts.createCompilerHost(compilerOptions) as CompilationHost<void>;
    }

    export function createStreamCompilerHost(compilerOptions: ts.CompilerOptions, all?: Readable, js?: Readable, dts?: Readable) {
        const directory = process.cwd();
        const host = ts.createCompilerHost(compilerOptions) as CompilationHost<CompilationResult<NodeJS.ReadableStream>>;
        const All = all || createReadable();
        const Js = js || createReadable();
        const Dts = dts || createReadable();
        (host as { compilationResult: CompilationResult<NodeJS.ReadableStream> }).compilationResult = { All, Js, Dts };
        host.writeFile = (fileName: string, data: string, writeByteOrderMark) => {
            const file = createVinylFile(fileName, data, directory);
            const extname = getExtname(fileName, ts.Extension.Dts);
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
        };
        return host;
    }

}





/**
 * import * as ts from "typescript";
 *
 * 关于 `writeFile`: ts.WriteFileCallback：
 * 执行 `ts.Program.emit`时，文件编译完成后会调用 `writeFile` 处理编译后的内容
 * 如果调用 `ts.Program.emit` 的时候传入`writeFile` 参数，则文件编译完成后执行`writeFile`（`ts.CompilerHost.writeFile` 将被忽略）
 * 否则文件编译完成后会执行 `ts.CompilerHost.writeFile`
 *
 * 关于 `ts.CompilerHost`
 * 可以通过调用`ts.createProgram`创建 `ts.Program`的时候以`host`参数的形式传入
 * 如果传入的`host`为空，则`ts.createProgram`会通过 `ts.createCompilerHost` 创建一个默认的host
 * 另外：可以修改`ts.CompilerHost.writeFile`更改写入行为
 * 通过`ts.createCompilerHost`创建的host，writeFile被调用的时候会把编译后的文件根据编译选项配置写入硬盘
*/
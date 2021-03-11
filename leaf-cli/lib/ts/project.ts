import * as ts from "typescript";
import * as path from 'path';
import * as vfs from "./stream";
import { getCommonPathOf } from "./utils";


/**
 * @description Project
 * @author xfy
 * @interface Project
 */
export interface Project {
    /**
     * @description 项目配置
     */
    readonly config: ts.ParsedCommandLine;

    /**
     * @description 项目根目录
     */
    readonly directory: string;

    /**
    * @description map this => T
    * @template T
    * @param {(value: this) => T} handler
    * @returns {T}
    */
    map<T>(handler: (value: Project) => T): T;


    /**
     * @description 生成文件流
     * @returns {NodeJS.ReadWriteStream}
     */
    src(): NodeJS.ReadWriteStream;

    /**
     * @description 编译文件
     * @param {string[]} [rootNames] 为空则默认编译 `Project.config.fileNames`
     * @param {ts.WriteFileCallback} [writeFile]  写入编译后的文件，不填则默认执行 `ts.createCompilerHost(options).writeFile`
     * @returns {readonly ts.Diagnostic[]} 编译诊断信息
     */
    compileFiles(rootNames?: string[], writeFile?: ts.WriteFileCallback): readonly ts.Diagnostic[]
};

export namespace Project {

    /**@description 是否是Project类型*/
    export const isProject = (o: any): o is Project => {
        const p: Project = o;
        if (typeof p.directory !== 'string') {
            return false;
        }

        if (p.config === undefined) {
            return false;
        }

        if (!Array.isArray(p.config.fileNames)) {
            return false;
        }

        if (p.config.options === undefined) {
            return false;
        }
        return true;
    };


    /**
     * @description 以`project`为根目录或`configFilePath`来生成 Project
     * @param {string} project  根目录或`configFilePath`，默认为(process.cwd())
     * @returns {Project}
     */
    export function read(project?: string): Project;

    /**
     * @description 根据编译选项配置生成 Project
     * @param {ts.CompilerOptions} options 编译选项配置
     * @returns {Project}
     */
    export function read(options: ts.CompilerOptions): Project;


    /**
     * @description 以`project`为根目录生成 Project，并且使用 existingOptions 覆盖冲突的编译选项
     * @param {string} project 根目录或`configFilePath`
     * @param {ts.CompilerOptions} existingOptions 编译选项
     * @returns {Project}
     */
    export function read(project: string, existingOptions: ts.CompilerOptions): Project;
    export function read(projectOrOptions?: string | ts.CompilerOptions, existingOptions?: ts.CompilerOptions): Project {
        // 解析 参数
        let project: string | undefined;
        if (typeof projectOrOptions === 'string') {
            project = projectOrOptions;
        }
        else {
            // 读取编译选项的project属性（类似: tsc --project）
            project = existingOptions?.project;
            existingOptions = projectOrOptions;
        }

        // tsconfig 配置路径
        let configFilePath: string = project || '';
        configFilePath = path.isAbsolute(configFilePath) ? configFilePath : path.resolve(process.cwd(), configFilePath);
        const extname = path.extname(configFilePath);
        configFilePath = extname ? configFilePath : path.join(configFilePath, 'tsconfig.json');

        // 项目根目录
        let directory: string = path.dirname(configFilePath);


        // 读取`tsconfig.json`内容
        const tsconfigResult = ts.readConfigFile(configFilePath, ts.sys.readFile);
        if (tsconfigResult.error) {
            console.log(tsconfigResult.error.messageText);
        }

        // 解析`tsconfig.json`内容
        const config = ts.parseJsonConfigFileContent(
            tsconfigResult.config || {},
            ts.sys,
            directory,
            existingOptions
        );

        if (config.errors) {
            config.errors.forEach(err => console.log(err));
        }

        // 设置CompilerOptions缺省值
        const options = config.options;
        options.target ||= ts.ScriptTarget.ES5;
        options.newLine ||= ts.NewLineKind.CarriageReturnLineFeed;
        options.skipDefaultLibCheck ||= true;
        options.noErrorTruncation ||= true;

        return { directory, config, map, src, compileFiles };
    }
}

// Project Map
function map<T>(this: Project, handler: (value: Project) => T): T {
    return handler(this);
}

// 生成项目源文件流
function src(this: Project): NodeJS.ReadWriteStream {
    let base: string | undefined;
    if (this.config.options.rootDir) {
        base = path.resolve(this.directory, this.config.options.rootDir);
    }

    if (base === undefined) {
        const pathArray = this.config.fileNames
            .map(fileName => path.dirname(fileName));
        base = getCommonPathOf(pathArray);
    }

    return vfs.src(this.config.fileNames, { allowEmpty: true, base });
}

/**
 * @description 编译文件
 * @author xfy
 * @param {Project} this
 * @param {string[]} [rootNames] 为空则默认编译 `Project.config.fileNames`
 * @param {ts.WriteFileCallback} [writeFile]  写入编译后的文件，不填则默认执行 `ts.createCompilerHost(options).writeFile`
 * @returns {readonly ts.Diagnostic[]} 编译诊断信息
 */
function compileFiles(this: Project, rootNames?: string[], writeFile?: ts.WriteFileCallback): readonly ts.Diagnostic[] {
    rootNames ||= this.config.fileNames;
    if (rootNames.length === 0) {
        return [];
    }
    const program = ts.createProgram(rootNames, this.config.options);
    const diagnostics = ts.getPreEmitDiagnostics(program);
    program.emit(undefined, writeFile);
    return diagnostics;
}






import * as ts from "typescript";
import * as path from 'path';
import * as vfs from "./vfs";

// spilt with
const PATH_SPILT_REG = /\\|\//;

/** @description 获取相同的path*/
const getCommonPath = (path1: string, path2: string) => {
    const group1 = path1.split(PATH_SPILT_REG);
    const group2 = path2.split(PATH_SPILT_REG);
    let len = 0;
    for (let idx = 0; idx < group1.length && idx < group2.length; idx++) {
        if (group1[idx] !== group2[idx]) {
            break;
        }
        len += group1[idx].length + 1;
    }
    return path1.substr(0, len);
};

/** @description 获取相同的path*/
const getCommonPathOf = (pathArray: string[]) => pathArray.reduce(
    (prev, curr) => {
        return getCommonPath(prev, curr);
    }
);


/**
 * @description Mappable
 * @author xfy
 */
export interface Mappable {
    /**
     * @description map this => T
     * @template T
     * @param {(value: this) => T} handler
     * @returns {T}
     */
    map<T>(handler: (value: this) => T): T;
}

/**
 * @description Project
 * @author xfy
 * @interface Project
 */
export interface Project extends Mappable {
    /**
     * @description 项目配置
     */
    readonly config: ts.ParsedCommandLine;

    /**
     * @description 项目根目录
     */
    readonly directory: string;

    /**
    * @description 项目流
    */
    src(): NodeJS.ReadWriteStream;


    /**
     * @description 编译文件
     * @param {string[]} [rootNames]
     */
    compileFiles(rootNames?: string[]): void;
}

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
     * @description 以当前目录(process.cwd())为根目录生成 Project
     * @returns {Project}
     */
    export function create(): Project;

    /**
     * @description 以`project`为根目录或`configFilePath`来生成 Project
     * @param {string} project  根目录或`configFilePath`
     * @returns {Project}
     */
    export function create(project: string): Project;

    /**
     * @description 根据编译选项配置生成 Project
     * @param {ts.CompilerOptions} options 编译选项配置
     * @returns {Project}
     */
    export function create(options: ts.CompilerOptions): Project;


    /**
     * @description 以`project`为根目录生成 Project，并且使用 existingOptions 覆盖冲突的编译选项
     * @param {string} project 根目录或`configFilePath`
     * @param {ts.CompilerOptions} existingOptions 编译选项
     * @returns {Project}
     */
    export function create(project: string, existingOptions: ts.CompilerOptions): Project;
    export function create(projectOrOptions?: string | ts.CompilerOptions, existingOptions?: ts.CompilerOptions): Project {
        // 解析 参数
        let project: string | undefined;
        if (typeof projectOrOptions === 'string') {
            project = projectOrOptions;
            existingOptions = { project };
        }
        else {
            existingOptions = projectOrOptions;
            // 读取编译选项的project属性（类似: tsc --project）
            project = existingOptions?.project;
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

// 编译项目
function compileFiles(this: Project, rootNames?: string[]): void {
    // compiler options
    const options = this.config.options;

    // 设置options缺省值
    options.target ||= ts.ScriptTarget.ES5;
    options.newLine ||= ts.NewLineKind.CarriageReturnLineFeed;
    options.skipDefaultLibCheck ||= true;
    options.noErrorTruncation ||= true;

    rootNames ||= this.config.fileNames;

    // 编译并输出到目录
    const program = ts.createProgram(rootNames, options);
    program.emit();
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


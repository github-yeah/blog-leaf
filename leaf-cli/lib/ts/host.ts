import * as ts from 'typescript';
import * as path from "path";

/**
 * @description SourceFile 文件类型
 * @protected
 * @type {Map<string, T>}
 */
type SourceFile = { path: string, contents: string };

/**
 * @description CompilerHost
 * @author xfy
 * @export
 * @class CompilerHost
 * @implements {ts.CompilerHost}
 */
export class CompilerHost implements ts.CompilerHost {
    // host proxy
    readonly hostProxy: ts.CompilerHost;

    // new line
    private _newLine: string | undefined;

    /**
     * @description 文件列表映射
     * @protected
     * @type {Map<string, SourceFile>}
     */
    protected _sourceFileMap: Map<string, SourceFile> = new Map();

    /**
     * @description 文件列表
     * @type {readonly}
     */
    get sourceFiles(): SourceFile[] {
        return [...this._sourceFileMap.values()]
    }


    /**
     * @description 重置文件列表
     */
    reset(): void {
        this._sourceFileMap.clear();
    }

    constructor(
        readonly currentDirectory: string,
        readonly options: ts.CompilerOptions
    ) {
        this.hostProxy = ts.createCompilerHost(options);
    }

    fileExists(fileName: string): boolean {
        return this.hostProxy.fileExists(fileName);
    }

    readFile(fileName: string): string | undefined {
        return this.hostProxy.readFile(fileName);
    }

    writeFile(fileName: string, content: string, writeByteOrderMark: boolean, onError?: (message: string) => void) {
        if (writeByteOrderMark) {
            // 此处处理 content
        }
        this._sourceFileMap.set(fileName, { path: fileName, contents: content });
    }

    getSourceFile(fileName: string, languageVersion: ts.ScriptTarget, onError?: (message: string) => void, shouldCreateNewSourceFile?: boolean): ts.SourceFile | undefined {
        const contents = this.readFile(fileName);
        if (!contents) {
            return undefined;
        }
        return ts.createSourceFile(fileName, contents, this.options.target || ts.ScriptTarget.ES3);
    }

    getDefaultLibFileName(options: ts.CompilerOptions): string {
        return this.hostProxy.getDefaultLibFileName(options);
    }

    getCurrentDirectory(): string {
        return this.currentDirectory;
    }

    getCanonicalFileName(fileName: string): string {
        const normalized = path.normalize(fileName);
        return this.useCaseSensitiveFileNames() ? normalized.toLowerCase() : normalized;
    }

    useCaseSensitiveFileNames(): boolean {
        return this.hostProxy.useCaseSensitiveFileNames();
    }

    getNewLine(): string {
        if (this._newLine) {
            return this._newLine;
        }

        switch (this.options.newLine) {
            case ts.NewLineKind.CarriageReturnLineFeed:
                this._newLine = '\r\n';
                break;
            case ts.NewLineKind.LineFeed:
                this._newLine = '\n';
                break;
            default:
                this._newLine = '\n';
        };

        return this._newLine;
    }


    readDirectory(rootDir: string, extensions: readonly string[], excludes: readonly string[] | undefined, includes: readonly string[], depth?: number): string[] {
        return this.hostProxy.readDirectory ? this.hostProxy.readDirectory(rootDir, extensions, excludes, includes, depth) : [];
    }


    getParsedCommandLine?(fileName: string): ts.ParsedCommandLine | undefined {
        return this.hostProxy.getParsedCommandLine ? this.hostProxy.getParsedCommandLine(fileName) : undefined;
    }

    realpath(path: string): string {
        return this.hostProxy.realpath ? this.hostProxy.realpath(path) : '';
    }

    getDirectories(path: string): string[] {
        return this.hostProxy.getDirectories ? this.hostProxy.getDirectories(path) : [];
    }

    directoryExists(directoryName: string): boolean {
        return this.hostProxy.directoryExists ? this.hostProxy.directoryExists(directoryName) : false;
    }

}




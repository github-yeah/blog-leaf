import { spawn } from "child_process";
import * as fs from "fs";
import { join } from "path";

// 判断是否是window平台
const _isWindows = /^win/.test(process.platform);

/**
 * 根据平台解析cmd
 */
const _possiblyQuote = (cmd: string) => cmd.indexOf(" ") >= 0 ? `"${cmd}"` : cmd;

/**
 * Executes the provided command once with the supplied arguments.
 * @param {string} cmd
 * @param {string[]} args
 */
export const exec = (cmd: string, args: string[]) => new Promise<{ exitCode: number }>(
    (resolve, reject) => {
        const subshellFlag = _isWindows ? "/c" : "-c";
        const command = _isWindows ? [_possiblyQuote(cmd), ...args] : [`${cmd} ${args.join(" ")}`];
        console.log(command);

        const proc = spawn(_isWindows ? "cmd" : "/bin/sh", [subshellFlag, ...command], { stdio: "inherit", windowsVerbatimArguments: true });

        proc.on(
            "exit"
            , exitCode => {
                if (exitCode === 0) {
                    resolve({ exitCode });
                }
                else {
                    reject(new Error(`Process exited with code: ${exitCode}`));
                }
            }
        );

        proc.on(
            "error",
            error => {
                reject(error);
            }
        );
    }
);

// 删除文件夹或文件
export const del = (path: fs.PathLike | fs.PathLike[]) => {
    if (Array.isArray(path)) {
        path.forEach(p => del(p));
        return;
    }

    const stats = fs.statSync(path);
    if (stats.isFile()) {
        return fs.unlinkSync(path);
    }

    const files = fs.readdirSync(path);
    files.forEach(file => del(join(path.toString(), file)));

    return fs.rmdirSync(path);
};

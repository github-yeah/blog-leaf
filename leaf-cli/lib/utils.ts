import { spawn } from "child_process";

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
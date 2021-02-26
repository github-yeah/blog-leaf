import { spawn, SpawnOptions } from 'child_process';
import { blue, red } from 'chalk';

// Runner
export type Runner = <T extends true | false>(cmd: string, collect?: T, cwd?: string) => Promise<T extends true ? string : { exitCode: number }>;

// 创建命令行runner
// @return  (cmd, collect, cwd) => Promise;    cmd: 命令, collect: 是否收集数据, cwd: 执行路径
export const runnerOf = (executor: string): Runner => async <T extends true | false>(cmd: string, collect?: T, cwd: string = process.cwd()) => new Promise<T extends true ? string : { exitCode: number }>(
    (resolve, reject) => {

        const options: SpawnOptions = {
            shell: true,
            cwd,
            stdio: collect ? 'pipe' : 'inherit'
        };

        const child = spawn(`${executor}`, [cmd], options);

        child.stdout?.on('data',
            data => resolve(data.toString())
        );

        child.on('exit',
            exitCode => {
                if (exitCode === 0) {
                    resolve({ exitCode } as any);
                }
                else {
                    console.error(`${red('执行命令进程退出：')} ${blue(`${executor} ${cmd}`)} [exitCode: ${exitCode}]`);
                    reject({ exitCode })
                }
            }
        );

        child.on('error', err => reject(err));
    }
);
import { spawn, SpawnOptions } from 'child_process';
import { blue, red } from 'chalk';


// 创建命令行runner
export const runnerOf = (executor: string) => async (cmd: string, cwd: string = process.cwd()) => new Promise<string | { existCode: number }>(
    (resolve, reject) => {

        const options: SpawnOptions = {
            shell: true,
            cwd,
            stdio: 'inherit'
        };

        const child = spawn(`${executor}`, [cmd], options);

        child.on('close',
            code => {
                if (code === 0) {
                    resolve({ existCode: code });
                }
                else {
                    console.error(`${red('命令执行失败:')} ${blue(`${executor} ${cmd}`)}`);
                }
            }
        );
    }
);


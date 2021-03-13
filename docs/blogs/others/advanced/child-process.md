---
title: "child-process"
sidebarDepth: 1
tags: 
    - child-process
---

## 子线程

### teest

```ts
import { spawn, SpawnOptions } from 'child_process';
import { blue, red } from 'chalk';

// Runner
export type Runner = <T extends true | false>(cmd: string, collect?: T, cwd?: string) => Promise<T extends true ? string : { exitCode: number }>;

// 创建命令行runner
// @return  (cmd, collect, cwd) => Promise;    cmd: 命令, collect: 是否收集数据, cwd: 执行路径
export const runnerOf = (bin: string): Runner => async <T extends true | false>(cmd: string, collect?: T, cwd: string = process.cwd()) => new Promise<T extends true ? string : { exitCode: number }>(
    (resolve, reject) => {

        const options: SpawnOptions = {
            shell: true,
            cwd,
            stdio: collect ? 'pipe' : 'inherit'
        };

        const child = spawn(`${bin}`, [cmd], options);

        child.stdout?.on('data',
            data => resolve(data.toString())
        );

        child.on('exit',
            exitCode => {
                if (exitCode === 0) {
                    resolve({ exitCode } as any);
                }
                else {
                    console.error(`执行命令进程退出：${bin} ${cmd} [exitCode: ${exitCode}]`);
                    reject({ exitCode })
                }
            }
        );

        child.on('error', err => reject(err));
    }
);

// npm runner
export const npmRunner: Runner = runnerOf('npm');

// npm初始化，相当于：`npm init -y`
const pkg = await npmRunner('init -y', true, projectDirectory);

// 打印出来的是线程返回的数据，即`package.json`的内容
console.log(pkg);
```

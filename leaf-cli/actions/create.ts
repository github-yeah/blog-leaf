import { npmRunner } from '../lib/manager/runner/npm-runner';
import { green, blue, red } from "chalk";
import * as path from "path";
import * as fs from "fs";
import * as inquirer from "inquirer";
import { Action } from "./action";
import { del } from "../lib/utils/file-system";

import { questions as templeteQuestions, TempleteMode, downloadTemplete } from "../lib/manager/templete/templete-manager";
import { tscRunner } from '../lib/manager/runner/tsc-runner';



// 创建模式
enum CreateMode {
    Overwrite,
    Merge,
    Cancel
};


// 创建项目目录
const createProjectDirectory = async (project: string | undefined, model: CreateMode = CreateMode.Merge) => {

    // 项目目录（如果没设置目录，则设置当前目录为项目目录）
    const projectDirectory = path.resolve(project || '');

    // 项目名称，如果没有设置，则当前所在目录名称将作为项目名称
    const projectName = path.basename(projectDirectory);

    // 创建信息
    console.info(green(`[创建项目]`));
    console.info('项目目录', blue(projectDirectory));
    console.info('项目名称', blue(projectName));
    console.info('创建模式', blue(CreateMode[model]));


    // 目录是否存在
    const directoryExist = fs.existsSync(projectDirectory);

    // 判断创建模式
    if (directoryExist) {
        if (model === CreateMode.Cancel) {
            // 直接退出
            console.info('退出创建:', blue('(项目目录已经存在)'));
            return;
        }

        // 覆盖
        if (model === CreateMode.Overwrite) {
            console.info(`清空目录:${blue(projectDirectory)}`);
            try {
                await del(projectDirectory);
            }
            catch (err) {
                console.error(`清空目录出错：${err}`);
            }
        }
    }

    // 创建目录
    console.info(`创建目录:${blue(projectDirectory)}`);
    if (!fs.existsSync(projectDirectory)) {
        try {
            await fs.mkdirSync(projectDirectory);
        } catch (error) {
            console.info(`${red('创建目录失败!')} -- ${red(projectDirectory)}`);
            return;
        }
    }
};

// 初始化项目
const initProject = async (project: string | undefined) => {

    // 项目目录（如果没设置目录，则设置当前目录为项目目录）
    const projectDirectory = path.resolve(project || '');

    // 项目名称，如果没有设置，则当前所在目录名称将作为项目名称
    const projectName = path.basename(projectDirectory);

    // 初始化信息
    console.info(green(`[初始化项目-${projectName}]`));

    // 创建pakage.json
    console.info(`package.json 初始化`);
    const pkg = await npmRunner('init -y', true, projectDirectory);
    console.info(blue(pkg));
    console.info(green(`package.json 初始化成功`));

    // 初始化tsconfig.json
    console.info(`tsconfig.json 初始化`);
    const tscfg = await tscRunner('--init', true, projectDirectory);
    console.info(blue(tscfg));
    console.info(green(`tsconfig.json 初始化成功`));

};

// 交互问题列表
const questions: inquirer.QuestionCollection = [
    {
        name: 'project',
        type: 'input',
        message: '请输入项目目录',
        // default: () => path.basename(process.cwd()),
        filter: (input: string, answers) => path.resolve(input.trim() || answers.project || ''),
        transformer: (input: string, answers) => {
            const projectDirctory = path.resolve(input.trim() || answers.project || '');
            return `\n项目名称:${path.basename(projectDirctory)}\n项目根目录:${projectDirctory}\n${input}`;
        },
        // validate: (name: string) => name.trim() === '' ? "请提供一个项目目录" : true,
        when: answers => !answers.project
    }
    ,
    {
        name: 'model',
        type: 'list',
        choices: [
            { name: '合并', value: CreateMode.Merge },
            { name: '覆盖', value: CreateMode.Overwrite },
            { name: '退出', value: CreateMode.Cancel }
        ],
        message: (answers) =>
            `项目目录:${path.resolve(answers.project)}已经存在，下一步：`,
        // 当when返回结果为true时才展示此问题
        when: answers => !answers.force && fs.existsSync(path.resolve(answers.project))
    }
];

// Create Action
export const action: Action = async (inputs, options) => {
    // 项目input
    const projectInput = inputs?.find(input => input.name === "project");

    // force option
    const forceOption = options?.find(opt => opt.name === 'force');

    // 创建项目问题交互
    const { project, model } = await inquirer.prompt(questions, { project: projectInput?.value, force: forceOption?.value });
    if (model === CreateMode.Cancel) {
        return;
    }

    // 创建项目目录
    await createProjectDirectory(project, model);

    // 模版问题交互
    const { templete, templeteMode } = await inquirer.prompt(templeteQuestions, { project, model } as any);


    if (templeteMode === TempleteMode.None) {
        // 创建项目
        initProject(project);
    }
    else {
        // 下载模版
        downloadTemplete(templete, project);
    }

};
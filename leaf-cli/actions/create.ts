import { green, blue, red } from "chalk";
import * as path from "path";
import * as fs from "fs";
import * as inquirer from "inquirer";
import { Action } from "./action";
import { del } from "../lib/utils";
import { exec } from "child_process";

// 创建模式
enum CreateModel {
    Overwrite,
    Merge,
    Cancel
};


// 创建项目
const createProject = async (project: string | undefined, model: CreateModel = CreateModel.Merge) => {

    // 项目目录（如果没设置目录，则设置当前目录为项目目录）
    const projectDirectory = path.resolve(project || '');

    // 项目名称，如果没有设置，则当前所在目录名称将作为项目名称
    const projectName = path.basename(projectDirectory);

    // 创建信息
    console.info(green(`[创建项目]`));
    console.info('项目目录', blue(projectDirectory));
    console.info('项目名称', blue(projectName));
    console.info('创建模式', blue(CreateModel[model]));


    // 目录是否存在
    const directoryExist = fs.existsSync(projectDirectory);

    // 判断创建模式
    if (directoryExist) {
        if (model === CreateModel.Cancel) {
            // 直接退出
            return;
        }

        // 覆盖
        if (model === CreateModel.Overwrite) {
            console.info(`清空目录:${blue(projectDirectory)}`);
            try {
                del(projectDirectory);
            }
            catch (err) {
                console.error(`清空目录出错：${err}`);
            }
        }
    }

    // 开始创建


    // fs.mkdir(projectDirectory, err => {
    //     if (err) {
    //         console.error(red(err));
    //         process.exit(1);
    //     }
    // })

    // 输出

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
            { name: '合并', value: CreateModel.Merge },
            { name: '覆盖', value: CreateModel.Overwrite },
            { name: '退出', value: CreateModel.Cancel }
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

    // 交互式命令
    const { project, model } = await inquirer.prompt(questions, { project: projectInput?.value, force: forceOption?.value });
    if (model === CreateModel.Cancel) {
        return;
    }

    createProject(project, model);
};
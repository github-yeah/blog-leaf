import { green, blue, red } from "chalk";
import * as path from "path";
import * as inquirer from "inquirer";
import { Action } from "./action";

// 转换为绝对路径
const toAbsolute = (p: string) => path.isAbsolute(p) ? p : path.resolve(p);


// 创建项目
const createProject = (name: string | undefined, directory: string | undefined) => {

    // 项目目录（绝对路径，如果没设置目录，则设置当前目录为项目目录）
    const projectDirectory = toAbsolute(directory || '');

    // 项目名称，如果没有设置，则当前所在目录名称将作为项目名称
    const projectName = name || path.basename(projectDirectory);

    // 输出
    console.info(green(`[创建项目]`));
    console.info('项目目录', blue(projectDirectory));
    console.info('项目名称', blue(projectName));
}

// 交互问题列表
const questions: inquirer.QuestionCollection = [
    {
        name: 'directory',
        type: 'input',
        message: '请输入项目目录',
        // default: () => path.basename(process.cwd()),
        filter: (input: string, answers) => toAbsolute(input.trim()),
        transformer: (input: string, answer) => `\n绝对路径预览: ${toAbsolute(input.trim())}\n${green(input.trim())}`,
        validate: (name: string) => name.trim() === '' ? "请提供一个项目目录" : true,
        when: answers => !answers.directory
    }
    ,
    {
        name: 'name',
        type: 'input',
        message: '请输入项目名称',
        // default: () => path.basename(process.cwd()),
        filter: (input: string, answers) => input.trim() || path.basename(answers.directory || process.cwd()),
        transformer: (input: string, answer) =>
            input.trim() || path.basename(answer.directory || process.cwd()),
        validate: (name: string) => name.trim() === '' ? "请提供一个项目名称" : true,
        when: answers => !answers.name
    }
    ,
    {
        name: 'confirm',
        type: 'confirm',
        message: (answers) => `项目信息确认:\n项目名称：${blue(answers.name)}\n项目目录：${blue(toAbsolute(answers.directory))}\n`,
        // 当when返回结果为true时才展示此问题
        when: answers => answers.name && answers.directory
    }
];

// Create Action
export const action: Action = async (inputs, options) => {

    // 项目目录option
    const directoryOption = options?.find(opt => opt.name === "directory");
    // 项目名称input
    const nameInput = inputs?.find(input => input.name === "name");

    // 交互式命令
    await inquirer
        .prompt(questions, { name: nameInput?.value, directory: directoryOption?.value })
        .then(answers => {
            const { name, directory } = answers;
            createProject(name, directory);
        });
};
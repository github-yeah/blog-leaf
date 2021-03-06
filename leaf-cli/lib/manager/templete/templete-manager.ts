import { AnswerObject } from '../question/question-manager';
import { join } from 'path';
import { read } from '../../utils/file-system';
import { QuestionCollection, Separator } from "inquirer";
import * as ora from "ora";


// 模版模式
export enum TempleteMode {
    Preset,
    Custom,
    None
}

// 预设模版列表
const presets = async () => await read(join(__dirname, 'templete.json'))
    .then(
        (res) => Object.values(JSON.parse(res.toString()))
    );

// 模版questions
const _questions = [
    {
        name: 'templeteMode',
        type: 'list',
        choices: [
            { name: '使用预设', value: TempleteMode.Preset },
            { name: '自定义', value: TempleteMode.Custom },
            new Separator('--------'),
            { name: '不使用模版', value: TempleteMode.None }
        ],
        message: '设置模版：'
    }
    ,
    {
        name: 'templete',
        type: 'list',
        choices: presets,
        message: '选择预设模版:',
        when: (answer: { templeteMode: number }) => answer.templeteMode === TempleteMode.Preset
    }
    ,
    {
        name: 'templete',
        type: 'input',
        message: '请输入模版地址:',
        when: (answer: { templeteMode: number }) => answer.templeteMode === TempleteMode.Custom
    }
] as const;

// 模版Answer keys
export type TempleteAnswer = AnswerObject<typeof _questions>;

// 模版questions
export const questions: QuestionCollection<TempleteAnswer> = _questions;


// download
const downloadGit = require('download-git-repo');

// 下载模版
export const downloadTemplete = async (templete: string, directory?: string) => {
    const spinner = ora('下载模版');
    spinner.start();

    // 下载模版
    await downloadGit(templete, directory || '.',
        (err: any) => {
            console.log(err);
            err ? spinner.fail(`模版[${templete}]下载失败!`) : spinner.succeed(`模版[${templete}]下载成功!`);
        }
    );
};

import { dest, src } from '../lib/ts/stream';
import { Action, Input } from "./action";
import { Project } from "../lib/ts/project";
import { StreamCompiler } from "../lib/ts/compiler";
import { getCommonPathOf } from '../lib/ts/utils';


// build Action
export const action: Action = async (inputs?: Input[], options?: Input[]) => {
    // build files
    let files = inputs?.filter(input => input.name === 'files').map(input => input.value as string);

    // compile options
    const compilerOptions = options?.reduce(
        (opts, input) => {
            opts[input.name] = input.value;
            return opts;
        }
        , {} as any
    );

    const project = Project.read(compilerOptions);
    // 设置缺省值
    if (!files || files.length === 0) {
        files = project.config.fileNames;
    }

    // 使用默认编译（直接输出到硬盘）
    // project.compileFiles(files && files.length === 0 ? undefined : files);


    // 使用流编译整个项目
    // project.src()
    //     .pipe(StreamCompiler.create(compilerOptions))
    //     .compilationResult
    //     .All
    //     .pipe(dest(project.config.options.outDir || ''));


    // 使用流编译文件
    const base = getCommonPathOf(files);
    StreamCompiler
        .create(compilerOptions)
        .compileFiles(files || [])
        .All
        .pipe(dest(base || compilerOptions.outDir || process.cwd()));
};
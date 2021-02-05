import { define } from './utils';
import { tsconfig, out_dir, out_dir_dts } from './constants';
import * as ts from "gulp-typescript";
import { src, dest } from 'gulp';


// ts 编译器
export namespace tsCompiler {

    // ts project
    const _tsProject = ts.createProject(tsconfig);

    // ts 流编译器
    const _stream_compiler = _tsProject();

    // 编译 ts
    export const compile = (patterns: string | string[]) => define(
        callback => src(patterns)
            .pipe(_stream_compiler)
            .on("error", reason => callback(reason))
            .on("end", arg => callback(arg))
            .pipe(dest(out_dir)),
        "编译",
        "编译TypeScript"
    );
}





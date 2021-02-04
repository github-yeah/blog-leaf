import { define } from './utils';
import * as gulp from 'gulp';
import { input_globs, input_dir, out_dir, out_dir_dts } from './constants';
import clean from './clean';
import { tsBuilder } from './builder';
import { tsCompiler } from './compiler';

// ts watch
export namespace tsWatch {
    // 监听改变事件
    const _watch: gulp.TaskFunction = define(
        callback => gulp.watch(input_globs)
            .on("add", filePath => {
                console.log(`新增文件:\n${filePath}`);
                tsCompiler.compile(filePath)(callback);
            })
            .on("addDir", filePath => {
                console.log(`新增文件夹:\n${filePath}`);
            })
            .on("unlink", filePath => {
                console.log(`移除文件:\n${filePath}`);
                const dtsPath = filePath.replace(input_dir, out_dir_dts).replace(".ts", ".d.ts");
                const jsPath = filePath.replace(input_dir, out_dir).replace(".ts", ".js");

                clean([dtsPath, jsPath])(arg => {
                    console.log(arg);
                })
            })
            .on("unlinkDir", filePath => {
                console.log(`移除文件夹:\n${filePath}`);
            })
            .on("change", filePath => {
                console.log(`文件内容改变:\n${filePath}`);
            })
        , "启动项目监听..."
        , "监听文件变动，自动编译"
    );

    export const watch = gulp.series(tsBuilder.build(input_globs), _watch);
}
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
                // 编译文件
            })
            .on("addDir", filePath => {
                console.log(`新增文件夹:\n${filePath}`);
                // do nothing
            })
            .on("unlink", filePath => {
                console.log(`移除文件:\n${filePath}`);
                const dtsPath = filePath.replace(input_dir, out_dir_dts).replace(".ts", ".d.ts");
                const jsPath = filePath.replace(input_dir, out_dir).replace(".ts", ".js");
                clean([dtsPath, jsPath])(callback)
            })
            .on("unlinkDir", filePath => {
                console.log(`移除文件夹:\n${filePath}`);
                const dtsPath = filePath.replace(input_dir, out_dir_dts);
                const jsPath = filePath.replace(input_dir, out_dir);
                clean([dtsPath, jsPath])(callback)
            })
            .on("change", filePath => {
                console.log(`文件内容改变:\n${filePath}`);
            })
            .on("error", err => callback(err))
        , "项目监听..."
        , "监听文件变动，自动编译"
    );

    export const watch = gulp.series(tsBuilder.build(input_globs), _watch);
}
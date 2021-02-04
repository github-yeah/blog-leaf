// ts配置文件路径
export const tsconfig = "tsconfig.json";


// ======================================

// 输出目录
export const input_dir = "src";
// 待编译的源文件globs
export const input_globs = `${input_dir}/**/*`;
// 输出目录
export const out_dir = "dist";
// dts 输出目录
export const out_dir_dts = "dist";
// export const out_dir_dts = "dist/@types";


// ======================================

// 清理命令 `gulp clean`
export const Gulp_Clean = "clean";

// 构建命令 `gulp build`
export const Gulp_Build = "build";

// 监听命令 `gulp watch`
export const Gulp_Watch = "watch";
import { input_globs, out_dir } from './constants';
import { series } from 'gulp';
import clean from './clean';
import { tsCompiler } from './compiler';

// ts builder
export namespace tsBuilder {
    // 构建
    export const build = (patterns: string | string[]) => series(clean(out_dir), tsCompiler.compile(patterns));
}
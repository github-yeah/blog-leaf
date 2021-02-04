import { task } from 'gulp';
import clean from './lib/clean';
import { tsWatch } from "./lib/watch";
import { tsBuilder } from './lib/builder';
import {
    Gulp_Clean,
    Gulp_Build,
    Gulp_Watch,
    input_globs,
    out_dir
} from './lib/constants';


// 清理(`gulp clean`)
task(Gulp_Clean, clean(out_dir));

// 构建(`gulp build`)
task(Gulp_Build, tsBuilder.build(input_globs));

// 监听(`gulp watch`)
task(Gulp_Watch, tsWatch.watch);
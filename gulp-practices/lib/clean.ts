import { define } from './utils';
import del = require("del");    // 导入`del`包

// clean
const clean = (patterns: string | string[]) => define(
    callback => del(patterns)
        .then(files => {
            if (files.length > 0) {
                console.log(`正在清理:\n${files.join(`\n`)}`);
            }
            callback();
            return files
        })
        .catch(reason => callback(reason))
    , "清理"
    , "清理输出文件夹内容");

export default clean;
import * as path from "path";

// spilt with
const PATH_SPILT_REG = /\\|\//;

/** @description 获取路径中相同的部分*/
export const getCommonPath = (path1: string, path2: string) => {
    const group1 = path1.split(PATH_SPILT_REG);
    const group2 = path2.split(PATH_SPILT_REG);
    let len = 0;
    for (let idx = 0; idx < group1.length && idx < group2.length; idx++) {
        if (group1[idx] !== group2[idx]) {
            break;
        }
        len += group1[idx].length + 1;
    }
    return path1.substr(0, len);
};

/** @description 获取路径列表中相同的部分*/
export const getCommonPathOf = (pathArray: string[]) => pathArray.reduce(
    (prev, curr) => {
        return getCommonPath(prev, curr);
    }
);

/** @description 根据扩展名判断类型 */
export const isExtension = (path: string, extname: string): boolean => {
    const idx = path.length - extname.length;
    if (idx < 0) {
        return false;
    }
    return path.substr(idx) === extname;
}

/** @description 获取扩展名 @param extensions 特殊扩展名（.d.ts, .d.ts.map等） */
export const getExtname = (filePath: string, extensions?: string | readonly string[]): string => {
    if (typeof extensions === 'string') {
        return isExtension(filePath, extensions) ? extensions : path.extname(filePath);
    }

    if (extensions) {
        return extensions.find(ext => isExtension(filePath, ext)) || path.extname(filePath);
    }
    return path.extname(filePath);
};
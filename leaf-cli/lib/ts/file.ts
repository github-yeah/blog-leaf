import * as path from "path";
import { Extension } from "typescript";


/**
 * @description 文件
 * @author xfy
 * @interface File
 */
interface File {
    /** @description 完整路径 */
    path: string;
    /** @description 文件内容 */
    content: string;
    /** @description 格式化后的路径 */
    normalizedPath: string;
}


namespace File {

    /** @description 文件类型 */
    export type Kind = Extension;

    /** @description 扩展名列表 */
    export const extensions = Object.values(Extension);

    /** @description 格式化路径 */
    export const normalize = (filePath: string, caseSensitive?: boolean) => {
        const normalized = path.normalize(filePath);
        return caseSensitive ? normalized.toLowerCase() : normalized;
    };

    /** @description 特殊扩展名列表 */
    const specialExtensions = extensions.filter(ext => ext.lastIndexOf('.') !== 0);

    /** @description 路径转换 => [无扩展名路径，扩展名]*/
    export const toPathTouple = (filePath: string): [string, Kind] => {
        for (const ext of specialExtensions) {
            const idx = filePath.length - ext.length;
            if (filePath.substr(idx) === ext) {
                return [filePath.substr(0, idx), ext];
            }
        }
        const ext = path.extname(filePath).toLowerCase();
        const idx = filePath.length - ext.length;
        return [filePath.substr(0, idx), ext as Kind];
    };
}

export default File;
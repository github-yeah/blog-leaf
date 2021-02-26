import * as fs from "fs";
import { join } from "path";

// 删除文件夹或文件
export const del = (path: fs.PathLike | fs.PathLike[]) => {
    if (Array.isArray(path)) {
        path.forEach(p => del(p));
        return;
    }

    const stats = fs.statSync(path);
    if (stats.isFile()) {
        return fs.unlinkSync(path);
    }

    const files = fs.readdirSync(path);
    files.forEach(file => del(join(path.toString(), file)));

    return fs.rmdirSync(path);
};

// 读取文件或文件夹（path是文件返回buffer，是文件夹返回文件列表）
export const read = async (path: fs.PathLike) => new Promise<Buffer | string[]>(
    (resolve, reject) => {

        // 回调函数
        const _callback = (err: NodeJS.ErrnoException | null, data: Buffer | string[]) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        };

        const stats = fs.statSync(path);
        if (stats.isFile()) {
            fs.readFile(path, _callback);
        }
        else if (stats.isDirectory()) {
            fs.readdir(path, _callback);
        }
    }
);

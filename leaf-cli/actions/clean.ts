import { Action } from "./action";
import { del } from "../lib/utils/file-system";
import { resolve, isAbsolute } from "path";

// Clean Action
export const action: Action = async (inputs) => {

    const directory = inputs?.find(ipt => ipt.name === 'directory')?.value as string || 'dist';

    const dist = isAbsolute(directory) ? directory : resolve(process.cwd(), directory);

    try {
        await del(dist);
    }
    catch (err) {
        console.error(`清空目录出错：${err}`);
    }
};
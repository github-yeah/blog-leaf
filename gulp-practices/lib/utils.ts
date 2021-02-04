import { TaskFunction } from 'gulp';
// 解析命令
export const parseCmdParam = () => {
    // 获取命令参数
    const [, , , arg] = process.argv;
    return arg ? arg.replace(/\-/g, "") : undefined;
};

// define task function
export const define = (taskFunction: TaskFunction, name?: string, description?: string) => {
    taskFunction.displayName = name;
    taskFunction.description = description;
    return taskFunction;
}
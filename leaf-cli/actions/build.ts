import { Action, Input } from "./action";
import { Project } from "../lib/ts/project";


// build Action
export const action: Action = async (inputs?: Input[], options?: Input[]) => {
    // build files
    const files = inputs?.filter(input => input.name === 'files').map(input => input.value as string);

    // compile options
    const compilerOptions = options?.reduce(
        (opts, input) => {
            opts[input.name] = input.value;
            return opts;
        }
        , {} as any
    );

    const project = compilerOptions.project || compilerOptions;
    Project.create(project, compilerOptions).compileFiles(files && files.length === 0 ? undefined : files);
};
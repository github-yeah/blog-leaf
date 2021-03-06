import { red, yellow } from "chalk";
import leven = require("leven");
import { Action, Input } from "./action";

import { testCompiler } from '../lib/ts/compiler';


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

    testCompiler(files, compilerOptions);
};
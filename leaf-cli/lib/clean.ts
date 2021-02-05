import * as fs from "fs";



// _清理
const _clean = (pattern: string) => {
    fs.unlinkSync(pattern)

}

// 清理
export const clean = (patterns: string | string[]) => [...patterns].forEach(_clean);


clean("dist/test.js")

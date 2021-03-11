---
title: "typescript编译编译过程"
sidebarDepth: 2
tags: 
    - ts compile
    - 编译
---

## 预备工作

安装`typescript`依赖

```bash
npm install typescript --save
```

下面使用的`ts`都是`typescript`

```ts
import * as ts from "typescript";
```

### 关于编译选项 `ts.CompilerOptions`

请参照`tsconfig.json`中的`compilerOptions`

### 关于 `ts.CompilerHost`

- `ts.CompilerHost`在创建`ts.Program`时，通过参数的形式传入
- 在创建`ts.Program`时不传人`host`，`ts`会调用`ts.createCompilerHost`创建一个
- `ts.createCompilerHost(编译选项).writeFile`方法默认会把编译后的文件写入硬盘
- 可以修改`ts.createCompilerHost(编译选项).writeFile`方法修改默认行为
- `ts.CompilerHost.writeFile`的类型为`ts.WriteFileCallback`

```ts
import * as ts from "typescript";

function compileFiles(rootFiles: string[], options:ts.CompilerOptions ) {
    // 创建一个host
    const host = ts.createCompilerHost(options);
    // 修改writeFile的行为，此时编译完成后会打印编译后的文件名，但是不会再写入硬盘了
   host.writeFile = (fileName: string, data: string, writeByteOrderMark) => {
       console.log(fileName)
    };
    // 通过参数传入
    const program = ts.createProgram(rootNames, compilerOptions, host);
    // 此时编译完成后会打印编译后的文件名，但是不会再写入硬盘了
    program.emit();
}

```

### 关于 `ts.WriteFileCallback`

`ts.Program`在编译完成后，会调用`ts.WriteFileCallback`来处理编译后的文件

有两个地方可以设置：

1. 在调用`ts.Program.emit`时，传递`ts.WriteFileCallback`参数

    ```ts
    function compileFiles(rootFiles: string[], options:ts.CompilerOptions ) {
        // 通过参数传入
        const program = ts.createProgram(rootNames, compilerOptions);
        const writeFile: ts.WriteFileCallback = (file, data, writeByteOrderMark) => 
        {
            console.log(fileName)
        };
        // 此时编译完成后会打印编译后的文件名，但是不会再写入硬盘了
        // 自定义的writeFile优先级大于host.writeFile的优先级
        // 编译完成后会忽略host.writeFile
        program.emit(undefined, writeFile);
    }
    ```

    :::tip
    通过`ts.Program.emit`传递的`ts.WriteFileCallback`回调函数会覆盖`ts.CompilerHost.writeFile`的行为
    :::

2. 上面描述的`ts.CompilerHost.writeFile`

## `typescript` 编译过程

1. 创建 `ts.Program`

    ```ts
    const program = ts.createProgram(待编译的文件列表, 编译选项, `ts.CompilerHost`（可选）)
    ```

2. 调用  `ts.Program.emit`

   ```ts
    program.emit(undefined, `ts.WriteFileCallback`回调（可选）);
   ```

总结：

- `ts.createProgram`不传入`ts.CompilerHost`，`ts`会默认通过`ts.createCompilerHost`创建
- 通过`ts.Program.emit`传入的`ts.WriteFileCallback`回调函数会覆盖`ts.CompilerHost.writeFile`的行为
- `ts.createCompilerHost(编译选项).writeFile`默认行为是把编译后的文件写入硬盘

## 关于读取`tsconfig.json`

```ts
import * as ts from "typescript";

// 读取
const rawData = ts.readConfigFile(`tsconfig.json`路径, ts.sys.readFile);
// 解析 `config` 为 `ts.ParsedCommandLine`
const config = ts.parseJsonConfigFileContent(
    rawData.config || {},
    ts.sys,
    根目录,
    已经存在的编译选项（会覆盖读取的相同的选项）
);

// 项目所有的源文件路径列表
const files = config.fileNames;
```

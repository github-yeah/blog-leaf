# CLI

1. 安装依赖

    ```bash
    npm install
    ```

2. 编译
   - 编译一次： `npm run build`
   - 编译并监听文件变化：`npm run build:dev` （用于本地动态调试命令）

3. 挂载全局命令

   ```bash
   npm link
   ```

4. 运行:

   ```bash
   leaf
   leaf -v
   leaf -h
   leaf info
   ...
   ```

5. 卸载全局命令

   ```bash
   npm unlink
   ```

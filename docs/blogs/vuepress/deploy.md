---
title: "部署"
sidebarDepth: 2
tags: 
    - deply
---

## 发布到Github Pages

1. 在`docs/.vuepress/config.js`中设置正确的`base`属性
   - 如果发布到`https://<USERNAME>.github.io/`不需要此步骤，因为`base`默认就是`'/'`
   - 如果发布到`https://<USERNAME>.github.io/<REPO>/`需要设置`base`为`'/<REPO>/'`
2. 创建自动部署脚本，  根据注释内容自动替换内容

<<< @/deploy.sh

## Push代码时触发自动部署

**To be continue...**:

---
title: "模版语法"
sidebarDepth: 1
tags: 
    - vue
---



## 指令的动态参数

`指令:[指令参数的JS表达式]='值的JS表达式'`

- `v-bind`指令绑定属性：`v-bind:[dynamic attribute name]='dynamic value  JS expression'`
- `v-on`指令绑定行为：`v-on:[dynamic event name]='dynamic handler JS expression'`

**输入**：

`/docs/.vuepress/components/vue/templete-syntax.vue`

<<< @/docs/.vuepress/components/vue/templete-syntax.vue#commond

**以上输出的结果**：

<vue-templete-syntax />


## Class和Style

### Class

---
title: "Markdown中使用Vue"
sidebarDepth: 2
tags: 
    - markdown vue
---
## 在`.md`中直接使用vue语法

**输入**：<Badge text="在`.md`中直接写入" type="tip"/>

<<< @/docs/.vuepress/components/vuepress/use-vue.vue

**输出**：

<template>
    <div class="box">hello use vue</div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    
})
</script>
<style scoped>
.box {
    background: green;
    text-align: center;
}
</style>

## 使用自定义的vue文件

语法规则：

- 自定义组件放入`.vuepress/components`目录下
- 使用的时候目录使用`-`隔开

**输入**：<Badge text="路径：`.vuepress/components/use-vue.vue`" type="tip"/>

```md
<vuepress-use-vue />
```

**输出**：

<vuepress-use-vue />

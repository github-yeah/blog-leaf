---
title: 开始
sidebarDepth: 2
tags: 
    - Vue
---

## 安装

### Vue实例的选项对象结构

``` js
{
    // 数据
    data: { },   
    // 方法 
    methods: {  
        method: function(){}
    },
    // 计算属性 
    computed: {
        getter1: function(){return true},
        setterAndGetter1: {
            get: function(){ ... },
            set: function(newVal){ ... },
        }
    },
    // 侦听器
    watch: {
        data中的属性: function(newVal, oldVal){...}
    }
}
```

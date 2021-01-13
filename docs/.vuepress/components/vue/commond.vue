<template>
    <div>
        <span>计数器：{{ count }}</span>
        <!-- 指令动态参数-完整写法 -->
        <div v-bind:[attrName]="attrValue" v-on:[eventName]="increase()">指令动态参数-完整写法：点击我计数+1</div>
        <!-- 指令动态参数-缩写 -->
        <div :[attrName]="attrValue" @[eventName]="increase()">指令动态参数-缩写：点击我计数+1</div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

// data 对象
const dataObject = {
    count: 1,
    attrName: "class",
    attrValue: "customDiv",
    eventName: "click",
    increase: function(){
        this.count+=1;
        
    }
};

/**
 * ======== 使用 Vue.extend({ ... })========
*/
export default Vue.extend({     
    data: () => dataObject     //`Vue.extend` 中选项配置中的`data`必须是函数
});

</script>

<style scoped>
    .customDiv {
        background:lightcoral;
        margin:1rem 0;
    }
</style>
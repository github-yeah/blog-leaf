<template>
    <div class="rootDiv">
        <!-- 绑定动态属性和动态event -->
        <!-- 指令动态参数-完整写法 -->
        <div v-bind:[attrName]="attrValue" v-on:[eventName]="changeBackground">
            指令动态参数-完整写法：点击变色
        </div>
        <!-- 指令动态参数-缩写 -->
        <div :[attrName]="attrValue" @[eventName]="changeBackground">
            指令动态参数-缩写：点击变色
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

// data 对象
const dataObject = {
    attrName: "class",
    attrValue: "greenDiv",
    eventName: "click"
};

/**
 * ======== 使用 Vue.extend({ ... })========
*/
export default Vue.extend({     
    //`Vue.extend` 中选项配置中的`data`必须是函数
    data: () => dataObject,
    methods: {
        changeBackground: function () {
            this.attrValue  = this.attrValue == "coralDiv" ? "greenDiv" : "coralDiv";
        }
    }     
});

</script>

<style scoped>
    .coralDiv {
        background:lightcoral;
        margin:1rem 0;
    }
    .greenDiv {
        background:lightgreen;
        margin:1rem 0;
    }
</style>
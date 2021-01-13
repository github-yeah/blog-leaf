<template>
    <div>
        {{ title }}
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

// data 对象
const dataObject = {
    title: "我是标题"
};

/**
 * ======== 使用 Vue.extend({ ... })========
*/
export default Vue.extend({     
    data: () => dataObject     //`Vue.extend` 中选项配置中的`data`必须是函数
});

</script>
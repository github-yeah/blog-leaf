<template>
  <div>
    <div class="tree-label">
      {{ treeData.label }}
    </div>
    <Tree
        v-if="opened"
        v-for="(child, idx) in treeData.children"
        :key="idx"
        :treeData="child" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { TreeData } from "./tree";

export default class Tree extends Vue {
}
</script>

<style lang="css" scoped>
/* span不响应鼠标事件 */
span {
  user-select: none;
  /* pointer-events: none; */
}
/* 只有伪类元素箭头才响应鼠标事件 */
/* span::before {
  pointer-events: all;
} */

span > * {
  /* border: 2px solid red; */
  pointer-events: none;
}

.tree-item {
  font-size: 0.8em;
  width: 100%;
  color: indigo;
  background-clip: border-box;
  display: inline;
}

.tree-item-content {
  background-clip: border-box;
}

.tree-item-disabled {
  pointer-events: none;
  display: block;
}

.tree-item-span {
  display: block;
}

/* ====================以下为伪元素--竖线====================== */
.tree-item:hover::after {
  content: "";
  display: block;
  position: relative;
  border-left: 1px solid red;
  height: 100%;
}
/* ====================以下为伪元素--箭头====================== */

/* vars */
.tree-label-close::before,
.tree-label-open::before {
  --arrow-width: 4px;
  --arrow-height: 5px;
  --arrow-color: grey;
}

/* 箭头-右朝向 */
.tree-label-close::before,
.tree-label-open::before {
  content: "";
  display: inline-block;
  position: relative;
  border-top: var(--arrow-width) solid transparent;
  border-bottom: var(--arrow-width) solid transparent;
  border-left: var(--arrow-height) solid var(--arrow-color);
  margin-right: 5px;
}

/* 箭头-朝下 */
.tree-label-open::before {
  transform: rotate(90deg);
}
</style>

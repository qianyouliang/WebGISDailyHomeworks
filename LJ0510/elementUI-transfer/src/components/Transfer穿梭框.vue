<template>
  <div id="content">
    <div class="Container">
      <div class="header">
        <input
          type="checkbox"
          v-model="isLChecked"
          @click="checkALL_L(isLChecked)"
        />
        {{ leftTitle }}
        <div class="count">{{ leftNumber }}/{{ leftSum }}</div>
      </div>
      <div class="container">
        <ul>
          <li
            v-for="itemL in leftList"
            :key="itemL.id"
            :disabled="itemL.isDisabled"
            :class="[{ disabled: itemL.isDisabled }, { hover: itemL.isChecked }]"
          >
            <input
              type="checkbox"
              v-model="itemL.isChecked"
              :disabled="itemL.isDisabled"
              :checked="itemL.isDisabled"
            />
            {{ itemL.value }}
          </li>
        </ul>
      </div>
    </div>

    <div>
      <button :class="{ Lactive: isLChecked }" @click="moveToRight" class="btn">
        右移
      </button>
      <button :class="{ Ractive: isRChecked }" @click="moveToLeft" class="btn">
        左移
      </button>
    </div>

    <div class="Container">
      <div class="header">
        <input
          type="checkbox"
          v-model="isRChecked"
          @click="checkALL_R(isRChecked)"
        />
        {{ rightTitle }}
        <div class="count">{{ rightNumber }}/{{ rightSum }}</div>
      </div>
      <div class="container">
        <ul>
          <li v-for="itemR in rightList" :key="itemR.id" :class="{ hover: itemR.isChecked }">
            <input type="checkbox" v-model="itemR.isChecked" />
            {{ itemR.value }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>


<!-- 代码 -->
<script setup>
import { ref, computed, watch } from "vue";
import { createList } from "../libs/createList.js";

/* 定义数据 */
/* 左侧列表 */
const leftTitle = ref("List1");
const leftList = ref(createList(15));
var leftSum = ref(leftList.value.length);
var isLChecked = ref(false);

/* 右侧列表 */
const rightTitle = ref("List2");
const rightList = ref([]);
var rightSum = ref(rightList.value.length);
var isRChecked = ref(false);

/* 定义方法 */
function moveToRight() {
  const newLeftList = leftList.value.filter((item) => item.isChecked);
  rightList.value.push(...newLeftList);
  leftList.value = leftList.value.filter((item) => !item.isChecked);
  rightList.value.forEach((item) => {
    item.isChecked = false;
  });
}
/* 当数据被选中时才可以通过点击按钮被移动 */
function moveToLeft() {
  const newRightList = rightList.value.filter((item) => item.isChecked);
  leftList.value.push(...newRightList);
  rightList.value = rightList.value.filter((item) => !item.isChecked);
  leftList.value.forEach((item) => {
    item.isChecked = false;
  });
}

function checkALL_L(isLChecked) {
  if (!isLChecked) {
    leftList.value.forEach((item) => {
      if (!item.isDisabled) {
        item.isChecked = true;
      }
    });
  } else {
    leftList.value.forEach((item) => {
      item.isChecked = false;
    });
  }
}
function checkALL_R(isRChecked) {
  if (!isRChecked) {
    rightList.value.forEach((itemL) => {
      itemL.isChecked = true;
    });
  } else {
    rightList.value.forEach((itemR) => {
      itemR.isChecked = false;
    });
  }
}

// 左侧列表选中状态改变时触发
watch(
  () => leftList.value.filter((itemL) => itemL.isChecked).length,
  (newVal) => {
    isLChecked = newVal > 0;
  }
);
watch(
  () => rightList.value.filter((itemR) => itemR.isChecked).length,
  (newVal) => {
    isRChecked = newVal > 0;
  }
);

/* 使用计算属性来计算leftNumber和rightNumber的值 */
var leftNumber = computed(
  () => leftList.value.filter((item) => item.isChecked).length
);
var leftSum = computed(() => leftList.value.length);
var rightNumber = computed(
  () => rightList.value.filter((item) => item.isChecked).length
);
var rightSum = computed(() => rightList.value.length);
</script>


<!-- 样式 -->
<style scoped>
#content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 500px;
  width: 600px;
  margin: 0 auto;
  padding: 10px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  height: 40px;
  border-bottom: 1px solid #ccc;
  background-color: #409eff1a;
  color: #e5eaf3;
}
header input {
  margin-right: 10px;
}
.count {
  font-size: 12px;
  color: #909399;
}
.container {
  height: 500px;
  width: 200px;
  overflow: auto;
  border: 1px solid #ccc;
}
.container ul {
  padding: 0;
  margin: 0;
  list-style: none;
}
.container ul li {
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0 10px;
  cursor: pointer;
  /*   border-bottom: 1px solid #ccc; */
}
.container ul li:not(.disabled):hover{
    color:#308be7f5
}
.hover {
  color: #308be7f5;
}
.container ul li input {
  margin-right: 10px;
}

/* 右移按钮 */
.btn {
  margin: 10px;
  cursor: no-drop;
}
.Lactive,
.Ractive {
  background-color: #409eff;
  color: #fff;
  cursor: pointer;
}
.disabled {
  color: #909399;
  cursor: no-drop;
}
</style>
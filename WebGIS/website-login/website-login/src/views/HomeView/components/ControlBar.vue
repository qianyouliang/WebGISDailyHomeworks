<template>
  <div id="control">
    <select name="control" id="option-select" @change="controlSelect">
      <option value="home">主页</option>
      <option value="profile">个人信息</option>
      <option value="history">浏览历史</option>
      <option value="log-out">退出登录</option>
    </select>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useMainStore } from "../../../stores/index.js";
import { ref } from "vue";

const $router = useRouter();

const controlSelect = (e) => {
  if (e.target.value === "profile") {
    $router.push(`/profile`);
  } else if (e.target.value === "history") {
    $router.push(`/history`);
  } else if (e.target.value === "log-out") {
    localStorage.removeItem("token");
    $router.push(`/login`);
  } else {
    $router.push(`/`);
  }
};
</script>

<style lang="scss" scoped>
#control {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 10px;
  right: 10px;
  background-color: #f0f0f042;
  z-index: 100;
  #option-select {
    outline: none;
    border: none;
    background-color: transparent;
    padding: 8px;
    font-size: 14px;
    color: #333;
    cursor: pointer;
    option {
      background-color: #f0f0f042;
      color: #333;
    }
    option:hover {
      background-color: #f0f0f042;
    }
    option:checked {
      background-color: #007bff;
      color: #fff;
    }
  }
}
</style>
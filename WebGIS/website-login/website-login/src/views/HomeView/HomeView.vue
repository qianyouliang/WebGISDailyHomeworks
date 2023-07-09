<template>
  <div id="home">
    <JumpBtn />
    <Banner />
    <ControlBar />
    <div class="movie-bar">
      <div class="jump-btn">
        <div @click="jumpToNow" :class="{ select: isSelect }" class="btn">
          正在热映
        </div>
        <div @click="jumpToComing" :class="{ select: !isSelect }" class="btn">
          即将上映
        </div>
      </div>
      <router-view> </router-view>
    </div>
  </div>
</template>

<script setup>
import Banner from "./components/Banner.vue";
import JumpBtn from "./components/JumpBtn.vue";
import ControlBar from "./components/ControlBar.vue";
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import { checkToken } from "@/api/index.js";
import { ElMessage } from "element-plus";

const $router = useRouter();
var isSelect = ref(true);

onMounted(async () => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      const res = await checkToken(token);
      const { code, msg } = res.data;
      if (code === 10007) {
        ElMessage({
          message: msg,
          type: "error",
        });
        // 当token过期时，清除token
        localStorage.removeItem("token");
        setTimeout(() => {
          $router.push("/login");
        }, 1000);
      } else if(code === 10008) {
        ElMessage({
          message: msg,
          type: "error",
        });
        // 当token不合法时，清除token
        localStorage.removeItem("token");
        setTimeout(() => {
          $router.push("/login");
        }, 1000);
      }
    } catch (error) {
      $router.replace("/login");
    }
  } else {
    $router.replace("/login");
  }
});

const jumpToNow = () => {
  $router.push(`/`);
  isSelect.value = true;
};
const jumpToComing = () => {
  $router.push(`/comingsoon`);
  isSelect.value = false;
};
</script>

<style lang="scss" scoped>
.jump-btn {
  display: flex;
  height: 50px;
  align-items: center;
  justify-content: space-around;
  .btn {
    height: 50px;
    line-height: 50px;
    cursor: pointer;
  }
}
.select {
  color: #ff6700;
  font-weight: bold;
  border-bottom: 2px solid #ff6700;
}
</style>
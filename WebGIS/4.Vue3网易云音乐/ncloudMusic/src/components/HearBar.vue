<template>
  <div id="headBar">
    <h2 class="logo">网易云音乐</h2>
    <ul class="m-nav">
      <li><a href="" @click="findMusic">发现音乐</a></li>
      <li><a href=""> 我的音乐</a></li>
      <li><a href="">关注</a></li>
      <li><a href="">商城</a></li>
      <li><a href="">音乐人</a></li>
      <li><a href="">下载客户端</a></li>
    </ul>

    <input
      type="text"
      placeholder="请输入..."
      id="search"
      v-model="keyword"
      @keyup.enter="search"
    />
    <div class="creatorCenter">创作者中心</div>
  </div>
</template>

<script setup>
import { ref, onMounted} from "vue";
import { useStore } from "../store/index.js";
import { useRouter } from "vue-router";
const store = useStore();
const router = useRouter();
const keyword = ref("");
onMounted(() => {
  router.push(`/`);
});
const search = () => {
  store.keyword = keyword.value;
  if (store.keyword === "") {
    router.push(`/`);
  } else {
    router.push(`/search/${store.keyword}`);
  }
};

const findMusic = () => {
  router.push(`/`);
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
#headBar {
  display: flex;
  width: 100vw;
  height: 100px;
  align-items: center;
  background-color: #242424;
  gap: 10px;
  align-items: center;
  justify-content: space-around;
  border-bottom: 5px solid #c20c0c;
}
.logo {
  font-size: 30px;
  font-weight: 700;
  color: #c62f2f;
}
.m-nav {
  display: flex;
  list-style: none;
  font-size: 16px;
  font-weight: 700;
  gap: 20px;
}
.m-nav li a {
  display: inline-block;
  color: #fff;
  text-decoration: none;
  width: 100%;
  height: 100px;
  line-height: 100px;
}
#search {
  width: 200px;
  height: 50px;
  background-color: white;
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
  border: none;
  padding-left: 20px;
}
.creatorCenter {
  width: 8%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: white;
  border-top-left-radius: 25px;
  border-bottom-left-radius: 25px;
  border-top-right-radius: 25px;
  border-bottom-right-radius: 25px;
  border: 1px solid white;
  cursor: pointer;
}
</style>
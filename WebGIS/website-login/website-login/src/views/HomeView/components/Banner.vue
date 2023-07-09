<template>
  <div class="banner">
    <el-carousel trigger="click">
      <el-carousel-item v-for="banner in bannerList" :key="item">
        <img :src="banner.imgUrl" alt="" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getBanner } from "@/api/index.js";

const bannerList = ref([]);
onMounted(async () => {
  const res = await getBanner();
  bannerList.value = res.data.res;
});
</script>

<style lang="scss" scoped>
::v-deep(.el-carousel__container) {
  img {
    width: 100%;
    object-fit: contain;
  }
}
</style>
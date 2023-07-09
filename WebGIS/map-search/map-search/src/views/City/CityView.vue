<template>
  <div class="city-list">
    <h2 class="title">定位/最近访问</h2>
    <div class="near-cities">
      <div class="hot-city" @click="backHome(currentCity)">
        <el-icon><Location /></el-icon>{{ currentCity }}
      </div>
      <div
        v-for="nearcity in nearCities"
        @click="backHome(nearcity)"
        class="hot-city"
      >
        {{ nearcity }}
      </div>
    </div>
    <h2 class="title">热门城市</h2>

    <div class="hot-cities">
      <div
        @click="backHome(hotCity.name)"
        v-for="hotCity in hotCities"
        :key="hotCity.id"
        class="hot-city"
      >
        {{ hotCity.name }}
      </div>
    </div>

    <h2 class="title">所有城市</h2>
    <div v-for="(cityList, index) in cities" :key="index" class="city-group">
      <div class="city-index">{{ index }}</div>
      <div
        v-for="city in cityList"
        :key="city.id"
        @click="backHome(city.name)"
        class="city-item"
      >
        {{ city.name }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUpdated, ref } from "vue";
import { useCityStore } from "../../store/index.js";
import { useRouter } from "vue-router";
import { getCurrentCity } from "../../api/index.js";

import axios from "axios";
let hotCities = ref();
let cities = ref();
let currentCity = ref("");
let nearCities = ref([]);
const $store = useCityStore();
const $router = useRouter();
const backHome = (val) => {
  /* 1、获取item中的值 */
  addToNearCities(val);
  /* 2、改变pinia中的数据 */
  $store.changeCity(val);
  /* 3、跳转回前一个界面 */
  $router.back();
};
const addToNearCities = (city) => {
  const storedCities = JSON.parse(localStorage.getItem("nearCities") || "[]");
  const index = storedCities.indexOf(city);
  if (index !== -1) {
    storedCities.splice(index, 1); // 如果城市已存在，先移除旧记录
  }
  storedCities.unshift(city); // 将新城市添加到最前面
  if (storedCities.length > 20) {
    storedCities.splice(20); // 控制存储数量，超出部分移除
  }
  localStorage.setItem("nearCities", JSON.stringify(storedCities));
  nearCities.value = storedCities; // 更新近期访问城市列表
};
onMounted(async () => {
  $.ajax({
    url: "http://39.103.151.139:8000/city",
    success: (res) => {
      hotCities.value = res.data.hotCities;
      cities.value = res.data.cities;
    },
  });
  const resCurrentCity = await getCurrentCity();
  currentCity.value = resCurrentCity.data.city;
  const storedCities = JSON.parse(localStorage.getItem("nearCities") || "[]");
  nearCities.value = storedCities;
  //最近访问城市
});
</script>

<style lang="scss" scoped>
.city-list {
  .title {
    color: rgb(175, 172, 172);
    font-size: 18px;
    padding: 20px;
  }
}
.hot-cities,
.near-cities {
  padding: 20px;
  .hot-city {
    display: inline-block;
    margin-right: 10px;
    border: 1px solid gray;
    margin-bottom: 10px;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
  }
}

.city-group {
  padding: 20px;
  .city-index {
    margin: 20px;
  }
  .city-item {
    display: inline-block;
    margin-right: 10px;
    margin-bottom: 10px;
    border: 1px solid gray;
    padding: 8px 12px;
    border-radius: 4px;
    cursor: pointer;
  }
}
</style>
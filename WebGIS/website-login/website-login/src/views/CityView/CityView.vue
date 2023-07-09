<template>
  <div class="container">
    <div class="search">
      <input
        type="text"
        v-model="inputVal"
        class="search-input"
        placeholder="请输入城市名称"
        :prefix-icon="Search"
        @input="search(inputVal)"
      />
      <div class="city-name" v-if="inputVal" @click="backHome($store.cityName)">
        {{
          $store.cityName.length > 0
            ? $store.cityName
            : "似乎没有找到你查找的城市"
        }}
      </div>
    </div>
    <div class="city-list">
      <h2 class="title">GPS定位你所在的城市</h2>
      <div class="local-city" @click="backHome('武汉')">武汉</div>

      <h2 class="title">热门城市</h2>

      <div class="hot-cities">
        <div
          @click="backHome(hotCity.name)"
          v-for="hotCity in $store.hotCities"
          :key="hotCity.id"
          class="hot-city"
        >
          {{ hotCity.name }}
        </div>
      </div>
      <ul class="alphabet">
        <li
          v-for="(cityList, index) in $store.cities"
          :key="index"
          @click="scrollToCityGroup(index)"
          :class="{ active: activeLetter === index }"
        >
          {{ index }}
        </li>
      </ul>
      <h2 class="title">所有城市</h2>
      <div
        v-for="(cityList, index) in $store.cities"
        :key="index"
        class="city-group"
        :id="`city-group-${index}`"
        ref="cityListRefs"
      >
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
  </div>
</template>

<script setup>
import { onMounted, ref, onUpdated } from "vue";
import { useMainStore } from "../../stores/index.js";
import { useRouter } from "vue-router";

const cityListRefs = ref([]);
const activeLetter = ref(null);
const $store = useMainStore();
const $router = useRouter();
const inputVal = ref("");

const backHome = (val) => {
  $store.changeCurrentCity(val);
  $router.back();
};

const search = (val) => {
  if (val.length > 0) {
    $store.searchCity(val);
  }
};

const scrollToCityGroup = (index) => {
  const cityGroupElement = document.querySelector(`#city-group-${index}`);
  if (cityGroupElement) {
    cityGroupElement.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "center",
    });
  }
};

const initObserver = () => {
  // Create the Intersection Observer.
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeLetter.value = entry.target.id.split("-")[2];
        }
      });
    },
    { threshold: 0.1 }
  );
  // Observe all city list elements.
  cityListRefs.value.forEach((cityListElement) => {
    observer.observe(cityListElement);
  });
};

onMounted(async () => {
  initObserver();
});
onUpdated(() => {
  initObserver();
});
</script>

<style lang="scss" scoped>
.container {
  width: 100vw;
  .search {
    width: 50%;
    margin: 0 auto;
    margin-top: 20px;
    .search-input {
      width: 100%;
      height: 40px;
      padding: 8px;
      font-size: 16px;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      outline: none;
    }
    .city-name {
      width: 100%;
      height: 40px;
      padding: 8px;
      font-size: 16px;
      text-align: left;
      margin-top: 10px;
      color: #333;
      border: 1px solid #dcdfe6;
      background-color: #ededed;
      cursor: pointer;
    }
  }
  .city-list {
    width: 50%;
    margin: 0 auto;
    .title {
      color: rgb(175, 172, 172);
      font-size: 18px;
      padding: 20px;
    }
    .local-city {
      display: inline-block;
      margin: 20px;
      border: 1px solid #dcdfe6;
      background-color: #ededed;
      margin-bottom: 10px;
      padding: 8px 12px;
      border-radius: 4px;
      cursor: pointer;
    }
    .hot-cities {
      padding: 20px;
      .hot-city {
        display: inline-block;
        margin-right: 10px;
        border: 1px solid #dcdfe6;
        background-color: #ededed;
        margin-bottom: 10px;
        padding: 8px 12px;
        border-radius: 4px;
        cursor: pointer;
      }
    }
    .alphabet {
      position: fixed;
      right: 10px;
      top: 30%;
      list-style: none;
      li {
        list-style: none;
        cursor: pointer;
      }
    }
    .city-group {
      padding: 20px;
      width: 100%;
      .city-index {
        padding: 10px 12px;
        color: red;
        font-size: bold;
        background-color: #ededed;
      }
      .city-item {
        width: 100%;
        margin: 0 10px 10px 10px;
        padding: 8px 12px;
        border-bottom: 1px solid #eeeeee79;
        cursor: pointer;
      }
    }
  }
}
.active {
  color: red;
}
</style>
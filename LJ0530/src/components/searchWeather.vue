<template>
  <div class="search">
    <input
      type="text"
      placeholder="请输入城市名称"
      @input="getCityName(inputValue)"
      v-model="inputValue"
    />

    <div
      class="assistant"
      v-if="inputValue.length > 0 ? true : false"
      @click="jump"
    >
      {{ cityName.length > 0 ? cityName : "似乎没有找到你查找的城市" }}
    </div>

    <div class="cities" v-if="inputValue.length == 0 ? true : false">
      <div
        class="city"
        v-for="(city, index) in cityList"
        @mouseenter="cityShow(index)"
        @mouseleave="cityHide(index)"
        :key="city.cityID"
      >
        <transition name="distance">
          <div class="cityName">
            <div>{{ city.cityName }}</div>
            <div>{{ city.cityTemp }}度</div>
          </div>
        </transition>

        <div v-if="city.isHover" class="btn">
          <button @click="searchDetail(city)">查看</button
          ><button @click="deleteCity(city.cityID)">删除</button>
        </div>
      </div>
      <div v-if="cityList.length == 0">
        <h3 class="prompt">
          暂时没有保存过城市天气信息，请查询后点击右上角"+"号保存。
        </h3>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      id: "",
      name: "",
      inputValue: "",
      inputTimer: null,
    };
  },
  computed: {
    ...mapState(["cityList", "cityName", "dailyWeather", "isAdd"]),
  },
  methods: {
    ...mapActions([
      "getDailyWeatherAction",
      "initCityListAction",
      "getCityNameAction",
    ]),
    ...mapMutations(["cityShow", "cityHide", "deleteCityFromList"]),
    getCityName(value) {
      clearTimeout(this.inputTimer);
      this.inputTimer = setTimeout(() => {
        this.getCityNameAction(value);
      }, 1000);
    },
    jump() {
      if (this.cityName.length > 0) {
        this.getDailyWeatherAction(this.cityName).then(() => {
          if (this.dailyWeather) {
            this.$router.push(
              `/${this.dailyWeather.id}?search=${this.dailyWeather.name}`
            );
          }
        });
      }
    },
    searchDetail(city) {
      this.getDailyWeatherAction(city.cityName);
      this.$router.push(`/${city.cityID}?search=${city.cityName}`);
    },
    deleteCity(id) {
      this.deleteCityFromList(id);
    },
  },
  mounted() {
    this.initCityListAction();
  },
};
</script>

<style lang="scss" scoped>
.search {
  margin: 0 0 15px;
  padding: 20px 0 0;
  box-sizing: border-box;
  input {
    display: inline-block;
    border: none;
    border-bottom: 1px solid #ffffff;
    padding: 8px 4px 0;
    background-color: transparent;
    border-bottom-width: 1px;
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    color: #ffffff;
    padding: 8px 4px;
    box-sizing: border-box;
  }
  input::placeholder {
    color: #bbafaf; /* 设置为你想要的颜色值 */
  }
  input:focus {
    outline: none;
    border-bottom: none;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
  }
  .assistant {
    width: 100%;
    height: 40px;
    margin: 0 0 16px;
    padding: 8px 16px;
    background-color: #004e71;
    color: #ffffff;
    font-size: 18px;
    box-sizing: border-box;
    cursor: pointer;
  }
  .cities {
    margin-top: 50px;
    .city {
      display: flex;
      justify-content: space-between;
      align-items: center;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .cityName {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        background-color: #004e71;
        color: #ffffff;
        font-size: 18px;
        height: 30px;
        margin: 0 0 16px;
        padding: 8px 16px;
        transition: width 0.3s linear;
      }
      .cityName:hover {
        width: 78%;
      }
      .btn {
        display: flex;
        align-items: center;
        width: 200px;
        height: 40px;
        margin: 0 0 16px 0;
        transition: all 1s;
        button {
          display: inline-block;
          width: 100px;
          height: 40px;
          line-height: 40px;
          border: none;
          background-color: rgb(238, 184, 67);
          color: #ffffff;
          font-size: 16px;
          cursor: pointer;
          transition: all 1.5s;
          margin: 0 10px;
        }
      }
    }
    .prompt {
      color: white;
      font-weight: 400;
      text-align: center;
    }
  }
}
</style>

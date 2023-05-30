import Vue from "vue";
import Vuex from "vuex";
import {
  getCityInfo,
  getWeatherInfo,
  getNearWeatherInfo,
} from "../api/index.js";
Vue.use(Vuex);

// 创建一个新的 store 实例
const store = new Vuex.Store({
  state: {
    curWeather: {},
    cityList: [],
    dailyWeather: {},
    nearWeather: [],
    cityName: "",
    nearCurWeather: [],
    option: {},
    isAdd: false,
  },
  getters: {
    formattedNearWeather: (state) => {
      return state.nearWeather.map((item, index) => {
        const date = item.date;
        const dayweather = item.dayweather;
        const nightweather = item.nightweather;
        const daypower = `风力 ${item.daypower}`;
        const nightpower = `风力 ${item.nightpower}`;

        // 格式化日期
        const dateParts = date.split("-");
        const month = dateParts[1];
        const day = dateParts[2];

        // 格式化星期
        const weekMap = {
          1: "周一",
          2: "周二",
          3: "周三",
          4: "周四",
          5: "周五",
          6: "周六",
          7: "周日",
        };
        const week = weekMap[+item.week];
        var time = "";
        switch (index) {
          case 0:
            time = "今天";
            break;
          case 1:
            time = "明天";
            break;
          default:
            time = week;
            break;
        }
        return {
          day: time,
          date: `${month}-${day}`,
          dayweather: dayweather,
          daypower: daypower,
          nightweather: nightweather,
          nightpower: nightpower,
        };
      });
    },
  },
  mutations: {
    //根据IP获取当前城市的天气信息
    getCurWeather(state, data) {
      state.curWeather = data;
    },
    //获取某个城市当日天气信息
    getDailyWeather(state, data) {
      state.dailyWeather = data;
      //当cityList中没有这个城市的name时，我们将这个城市的名称保存到cityList中
    },

    //获取最近四天天气信息
    getNearWeather(state, data) {
      state.nearWeather = data;
    },

    addCityToList(state) {
      const cityMsg = state.dailyWeather;
      const city = {
        cityID: cityMsg.id,
        cityName: cityMsg.name,
        cityTemp: cityMsg.temperature,
        isHover: false,
        isADD: true,
      };
      if (state.cityList.indexOf(city) === -1) {
        state.cityList.push(city);
        localStorage.setItem("cityList", JSON.stringify(state.cityList));
        state.isAdd = false;
      }
    },

    deleteCityFromList(state, id) {
      const updatedCityList = state.cityList.filter(
        (item) => item.cityID !== id
      );
      state.cityList = updatedCityList;
      localStorage.setItem("cityList", JSON.stringify(updatedCityList));
    },
    cityShow(state, index) {
      state.cityList[index].isHover = true;
    },
    cityHide(state, index) {
      state.cityList[index].isHover = false;
    },
    initCityList(state, data) {
      if (data) {
        state.cityList = JSON.parse(data);
      }
    },
    getCityName(state, name) {
      state.cityName = name;
      console.log(state.cityName, "click me");
      sessionStorage.setItem("cityName", JSON.stringify(state.cityName));
    },
    initOption(state, data) {
      state.option = {
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          show: false,
        },
        yAxis: {
          type: "value",
          show: false,
        },
        series: [
          {
            name: "day",
            type: "line",
            smooth: true,
            data: data[0],
            label: {
              show: true,
              position: "top",
              formatter: function (params) {
                return "白" + params.value + "°C"; // 在标注上显示数据值，并添加单位
              },
              textStyle: {
                color: "white", // 设置标注字体颜色为红色
              },
            },
          },
          {
            type: "line",
            smooth: true,
            data: data[1],
            label: {
              show: true,
              position: "bottom",
              formatter: function (params) {
                return "晚" + params.value + "°C"; // 在标注上显示数据值，并添加单位
              },
              textStyle: {
                color: "white", // 设置标注字体颜色为红色
              },
            },
            emphasis: {
              focus: "series",
            },
          },
        ],
      };
    },
    searchDetail(state, city) {
      state.dailyWeather = city.dailyWeather;
      state.nearWeather = city.nearWeather;
      if (city.isADD == false) {
        state.isAdd = true;
      }
    },
    changeAdd(state, id) {
      const idList = [];
      state.cityList.forEach((item) => {
        if (item.cityID) {
          idList.push(item.cityID);
        }
      });
      if (
        idList.some((item) => {
          return item === id;
        })
      ) {
        state.isAdd = false;
      } else {
        state.isAdd = true;
      }
    },
  },
  actions: {
    async getCurWeatherAction(ctx) {
      const cityMsg = await getCityInfo("武汉市");
      if (cityMsg) {
        const id = cityMsg.geocodes[0].adcode;
        const weatherMsg = await getWeatherInfo(id);
        const weatherInfo = weatherMsg.lives[0];
        const curWeather = {
          id: id,
          name: weatherInfo.city,
          weather: weatherInfo.weather,
          temperature: weatherInfo.temperature,
          winddirection: weatherInfo.winddirection,
          windpower: weatherInfo.windpower,
        };
        ctx.commit("getCurWeather", curWeather);
      }
    },
    async getNearWeatherInfoAction(ctx, city) {
      const cityMsg = await getCityInfo(city);
      const id = cityMsg.geocodes[0].adcode;
      const res = await getNearWeatherInfo(id);
      const data = res.forecasts[0].casts;
      const dayTempList = [];
      const nightTempList = [];
      data.forEach((item) => {
        dayTempList.push(+item.daytemp);
        nightTempList.push(+item.nighttemp);
      });
      ctx.commit("initOption", [dayTempList, nightTempList]);
      ctx.commit("getNearWeather", data);
    },

    async getDailyWeatherAction(ctx, city) {
      try {
        if ((await getCityInfo(city)) != "数据不存在") {
          const cityMsg = await getCityInfo(city);
          const id = cityMsg.geocodes[0].adcode;
          const weatherMsg = await getWeatherInfo(id);
          const weatherInfo = weatherMsg.lives[0];
          const dailyWeather = {
            id: id,
            name: weatherInfo.city,
            weather: weatherInfo.weather,
            temperature: weatherInfo.temperature,
            winddirection: weatherInfo.winddirection,
            windpower: weatherInfo.windpower,
            humidity: weatherInfo.humidity,
          };
          ctx.commit("changeAdd", id);
          console.log(id, "id");
          ctx.commit("getDailyWeather", dailyWeather);
          ctx.dispatch("getNearWeatherInfoAction", dailyWeather.name); //action之间相互调用要用dispatch
        }
      } catch (error) {
        console.log(error);
      }
    },

    initCityListAction(ctx) {
      const data = localStorage.getItem("cityList");
      ctx.commit("initCityList", data);
    },

    async getCityNameAction(ctx, name) {
      try {
        const cityMsg = await getCityInfo(name);

        if (cityMsg !== "数据不存在") {
          const cityName =
            cityMsg.geocodes[0].district.length > 0
              ? cityMsg.geocodes[0].district
              : cityMsg.geocodes[0].city.length > 0
              ? cityMsg.geocodes[0].city
              : cityMsg.geocodes[0].province;
          ctx.commit("getCityName", cityName);
        }
      } catch (error) {
        // 处理异常情况
      }
    },
  },
});

export default store;

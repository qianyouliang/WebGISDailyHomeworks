import { ref, onMounted, h } from 'vue'
import { defineStore } from 'pinia'
import { getCity, getCityByName } from '../api/index.js'

export const useMainStore = defineStore('main', () => {
  const currentCity = ref("武汉")
  const hotCities = ref();
  const cities = ref();
  var cityName = ref("");
  const getLocalCity = async () => {
    const resCurrentCity = await getCityByIp();
    currentCity.value = resCurrentCity.data.city;
  }
  const changeCurrentCity = (val) => {
    currentCity.value = val;
    localStorage.setItem("currentCity", JSON.stringify(val));
  }

  const searchCity = async (val) => {
    try {
      const res = await getCityByName(val);
      const cityMsg = res.data;
      cityName.value = cityMsg.geocodes[0].district.length > 0
        ? cityMsg.geocodes[0].district
        : cityMsg.geocodes[0].city.length > 0
          ? cityMsg.geocodes[0].city
          : cityMsg.geocodes[0].province;
    }
    catch (err) {
    }
  }
  onMounted(async () => {
    if (localStorage.getItem("currentCity")) {
      currentCity.value = JSON.parse(localStorage.getItem("currentCity"))
    }
    const res = await getCity();
    hotCities.value = res.data.data.hotCities;
    cities.value = res.data.data.cities;
  })

  return { cityName, currentCity, hotCities, cities, changeCurrentCity, searchCity }
});

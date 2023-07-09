import { ref,} from 'vue'
import { defineStore } from 'pinia'
export const useCityStore = defineStore('city', () => {
  const city = ref("武汉");
  const changeCity = (val) => {
    city.value = val;
  }

  return { city, changeCity }
})
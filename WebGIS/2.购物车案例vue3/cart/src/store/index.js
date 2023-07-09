// store/index.js
import { getProducts } from '../api/request.js'
import { defineStore } from 'pinia'
const useStore = defineStore('main', {
    state: () => {
        return {
            cartList: [],
        }
    },
    //pinia中移除了mutation的概念
    getters: {},//与vuex没区别，可以视作是pinia的计算属性，具有缓存功能
    actions: {
        async getProductLists() {
            const productLists = await getProducts()
            this.cartList = productLists
        },
        deleteGoods(id) {
            this.cartList = this.cartList.filter(item=>item.id!=id);
        }

    },
})
export { useStore }
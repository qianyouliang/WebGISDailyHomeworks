<template>
  <div>
    <h1>购物车</h1>
    <div>
      <table>
        <tr>
          <th>
            全选<input
              type="checkbox"
              v-model="isSelectedAll"
            />
          </th>
          <th class="goods">商品</th>
          <th>单价</th>
          <th>数量</th>
          <th>小计</th>
          <th>操作</th>
        </tr>
        <tr v-for="goods in cartList" class="item">
          <td>
            <input
              type="checkbox"
              :checked="goods.isSelected"
              v-model="goods.isSelected"
            />
          </td>
          <td class="goods">
            <img :src="goods.productCover" alt="" />{{ goods.productName }}
          </td>
          <td>{{ goods.productPrice }}</td>
          <td><input type="text" v-model="goods.productCount" /></td>
          <td>${{ Math.round(goods.productPrice * goods.productCount, 2) }}</td>
          <td>
            <button class="delete" @click="deleteGoods(goods.id)">删除</button>
          </td>
        </tr>
      </table>
      <h2 id="sum">总价格：${{ sum }}</h2>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "../store/index.js";
import { storeToRefs } from "pinia";
import { onMounted, ref, computed, watch } from "vue";
const store = useStore();
const cartList = ref(store.cartList);
const isSelectedAll = computed({
  get: () => {
    return cartList.value.every((item) => {
      return item.isSelected == true;
    });
  },
  set: (newValue) => {
    if (newValue) {
      cartList.value.forEach((item) => {
        item.isSelected = true;
      });
    } else {
      cartList.value.forEach((item) => {
        item.isSelected = false;
      });
    }
  },
});

const deleteGoods = (id) => {
  store.deleteGoods(id);
  const index = cartList.value.findIndex((goods) => goods.id === id);
  if (index !== -1) {
    cartList.value.splice(index, 1);
  }
};

const fetchProductLists = async () => {
  await store.getProductLists();
  cartList.value = store.cartList;
};

onMounted(async () => {
  fetchProductLists();
});

const sum = computed(() => {
  let sum = 0;
  cartList.value.forEach((goods) => {
    if (goods.isSelected)
      sum += Math.round(goods.productPrice * goods.productCount, 2);
  });
  return sum;
});
</script>

<style lang="scss" scoped>
h1 {
  margin: 0 auto;
  text-align: center;
  margin-bottom: 20px;
}
table {
  width: 100%;
  border: 1px solid white;
  margin: 0 auto;
  tr {
    display: flex;
  }
  .item:hover {
    background-color: gray;
  }
}

th {
  font-weight: bold;
  text-align: center;
  padding: 8px;
  width: 200px;
}

td {
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  border-bottom: 1px solid white;
  input {
    width: 100px;
  }
}
.goods {
  width: 400px;
}
img {
  width: 100px;
}

#sum {
  margin-top: 20px;
  font-weight: bold;
}
</style>
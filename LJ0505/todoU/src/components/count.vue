<template>
  <div class="footer">
    <div v-if="tasks.length" class="count">
      <span>
        <input type="checkbox" v-model="allChecked" />待办事项共有{{
          tasks.length
        }}项</span
      >
      <button @click="clear">全部删除</button>
    </div>
    <h2 v-else>没有代办事项</h2>
  </div>
</template>

<script>
export default {
  props: ["tasks","clear"],
  methods: {
    
  },
  computed: {
    // allChecked(){
    //   //当所有task的isChecked都为true时，返回true
    //   return this.tasks.every(task=>task.isChecked===true)
    // }
    allChecked: {
      //当所有task的isChecked都为true时，返回true
      get() {
        return this.tasks.every((task) => task.isChecked === true);
      },
      //当修改计算属性的时候，如果修改后的值为true，那么所有的task的isChecked都为true；
      //如果为false，那么所有的task的isChecked都为false
      set(value) {
        if (value) {
          this.tasks.forEach((task) => (task.isChecked = true));
        } else {
          this.tasks.forEach((task) => (task.isChecked = false));
        }
      },
    },
  },
};
</script>

<style>
.footer {
  background-color: #ffffff;
  padding: 1.8em 1.25em;
  margin-top: 3.8em;
  width: 100%;
  box-shadow: 0 1.25em 1.8em rgba(1, 24, 48, 0.15);
  border-radius: 0.6em;
}
.footer .count {
  display: flex;
  justify-content: space-between;
  font-size: 1.2em;
  color: #111111;
  font-weight: 500;
}
.footer button {
  display: block;
  background-color: skyblue;
  font-size: 1em;
  border-radius: 0.3em;
  padding: 4px 12px;
  border: none;
  outline: none;
  cursor: pointer;
}
</style>
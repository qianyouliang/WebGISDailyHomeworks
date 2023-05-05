<template>
  <div id="new-task">
    <input type="text" placeholder="请输入代办事项" v-model.trim="input" />
    <button @click="add(input)">添加</button>
  </div>
</template>

<script>
export default {
  props: ["tasks"],
  data() {
    return {
      input: "",
    };
  },
  methods: {
    add() {
      if (!this.input) {
        return alert("请输入有效内容");
      }
      //将input追加到tasks数组种
      this.tasks.push({
        message: this.input,
        id: Date.now(),
        isEdited: false, //如果是false input框隐藏 显示span
        isChecked: false,
      });
      console.log(this.tasks);
      this.input = "";
    },
  },
};
</script>

<style>
#new-task {
  position: relative;
  background-color: #ffffff;
  padding: 1.8em 1.25em;
  border-radius: 0.3em;
  box-shadow: 0 1.25em 1.8em rgba(1, 24, 48, 0.15);
  display: grid;
  grid-template-columns: 9fr 3fr;
  gap: 1em;
}
input[type="checkbox"] {
  margin-right: 10px;
}
.isChecked {
  background-color: #0b87ff;
}
#new-task input {
  font-family: "Poppins", sans-serif;
  font-size: 1em;
  border: none;
  border-bottom: 2px solid #d1d3d4;
  padding: 0.8em 0.5em;
  color: #111111;
  font-weight: 500;
}
#new-task input:focus {
  outline: none;
  border-color: #0b87ff;
}
#new-task button {
  font-family: "Poppins", sans-serif;
  font-weight: 500;
  font-size: 1em;
  background-color: #0b87ff;
  color: #ffffff;
  outline: none;
  border: none;
  border-radius: 0.3em;
  cursor: pointer;
}
</style>
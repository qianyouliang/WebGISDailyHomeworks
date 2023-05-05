<template>
  <li>
    <input
      type="checkbox"
      name=""
      :class="{ isChecked: task.isChecked }"
      v-model="task.isChecked"
    />
    <span
      v-if="!task.isEdited"
      @dblclick="dblclick(task.id)"
      :class="{ 'is-checked': task.isChecked }"
    >
      {{ task.message }}</span
    >
    <input
      type="text"
      v-else
      ref="editInput"
      v-model="task.message"
      @blur="task.isEdited = !task.isEdited"
    />
    <button @click="del(task.id)">删除</button>
  </li>
</template>

<script>
export default {
  props: ["task", "tasks"],
  data() {
    return {};
  },
  methods: {
    del(id) {
      //拿到了选中的那个li的index
      const index = this.tasks.findIndex((task) => task.id === id);
      this.tasks.splice(index, 1);
    },
    // checked(id) {
    //   const task = this.tasks.find((task) => task.id === id);
    //   task.isChecked = !task.isChecked;
    // },
    dblclick(id) {
      const task = this.tasks.find((task) => task.id === id);
      task.isEdited = !task.isEdited;
      this.$nextTick(() => {
        this.$refs.editInput.focus();
      });
    },
    /* 
    this.$nextTick() 是 Vue 提供的一个方法，它允许你在下一个 DOM 更新周期后延迟执行某个函数。
    在这个例子中，我们使用 this.$nextTick() 确保在调用 this.$refs.editInput.focus() 之前，输入框已经被渲染到 DOM 中。这样一来，在双击后，输入框就能立即获得焦点。
    */
  },
};
</script>

<style>
li {
  display: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
}
li span {
  flex: 1;
}
li button {
  background-color: skyblue;
  border-radius: 0.3em;
  padding: 4px 12px;
  border: none;
  outline: none;
  cursor: pointer;
}
.is-checked {
  text-decoration: line-through;
}
</style>
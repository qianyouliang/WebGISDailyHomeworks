<template>
  <div id="app">
    <Form :tasks="tasks"></Form>
    <TodoList v-if="this.tasks.length" :tasks="tasks">
    </TodoList>
    <Count :tasks="tasks" :clear="clear"></Count>
  </div>
</template>

<script>
import Count from "./components/count.vue";
import Form from "./components/form.vue";
import TodoList from "./components/todoList.vue";
import Todo from "./components/todo.vue";
export default {
  data() {
    return {
      tasks: [],
      input: "", //收集输入框的内容，
    };
  },
  components: {
    Count,
    Form,
    TodoList,
    Todo,
  },
  methods: {
    clear() {
      this.tasks = [];
    },
  },

};
</script>

<style>
body {
  background-color: #54a4f3;
  /* background-color: rgb(241, 141, 158); */
}
#app {
  width: 90%;
  max-width: 34em;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
}
* {
  margin: 0;
  padding: 0;
}
</style>
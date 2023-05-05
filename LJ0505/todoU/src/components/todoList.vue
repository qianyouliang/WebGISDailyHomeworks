<template>
    <ul id="tasks">
        <Todo
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        :tasks="tasks"
      ></Todo>
    </ul>
</template>

<script>
import Todo from "./todo.vue";
export default {
  props: ["tasks"],
  data() {
    return {};
  },
    components: {
        Todo,
    },
};
</script>

<style>
#tasks {
  list-style: none;
  background-color: #ffffff;
  position: relative;
  padding: 1.8em 1.25em;
  margin-top: 3.8em;
  width: 100%;
  height: auto;
  box-shadow: 0 1.25em 1.8em rgba(1, 24, 48, 0.15);
  border-radius: 0.3em;
}
#tasks li{
    list-style: none;
}
</style>
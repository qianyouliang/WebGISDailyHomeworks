<template>
  <div class="personal-homepage">
    <h1>{{ username }}</h1>
    <img :src="avatar" alt="User Avatar" />
    <div class="user-info">
      <p><strong>Location:</strong> {{ location }}</p>
      <p><strong>Interests:</strong></p>
      <ul>
        <li v-for="interest in interests" :key="interest">{{ interest }}</li>
      </ul>
      <p><strong>Contact:</strong> {{ contact }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const username = ref("John Doe");
const avatar = ref("/path/to/avatar.png");
const location = ref("Your City, Country");
const interests = ref(["Programming", "Gaming", "Reading"]);
const contact = ref("contact@example.com");
</script>

<style lang="scss" scoped>
.personal-homepage {
  text-align: center;
  padding: 20px;
  background-color: #f2f2f2;
}

h1 {
  color: #333;
  font-size: 24px;
  margin-bottom: 10px;
}

img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-bottom: 20px;
}

.user-info {
  text-align: left;
}

ul {
  list-style-type: none;
  padding: 0;
  margin-bottom: 10px;
}

li {
  color: #666;
  font-size: 16px;
}

p {
  color: #999;
  font-size: 14px;
  margin-bottom: 5px;
}

strong {
  font-weight: bold;
}
</style>

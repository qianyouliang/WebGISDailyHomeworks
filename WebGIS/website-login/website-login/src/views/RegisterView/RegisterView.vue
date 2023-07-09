<template>
  <div id="register">
    <div class="jumpToLogin">
      已有账号？<span @click="jumpToLogin">点击登录</span>
    </div>
    <div class="register">
      <h2>Register</h2>
      <form @submit.prevent="register">
        <label for="account">Account:</label>
        <input type="text" id="account" v-model="account" required />
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
        <button type="submit">Register</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { registerAuth } from "../../api/index.js";
import { ElMessage } from "element-plus";

const account = ref("");
const password = ref("");
const $router = useRouter();

const register = async () => {
  // 获取表单中的输入值
  const accountVal = account.value;
  const passwordVal = password.value;
  // 调用注册接口
  const res = await registerAuth({
    accountVal,
    passwordVal,
  }); 
  const { code, msg ,token } = res.data;
  // 注册成功后，将token存入localStorage
  
  switch (code) {
    case 10003:
      ElMessage({
        message: msg,
        type: "success",
      });
      localStorage.setItem("token", token);
      break;
    case 10004:
      ElMessage({
        message: msg,
        type: "error",
      });
      return;
    case 10005:
      ElMessage({
        message: msg,
        type: "error",
      });
      return;
  }
  setTimeout(() => {
    $router.push("/login");
  }, 1000);
};

const jumpToLogin = () => {
  $router.push("/login");
};
</script>

<style lang="scss" scoped>
#register {
  background-color: #104074;
  width: 100%;
  height: 100vh;
}
.jumpToLogin {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #fff;
  cursor: pointer;
}
.jumpToLogin:hover {
  color: #007bff;
}
.register {
  position: absolute;
  top: 35%;
  left: 35%;
  width: 400px;
  height: 300px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #cec0c034;
}

h2 {
  text-align: center;
  color: #fff;
}

form {
  display: flex;
  flex-direction: column;
  color: #fff;
}

label {
  margin-bottom: 5px;
}

input {
  padding: 5px;
  margin-bottom: 10px;
}

button {
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
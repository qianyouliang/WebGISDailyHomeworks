<template>
  <div id="login">
    <div class="jumpToRegister">
      没有账号？<span @click="jumpToRegister">点击注册</span>
    </div>
    <div class="login">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <label for="account">Account:</label>
        <input type="text" id="account" v-model="account" required />
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  </div>
</template> 

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import { loginAuth } from "../../api/index.js";

const $router = useRouter();

const account = ref("");
const password = ref("");

const login = async () => {
  const accountVal = account.value;
  const passwordVal = password.value;
  const tokenLocal = localStorage.getItem("token");
  //当Token不存在时，调用登录接口
  const res = await loginAuth({
    accountVal,
    passwordVal,
    tokenLocal,
  });
  const { code, msg, token } = res.data;
  switch (code) {
    case 10009:
      ElMessage({
        message: msg,
        type: "success",
      });
      break;
    case 10000:
      ElMessage({
        message: msg,
        type: "success",
      });
      localStorage.setItem("token", token);
      break;
    case 10001:
      ElMessage({
        message: msg,
        type: "error",
      });
      return;
    case 10002:
      ElMessage({
        message: msg,
        type: "error",
      });
      return;
  }
  setTimeout(() => {
    $router.push("/");
  }, 1000);
};
const jumpToRegister = () => {
  $router.push("/register");
};
</script>

<style lang="scss" scoped>
#login {
  background-color: #104074;
  width: 100%;
  height: 100vh;
}
.jumpToRegister {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #fff;
  cursor: pointer;
}
.jumpToRegister:hover {
  color: #007bff;
}
.login {
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
  padding: 10px;
  margin-bottom: 20px;
  height: 35px;
}

button {
  padding: 10px;
  margin: 20px 0;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
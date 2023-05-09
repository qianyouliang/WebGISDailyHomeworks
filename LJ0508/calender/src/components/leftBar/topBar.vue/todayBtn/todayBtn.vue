<template>
  <button name="returnToday" id="returnToday" @click="returnToday">返回今天</button>
</template>

<script>
export default {
    inject:['returnToday'],

}

</script>

<style>
#returnToday{
    display: inline-block;
    width: 120px;
    height: 30px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #fff;
    color: #000;
}
</style>
<template>
      <div id="week">
        <div>一</div>
        <div>二</div>
        <div>三</div>
        <div>四</div>
        <div>五</div>
        <div>六</div>
        <div>日</div>
    </div>
</template>

<script>
export default {

}
</script>

<style>
#week{
    display:grid ;
    grid-template-columns: repeat(7,1fr);
    width: 100%;
    height: 10%;
    border-bottom: 1px solid #ccc;
}
#week div{
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    box-sizing: border-box;
    text-align: center;
    width: 100%;
    height: 100%;
}
</style>
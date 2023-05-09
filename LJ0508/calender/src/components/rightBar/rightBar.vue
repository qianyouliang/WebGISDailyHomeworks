<template>
  <div id="rightBar">
    <div id="todayDate">{{ dateMessage.date }}</div>
    <div id="Day">{{ day }}</div>
    <div id="lunar">{{ dateMessage.lunar }}</div>
    <div id="lunYear">{{ dateMessage.lunarYear}}&nbsp;{{ dateMessage.animalsYear }}</div>
    <div id="SA">
        <div id="suit">
            <div class="title">宜</div>
            {{ dateMessage.suit }}
        </div>
        <div id="avoid">
            <div class="title">忌</div>
            {{ dateMessage.avoid }}
        </div>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return {
            day: null,
            dateMessage:Object,
            date: null,
        }
    },
    props: ['date_message'],
    mounted(){
        this.dateMessage = this.date_message;
        const timeLapse = this.dateMessage.date.split('-');
        this.dateMonth = timeLapse[1];
        this.day = timeLapse[2];  
        if(+this.day[1] <=9 ){
            
            if(+this.day[2] <= 9){
                this.date = `${this.day[0]}-0${this.day[1]}-0${this.day[2]}`
            }
                
        }
    },
   
}   
</script>
 
<style>
#rightBar{
    width: 15%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    background-color: #4E6EF2;
}
#todayDate{
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    box-sizing: border-box;
    background-color: #4E6EF2;
}
#Day{
    width: 80%;
    height: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 60px;
    box-sizing: border-box;
    
    background-color: #b6c3ec;
    border-radius: 15px;
    border:1px solid #ccc;
    padding: 10px;
}
#lunar{
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    box-sizing: border-box;
    background-color: #4E6EF2;
}
#lunYear{
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    box-sizing: border-box;
    background-color: #4E6EF2;
}
#SA{
    width: 100%;
    height: 60%;
    background-color: #7f96f0bd;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
}
.title{
    font-size: 30px;
    font-weight: bold;
    color: white;
    position: absolute;
    top: 10px;

}
#suit{
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 16px;
    box-sizing: border-box;
    padding: 60px 15px 0px;
    position: relative;
    
}
#avoid{
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 16px;
    box-sizing: border-box;
    padding: 60px 15px 0px;
    position: relative;
}
</style>
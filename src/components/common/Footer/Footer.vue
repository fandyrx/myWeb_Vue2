<template>
  <div class="footer">

   <div class="wave1"></div>
   <div class="wave2"></div>

 </div>
</template>

<script>
export default {
  name: 'Footer',
 }
</script>

<style scoped>
  .footer{
    height: 40px;
    width: 100%;   
    position: relative;
    background-color: #fff;
    
 
  }
.wave1 {
  position: absolute;	
  width: 200%;
	height: 40px;
  
  
  background: url(../../../assets/img/wave.png) no-repeat ;
	background-size: 100% 100%;
	background-position: 0px 0px;
   animation:  WaveMove 5s linear infinite;
  
}
.wave2 {
	position: absolute;
  left: 0px;
	bottom: 0px;

	width: 200%;
	height: 40px;

  background: url(../../../assets/img/wave.png) no-repeat ;
	background-size: 100% 100%;
	background-position: 0px 0px;
   animation:  WaveMove 10s linear alternate-reverse infinite;
}

 @keyframes WaveMove {
    0% {
      left: 0;
    }  
    
    100%{
      left: -100%;   
    }
 }

 

</style>
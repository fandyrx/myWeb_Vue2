<template>
		<div class="outer">
			 
			
				
					<div class="weather-show"
   	 				 @click="handleClick"
						 @mouseover="handleEnter"
						 @mouseleave="handleLeave"
					 >
					 <i class="weather-text" :style="$attrs.position" >{{title}}</i>	
					 </div> 
	

         <div v-show="isShow" class="wrapper">
					 <div id="he-plugin-standard" v-bind="$attrs" v-on="$listeners" ></div>
				 </div>
				
		</div>
	
</template>



<script>
export default {
	name: "Weather",
	props:['title'],
	data(){
		return{
			isShow: false
		}
	},
	mounted() {
	
		window.WIDGET = {
			CONFIG: {
				layout: "1",
				width: "350",
				height: "150",
				background: "1",
				dataColor: "FFFFFF",
				borderRadius: "10",
				key: "5b062d9a19db4943ae8f0aee42ff3647",
			}
		};
		  let script = document.createElement('script');
      script.type = 'text/javascript';
      script.src="https://widget.qweather.net/standard/static/js/he-standard-common.js?v=2.0";
      document.getElementsByTagName('head')[0].appendChild(script);

	},
	methods:{
			//控制天气开关
		handleClick(e){
				this.isShow = !this.isShow 
				
		},
		handleEnter(){
				this.isShow = true
			
		},
		handleLeave(){
			this.isShow = false
	 
		},
	}
	
};
</script>

<style lang="less" scoped>

.switch{
	position: relative;
	display: flex;
	justify-content: center;
	
}
	
/* showButton */
.weather-show{
	border-radius: 50%;
	height: 20px;
	width: 20px;
  border: 20px solid lightslategray;
	box-shadow: 0 0 0 5px rgba(2, 238, 255, 0.2);
	
	&:hover{
		color: lightblue;
	  border: 20px solid lightgreen;
	  box-shadow: 0 0 0 5px rgba(25, 164, 174, 0.2);
	  transition: all  0.5s
	}
	.weather-text{
	  position:absolute;
	
		width: 50px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		text-align: center;
	  line-height: 12px;
		font-size: 12px ;
  }

}
/* weather */
.wrapper{
 position: absolute;
 right: 0;
}

</style>

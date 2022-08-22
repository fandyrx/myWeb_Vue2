<template>
	<div class="container">
		<Navbar>
			<img slot="left"  src="~@/assets/img/NavLogo.jpg"   alt="loading.." class="nav-logo"/>

			<span slot="middle">
				<el-menu
					:default-active="activeIndex"
					class="el-menu-demo"
					mode="horizontal"
					background-color="#9c9c9c"
					text-color="#fff"
					active-text-color="#ffd04b"
					router
					@select="handleSelect"
				>
					<el-menu-item index="showCards">主页</el-menu-item>

					<el-submenu index="login">
						<template slot="title">下拉展示</template>
						<el-menu-item index="/login">测试跳转登录页(index为login路径)</el-menu-item>
						<el-menu-item index="2-2" disabled>展示用</el-menu-item>
					</el-submenu>

					<el-menu-item index="blog">未完成Blog</el-menu-item>
				</el-menu></span
			>

			<div slot="right" class="user" >
				<span class="username">{{userInfo.username}}</span>
				<img class="avatar" :src="userInfo.avatar" alt="@">		
			</div>
		</Navbar>

		<!-- 天气 -->
		
			<div class="weather-show"
       @click="handleClick"
			 @mouseover="handleEnter"
			 @mouseleave="handleLeave"
			 >
			  <i class="weather-text" >天气预报</i>
			 </div>
		<div class="weather-warp" v-show="isShow">	

			<Weather />
		</div>

		<MainArea  :sentence = sentence />
					
		<Footer></Footer>

		
	</div>
	
 




</template>

<script>
import{ reqUserInfo,reqSentences  } from "@/api/index"
import Weather from "@/components/common/Weather/Weather.vue";
import Navbar from "@/components/common/NavBar/Navbar.vue";
import MainArea from '@/views/home/mainArea/MainArea'

import Footer from "@/components/common/Footer/Footer";

export default {
	name: "HomePage",
	data() {
		return {
			
			activeIndex: "home",
			isShow:false,
			userInfo:{
				id:'',
				email:'',
				avatar:"",
				username:"",
				data:''
			},
			sentence:{
				from:'',
				name:''
			}
		};
	},
	components: {
		Navbar,
		Footer,
		Weather,
		MainArea,
		
	},
	methods: {
		handleSelect(key, keyPath) {
			//验证ui组件作用
			console.log(key, keyPath);
		},
   async	getUserInfo(){
			let result = await reqUserInfo()
		   if(result.code === 200){
				this.userInfo = result.data
			 }
	
		},

		async getSentences() {
			let result = await reqSentences()
				if(result.code === 200){
					this.sentence = result.result
				}
		},
		//控制天气开关
		handleClick(e){
				this.isShow = !this.isShow 
				// ? 无法解绑?
				// window.removeEventListener("mouseleave",this.handleLeave,true)
				// e.target.removeEventListener("mouseleave",this.handleLeave)
				// 	this.$off('mouseleave',this.handleLeave)
					
		},
		handleEnter(){
				this.isShow = true
			
		},
		handleLeave(){
			this.isShow = false
	  
		}
	},
	mounted(){
		//1.模拟用户信息头像,随机生成句子
		this.	getUserInfo(),
		this.getSentences()
	}
};
</script>

<style scoped>
.container {
	position: relative;
	
	/* background-color: skyblue; */
}


.nav-logo{
	height: 64px;
	border-radius: 10px;
}

.weather-warp {
	position: absolute;
	margin-top:50px;
	right: 0;
	z-index: 2;
}
.user{
	margin-right:  20px;
	width: 100%;
	height: 100%;
	display: flex;
	vertical-align: middle;
}
.username{
		
    margin-right: 20px;
		color: rgb(78, 70, 70);
		font-size: 14px;
		font-weight: 700;
		
}
.avatar{
	position: relative;
	top:10px;
	width: 30%;
	height: 60%;
	border-radius: 50%;
	box-shadow: 0px 0px 5px #888888;
}

/* weather */
.weather-show{
	position: absolute;
	right: 50px;
  margin: auto;
	border-radius: 50%;
	height: 20px;
	width: 20px;
  border: 20px solid lightslategray;
	box-shadow: 0 0 0 5px rgba(2, 238, 255, 0.2);
}
.weather-show:hover{
	color: lightblue;
	border: 20px solid lightgreen;
	box-shadow: 0 0 0 5px rgba(25, 164, 174, 0.2);
	transition: all  0.5s
}
.weather-text{
	position: absolute;
	right: 25px;
	font-size: 12px;
	width: 50px;
}


</style>

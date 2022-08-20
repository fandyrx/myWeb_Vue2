<template>
	<div class="container">
		<Navbar>
			<span slot="left"> 图标 </span>

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
					<el-menu-item index="home">主页</el-menu-item>

					<el-submenu index="login">
						<template slot="title">下拉展示</template>
						<el-menu-item index="login">测试跳转登录页(index为login路径)</el-menu-item>
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
		<el-switch 
		 		class="switch"
			 v-model="isShow"
			 active-color="#13ce66" 
			 inactive-color="gray"
			 active-text="天气预报"
			 > 
			</el-switch> 
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
			isShow:true,
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
		MainArea
	},
	methods: {
		handleSelect(key, keyPath) {
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

.switch {
	position: absolute;
	right: 0;
}
.weather-warp {
	position: absolute;
	margin-top:20px;
	right: 0;
	z-index: 2;
}
.user{
	margin: 0 20px;
	height: 64px;
	display: flex;
		vertical-align: middle;
}
.username{
    margin-right: 10px;
		color: rgb(78, 70, 70);
		font-size: 14px;
		font-weight: 700;
		
}
.avatar{
	position: relative;
	top:5px;
	width: 50%;
	height: 80%;
	border-radius: 50%;
	box-shadow: 0px 0px 5px #888888;
}
</style>

<template>
	<div class="container">
		
			<el-container>
				<el-aside width="20vw">
					拖拽歌曲,暂时存放(未做接口)
					<PlayList />
				
				</el-aside>

				<el-container>
					<el-header>Search</el-header>
					<el-main >
						<Banner v-show="isShow"/>
						<div class="left">
								<Commend v-show="isShow" :List="tags" :Commend="commend" title="热门推荐"/>
								<Commend v-show="isShow"  :Commend="newAlbums" title="新碟上架"/>
						</div>
						<div class="right">
								<HotSinger />
						</div>
					
						
						
						<transition  name="fade" mode="out-in" appear  >	
								 <router-view  v-if="!isShow" :key="key" /> 	
						 </transition>

					</el-main>
				</el-container>

			</el-container>
		
	</div>
</template>

<script>
 import Banner from '@/views/music/banner/Banner'
 import PlayList from '@/views/music/playList/PlayList'
 import Commend from "@/components/content/commend/Commend.vue"
 import HotSinger from '@/views/music/hotSinger/HotSinger'

 import {reqTopAlbum}  from "@/api/index"

 import {mapState} from "vuex"
export default {
	name: "Music",
	data() {
		return {	
				key: this.$route.fullPath + Math.random(), 
				newAlbums:[]
		};
	},
	components: {
		Banner,
		Commend,
		PlayList,
		HotSinger
		
	},
	methods: {
		//新碟数据获取
	async	getTopAlbum(){
		let res = await	reqTopAlbum();
		if(res.code === 200){
			
			this.newAlbums = res.albums
			
		}else{
			return Promise.reject( new Error('获取新专辑失败'))
		}
		}
	},
	beforeCreate(){
			//轮播图,推荐列表,歌单分类
		this.$store.dispatch("music/getBanner",0)
		this.$store.dispatch("music/getCommend")
		this.$store.dispatch("music/getCategoryList")
		
	},
	mounted(){
		//新碟
		this.getTopAlbum();
		
	},
	computed:{
		...mapState("music",['commend',"tags","isShow"])
	},
	  watch: {
			"$route"(){
				// console.log(this.$route.fullPath ,"routechange");
			}
		}
	

};
</script>

<style scoped>

.container{
	font-family: serif;
}

.el-header{
	background-color: #b3c0d1;
	color: #333;
	text-align: center;
	
}
.el-aside {
	
	background-color: #d3dce6;
	color: #333;  
}

.el-main {
	
	background-color: #e9eef3;
	color: #333;

	
}

body > .el-container {
	margin-bottom: 40px;
}

.el-container{
  width:100vw;
}

	
</style>

<template>
	<div>
		
			<el-container>
				<el-aside >
					Aside
					<PlayList />
				
				</el-aside>

				<el-container>
					<el-header>Search</el-header>
					<el-main >
						<Banner v-show="isShow"/>
						<Commend v-show="isShow" :List="tags" :Commend="commend" title="热门推荐"/>
						
						<transition name="fade" mode="out-in" appear>	
								 <router-view   v-show="!isShow" :key="key" /> 
						 </transition>
					</el-main>

					<!-- <el-footer>	
							<Controler />
					</el-footer> -->

				</el-container>

			</el-container>
		
	</div>
</template>

<script>
 import Banner from '@/views/music/banner/Banner'
 import PlayList from '@/views/music/playList/PlayList'
 import Commend from "@/components/content/commend/Commend.vue"

 import {mapState} from "vuex"
export default {
	name: "Music",
	data() {
		return {		
				key: this.$route.path 
				

		};
	},
	components: {
		Banner,
		Commend,
		PlayList 
	},
	methods: {},
	beforeCreate(){
			//轮播图,推荐列表,歌单分类
		this.$store.dispatch("music/getBanner",0)
		this.$store.dispatch("music/getCommend")
		this.$store.dispatch("music/getCategoryList")
	},

	mounted() {
		

	},
	computed:{
		...mapState("music",['commend',"tags","isShow"])
	},
	

};
</script>

<style scoped>



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
  height:100vh;
}


.play-list {
	min-width: 100%;
	height: 100%;
}
</style>

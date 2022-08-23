<template>
	<div>
		
			<el-container>
				<el-aside >Aside
					
				</el-aside>

				<el-container>
					<el-header>Search</el-header>

					<el-main>
						<Banner/>
						<Commend :List="playList" :Commend="commend" title="热门推荐"/>
						
					</el-main>

					<el-footer>Control</el-footer>
				</el-container>

			</el-container>
		
	</div>
</template>

<script>
 import Banner from '@/views/music/banner/Banner'
 
 import Commend from "@/components/content/commend/Commend.vue"
 import {mapState} from "vuex"
export default {
	name: "Music",
	data() {
		return {
			

		};
	},
	components: {
		Banner,
		Commend,
		
	},
	methods: {},
	mounted() {
		//轮播图,推荐列表,歌单分类
		this.$store.dispatch("music/getBanner",0)
		this.$store.dispatch("music/getCommend")
		
		this.$store.dispatch("music/getPlaylist")

	},
	computed:{
		...mapState("music",['commend',"playList"])
	}
};
</script>

<style scoped>



.el-header,
.el-footer {
  
	background-color: #b3c0d1;
	color: #333;
	text-align: center;
	line-height: 60px;
}
.el-aside {
	background-color: #d3dce6;
	color: #333;
	text-align: center;
 
	line-height: 200px;
  
}

.el-main {
 
	background-color: #e9eef3;
	color: #333;
	text-align: center;
	line-height: 160px;
}

body > .el-container {
	margin-bottom: 40px;
  
}
.el-container{
  height: 600px;
}





.play-list {
	min-width: 100%;
	height: 100%;
}
</style>

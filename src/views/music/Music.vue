<template>
	<div class="container">
		<el-container>
			<el-aside width="20vw">
				拖拽歌曲,暂时存放(未做接口)
				<PlayList />
			</el-aside>

			<el-container>
				<el-header>Search</el-header>
				<el-main>
					<Banner v-show="isShow" />
					<div class="content">
						<div class="left" v-show="isShow">
							<Commend :List="tags" :Commend="commend" title="热门推荐" />
							<new-album :newAlbums="newAlbums" />
						</div>
						<div class="right" v-show="isShow">
							<HotSinger />
						</div>
					</div>

					<transition name="fade" mode="out-in" appear>
						<router-view v-if="!isShow" :key="key" />
					</transition>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
import Banner from "@/views/music/banner/Banner";
import PlayList from "@/views/music/playList/PlayList";
import Commend from "@/components/content/commend/Commend.vue";
import HotSinger from "@/views/music/hotSinger/HotSinger";
import NewAlbum from "./newAlbum/NewAlbum.vue";

import { mapState } from "vuex";

export default {
	name: "Music",
	data() {
		return {
			key: this.$route.fullPath + Math.random(),
		};
	},
	components: {
		Banner,
		Commend,
		PlayList,
		HotSinger,
		NewAlbum,
	},

	beforeCreate() {
		//轮播图,推荐列表,歌单分类
		this.$store.dispatch("music/getBanner", 0);
		this.$store.dispatch("music/getCommend");
		this.$store.dispatch("music/getCategoryList");
		this.$store.dispatch("music/getNewAlbum");
	},

	computed: {
		...mapState("music", ["commend", "newAlbums", "tags", "isShow"]),
	},
	watch: {
		$route() {
			// console.log(this.$route.fullPath ,"routechange");
		},
	},
	beforeDestroy() {
		this.$store.state.music.isShow = true;
	},
};
</script>

<style scoped>
.container {
	font-family: serif;
}

.el-header {
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

.el-container {
	width: 100vw;
}

.content {
	display: flex;
	margin-top: 10px;
}
</style>

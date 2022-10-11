<template>
	<div class="playlist">
		<div class="detail" v-for="item in playlists" :key="item.id" @click="toDetail(item.id)">
			<img :src="item.coverImgUrl" />
			<span>{{ item.name }}</span>
		</div>
	</div>
</template>

<script>
import { reqTopPlayList } from "@/api/index";
import { mapMutations } from "vuex";
export default {
	name: "TopPlayList",
	data() {
		return {
			playlists: [],
			total: "",
		};
	},

	methods: {
		// 1.获取页面歌单数据
		async getTopPlayList() {
			let name = this.$route.query;
			let res = await reqTopPlayList(name);

			if (res.code === 200) {
				this.playlists = res.playlists;
				this.total = res.total;
				//获取数据,展示路由,banner消失
				this.CHANGE_IsShow(false);
			}
		},
		//详情页跳转
		toDetail(id) {
			// music同级路由缓存跳转进不去?

			this.$router.replace({ name: "detail", query: { id } });
			this.$store.state.music.isShow = false;
		},
		...mapMutations("music", ["CHANGE_IsShow"]),
	},

	mounted() {
		this.getTopPlayList();
	},
};
</script>

<style lang="less" scoped>
.playlist {
	display: flex;
	justify-content: space-between;
	flex-flow: row wrap;
	font: 700 14px 黑体;
	text-align: left;
	.detail {
		width: 20vh;
		height: 30vh;
		display: flex;
		flex-direction: column;
		align-items: center;

		img {
			width: 100%;
		}
		span {
			padding: 1vh;
			text-overflow: ellipsis;
			overflow: hidden;
			display: -webkit-box;
			-webkit-line-clamp: 3;
			-webkit-box-orient: vertical;
		}
	}
}
</style>

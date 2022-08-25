<template>
	<div class="outer">
		<NavBar>
			<div slot="left">
				<i>图标</i>
			</div>
			<div slot="middle">播放全部 (共{{ itemList.length }}首)</div>
			<div slot="right">收藏图标</div>
		</NavBar>

		<div class="detail" v-for="(item, index) in itemList" :key="item.id">
		  	<span>{{ index + 1 }}</span>

			<div class="aut" @click="toPlay(index)">
				<img v-lazy="item.al.picUrl" alt="#" />
				<div class="songInfo">
					<p>{{ item.name }}</p>
					<div>
						<span v-for="singer in item.ar" :key="singer.id">
							{{ singer.name }}
						</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import NavBar from "@/components/common/NavBar/Navbar.vue";
import { mapMutations } from "vuex";
export default {
	name: "ItemMusic",
	props: {
		itemList: {
			type: Array,
			default() {
				return [];
			},
		},
	},
	data() {
		return {};
	},
	components: {
		NavBar,
	},
	methods: {
		toPlay(index) {
			this.getMusicUrl(index);
			this.SET_MUSICURL(this.itemList);
		},
		...mapMutations("music", ["SET_MUSICURL", "getMusicUrl"]),
	},
	mounted() {},
};
</script>

<style lang="less" scoped>
.outer {
	background-color: #fff;
	border-radius: 30px 30px 0 0;
	padding: 0 10px;
}

.detail {
	margin-bottom: 10px;
	font-size: 14px;
	display: flex;

	span {
		width: 20px;
		text-align: center;
		line-height: 40px;
	}
	img {
		width: 50px;
		height: 50px;
	}
	.aut {
		display: flex;
		margin-left: 5px;
		.songInfo {
			margin-left: 15px;
			line-height: 100%;
			display: flex;
			flex-direction: column;
		}
	}
}
</style>

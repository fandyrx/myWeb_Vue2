<template>
	<div class="outer">
		<NavBar>
			<div slot="left">
				<i>图标</i>
			</div>
			<div slot="middle">播放全部 (共{{ itemList.length }}首)</div>
			<div slot="right">
				<div class="more">
					<span>收藏图标</span>
					<span @click="handleMore">所有歌曲</span>
				</div>
			</div>
		</NavBar>

		<div class="detail" v-for="(item, index) in showList" :key="item.id">
			<span>{{ index + 1 }}</span>
			<!-- 跨组件如何拖拽整个 -->
			<div class="aut" @click="toPlay(index)" :data-index="index" draggable="true" :id="item.id" @dragstart="drag">
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
		return {
			showList: [],
		};
	},
	components: {
		NavBar,
	},
	methods: {
		toPlay(index) {
			this.getMusicUrl(index);
			this.SET_MUSICITEM(this.itemList);
		},
		drag(e) {
			//调试用
			// console.log(e.target.id);
			e.dataTransfer.setData("text", e.target.id);
		},
		...mapMutations("music", ["SET_MUSICITEM", "getMusicUrl"]),
		//加载更多歌曲
		handleMore() {
			this.showList = this.itemList;
		},
	},

	watch: {
		itemList() {
			//为了侧边一直有数据，但是，不同歌单呢？
			// 需要后端数据 维护
			this.SET_MUSICITEM(this.itemList);
			this.showList = this.itemList.slice(0, 20);
		},
	},
};
</script>

<style lang="less" scoped>
.outer {
	background-color: #fff;
	border-radius: 30px 30px 0 0;
	padding: 0 10px;
	.more span {
		margin-left: 10px;
	}
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
		cursor: pointer;
		display: flex;
		margin-left: 5px;
		.songInfo {
			margin-left: 15px;
			line-height: 100%;
			display: flex;
			flex-direction: column;
			text-overflow: ellipsis;
			overflow: hidden;
			-webkit-line-clamp: 1;
			-webkit-box-orient: vertical;
		}
	}
}
</style>

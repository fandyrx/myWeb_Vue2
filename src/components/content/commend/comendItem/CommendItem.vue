<template>
	<!-- 热门推荐歌单-->
	<div class="show">
		<ul>
			<li  v-for="item in Commend" :key="item.id" @click="toDetail(item.id, item.type)">
				<img v-lazy="item.picUrl" />
				<div class="bottom">bottom</div>

				<p>{{ item.name }}</p>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: "CommendItem",
	props: {
		Commend: {
			type: Array,
			default() {
				return [];
			},
		},
	},
	methods: {
		toDetail(id, type) {
			this.$router.push({name:"detail",query:{ id,type}});
			 this.$store.state.music.isShow = false;
		},
	},
};
</script>

<style lang="less" scoped>
.show {

	ul {
		display: flex;
		flex-wrap: wrap; //自动换行
		justify-content: space-between;

		li {
			width: 140px;
			height: 200px;
			line-height: 100%;
      cursor: pointer;

			img {
				width: 100%;
				height: 140px;
				border-radius: 5px;
			}
			.bottom {
				position: relative;
				top: -15px;
				bottom: 5px;

				height: 15px;
				line-height: 15px;
				background-color: rgba(255, 255, 230, 0.3);
			}
			p {
				padding: 0 5px;
				font-size: 14px;

				text-overflow: ellipsis;
				overflow: hidden;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
			}
		}
	}
}
</style>

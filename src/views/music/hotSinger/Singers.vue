<template>
	<div class="singer-wrapper">
		<div class="title">
			<h3>热门歌手</h3>
			<a href="javascript:;">查看全部> </a>
		</div>
		<ul>
			<li class="singer" v-for="singer in topSingers" :key="singer.id">
				<div class="avator">
					<img :src="singer.picUrl" />
				</div>
				<div class="info">
					<h4>{{ singer.name }}</h4>
					<p>粉丝数量:{{ singer.fansCount }}</p>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	props: {
		topSingers: {
			type: Array,
			default() {
				return [];
			},
		},
	},
	name: "Singers",
};
</script>

<style scoped lang="less">
.singer-wrapper {
	width: 100%;
	padding: 10px;

	.title {
		height: 23px;
		margin-top: 15px;
		border-bottom: 1px solid #ccc;
		font-size: 12px;

		display: flex;
		justify-content: space-between;

		a {
			color: #666;
		}
	}
	.singer {
		background-color: #f4f4f4;
		width: 100%;
		height: 62px;
		margin: 10px 0;
		border: 1px solid #f4f4f4;

		display: flex;

		.avator {
			width: 62px;
			height: 62px;
			img {
				width: 100%;
				height: 100%;
			}
		}
		.info {
			padding-left: 14px;
			border: 1px solid #e9e9e9;
			color: #333;
			h4 {
				margin-top: 8px;
			}
			p {
				font-size: 12px;
				font-weight: normal;
				// width: 99%;
				margin-top: 8px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
	}
}
</style>

<template>
	<div class="container">
		<div class="header">
			<Navbar>
				<div class="back" slot="left" @click="back">后退</div>
			</Navbar>
		</div>

		<div v-if="Object.keys(song).length !== 0" class="title">
			<img class="bg-img" :src="song.coverImgUrl" alt="#" />

			<div class="context">
				<div class="header">
					<div class="left">
						<img :src="song.coverImgUrl" alt="#" />
					</div>

					<div class="right">
						<span class="list-name">歌单名:{{ song.name }} </span>
						<div class="auth">
							<img :src="song.avatarUrl" alt="#" />
							<span>创建者:{{ song.creator }}</span>
						</div>

						<span class="desc">简介:{{ song.description }}</span>
					</div>
				</div>

				<div class="bottom">iconfonts</div>
			</div>
		</div>
	</div>
</template>

<script>
import Navbar from "@/components/common/NavBar/Navbar.vue";
export default {
	name: "ItemTop",
	props: {
		song: {
			type: Object,
			default() {
				return {};
			},
		},
	},

	components: {
		Navbar,
	},
	methods: {
		back() {
			this.$router.go(-1);
			//数据切换 控制器也需要状态改变,否则后面BUG,直接修改监控不到?
			this.$store.state.music.isShow = true;
		},
	},
};
</script>

<style lang="less" scoped>
.header {
	width: 100%;
	// height: 20px;
	.back {
		cursor: pointer;
	}
}

.title {
	position: relative;
	margin-bottom: 10px;
	width: 100%;
	height: 300px;
	.bg-img {
		width: 100%;
		height: 100%;
		filter: blur(20px);
	}
}

.context {
	position: absolute;
	top: 0;
	height: 100%;

	.header {
		display: flex;
		height: 80%;
		.left {
			height: 100%;

			img {
				height: 100%;
				width: 100%;
				border-radius: 10px;
			}
		}

		.right {
			white-space: wrap;
			flex: 1;
			padding: 15px;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.list-name {
				font-weight: 700;
				color: whitesmoke;
			}

			.auth {
				color: dimgray;
				img {
					width: 40px;
					height: 40px;
					border-radius: 50%;
					vertical-align: middle;
				}
				span {
					padding-left: 8px;
				}
			}
			.desc {
				display: -webkit-box;
				overflow: hidden;
				-webkit-line-clamp: 3;
				-webkit-box-orient: vertical;
				font-size: 0.9em;
				font-weight: 700;
			}
		}
	}

	.bottom {
		min-width: 100%;
		height: 20%;
	}
}
</style>

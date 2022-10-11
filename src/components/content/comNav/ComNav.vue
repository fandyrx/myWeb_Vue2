<template>
	<Navbar class="wrapper">
		<div slot="left" class="title">
			<i class="logo sprite_02"></i>
			<h3>{{ title }}</h3>
		</div>

		<div slot="middle" class="middle">
			<span v-for="item in List" :key="item.id" @click="handleTags(item.name)">{{ item.name }}</span>
		</div>

		<div slot="right" class="more">
			<div>更多<i>→</i></div>
		</div>
	</Navbar>
</template>

<script>
import Navbar from "@/components/common/NavBar/Navbar";
export default {
	name: "ComNav",
	props: {
		title: {
			type: String,
			default: "",
		},
		List: {
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
		Navbar,
	},
	methods: {
		handleTags(name) {
			this.$router.push({ name: "topPlayList", query: name });
			this.$store.state.music.isShow = false;
		},
	},
	mounted() {},
};
</script>

<style lang="less" scoped>
.wrapper {
	padding: 10px 0;
	border-bottom: 1px solid rgb(229, 79, 79);
	margin-bottom: 10px;
}

.title {
	display: flex;
	align-items: center;

	.logo {
		height: 30px;

		padding: 0 10px 4px 34px;
		background-position: -225px -156px;
	}
}

.middle {
	font-size: 12px;
	text-align: left;
	margin-left: 10px;

	span {
		padding: 0 20px;
		border-right: 1px solid rgb(114, 70, 70);
		&:hover {
			cursor: pointer;
		}
	}
}
.more {
	font-size: 12px;
	width: 40px;
	&:hover {
		cursor: pointer;
	}
}
</style>

<template>
	<div class="home-nav">
		<Navbar>
			<img slot="left" src="~@/assets/img/NavLogo.jpg" alt="loading.." class="nav-logo" />

			<span slot="middle">
				<el-menu
					:default-active="activeIndex"
					class="el-menu-demo"
					mode="horizontal"
					background-color="#7dab3b"
					text-color="#fff"
					active-text-color="#ffd04b"
					router
				>
					<el-menu-item index="/home/showCards">主页</el-menu-item>

					<el-submenu index="login">
						<template slot="title">下拉展示</template>
						<el-menu-item index="/login">测试跳转登录页(index为login路径)</el-menu-item>
						<el-menu-item index="2-2" disabled>展示用</el-menu-item>
					</el-submenu>

					<el-menu-item index="/home/blog">未完成Blog</el-menu-item>
					<el-menu-item index="/home/music">未完成Music</el-menu-item>
				</el-menu>
			</span>

			<div slot="right" class="user" v-if="userInfo.username">
				<span class="username">{{ userInfo.username }}</span>
				<img class="avatar" :src="userInfo.avatar" alt="@" />
				<i class="log-out" @click="logout">logout</i>
			</div>

			<div v-else slot="right" class="username">
				<router-link to="/login">请登录</router-link>
			</div>
		</Navbar>
	</div>
</template>

<script>
import Navbar from "@/components/common/NavBar/Navbar.vue";
export default {
	name: "home-nav",
	data() {
		return {
			activeIndex: "showCards",
		};
	},
	components: {
		Navbar,
	},
	methods: {
		// logout
		logout() {
			this.$store.commit("user/LOG_OUT");
			//成功后跳转登录
			this.$router.push("/login");
		},
	},
	computed: {
		userInfo() {
			return this.$store.state.user.userInfo;
		},
	},
};
</script>

<style scoped>
.nav-logo {
	height: 64px;
	border-radius: 10px;
}

.user {
	margin-right: 20px;
	width: 100%;
	height: 100%;

	line-height: 64px;
	display: flex;
}
.username {
	line-height: 64px;
	margin-right: 20px;
	color: rgb(78, 70, 70);
	font-size: 14px;

	font-weight: 700;
}
.avatar {
	position: relative;
	top: 10px;
	width: 30%;
	height: 60%;
	border-radius: 50%;
	box-shadow: 0px 0px 5px #888888;
}
.log-out {
	display: block;
	height: 64px;
	padding-left: 5px;
}
.log-out:hover {
	cursor: pointer;
	margin-top: -3px;

	color: crimson;
	transition: all linear 0.2s;
}
</style>

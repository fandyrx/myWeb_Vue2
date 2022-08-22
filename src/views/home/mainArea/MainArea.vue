<template>
	<div class="main-container">
		<el-card class="box-card">
			<div  class="clearfix header">
				<span>每日一句:{{ sentence.name }}</span>
				<span>{{ sentence.from }}</span>
			</div>
		</el-card>
		
		<transition name="fade-transform" mode="out-in">
      <router-view  />
    </transition>
	</div>
</template>

<script>


export default {
	name: "MainArea",
	props: {
		sentence: {
			type: Object,
			default: {},
		},
	},
	data() {
		return {
			 key() {
      return this.$route.path
    	},
			showSentence: this.sentence,
		}
	},
	components: {
		
	},
	methods: {
		getUserInfo() {
			this.$store.dispatch("user/getUserInfo");
		}
   
	},
	mounted() {
	
	},
};
</script>

<style scoped>
.main-container {
	height: 100%;
}



/* 下拉框 */
.el-dropdown-link {
	cursor: pointer;
	color: #409eff;
}
.el-icon-arrow-down {
	font-size: 12px;
}
</style>

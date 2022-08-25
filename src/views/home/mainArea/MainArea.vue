<template>
	<div class="main-container">
		<el-card class="box-card">
			<div  class="clearfix header">
				<span>每日一句:{{ sentence.name }}</span>
				<span>{{ sentence.from }}</span>
			</div>
		</el-card>

		<transition name="el-fade-in-linear" mode="out-in" appear>
      <router-view />
    </transition>
	</div>
	
</template>

<script>

import{ reqSentences } from "@/api/index"
export default {
	name: "MainArea",
	
	data() {
		return {
		
			
			sentence:{
				from:'',
				name:''
			}
		}
	},
	components: {
		
	},
	methods: {
		getUserInfo() {
			this.$store.dispatch("user/getUserInfo");
		},
   async getSentences() {
			
			let result = await reqSentences()
				if(result.code === 200){
					this.sentence = result.result
				}
			
		},
	},
	mounted() {
		this.getSentences()
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

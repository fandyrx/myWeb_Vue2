<template>
	<div class="main">
		测试拖拽功能,组件如何实现?且不影响样式
		<List />
		<Contentdd />

		<ValidationProvider rules="secret" v-slot="scope">
			<input v-model="example" type="text" />
			<span>{{ example }}</span>
			<span>{{ scope.errors[0] }}</span>
		</ValidationProvider>
    
	</div>
</template>

<script>
import List from "@/test/List/List.vue";
import Contentdd from "@/test/content/contentdd.vue";

export default {
	name: "test",
	data() {
		return {
			example: "example",
		};
	},
	components: {
		List,
		Contentdd,
	},
	methods: {},
	mounted() {},
};
</script>

<style scoped>
.main {
	height: 100vh;
}
</style>

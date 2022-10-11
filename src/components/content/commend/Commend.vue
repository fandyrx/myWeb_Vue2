<template>
	<div class="commend-wrapper">
    <ComNav :title="title" :List="List" />
		<!-- show -->
		<CommendItem v-bind="$attrs" v-on="$listeners" />
	</div>
</template>

<script>
import ComNav from '@/components/content/comNav/ComNav'
import CommendItem from '@/components/content/commend/comendItem/CommendItem'

export default {
	name: "Commend",
	props: {
		//1.顶部
		title: {
			type: String,
			default: "",
		},
		List: {
			type: Array,
			default(){
				return []
			} 
		},

	},
	components: {
		ComNav,
		CommendItem
	},
	

};
</script>

<style lang="less" scoped>
.commend-wrapper{
		width: 830px;
}

</style>

<template>
	<el-carousel :interval="4000" type="card" height="200px" autoplay>
		<el-carousel-item v-for="(item, index) in banner" :key="index">
			<img v-lazy="item.imageUrl" alt="#" />
		</el-carousel-item>
	</el-carousel>
</template>

<script>
import { mapState } from "vuex";
export default {
	name: "Banner",
	computed: {
		...mapState("music", ["banner"]),
	},
};
</script>

<style scoped>
img {
	width: 100%;
	min-height: 100%;
}
.el-carousel__item h3 {
	color: #475669;
	font-size: 14px;
	opacity: 0.75;
	line-height: 200px;
	margin: 0;
}

.el-carousel__item:nth-child(2n) {
	background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
	background-color: #d3dce6;
}

.el-carousel {
	overflow-y: hidden;
}

/*  指示灯位置 */
/deep/ .el-carousel__indicators {
	position: absolute;
	left: unset;
	transform: unset;
	text-align: center;
	right: 50%;
	transform: translate(50%);
	bottom: 0;
}
/* 默认按钮的颜色大小等 */
/deep/ .el-carousel__button {
	width: 36spx;
	height: 3px;
	border: none;
	border-radius: 20px;
	background: #ffffff;
	opacity: 1;
}
/* 选中图片的颜色 */
/deep/ .is-active .el-carousel__button {
	background: #14a5fe;
	opacity: 1;
}
</style>

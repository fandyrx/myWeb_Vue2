<template>
	<div class="container">
		<el-card>
			<!-- 类型切换按钮 -->
			<el-dropdown @command="changeType" slot="header">
				<span class="el-dropdown-link">图片类型<i class="el-icon-arrow-down el-icon--right"></i> </span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item command="beauty">beauty</el-dropdown-item>
					<el-dropdown-item command="animal">animal</el-dropdown-item>
					<el-dropdown-item command="car">car</el-dropdown-item>
					<el-dropdown-item command="comic">comic</el-dropdown-item>
					<el-dropdown-item command="movie">movie</el-dropdown-item>
					<el-dropdown-item command="random">random</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>

			<!-- 展示区 -->
			<el-row>
				<el-col v-for="item in showImages" :key="item.id" :span="8" :offset="showImages.length > 0 ? 2 : 0" :xs="12">
					<el-card @click.native="showBig(item)" :body-style="{ padding: '0px' }">
						<img v-lazy="item.url" class="image" />
						<!-- 文本 -->
						<div style="padding: 14px">
							<span>{{ item.title }}</span>

							<div class="bottom clearfix">
								<time class="time">{{ currentDate }}</time>
							</div>
						</div>
					</el-card>
				</el-col>
			</el-row>

			<!-- 分页器 -->
			<el-pagination
				style="text-align: center"
				:current-page="imagesType.page"
				:total="total"
				:page-sizes="[3, 5, 7, 10]"
				:page-size="limit"
				background
				layout="prev, pager, next, jumper, ->,sizes,total"
				@current-change="getImages"
				@size-change="handleSizeChange"
			>
			</el-pagination>
		</el-card>

		<el-dialog :visible.sync="dialogVisible" width="50%" destroy-on-close>
			<img :src="picBig" class="show-big" alt="" />
		</el-dialog>
	</div>
</template>

<script>
import { reqHomeImages } from "@/api/index";
import moment from "moment";

export default {
	name: "ShowCard",
	data() {
		return {
			showImages: [],
			imagesType: {
				type: "beauty",
				page: 1,
				size: 10,
			},

			limit: 10, //每页数据
			total: 0, //分页一共需要展示数据条数
			dialogVisible: false,
			picBig: "",
		};
	},

	methods: {
		//1.获取展示图片请求
		async getImages(pages = 1) {
			this.imagesType.page = pages;
			let res = await reqHomeImages(this.imagesType);
			if (res.code === 200) {
				this.showImages = res.result.list;
				this.total = res.result.total;
			}
		},
		//类型切换
		changeType(type) {
			if (type === "random") {
				let arr = ["comic", "beauty", "car", "movie", "food", "game", "phone", "scenery", "animal", "person"];
				let i = Math.floor(Math.random() * 10);
				this.imagesType.type = arr[i];
				this.getImages(this.randNum(1, 30));
				//30页 随机数据展示
			} else {
				this.imagesType.type = type;
				this.getImages();
			}
		},
		//3.分页器回调  3.1展示数量改变

		handleSizeChange(size) {
			this.imagesType.page = this.page;
			this.imagesType.size = size;
			// console.log(this.page);

			// console.log(this.imagesType,'change前');
			this.getImages(this.page);
		},
		//dialog
		showBig(item) {
			this.picBig = item.url;
			this.dialogVisible = true;
		},
		randNum(min, max) {
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random() * (max - min + 1)) + min;
		},
	},
	mounted() {
		this.changeType("random");
	},
	computed: {
		currentDate: () => {
			return moment().format("LLL");
		},
	},
};
</script>

<style scoped>
/* card */
.header {
	font-weight: 700;
}

.time {
	font-size: 13px;
	color: #999;
}

.bottom {
	margin-top: 13px;
	line-height: 12px;
}

.button {
	padding: 0;
	float: right;
}

.image {
	width: 100%;

	display: block;
}

.clearfix:before,
.clearfix:after {
	display: table;
	content: "";
}

.clearfix:after {
	clear: both;
}

/* bug fixed */
.el-row {
	margin-bottom: 20px;
	display: flex;
	flex-wrap: wrap;
}
.el-row .el-card {
	min-width: 100%;
	height: 100%;
	transition: all 0.5s;
}

.el-row .el-card:hover {
	margin-top: -5px;
	margin-bottom: 5px;
}
.el-col {
	margin-bottom: 20px;
}

.show-big {
	width: 100%;
}
</style>

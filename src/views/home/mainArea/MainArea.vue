<template>
	<div class="main-container">
		<el-card class="box-card">
			<div slot="header" class="clearfix header">
				<span>每日一句:{{ sentence.name }}</span>
				<span>{{ sentence.from }}</span>
			</div>
			<!-- 类型切换按钮 -->
			<el-dropdown @command="changeType">
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
		</el-card>
		<!-- 展示区 -->
		<el-card>
			<div class="text item">
				<el-row >
					<el-col  
           v-for="item in showImages"
           :key="item.id"  
           :span="8" 
           :offset="showImages.length > 0 ? 2 : 0"  
           :style="{height:'350px'}"
           >
           <!-- 设置高度,解决图片大小不一引起模板空白 -->
						<el-card
             
             :body-style="{ padding: '0px'}">
							<img :src="item.url" class="image" />
             
							<div style="padding: 14px">
								<span >{{ item.title }}</span>
								<div class="bottom clearfix">
									<time class="time">{{ currentDate }}</time>
									<el-button type="text" class="button">操作按钮</el-button>
								</div>
							</div>
						</el-card>
					</el-col>
				</el-row>
			</div>

			<!-- 分页器 -->
			<el-pagination 
        style="text-align:center"

        :current-page= "imagesType.page"
        :total= "total"
        :page-sizes="[3,5,7,10]"
        :page-size= "limit"
        background layout='prev, pager, next, jumper, ->,sizes,total'

          @current-change="getImages"
           @size-change="handleSizeChange"
        > 
      </el-pagination>
		</el-card>
	</div>
</template>

<script>
import { reqHomeImages } from "@/api/index";
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
			currentDate: new Date(),
			showSentence: this.sentence,
			showImages: [],
			imagesType: {
				type: "beauty",
				page: 1,
				size: 10,
			},

      
      limit:10,    //每页数据
      total:0, //分页一共需要展示数据条数
     
      
		};
	},
	components: {},
	methods: {
		getUserInfo() {
			this.$store.dispatch("user/getUserInfo");
		},
    //1.获取展示图片请求
		async getImages(pages = 1) {
     
      
      this.imagesType.page = pages
			let res = await reqHomeImages(this.imagesType);
			if (res.code === 200) {
        
				this.showImages = res.result.list;
        this.total = res.result.total
			}
		},
    //类型切换
		changeType(type) {
			if (type === "random") {
				let arr = ["comic", "beauty", "car", "movie", "food", "game", "phone", "scenery", "animal", "person"];
				let i = Math.floor(Math.random() * 10);
				this.imagesType.type = arr[i];
				
			} else {
				this.imagesType.type = type;
			}
			this.getImages();
		},
    //3.分页器回调  3.1展示数量改变
   
    handleSizeChange(size){
        this.imagesType.page = this.page
        this.imagesType.size = size
        console.log(this.page);
       
        console.log(this.imagesType,'change前');
        this.getImages(this.page)

    }
	},
	mounted() {
		this.getImages();
	},
};
</script>

<style scoped>
.main-container {
	height: 100%;
}

/* card */
.header {
	font-weight: 700;
}
.text{
  margin-bottom: 50px;
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
/* 下拉 */
.el-dropdown-link {
	cursor: pointer;
	color: #409eff;
}
.el-icon-arrow-down {
	font-size: 12px;
}
</style>

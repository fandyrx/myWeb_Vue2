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
					<el-col  
						v-for="item in showImages"
           :key="item.id"  
           :span="8" 
           :offset="showImages.length > 0 ? 2 : 0"  
					  :xs="12" 
           >
           <!-- 行内设置高度,解决图片大小不一引起模板空白 失败,直接修改el-col 样式-->
						<el-card
					
             :body-style="{ padding: '0px'}">
							<img  v-lazy="item.url" class="image" />
								<!-- 文本 -->
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
  name: 'ShowCard',
  data() { 
    return {
        currentDate: new Date(),
        showImages: [],
			imagesType: {
				type: "beauty",
				page: 1,
				size: 10,
			},

      limit:10,    //每页数据
      total:0, //分页一共需要展示数据条数
	    
    }
  },
  components:{
  },
  methods:{
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
				this.getImages(this.randNum(1,30));
				//30页 随机数据展示
			} else {
				this.imagesType.type = type;
				this.getImages();
			}	
		},
    //3.分页器回调  3.1展示数量改变
   
    handleSizeChange(size){
        this.imagesType.page = this.page
        this.imagesType.size = size
        // console.log(this.page);
       
        // console.log(this.imagesType,'change前');
        this.getImages(this.page)

    },
		randNum(min,max){
				let random = Math.random()   //0.1-0.9  
				//  min  - max  之间随机数
				//最小为 0    0 * max + min = min  最小值
				//最大为 0.9  0.9 * max 永远小于自身 + 1 再向下取整可得max 自身
				//   	Math.floor( Math.random() * (max  + 1 ))  + min =   max + min 
					//我最大只要 max   
				//   Math.floor( Math.random() * (max  - min + 1 ) )  + min  =   max    
				//	   0.9* max - 0.9*min +1 + min 
				//    0.9*max + 1 (max.xxxx)- 0.9*min +min(0.xxx) = max.xxx-0.xxxx  (不会小于max,再向下取整) 
				min = Math.ceil(min);
				max = Math.floor(max);
				return Math.floor( Math.random() * (max  - min + 1 ) )  + min 

		}
  },
  mounted() {
      	this.changeType("random")
  },
 }
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
    margin-bottom: 20px ;
    display:flex;
    flex-wrap: wrap;
  }
.el-row  .el-card {
    min-width: 100%;
    height: 100%;
		transition: all .5s;
  }
	
	.el-row .el-card:hover{
    margin-top: -5px;
		margin-bottom: 5px;
  }
	.el-col {
		margin-bottom: 20px;
	}
</style>
<template>
	<div>
		<AdjustDrag>
			<template slot="top">
				测试demo输入框
				<ul>
					<li v-for="(item, index) in showTopLis" :key="index">
						<span class="context"> {{ index + 1 }}.{{ item.str }} </span>
						<button @click="deleteLi(index, item.area)">删除</button>
					</li>
				</ul>
			</template>
			<template slot="bottom">
				<ul>
					<li v-for="(item, index) in showContentLis" :key="index">
						<span class="context"> {{ index + 1 }}.{{ item.str }} </span>
						<button @click="deleteLi(index, item.area)">删除</button>
					</li>
				</ul>
			</template>
		</AdjustDrag>

		<InputDemo type="text" v-model="text" input-name="名字" placeholder="20Max showSomething" @change="handleChange" class="demo" />
	</div>
</template>

<script>
import InputDemo from "../inputDemo/InputDemo.vue";
import AdjustDrag from "../adjustdrag/adjustDrag.vue";
export default {
	name: "Article",
	data() {
		return {
			text: "",

			showTopLis: [],
			showContentLis: [],
		};
	},
	components: {
		InputDemo,
		AdjustDrag,
	},
	methods: {
		handleChange(value) {
			//底部区域信息 大于20条
			if (this.showContentLis.length > 19) {
				return this.$message("最大各输入20条信息");
			} else {
				let str = value.trim();

				if (this.showTopLis.length > 19) {
					//顶部区域大于20,往底部填充
					str != "" ? this.showContentLis.push({ str, area: "content" }) : this.$message("输入不能为空");
				} else {
					//顶部填入
					str != "" ? this.showTopLis.push({ str, area: "top" }) : this.$message("输入不能为空");
				}

				//清空输入框
				this.text = "";
			}
		},

		handleInput(value) {
			this.text = value;
			// console.log("input事件存储的数据",this.text)
		},
		deleteLi(index, area) {
			// console.log(index, area);
			area === "top" ? this.showTopLis.splice(index, 1) : this.showContentLis.splice(index, 1);
		},
	},
};
</script>

<style lang="less" scoped>
.demo {
	width: 300px;
}
li {
	padding: 5px 10px;
	position: relative;
	margin-bottom: 5px;
	border-bottom: 1px solid lightslategrey;
	width: 100%;

	.context {
		padding: 0 30px 0 20px;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		text-overflow: ellipsis;
		word-wrap: break-word;
		overflow: hidden;
	}
	button {
		position: absolute;
		top: 0;
		right: 20px;
	}
}
</style>

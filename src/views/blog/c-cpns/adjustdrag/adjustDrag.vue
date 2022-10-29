<template>
	<div class="drag-main" :style="{ height: mainHeight + 'px' }">
		<div class="drag-top">
			<slot name="top"></slot>
		</div>
		<div class="drag-content" ref="content" :style="{ height: contentHeight + 'px' }">
			<button class="drag-button" @mousedown="drag" @mousemove="move" @mouseup="drop" @mouseleave="drop">拖拽按钮</button>
			<div class="drag-render">
				<slot name="bottom"></slot>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		mainHeight: { type: Number, default: 300 },
		contentHeight: { type: Number, default: 200 },
	},
	name: "adjustDrag",
	data() {
		return {
			isDrag: false,
			currentHeight: 0,
			mouseY: 0,
		};
	},

	methods: {
		drag(e) {
			//点击时 鼠标和content 高度坐标
			this.isDrag = true;
			this.mouseY = e.pageY;
			this.currentHeight = this.$refs.content.offsetHeight;
		},
		move(e) {
			if (this.isDrag) {
				const moveTop = e.pageY - this.mouseY;
				this.$refs.content.style.height = this.currentHeight - moveTop + "px";
			}
		},
		drop(e) {
			this.isDrag = false;
		},
	},
};
</script>

<style scoped>
.drag-main {
	display: flex;
	height: 300px;
	width: 100%;
	flex-direction: column;
	border: 1px solid;
}
.drag-top {
	background-color: cadetblue;
	flex: 1;
	border: 1px solid red;
	padding: 10px;
	overflow: auto;
}
.drag-content {
	display: flex;
	flex-direction: column;
	position: relative;
}

.drag-button {
	height: 30px;
	width: 100px;
	position: absolute;
	left: 50%;
	top: -15px;
	margin-left: -50px;
	text-align: center;
	line-height: 28px;
	cursor: pointer;
	user-select: none;
}
.drag-render {
	flex: 1;
	overflow: auto;
	padding: 10px;
}
</style>

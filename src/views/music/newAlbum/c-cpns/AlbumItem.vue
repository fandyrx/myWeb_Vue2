<template>
	<el-carousel trigger="click" height="150px" indicator-position="none" :autoplay="false">

		<el-carousel-item v-for="(list,index) in newAlbumList" :key="index">
						
						<div class="info-wrapper" v-for="item in list" :key="item.id">
						
							<div class="info-top">
								<img v-lazy="item.picUrl + '?param=100x100'" :alt="item.name" />
								<a href="javascript:;" class="cover sprite_cover"></a>
							</div>

							<div class="info-bottom">
								<div class="text-nowrap">{{ item.name }}</div>
								<div class="text-nowrap">{{ item.artist.name }}</div>
							</div>
						</div>
			

		</el-carousel-item>
	</el-carousel>
</template>

<script>
export default {
	name: "AlbumItem",
	props: {
		newAlbums: {
			type: Array,
			default() {
				return [];
			},
		},
	},

	data() {
		return {
			newAlbumList: {
				list1: [],
				list2: [],
				list3: [],
			},
		};
	},
	methods: {
		sliceList(list) {
			this.newAlbumList.list1 = list.slice(0, 4);
			this.newAlbumList.list2 = list.slice(4, 8);
			this.newAlbumList.list3 = list.slice(8, 12);
		},
	},
	mounted() {
		this.sliceList(this.newAlbums);
	},
	watch: {
		newAlbums: {
			// immediate: true,
			handler(newValue ,oldValue) {
				// console.log(newValue ,oldValue,'s')
				this.sliceList(this.newAlbums);
			
			},
		},
	},
};
</script>

<style scoped>
.el-carousel {
	margin-top: 30px;

	border: 1px solid #d3d3d3;
}
.el-carousel__item {
	display: flex;
	justify-content: space-between;
	align-items: center;

	padding: 0 60px;
}

.info-wrapper {
	width: 120px;
}
.info-top {
	overflow: hidden;
	position: relative;
	display: flex;
	justify-content: space-between;
}

.info-top img {
	width: 100px;
	height: 100px;
}

.cover {
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	background-position: 0 -570px;
	text-indent: -9999px;
}

.info-bottom {
	margin: 0 5px;
}
</style>

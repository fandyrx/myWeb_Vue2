<template>
	<div class="controler">
		<div class="left">
			<img :class="{ discAnimation: isPlay }" v-lazy="playInfo[playIndex].al.picUrl" alt="歌曲封面" />

			<div class="auth">
				<span>{{ playInfo[playIndex].name }}</span>

				<span class="authName" v-for="(singer, index) in playInfo[playIndex].ar" :key="index">
					{{ singer.name }}
				</span>
			</div>

			<svg class="icon" aria-hidden="true" @click="change(-1)">
				<use xlink:href="#icon-next-copy"></use>
			</svg>
			<!-- 播放暂停 -->
			<svg class="icon" aria-hidden="true" @click="play" v-if="isPlay">
				<use xlink:href="#icon-stop"></use>
			</svg>

			<svg class="icon" aria-hidden="true" @click="play" v-else>
				<use xlink:href="#icon-playon_fill"></use>
			</svg>

			<svg class="icon" aria-hidden="true" @click="change(1)">
				<use xlink:href="#icon-next"></use>
			</svg>
		</div>
		<!-- 播放条 -->
		<div class="middle">
			<div class="barControl">
        <!-- 当前进度播放条AND播放控制点 -->
				<div class="audio-currentTime-Bar" :style="{width:currentWidth+'%'}">
           <div  class="audio-circle" ></div>
        </div>	
			</div>
      <div>
        <span>{{durationTime}}/</span>
        <span>{{currentTime}}</span>
      </div>
		</div>

		<div class="right">
			<svg class="icon" aria-hidden="true">
				<use xlink:href="#icon-voice"></use>
			</svg>
			<i>列表</i>
		</div>

		<audio ref="audio" 
      @timeupdate="timeupdate"
      @durationchange="durationchange"
      @ended="ended"
      :src="`https://music.163.com/song/media/outer/url?id=${playInfo[playIndex].id}.mp3`">
    </audio>
	</div>
</template>

<script>
import moment from 'moment';
import { mapState, mapMutations } from "vuex";
export default {
	name: "Controler",
	data() {
		return {
      currentTime:"00:00",
      durationTime:'00:00',
      currentWidth: 0
    };
	},
	components: {},
	methods: {
    // 播放/暂停
		play() {
			if (this.$refs.audio.paused) {
				this.$refs.audio.play();
				this.upDatePlay(true);
			} else {
				this.$refs.audio.pause();
				this.upDatePlay(false);
			}
		},
    //切歌
		change(num) {
			let index = this.playIndex + num;
			if (index < 0) {
				//当前为0 ，-1时，索引 = 最后一位
				index = this.playInfo.length - 1;
			} else if (index == this.playInfo.length) {
				// 索引大于最后一位，索引复位0
				index = 0;
			}
			this.getMusicUrl(index);
		},
    //播放时间总时长,当前时间 获取  
    durationchange(e){
      this.durationTime = moment(e.target.duration *1000).format('mm"ss')
    },
    timeupdate(e){
      
          this.currentTime =  moment(e.target.currentTime * 1000).format('mm"ss')
       
          this.currentWidth = e.target.currentTime/e.target.duration * 100

    },
    //播放结束  
    ended(e){
      //播放状态暂停
      	// this.upDatePlay(false);
       if(playInfo.length!== '' && playIndex == playInfo.length-1){
        //最后一首歌,跳转到第一首
          this.getMusicUrl(0)
       }else{
          this.getMusicUrl(this.playIndex++)
       }
    },

		...mapMutations("music", ["upDatePlay", "getMusicUrl"]),
	},
	mounted() {
   
  },
	computed: {
		...mapState("music", ["playInfo", "isPlay", "playIndex"]),
	},
	watch: {
		playIndex: function () {
			this.$refs.audio.autoplay = true;
			if (this.$refs.audio.paused) {
				this.upDatePlay(true);
			}
		},
		playInfo: function () {
			
			if (!this.isPlay) {
				this.$refs.audio.autoplay = true;
				this.upDatePlay(true);
			}
		},
	},
  beforeDestroy(){
     this.upDatePlay(false);
  }
};
</script>

<style lang="less" scoped>
.controler {
	height: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;

	.left {
		display: flex;
		align-items: center;
		.auth {
			width: 100px;
			margin: 10px;
			display: flex;
			flex-direction: column;
			text-align: left;
			font-size: 14px;

			span {
				padding-top: 5px;
			}
      .authName{

      }
		}
		img {
			width: 60px;
			height: 100%;
			border-radius: 50%;
			vertical-align: bottom;
		}
	}
}

.icon {
	position: relative;
	top: -10%;
	font-size: 40px;
}

//播放类名
.discAnimation {
	animation: disc 17s linear infinite;
	// animation-delay: 1s ;
}
//如果想暂停不复位，分两个控制类名
.discAnimation_active {
	animation-play-state: running;
}
.discAnimation_paused {
	animation-play-state: paused;
}
//播放器动画/头像 旋转
@keyframes disc {
	from {
		transform: rotate(0deg);
	}
	to {
		transform: rotate(360deg);
	}
}

/* 播放进度条 */

.middle {
	width: 100%;
	height: 100%;
	line-height: 100%;
	display: flex;
	//进度条
	.barControl {
		position: relative;
	  width: 100%;
		height: 4px;
		background-color: rgba(0, 0, 0, 0.4);
		margin: auto;
		//控制点   
		.audio-circle {
			position: absolute;
			top: -4px;
			right:-12px;
			width: 12px;
			height: 12px;
			border-radius: 50%;
			background-color: #fff;
		}
		//当前进度条 width动态添加
		.audio-currentTime-Bar {
			position: absolute;
			top: 0;
			left: 0;
			z-index: 1;
	
			height: 4px;
			background-color: red;
		}
	}
}
</style>

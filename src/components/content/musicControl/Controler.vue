<template>
	<div class="controler">
		<div class="left">
			<img :class="{ discAnimation: isPlay }" v-lazy="playInfo[playIndex].al.picUrl" alt="歌曲封面" />

			<div class="auth">
						<div :class="{move:isPlay}">
							<span :class="{textRoll:isPlay}">
									{{ playInfo[playIndex].name }}
							</span>
						</div>
				
					<div  :class="{'marqueeWrap':true,move:isPlay}"> 
						 <div :class="{'singer':true,textRoll:isPlay}">
								<span   v-for="(singer, index) in playInfo[playIndex].ar" :key="index">
									{{ singer.name }}
								</span>		
					 </div>
					
				</div>
				
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
			<div  class="barControl">	
					<el-slider v-model="currentProcess"							
											:show-tooltip="false"
											:step="0.01"
											@change="changeCurrentTime($event)"
											@input="changeShowTime($event)"
											@mousedown.native="isDrag = true"
											@mouseup.native="isDrag = false"></el-slider>
			</div>
	

      <div class="play-time">     
        <span>{{currentTime}}/</span>
				<span>{{durationTime}}</span>
      </div>
		</div>

		<div class="right">
			<div class="voice-control">
				<el-slider
						class="slider"
						v-model="voice"
						vertical
						v-show="voiceShow"
     		 >
    	</el-slider>
				<svg class="icon " aria-hidden="true"   @click="voiceShow = !voiceShow">
					<use xlink:href="#icon-voice"></use>
				</svg>
		
		</div>

			
		
		</div>
<!-- 播放器 -->
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
			currentProcess:0,

			isDrag:false,
			voice:30,
			voiceShow:false
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
      this.durationTime = moment(e.target.duration *1000).format('mm:ss')
    },
    timeupdate(e){
				//进度条		    
					if(!this.isDrag){
							
					   this.currentProcess = e.target.currentTime / e.target.duration  * 100
					}        
       

    },
    //播放结束  
    ended(e){
      //播放状态,动画暂停,切换播放按钮
      	this.upDatePlay(false);
				//重置播放条
				this.currentProcess = 0
				this.currentTime = "00:00"
				//切换下一首
				this.change(1)
		
    },	
		//进度条拖拽
		changeCurrentTime (value) {
				
				this.$refs.audio.currentTime  =  value  /100 * this.$refs.audio.duration 
				
			// 拖拽停止更新
				
		},
		changeShowTime(value){	
				if(this.isPlay){
					// input方法 一直修改展示的播放时间,滑块value无改动	
					this.currentTime = moment(value * this.$refs.audio.duration * 10).format("mm:ss")
			
				}
				
		},

		...mapMutations("music", ["upDatePlay", "getMusicUrl"]),
	},
	mounted() {
		//初始化音量 30
		this.$refs.audio.volume = this.voice / 100
	
		
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
		voice:function (){
			//声量控制范围0-1
			this.$refs.audio.volume = this.voice / 100
			this.$refs.audio.muted=false;
		}
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
	background-color: #b3c0d1;
	color: #333;

	

	.left {
		display: flex;
		align-items: center;
	
			
		.auth {
			width: (20/100)vw;
			margin: 10px;
			display: flex;
			flex-direction: column;
			text-align: left;
			font-size: 14px;
			
			word-break: break-all;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;	
		
    
			span {
				padding-top: 5px;
			}
      .marqueeWrap{
					display: flex;


					.singer{
						padding-left:5px;
					
					}
      }
		}
		img {
			width: 50px;
			height: 100%;
			border-radius: 50%;
			vertical-align: bottom;
		}
	}
}



.move{
	animation: marqueeTransform 10s linear infinite;
}

.textRoll{
		animation: marqueeTransText 10s linear infinite;
}

// 文本移动
@keyframes marqueeTransText {
	0% {
		transform: translate(0, 0);
	}
	
	100% {
		transform: translate(-100%, 0);
	}
	
}
//文本包裹容器移动
@keyframes marqueeTransform {
	0% {
		transform: translate(100%, 0);
	}
	
	100% {
		transform: translate(0, 0);
	}
	
}

.icon {
	position: relative;
	top: -10%;
	font-size: 40px;
	cursor: pointer;
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
	flex: 1;
	display: flex;
	align-items: center;
	//进度条
	.barControl{
		width: 100%;
		padding:5px;
		/deep/ .el-slider__bar {
			background-color: var(--color-tint) ;
		}
		/deep/  .el-slider__button {
			
			border: 2px solid  var(--color-high-text);
		}
	  }
	//播放时间
	.play-time{
			padding: 0 5px;
			
			display: flex;
			justify-items: center;
	}
}

//音量 列表区
.right{
	width: 50px;
	display: flex;
	margin: 0 10px  0;
	
	
	.voice-control{
		position: relative;
		svg{
			font-size: 30px;
		}

		.slider{
			background-color: rgba(210, 220, 217, 0.844);
			padding: 10px 0 10px ;
			border-radius: 10%;
			position: absolute;
			height:100px;
			top: -115px;
			right: -2px;
		}
	}

}

		
</style>

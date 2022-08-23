function remSize() {
  //获取设备宽度
  let deviceWidth = document.documentElement.clientWidth || window.innerWidth
  if(deviceWidth >= 750){
    deviceWidth = 750
  }
  if(deviceWidth <=320){
    deviceWidth = 320
  }
  //设计稿750px==> 1rem = 100px,375px ==> 50px
  document.documentElement.style.fontSize = (deviceWidth/7.5) + "px"

  //字体大小
  document.querySelector('body').style.fontSize = 0.3+ "rem"
}

remSize()
window.onresize= function() {
  remSize()
}

// html引入加载  媒体查询配合更好? 或者直接组件el 栅格布局就行
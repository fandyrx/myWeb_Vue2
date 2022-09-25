<template>
<div>
  <!-- 
    pull: 'clone', put: false
    意思是以克隆的方式拖拽，，不能在组件列表进行放置，目的是不影响原来的组件列表
  -->
  <draggable v-model="componentList" :options="{group:{name: 'itxst',pull:'clone'},sort: true}"   >
    <transition-group> 
       <div  v-for="item in componentList" :key="item.id">{{item.tag}}</div>
    </transition-group>
  </draggable>
  <!-- 2 -->
  <draggable v-model="arr" :options="{group:{name: 'itxst',pull:'clone'},sort: true}" 
   style="height: 200px; width: 200px; border: 1px solid black; ">
    <transition-group> 
       <div  v-for="item in arr" :key="item.id">{{item.tag}}</div>
    </transition-group>
  </draggable>

 </div>
</template>
<script>

// 引入vuedraggable
import draggable from "vuedraggable";

export default {
  name: "List",
  components: {
    draggable,
  },
  data(){
    return {
      componentList: [
      {
        id: 1,
        tag: "a-button",
        props: {
          type: "primary",
        },
      },
      {
        id: 2,
        tag: "a-empty",
        props: {
          description: "没有数据捏",
        },
      },
      {
        id: 3,
        tag: "a-spin",
      },
    ],
    arr:[
       {
        id: 4,
        tag: "a-测试",
      },
    ]
    }
    
  }
 
}
</script>


<style>
.item {
  border: #0083ee 1px solid;
  margin: 10px;
  padding: 10px;
}
</style>

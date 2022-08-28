<template>
  <div>
    <!-- 3 -->
  <draggable v-model="arr" :options="{group:{name: 'itxst',pull:'clone'},sort: true}" 
   style="height: 200px; width: 200px; border: 1px solid black; ">
    <transition-group> 
       <div  v-for="item in arr33" :key="item.id">{{item.tag}}</div>
    </transition-group>
  </draggable>
  </div>


</template>
<script>


// 引入vuedraggable
import draggable from "vuedraggable";

export default{
  name: "contentdd",
   data(){
    return {
      avtive:'',
      arr33:[
         {
        id: 5,
        tag: "a-组件的",
        props: {
          type: "primary",
        },
      },
      ]
    }
     
  },
  components:{ 
    draggable 
    },
 
 }


</script>
<style>
.content {
  height: 100%;
}

.item-content {
  margin: 10px;
}

.active {
  padding: 10px;
  border: springgreen 1px solid;
}
</style>

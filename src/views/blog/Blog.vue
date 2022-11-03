<template>
  <div class="blog">
    <my-search></my-search>
    {{ message }}
    <el-pagination
      current-page="1"
      :page-sizes="[10, 20, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="66"
    >
    </el-pagination>

    <Article />
  </div>
</template>

<script>
import MySearch from "./c-cpns/search/search.vue";
import Article from "@/views/blog/c-cpns/article/Article";
export default {
  name: "Blog",
  data() {
    return {
      date: "",
    };
  },
  components: {
    MySearch,
    Article,
  },
  methods: {},
  mounted() {},
};
</script>

<style scoped>
.blog {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 30px;
}
</style>

<template>
  <div class="goods">
    <page-search :searchFormConfig="searchFormConfig"></page-search>
    <page-content :contentTableConfig="contentTableConfig" pageName="goods">
      <template #image="scope">
        <el-image
          style="width: 100px; height: 100px"
          :src="scope.row.imgUrl"
          :preview-src-list="[scope.row.imgUrl]"
          preview-teleported
          fit="cover"
          :initial-index="4"
        ></el-image>
      </template>
    </page-content>
  </div>
</template>

<script>
import PageSearch from "@/components/common/page-search";
import PageContent from "@/components/common/page-content/src/page-content.vue";
import { contentTableConfig } from "./config/content.config";
import { searchFormConfig } from "./config/search.config";

export default {
  name: "goods",
  data() {
    return {
      searchFormConfig: {},
      contentTableConfig: {},
    };
  },
  components: { PageSearch, PageContent },

  created() {
    this.searchFormConfig = searchFormConfig;
    this.contentTableConfig = contentTableConfig;
  },
};
</script>

<style scoped>
</style>

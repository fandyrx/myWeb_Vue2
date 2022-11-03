<template>
  <div class="user">
    <page-search :searchFormConfig="searchFormConfig" />
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="users"
    ></page-content>
  </div>
</template>

<script>
import PageSearch from "@/components/common/page-search";
import PageContent from "@/components/common/page-content/src/page-content.vue";
import { searchFormConfig } from "./config/search.config";
import { contentTableConfig } from "./config/content.config";

export default {
  name: "user",
  data() {
    return {
      searchFormConfig: {},
      contentTableConfig: {},
    };
  },

  components: {
    PageSearch,

    PageContent,
  },
  created() {
    this.searchFormConfig = searchFormConfig;
    this.contentTableConfig = contentTableConfig;
  },
};
</script>

<style scoped>
.user {
  width: 100%;
  background-color: #fff;
}
</style>

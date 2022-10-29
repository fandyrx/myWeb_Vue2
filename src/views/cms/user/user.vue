<template>
  <div>
    <page-search :searchFormConfig="searchFormConfig" />
  </div>
</template>

<script>
import PageSearch from "@/components/common/page-search";
import { searchFormConfig } from "./config/search.config";
export default {
  name: "user",
  data() {
    return {
      searchFormConfig: {},
    };
  },
  components: {
    PageSearch,
  },
  created() {
    this.searchFormConfig = searchFormConfig;
  },
};
</script>

<style scoped></style>

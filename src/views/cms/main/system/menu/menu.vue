<template>
  <div class="cmenu">
    <PageContent :contentTableConfig="contentTableConfig" pageName="menu" />
  </div>
</template>

<script>
import PageContent from "@/components/common/page-content/src/page-content.vue";
import { contentTableConfig } from "./config/content.config";

export default {
  name: "menu",
  data() {
    return {
      contentTableConfig: {},
    };
  },
  components: { PageContent },
  created() {
    this.contentTableConfig = contentTableConfig;
  },
};
</script>

<style scoped></style>

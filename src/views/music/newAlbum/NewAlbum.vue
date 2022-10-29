<template>
  <div>
    <ComNav title="新碟上架" />
    <AlbumItem v-bind="$attrs" />
  </div>
</template>

<script>
import ComNav from "@/components/content/commend/comNav/ComNav.vue";
import AlbumItem from "./c-cpns/AlbumItem.vue";
export default {
  name: "NewAlbum",
  components: {
    ComNav,
    AlbumItem,
  },
};
</script>

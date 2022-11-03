<template>
  <div class="container">
    <HomeNav />
    <div class="weather-warp">
      <Weather title="天气预报" position="right:50px" />
    </div>
    <MainArea />
    <Footer> </Footer>
  </div>
</template>

<script>
import HomeNav from "./c-cpns/home-nav.vue";
import Weather from "@/components/common/Weather/Weather.vue";
import MainArea from "./c-cpns/MainArea";
import Footer from "@/components/common/Footer/Footer";

export default {
  name: "HomePage",

  components: {
    HomeNav,
    Footer,
    Weather,
    MainArea,
  },
};
</script>

<style scoped>
.container {
  position: relative;
}

.weather-warp {
  position: absolute;
  margin-top: 20px;
  right: 30px;
  z-index: 2;
}
</style>

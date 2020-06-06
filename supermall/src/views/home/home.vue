<template>
  <div id="home">
    <navbar class="home-nav">
      <div slot="center">购物街</div>
    </navbar>
    <home-swiper :banner="banner"/>
    <recommend-view :recommend="recommend"/>
    <popular/>
  </div>
</template>

<script>
import navbar from "@/components/common/navbar/navBar.vue";
import { getHomeMultitada } from "@/network/home.js";
import homeSwiper from "./childcomps/homeSwiper.vue"
import recommendView from "./childcomps/recommendView.vue"
import popular from "./childcomps/popular.vue"

export default {
  name: "home",
  components: {
    navbar,
    homeSwiper,
    recommendView,
    popular,
  },
  data() {
    return {
      banner: [],
      recommend: []
    }
  },
  created() {
    getHomeMultitada()
      .then(res => {
        console.log(res);
        this.banner = res.data.banner.list;
        this.recommend = res.data.recommend.list;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style>
#home{
  padding-top: 44px;
}
.home-nav {
  background-color: var(--color-tint);
  color: #ffffff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 99;
}
</style>

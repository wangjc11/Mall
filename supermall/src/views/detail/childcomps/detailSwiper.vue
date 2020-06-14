<template>
  <swiper class="detailswiperimg">
    <swiper-item v-for='(item,key) in banner' :key="key">
        <img :src="item" alt="">
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper,SwiperItem} from "@/components/common/swiper/index.js"

export default {
  name: 'detailSwiper',
  props: {
    banner: {
      type:Array,
      default(){
        return []
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
}
</script>

<style scoped>
.detailswiperimg{
  width: 100%;
  height: 300px;
  overflow: hidden;
}
</style>

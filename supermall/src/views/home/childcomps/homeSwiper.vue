<template>
  <swiper>
    <swiper-item v-for='(item,key) in banner' :key="key">
      <a :href="item.link">
        <img :src="item.image" alt="">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper,SwiperItem} from "@/components/common/swiper/index.js"

export default {
  name: 'homeSwiper',
  props: {
    banner: {
      type: Array,
      default(){
        return []
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  }
}
</script>

<style>

</style>

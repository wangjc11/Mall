<template>
<div id="detailGoodsList"  v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
  <p class="desc">{{detailInfo.desc}}</p>
  <p class="info-key">{{detailInfo.detailImage[0].key}}</p>
  <div class="detailGoodsImage">
    <img :src="item" alt="" v-for="(item, index) in detailInfo.detailImage[0].list" :key="index" @load="imageload">
  </div>
</div>
</template>

<script>
export default {
  name: 'detailGoodsList',
  props: {
    detailInfo: {
      type: Object,
      default(){
        return {
          counter: 0,
          imagesLenght: 0
        }
      }
    }
  },
  methods: {
    imageload(){
      this.$bus.$emit('imageload')
    }
  },
}
</script>

<style scoped>
  .goods-info {
    padding: 20px 0;
    border-bottom: 5px solid #f2f5f8;
  }
.detailGoodsImage img{
  width: 100%;
  /* height: 100px; */
}
 .info-key {
    margin: 10px 0 10px 15px;
    color: #333;
    font-size: 15px;
  }
  .desc {
    padding: 10px 0;
    font-size: 14px;
  }
</style>

<template>
  <div class="goods">
    <goods-item v-for="(item,key) in goods" :key="key" :goods-item = 'item'/>
  </div>
</template>

<script>
import goodsItem from './goodsItem.vue'

export default {
  name: 'goodsList',
  components: {
    goodsItem
  },
  props: {
    goods: {
      type: Array,
      default(){
        return []
      }
    }
  },
}
</script>

<style>
  .goods{
    display: flex;
    flex-wrap: wrap;
    padding: 0 3px;
    justify-content: space-around;
  }
</style>

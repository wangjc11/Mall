<template>
<div class="recommend">
  <div class="recommendview" v-for='(item,key) in recommend' :key="key">
    <a :href="item.link">
      <img :src="item.image" alt="">
      <p>{{item.title}}</p>
    </a>
  </div>
</div>
</template>

<script>
export default {
  name: 'recommendView',
  props: {
    recommend:{
      type: Array,
      default() {
        return [];
      }
    }
  }

}
</script>

<style lang="less">
  .recommend{
    display: flex;
    text-align: center;
    padding: 10px 0 20px 0;
    border-bottom: 8px solid #eee;
    font-size: 14px;
    .recommendview{
      flex: 1;
      img{
        width: 70px;
        margin-bottom: 8px;
      }
    }
  }
</style>

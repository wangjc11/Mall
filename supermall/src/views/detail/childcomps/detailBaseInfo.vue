<template>
<div v-if="Object.keys(goods).length !== 0" class="baseInfo">
  <div class="info-title">{{goods.title}}</div>
  <div class="info-price">
    <span class="n-price">{{goods.newPrice}}</span>
    <span class="o-price">{{goods.oldPrice}}</span>
    <span v-if="goods.discount" class="discount">{{goods.discount}}</span>
  </div>
  <div class="info-other">
    <span>{{goods.columns[0]}}</span>
    <span>{{goods.columns[1]}}</span>
    <span>{{goods.services[goods.services.length-1].name}}</span>
  </div>
  <div class="info-service">
    <span class="info-services-item" v-for= 'index in goods.services.length-1' :key="index">
      <img v-if="Object.keys(goods.services[index-1]).length !== 1" :src="goods.services[index-1].icon" alt="">
      <span>{{goods.services[index-1].name}}</span>
    </span>
  </div>
</div>
</template>

<script>
export default {
  name: 'detailBaseInfo',
  props: {
    goods: {
      type: Object,
      default(){
        return {}
      }
    }
  },
}
</script>

<style scoped lang="less">
.baseInfo{
  margin: 0 8px;
  margin-top: 15px;
  color: #999;
  border-bottom: 3px solid #f2f5f8;
  overflow: auto;
  .info-title{
    font-weight: bold;
    color: #222;
  }
  .info-price{
    margin-top: 10px;
    .n-price{
      font-size: 24px;
      color: var(--color-high-text);
    }
    .o-price{
      margin-left: 5px;
      font-size: 13px;
      text-decoration: line-through;
    }
    .discount{
      font-size: 12px;
      padding: 2px 5px;
      background-color: var(--color-high-text);
      border-radius: 8px;
      color: #ffffff;
      margin-left: 8px;

      position: relative;
      top: -8px;
    }
  }
  .info-other{
    margin-top: 8px;
    display: flex;
    // text-align: center;
    font-size: 14px;
    line-height: 30px;
    border-bottom: 1px solid rgba(100, 100, 100, 0.1);
    justify-content: space-between;
  }
  .info-service{
    display: flex;
    line-height: 60px;
    justify-content: space-between;
    img{
      width: 14px;
      height: 14px;
      position: relative;
      top: 2px;
      margin-right: 3px;
    }
    span{
      font-size: 10px;
      color: #333;
    }
  }
}
</style>

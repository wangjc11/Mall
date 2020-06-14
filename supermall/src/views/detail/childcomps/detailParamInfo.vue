<template>
<div  v-if="Object.keys(goodsParam).length !== 0"  class="param-info">
  <table class="info-size">
    <tr v-for="(item, index) in goodsParam.sizes[0]" :key="index">
      <td v-for="index in item.length" :key="index">{{item[index-1]}}</td>
    </tr>
  </table>
  <table class="info-infos">
    <tr v-for="(item, index) in goodsParam.infos" :key="index">
      <td class="info-key">{{item.key}}</td>
      <td class="info-value">{{item.value}}</td>
    </tr>
  </table>
  <div class="info-img" v-if="goodsParam.image.length !== 0">
    <img :src="goodsParam.image" alt="">
  </div>
</div>
</template>

<script>
export default {
  name: 'detailParamInfo',
  props: {
    goodsParam: {
      type: Object,
      default(){
        return {}
      }
    }
  },
}
</script>

<style scoped lang='less'>
  .param-info{
    padding: 20px 15px;
    font-size: 14px;
    border-bottom: 5px solid #f2f5f8;
    table {
      width: 100%;
      border-collapse: collapse;
    }
    tr {
      height: 42px;
      td {
        border-bottom: 1px solid rgba(100,100,100,.1);
      }
    }
    // tr>td:first-child{
    //   border-right: 1px solid rgba(100,100,100,.1);
    // }

    .info-infos{
      // border-top: 1px solid rgba(0,0,0,.1);
      .info-key{
        width: 95px;
      }
      .info-value {
        color: #eb4868
      }
    }
    .info-img img {
      width: 100%;
    }
  }
</style>

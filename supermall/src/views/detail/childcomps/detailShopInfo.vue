<template>
  <div class="shop-info">
    <div class="shop-top">
      <img :src="shop.logo" alt />
      <span class="title">{{shop.name}}</span>
    </div>
    <div class="shop-middle">
      <div class="shop-middle-item shop-middle-left">
        <div class="info-sells">
          <div class="sells-count">{{shop.sells | sellCountFilter}}</div>
          <div class="sells-text">总销量</div>
        </div>
        <div class="info-goods">
          <div class="goods-count">{{shop.goodsCount}}</div>
          <div class="goods-text">全部宝贝</div>
        </div>
      </div>
      <div class="shop-middle-item shop-middle-right">
        <table>
          <tr v-for="(item, index) in shop.score" :key="index">
            <td>{{item.name}}</td>
            <td class="score" :class="{'score-better': item.isBetter}">{{item.score}}</td>
            <td class="better" :class="{'better-more': item.isBetter}">
              <span>{{item.isBetter? '高' : '低'}}</span>
            </td>
          </tr>
        </table>
      </div>
    </div>
    <div class="shop-bottom">
      <div class="enter-shop">进店逛逛</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "detailShopInfo",
  props: {
    shop: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  filters: {
    sellCountFilter: function(value) {
      if (value < 10000) return value;
      return (value / 10000).toFixed(1) + "万";
    }
  }
};
</script>

<style scoped lang='less'>
.shop-info {
  padding: 20px 8px;
  border-bottom: 5px solid #f2f5f8;
  .shop-top {
    img {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      border: 1px solid rgba(0, 0, 0, 0.1);
    }
    .title {
      margin-left: 10px;
      vertical-align: center;
    }
  }
  .shop-middle {
    margin-top: 15px;
    display: flex;
    align-items: center;
    .shop-middle-item {
      flex: 1;
      .sells-text,
      .goods-text {
        margin-top: 10px;
        font-size: 12px;
      }
      .sells-count, .goods-count {
        font-size: 18px;
      }
    }
    .shop-middle-left {
      display: flex;
      justify-content: space-evenly;
      color: #333;
      text-align: center;
      border-right: 1px solid rgba(0, 0, 0, 0.1);
    }
    .shop-middle-right {
      font-size: 14px;
      color: #333;
      table {
        width: 120px;
        margin-left: 30px;
        td {
          padding: 5px 0;
        }
        .score {
          color: #5ea732;
        }
        .score-better {
          color: #f13e3a;
        }
        .better{
          span{
            background-color: #5ea732;
            color: #fff;
            text-align: center;
          }
        }
        .better-more{
          span{
            background-color: #f13e3a;
            padding: 1px;
          }
        }
      }
    }
  }
  .shop-bottom {
    text-align: center;
    margin-top: 10px;
    .enter-shop {
      display: inline-block;
      font-size: 14px;
      background-color: #f2f5f8;
      width: 150px;
      // height: 30px;
      text-align: center;
      line-height: 30px;
      border-radius: 10px;
    }
  }
}
</style>

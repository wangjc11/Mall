<template>
  <div class="good-item">
    <img v-if="'show' in goodsItem"
      v-lazy="goodsItem.show.img" alt="" class="goods"
      @load="itemimgload"  @click="goodsclick">

    <img v-if="'image' in goodsItem"
    :src="goodsItem.image" alt="" class="goods"
    @load="itemimgload" @click="goodsclick">
    <!-- 可以判断接受的数据对象中又没有show属性或者image属性，从而展示对应的图片
      也可以通过计算属性来判断到底应该显示 img还是image -->

    <div class="item">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <img src="@/assets/img/common/like.png" alt="">
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'goodsItem',
  props: {
    goodsItem: {
      type: Object,
      default(){
        return {}
      }
    }
  },
  methods: {
    itemimgload(){
      this.$bus.$emit("itemimgload")   // 通过$bus发出事件
    },
    goodsclick(){
      if(this.goodsItem.iid){
        this.$router.push("/detail/" + this.goodsItem.iid)
      }/* else if(this.goodsItem.item_id){
        this.$router.push("/detail/" + this.goodsItem.item_id)
      } */

    },
  },
}
</script>

<style lang='less'>
  .good-item{
    padding-bottom: 40px;
    width: 49%;
    position: relative;
    .goods{
      width: 100%;
      border-radius: 5px;
    }
    .item{
      font-size: 14px;
      position: absolute;
      left: 0;
      right: 0;
      text-align: center;
      overflow: hidden;
      bottom: 5px;
      p{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .price{
        color: var(--color-high-text);
        margin-right: 15px;
      }
      img{
        width: 14px;
        height: 14px;
        vertical-align: top;
      }
    }
  }
</style>

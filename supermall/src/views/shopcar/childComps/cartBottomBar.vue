<template>
  <div class="cart-bottom-bar">
    <div  class='bottom-left'>
      <check-button class="check-bottom" :is-checked='isSelectAll' @click.native="totalchecked"/>
      <span>全选</span>
    </div>
    <div class="price">
      合计：{{totalPrice}}
    </div>
    <div class="caclulate" @click="calcClick">
      去计算 ({{goodsLength}})
    </div>
  </div>
</template>

<script>
import checkButton from "@/components/context/checkbutton/checkButton.vue"
export default {
  name: "cartBottomBar",
  components: {
    checkButton,
  },
  computed: {
    totalPrice(){
      return "￥" + this.$store.state.cartList.filter(item => {
        return item.checked
      }).reduce((preValue, item) => {
        return preValue + item.realPrice * item.count
      }, 0).toFixed(2)
    },
    goodsLength(){
      return this.$store.state.cartList.filter(item => {
        return item.checked
      }).length
    },
    isSelectAll(){
      // length可以取反，取反后：若长度为0，则结果为true，若有长度，则返回false
      if(this.$store.state.cartList.length){
        return !this.$store.state.cartList.filter(item => {
          return !item.checked // 这是找到没有选中的商品的长度，只要有一个商品没选中，就有长度，为true，取反后为false
        }).length
      }
    }
  },
  methods: {
    totalchecked(){
      // 这里可以借助上面的isSelectAll来判断是全选还是取消全选
      if(this.isSelectAll){
          this.$store.state.cartList.map(item => {
          return item.checked = false
        })
      }else{
        this.$store.state.cartList.map(item => {
          return item.checked = true
        })
      }
    },
    calcClick(){
      if(this.$store.state.cartList.filter(item => {
          return item.checked
        }).length){
          // console.log("------");
      }else{
          if(this.$store.state.cartList.length){
            this.$toast.show('请选中商品')
          }else{
            this.$toast.show('请将商品添加至购物车')
          }
        }
    }
  },
}
</script>

<style scoped lang="less">
  .cart-bottom-bar{
    font-size: 14px;
    display: flex;
    width: 100%;
    height: 40px;
    background-color: #eee;
    position: absolute;
    align-items: center;
    .bottom-left{
      display: flex;
      width: 60px;
      justify-content: center;
      align-items: center;
      margin-left: 10px;
      span{
        line-height: 40px;
        margin-left: 5px;
      }
    }
    .price{
      margin-left: 10px;
      color: red;
      flex-grow: 1;
    }
    .caclulate{
      width: 90px;
      line-height: 40px;
      text-align: center;
      background-color: red;
      color: #ffffff;
    }
  }
</style>

<template>
  <div class="cart">
    <navbar class="cart-navbar">
      <!-- 新版替换插槽的方式，使用template进行替换，#name 相当于 slot='name' -->
      <template #center>
        <div>
          购物车({{cartlength}})
        </div>
      </template>
    </navbar>

    <scroll class="cart-scroll" ref="scroll">
      <cart-list/>
    </scroll>

    <cart-bottom-bar/>
  </div>
</template>

<script>
import navbar from "@/components/common/navbar/navBar.vue";
import Scroll from "@/components/common/scroll/Scroll.vue";

import cartList from "./childComps/cartList.vue"
import cartBottomBar from "./childComps/cartBottomBar.vue"

export default {
  name: 'shopcar',
  components: {
    navbar,
    cartList,
    cartBottomBar,
    Scroll,
  },
  computed: {
    cartlength(){
      return this.$store.state.cartList.length
    }
  },
  activated() {
    // console.log("-------");
    this.$refs.scroll.refresh()
  },
}
</script>

<style scoped lang="less">
.cart{
  height: 100vh;
  .cart-navbar{
    background-color: var(--color-tint);
    color: #ffffff;
  }
  .cart-scroll{
    height: calc(100% - 44px - 49px - 40px);
    overflow: hidden;
  }
}
</style>

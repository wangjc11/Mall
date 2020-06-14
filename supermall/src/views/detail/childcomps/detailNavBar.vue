<template>
<div>
  <navbar class="detailbar">
    <div slot="left" class="left">
      <img src="@/assets/img/detail/detailback.png" alt="" @click="detailBackClick">
    </div>

    <div slot="center" class="center">
      <!-- 遍历的时候index必须是第二个！！！不然会出错 -->
      <div class="center-item"
      v-for="(item, index, key) in title" :key="key"
      @click="itemclick(index)"
      :class="{active : index===currentIndex}">{{item}}</div>
    </div>

    <!-- <div slot="right">购物街</div> -->
  </navbar>
</div>
</template>

<script>
import navbar from "@/components/common/navbar/navBar.vue";

export default {
  name: 'detailNavBar',
  components: {
    navbar,
  },
  data() {
    return {
      title: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    }
  },
  methods: {
    detailBackClick(){
      // this.$emit('detailBackClick')
      this.$router.back()
    },
    itemclick(index){
      this.currentIndex = index
      this.$emit('detialNavClick', index)
    }
  },

}
</script>

<style scoped lang='less'>
  .detailbar{

    .left{
      width: 60px;
      height: 44px;
      display: flex;
      justify-content: center;
      align-items: center;
      img{
        width: 25px;
        height: 25px;
        margin-left: -15px;
      }
    }
    .center{
      display: flex;
      .center-item{
        font-size: 14px;
        flex: 1;
      }
      .active{
        color: var(--color-high-text);
      }
    }
  }
</style>

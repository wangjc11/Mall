<template>
  <div id="home">
    <navbar class="home-nav">
      <div slot="center">购物街</div>
    </navbar>

    <tab-control class="tab-control"
    ref="copytabControl"
      @item-click='itemclick'
      :title="title"
      v-show="isTabControl"/>

    <scroll class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll='contentscroll'
      @pullingUp = 'loadmore'>

      <home-swiper :banner="banner"/>

      <recommend-view :recommend="recommend"/>

      <popular/>

      <tab-control @item-click='itemclick'
          :title="title"
      ref="tabControl"/>

      <goods-list :goods='goods[goodsname].list'/>
    </scroll>

    <back-top @click.native="backclick" class="back-top" :class="{show: positiony < -1000}"/>
    <!-- 监听组件的原生事件必须加native，因为默认是不能监听组件的事件
        找到组件【对象】可以通过$ref来找到 -->

  </div>
</template>

<script>
import Vue from 'vue'

import homeSwiper from "./childcomps/homeSwiper.vue"
import recommendView from "./childcomps/recommendView.vue"
import popular from "./childcomps/popular.vue"

import navbar from "@/components/common/navbar/navBar.vue";
import Scroll from "@/components/common/scroll/Scroll.vue";
import tabControl from '@/components/context/tabControl/tabcontrol.vue';
// import copytabControl from '@/components/context/tabControl/copytabcontrol.vue';
import goodsList from '@/components/context/goods/goodsList.vue';
import backTop from '@/components/context/backtop/backTop.vue';

import { getHomeMultitada, getGoodsDate } from "@/network/home.js";
import {debounce} from '@/common/utils.js'
import {itemListenerMixin} from '@/common/mixin.js'

export default {
  name: "home",

  mixins: [itemListenerMixin],   // mixin操作，将导入的mixin文件进行类似注册的操作

  components: {
    navbar,
    homeSwiper,
    recommendView,
    popular,
    tabControl,
    // copytabControl,
    goodsList,
    Scroll,
    backTop,
  },

  data() {
    return {
      banner: [],
      recommend: [],
      title: ['流行','新款','精选'],
      goods: {
        'pop': {page: 0 , list: []},
        'new': {page: 0 , list: []},
        'sell': {page: 0 , list: []},
      },
      goodsname: 'pop',
      positiony: 0,
      isTabControl: false,
      saveY: 0,
    }
  },

  methods: {
    _getHomeMultitada(){   // 获取轮播图、分类等信息
      getHomeMultitada().then(res => {
        // console.log(res);
        this.banner = res.data.banner.list;
        this.recommend = res.data.recommend.list;
      })
      .catch(err => {
        console.log(err);
      })
    },

    _getGoodsDate(type){     // 获取首页商品信息
      // 1.获取页码
      const page = this.goods[type].page + 1;
      getGoodsDate(type,page).then(res => {
        // console.log(res);

        // this.goods[type].list = res.data.list;  这样直接等于之后不能加载更多
        this.goods[type].list.push(...res.data.list) // ...res.data.list可以遍历该数组，然后通过push加入到新的数组中，是响应式

        this.goods[type].page += 1
        // this.$refs.scroll.refresh() // 进行刷新，防止scroll对滚动页面的计算错误，导致不能滑动，进而加载很多页 (有防抖函数)
        this.$refs.scroll.finishPullUp()
      })
    },

    // 判断当前应该显示的是哪个数据
    itemclick(index){
      // console.log(index);
      if(index == 1){
        this.goodsname = 'new'
      }else if(index == 2){
        this.goodsname = 'sell'
      }else{
        this.goodsname = 'pop'
      }
      this.$refs.copytabControl.currentIndex = index  // 让两个tabcontrol的currentindex保持一致
      this.$refs.tabControl.currentIndex = index
    },

    // console.log('back');   this.$refs.scroll可以找到滚动的组件对象,在scroll中封装一个方法，直接调用scrollTo方法
    backclick(){
      this.$refs.scroll.scrollTo(0, 0, 500)
    },

    contentscroll(position){
      // console.log(position);  判断是否显示返回到顶部的按钮
      this.positiony = position.y

      // console.log(this.$refs.tabControl.$el.offsetTop);  判断是否显示吸顶的tabcontrol
      if((-position.y) > this.$refs.tabControl.$el.offsetTop){
        this.isTabControl = true
      }else{
        this.isTabControl = false
      }
    },

    // 加载更多，直接调用加载的函数，传入当前的类型即可，因为页数在每次执行加载函数会自动加1
    loadmore(){
      // console.log("daodi");
      this._getGoodsDate(this.goodsname);
      this.$refs.scroll.refresh()
    },

  },

  // 只有保持了keepalive才有activated与deactived，不然一般的组件都是created与destroyed
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh()  // 防止偶尔的返回时会自动回到顶部，但是进入详情页还是会有该现象
  },

  deactivated() {
    // 记录离开时的位置
    this.saveY = this.$refs.scroll.getscrollY()

    // 再离开时不需要对页面进行刷新，需要关闭$bus
    this.$bus.$off("itemimgload", this.itemimgload)
    // console.log("------");

  },

  created() {
      // 获取轮播图、分类等信息
      this._getHomeMultitada();

      // 获取首页商品信息
      this._getGoodsDate('pop');
      this._getGoodsDate('new');
      this._getGoodsDate('sell');

  },

  mounted() {   // 通过mixin

      /* const refresh = debounce(this.$refs.scroll.refresh, 200)  // 防抖函数
      this.$bus.$on("itemimgload", () => {  // 接收$bus发出的事件  不需要一直监听，因为在详情页也会发出一个itemimgload事件
        // console.log("-------");             需要在离开首页的时候将该监听取消
        // this.scroll && this.$refs.scroll.refresh()
        refresh()
      }) */
  },

};

</script>

<style scoped>
/* scoped 表明作用域为该文件内，其他组件内有相同的clss不产生影响 */
#home{
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #ffffff;
}
.tab-control{
  position: relative;
  /* z-index只对定位元素起效果 */
  z-index: 99;
}
.content{
  /* height: 300px; */
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
.back-top{
  display: none;
}
.show{
  display: block;
}
</style>

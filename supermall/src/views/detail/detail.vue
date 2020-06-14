<template>
  <div id="detail">
    <detail-nav-bar ref="detailControl" class="detail-nav-bar" @detialNavClick='detailNavBarClick'/>

    <scroll class="detailscroll" ref="scroll" :probe-type="3" @scroll='contentscroll'>
      <detail-swiper :banner='detailbanner'/>
      <detail-base-info :goods='goods'/>
      <detail-shop-info :shop='shop'/>
      <detail-goods-list :detailInfo='detailInfo'/>
      <detail-param-info ref="param" :goodsParam='goodsParam'/>
      <detail-comment-info ref="comment" :commentInfo='commentInfo'/>
      <goods-list ref="recommend" class="recommend-list" :goods='recommendInfo'/>

    </scroll>

    <detail-bottom-bar @addCart='addToCart'/>
    <back-top @click.native="backclick" class="back-top" v-show="positiony < -1000"/>
  </div>
</template>

<script>
import detailNavBar from "./childcomps/detailNavBar.vue"
import detailSwiper from "./childcomps/detailSwiper.vue"
import detailBaseInfo from "./childcomps/detailBaseInfo.vue"
import detailShopInfo from "./childcomps/detailShopInfo.vue"
import detailGoodsList from "./childcomps/detailGoodslist.vue"
import detailParamInfo from "./childcomps/detailParamInfo.vue"
import detailCommentInfo from "./childcomps/detailCommentInfo.vue"
import detailBottomBar from "./childcomps/detailBottomBar.vue"

import {getDetailDate, getRecommend, Goods, Shop, GoodsParam} from "@/network/detail.js"

import Scroll from "@/components/common/scroll/Scroll.vue";
import goodsList from '@/components/context/goods/goodsList.vue';


import {debounce} from '@/common/utils.js'
import {itemListenerMixin, backTopMixin} from '@/common/mixin.js'


export default {
  name: 'detail',

  mixins: [itemListenerMixin, backTopMixin],

  data() {
    return {
      iid: null,
      detailbanner: [],
      goods: {},
      shop: {},
      detailInfo: {},
      goodsParam: {},
      commentInfo: {},
      recommendInfo: [],
      detailTopYs: [],
      positiony: 0,
      getThemeTopY: null,
    }
  },

  components: {
    detailNavBar,
    detailSwiper,
    detailBaseInfo,
    detailShopInfo,
    detailGoodsList,
    Scroll,
    detailParamInfo,
    detailCommentInfo,
    goodsList,
    // backTop,
    detailBottomBar,
  },

  methods: {
    detailNavBarClick(index){
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.detailTopYs[index] + 44, 200)
    },
    contentscroll(position){
      // console.log(position);  //判断是否显示返回到顶部的按钮
      this.positiony = position.y

      // 判断滚动的位置，从而相应的改变详情页标题的样式，注意！！如果有些if判断会导致当
      // -this.positiony = (this.detailTopYs[1]-44)时，不能正常的显示样式
      if(-this.positiony < (this.detailTopYs[1]-44)){
        this.$refs.detailControl.currentIndex = 0
      }else if(-this.positiony < (this.detailTopYs[2]-44)){
        this.$refs.detailControl.currentIndex = 1
      }else if(-this.positiony < (this.detailTopYs[3]-44)){
        this.$refs.detailControl.currentIndex = 2
      }else{
        this.$refs.detailControl.currentIndex = 3
      }

    },
    addToCart(){
      // console.log("------------");
      // 获取购物车需要展示的单个的商品信息
      const product = {}
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.realPrice = this.goods.realPrice
      product.image = this.detailbanner[0]
      product.iid = this.iid

      // 将商品信息添加到vuex中的购物车中
      this.$store.dispatch("addCart", product).then(res => {
        // 将商品加入购物车成功后的回调函数
        // console.log(res);
        this.$toast.show(res, 2000)
      })

    }
  },

  created() {
    // 获取点击的商品的iid，并且在keepalive中将detail排除，因为每次点击的商品不一定是同一个
    this.iid = this.$route.params.iid;

    // 然后向服务器发送请求，获取到点击的该商品的一系列信息，并且通过构造函数将一大堆信息放入一个对象中
    getDetailDate(this.iid).then(res => {
      // console.log(res);

      // 获取详情页的轮播图信息
      this.detailbanner = res.result.itemInfo.topImages

      // 商品相关信息
      this.goods = new Goods(res.result.itemInfo, res.result.columns, res.result.shopInfo.services)
      // console.log(this.goods);

      // 商家相关信息
      this.shop = new Shop(res.result.shopInfo)
      // console.log(this.shop);

      // 获取详情的图片信息
      this.detailInfo = res.result.detailInfo
      // console.log(this.detailInfo);

      // 获取衣服尺寸表等信息
      this.goodsParam = new GoodsParam(res.result.itemParams.info, res.result.itemParams.rule)
      // console.log(this.goodsParam);

      // 获取评论信息  详情页只展示一条评论 有可能没有评论
      if(res.result.rate.cRate !== 0){
        this.commentInfo = res.result.rate.list[0]
      }
    })

    // 请求推荐的商品数据
    getRecommend().then(res => {
      // console.log(res);

      // 获取推荐商品信息
      this.recommendInfo = res.data.list
      // console.log(this.recommendInfo);
    })

    // 设置获取每个组件offsetTop的防抖函数
    this.getThemeTopY = debounce(() => {
      this.detailTopYs = []
      this.detailTopYs.push(0)
      this.detailTopYs.push(this.$refs.param.$el.offsetTop)
      this.detailTopYs.push(this.$refs.comment.$el.offsetTop)
      this.detailTopYs.push(this.$refs.recommend.$el.offsetTop)
    },200)
  },
  updated() {
    },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 200) // 利用防抖函数来提高性能，避免多次进行刷新
    this.$bus.$on("imageload", () => {  // 通过事件总线的方式来接收$bus发出的事件，从而进行刷新
      refresh() // imageload是刷新商品的细节图片展示

    /* this.detailTopYs = []    // 这样做性能不好，会重复的加载,让详情页的导航条可以定位,在created函数中建立一个防抖函数
    this.detailTopYs.push(0),
    this.detailTopYs.push(this.$refs.param.$el.offsetTop)
    this.detailTopYs.push(this.$refs.comment.$el.offsetTop)
    this.detailTopYs.push(this.$refs.recommend.$el.offsetTop)
    // console.log(this.detailTopYs); */
      this.getThemeTopY()
    })
  },
}
</script>

<style scoped>
#detail{
  position: relative;
  z-index: 100;
  background-color: #ffffff;
  height: 100vh;
}
.detail-nav-bar{
  background-color: #ffffff;
  position: relative;
  z-index: 99;
}
.detailscroll{
  height: calc(100% - 44px - 49px);
  overflow: hidden;
}
.detailImage{
  width: 100%;
}
.recommend-list{
  margin-top: 5px;
}
.back-top{
  position: absolute;
  bottom: 60px;
  right: 10px;
  z-index: 999;
}
</style>

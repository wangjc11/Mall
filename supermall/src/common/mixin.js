import {debounce} from './utils.js'

export const itemListenerMixin = {   // mixin，在多个组件中用到的重复的数据，方法等等，可以提取
  data() {
    return {
      itemimgload: null,
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 200)  // 防抖函数
    this.itemimgload =  () => {  // 接收$bus发出的事件  不需要一直监听，因为在详情页也会发出一个itemimgload事件
      refresh()    // itemimgload刷新具体的展示的每一个小的商品列表
    }
    this.$bus.$on("itemimgload", this.itemimgload)
    // console.log("------");
  }
}

import backTop from '@/components/context/backtop/backTop.vue';
export const backTopMixin = {
  components: {
    backTop,
  },
  methods: {
    backclick(){
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
  },
}

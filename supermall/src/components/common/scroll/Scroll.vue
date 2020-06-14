<template>
  <div ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';    // better-scroll最外层的标签包含的只能是一个整体的标签，不能包含多个标签

export default {
  name: 'Scroll',
  data() {
    return {
      scroll: null
    }
  },
  props: {
    probeType: {
        type: Number,
        default(){
          return 0
        }
    },
    pullUpLoad: {
        type: Boolean,
        default(){
          return false
        }
    }
  },
  mounted() {
    // document.querySelector(".wrapper")  通过这个方式拿到的元素不一定准确，因为class为wrapper的可能有很多
    this.scroll = new BScroll(this.$refs.wrapper,{
      // mouseWheel: true,
      click: true,
      // 让用户动态的传递这两个参数，而不是写死
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
    })

    // 监听scroll组件滚动的位置信息
    if(this.probeType === 2 || this.probeType === 3){
      this.scroll.on('scroll', (postion) => {
        // console.log(postion);
        this.$emit('scroll', postion)
      })
    }

    // 监听scroll组件滚动到最底部时的状态
    if(this.pullUpLoad){
      this.scroll.on('pullingUp', () => {
        // console.log("daodi");
        this.$emit('pullingUp')
      })
    }

  },
  methods: {
    // 让scroll回到指定的状态，第三个参数为回去的时间
    scrollTo(x, y, time = 500){
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    finishPullUp(){
      this.scroll.finishPullUp()
    },
    refresh(){
      // console.log("-------");
      this.scroll && this.scroll.refresh()
    },
    getscrollY(){
      return this.scroll? this.scroll.y : 0
    }
  },
}
</script>

<style>

</style>

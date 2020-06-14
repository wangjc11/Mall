<template>
  <div class="tab-bar-item" @click="btnclick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style = "activestyle">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "tabbaritem",
  props: {
    path: String,
    activecolor: {
      type: String,
      default: 'red',
    },
  },
  computed: {
    isActive(){
      return this.$route.path.indexOf(this.path) !== -1
      // indexOf函数可以判断是否包含，如果找到，则返回括号内子串的第一次出现的位置
      // 如果要检索的字符串值没有出现，则该方法返回 -1。
    },
    activestyle(){
      return this.isActive ? {color : this.activecolor} : {}
    }
  },
  methods: {
    btnclick() {
      // console.log(this.path);
      this.$router.push(this.path).catch(err => err)
      // .catch(err => err)是为了阻止重复的点击同一个按钮，路径相同而报错，但是不影响操作
    }
  }
};
</script>

<style>
.tab-bar-item {
  flex: 1;
  height: 49px;
  text-align: center;
  font-size: 14px;
}
.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
  /* margin-bottom: 2px; */
}
</style>

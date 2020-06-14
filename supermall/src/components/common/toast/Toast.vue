<template>
  <div class="toast" v-show="isShow">
    <div class="message">{{message}}</div>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  // props: {
  //   message: {
  //     type: String,
  //     default: ''
  //   },
  //   show: {
  //     type: Boolean,
  //     default: false
  //   }
  // },
  data() {
    // 封装成组件后，这两个参数都是由外部调用时直接传入参数，不需要进行另外的父子组件传入
    return {
      isShow: false,
      message: '',
    }
  },
  methods: {
    show(data, duration=2000){
      this.isShow = true
      this.message = data
      setTimeout(() => {
        this.isShow = false
        this.message = ''
      }, duration)
    }
  },
}
</script>

<style scoped>
  .toast{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;

    background-color: rgba(0, 0, 0, .7);
    color: #ffffff;
    padding: 8px 10px;
    border-radius: 10px;
    white-space: nowrap;
    /* white-space: nowrap; 不让文字换行 */
  }
</style>

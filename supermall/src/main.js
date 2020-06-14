import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from './components/common/toast/index.js'
import lazyLoad from "vue-lazyload"

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()  // 默认的是没有$bus属性的，在原型中添加$bus属性，让其为一个Vue实例，所以在vue的组件中都可以使用$bus
Vue.use(toast)  // 安装导入的toast，会默认在toast文件中执行install函数

Vue.use(lazyLoad)  //使用图片的懒加载，因此以后使用 img :src 需要改成 v-lazy,使用时也可以指定还没加载时显示的照片而不是空白
/* Vue.use(lazyLoad， {
  loading: require("./assets/img...")   在还没加载请求的照片时显示的是该照片，为本地指定的照片
}) */

/* 移动端的时候点击会有300ms的延迟，所以如果要消除延迟，需要 npm install fastclick --save
然后导入安装的fastclick文件，然后使用该组件就可以了，
imort fastClcik from "fastclick" 由于是安装的插件，所以直接导入即可
使用：fastClick.attach(document.body) 将该组件使用在整个的body中*/

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import Toast from './Toast.vue'

const obj = {
}

obj.install = function(Vue){
  // 创建组件构造器
  const toastContrustor = Vue.extend(Toast)
  // new的方式，利用组件构造器，创建出一个组件对象
  const toast = new toastContrustor()
  // 将组件对象手动挂载到某个元素上
  toast.$mount(document.createElement("div"))
  // toast.$el 就是div
  document.body.appendChild(toast.$el)

  // 上面是创建一个组件，将该组件插入到body中，因为Vue.prototype.$toast = toast只能
  // 将组件中的方法等信息插入到原型中，但是对应的网页元素是没办法插入到body中的
  Vue.prototype.$toast = toast
}

export default obj

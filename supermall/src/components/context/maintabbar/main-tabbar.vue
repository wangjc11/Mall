<template>
    <tabbar>
      <tabbaritem path = "/home">
      <!-- 这里的path = "/home"必须要用双引号，单引号会报错 -->
        <img slot="item-icon" src="@/assets/img/tabbar/home.png" alt />
        <img slot="item-icon-active" src="@/assets/img/tabbar/homeactive.png" alt />
        <div slot="item-text">首页</div>
      </tabbaritem>
      <tabbaritem path = "/category">
        <img slot="item-icon" src="@/assets/img/tabbar/category.png" alt />
        <img slot="item-icon-active" src="@/assets/img/tabbar/categoryactive.png" alt />
        <div slot="item-text">分类</div>
      </tabbaritem>
      <tabbaritem path = "/shopcar">
        <img slot="item-icon" src="@/assets/img/tabbar/shopcar.png" alt />
        <img slot="item-icon-active" src="@/assets/img/tabbar/shopcaractive.png" alt />
        <div slot="item-text">购物车</div>
      </tabbaritem>
      <tabbaritem path = "/profile">
        <img slot="item-icon" src="@/assets/img/tabbar/profile.png" alt />
        <img slot="item-icon-active" src="@/assets/img/tabbar/profileactive.png" alt />
        <div slot="item-text">我的</div>
      </tabbaritem>
    </tabbar>
</template>

<script>
  import Tabbar from '@/components/common/tabbar/Tabbar.vue'
  import Tabbaritem from '@/components/common/tabbar/Tabbaritem.vue'
  
export default {
  name: 'MainTabbar',
  components: {
    Tabbar,  // HTML 里面不区分大小写，且驼峰九可以拆分为-，所以可以这样写
    Tabbaritem
  }
}
</script>

<style>

</style>

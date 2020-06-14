<template>
  <div class="tab-control">
    <div v-for="(item,index,key) in title"
      :key="key" class="tab-control-item"
     :class="{active:index===currentIndex}"
     @click="span(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tabControl',
  props: {
    title: {
      type: Array,
      default(){
        return [];
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    span(index){
      this.currentIndex = index;
      this.$emit('item-click', index)
    }
  },
}
</script>

<style lang="less">
  .tab-control{
    display: flex;
    text-align: center;
    font-size: 14px;
    line-height: 40px;
    background-color: #ffffff;

    .tab-control-item{
      flex: 1;
      span{
        padding: 5px;
      }
    }
    .active{
      color: var(--color-high-text);
      span{
        border-bottom: 3px solid var(--color-tint);
      }
    }
  }
</style>>

<template>
<div id="tab-bar">
  <slot></slot>
</div>
</template>

<script>
export default {

}
</script>

<style>
  #tab-bar{
    display: flex;
    height: 49px;
    background-color: #f6f6f6;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: 0 -1px 1px rgba(0, 0, 0, 0.1);
    z-index: 99;
  }

</style>

<template>
<div class="check-button" :class="{check:isChecked}">
  <img src="@/assets/img/cart/check.png" alt="">
</div>
</template>

<script>
export default {
  name: 'checkButton',
  props: {
    isChecked:{
      type: Boolean,
      default(){
        return false
      }
    }
  }
}
</script>

<style scoped>
.check-button{
  background-color: #ffffff;
  border-radius: 50%;
  border: 2px solid #aaa;
  height: 20px;
}
.check-button img{
  width: 15px;
  /* margin-top: 1px; */
}
.check{
  background-color: red;
  border-color: red;
}
</style>

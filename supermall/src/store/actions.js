export const actions ={
  addCart(context, playload){
    return new Promise((resolve, reject) => {
      // 用oldProduct记录重复的物品，然后增加相同物品的数量
      // find函数可以在数组中查找符合条件的元素，并且返回该元素
      let oldProduct = context.state.cartList.find(item => item.iid === playload.iid)
      if(oldProduct){
        context.commit('addCounter', oldProduct)
        resolve("商品数量加1")
      }else{
        playload.count = 1
        context.commit("addCartList", playload)
        resolve("商品添加成功")
      }
    })

  }
}

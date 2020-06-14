export const mutations = {
  addCounter(state, playload){
    playload.count += 1
  },
  addCartList(state, playload){
    playload.checked = true
    state.cartList.push(playload)
  }
}

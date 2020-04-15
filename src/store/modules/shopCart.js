import {
  reqAddToCart,
  reqCartList,
  reqCheckCartItem,
  reqDeleteCartItem
} from "@/api"

const state = {
  cartList: [] //所有购物车列表   
}

const mutations = {
  RECEIVE_CART_LIST(state, cartList) {
    state.cartList = cartList
  }

}

const actions = {
  async addToCart({
    commit
  }, {
    skuId,
    skuNum,
    callback
  }) {
    const result = await reqAddToCart(skuId, skuNum)
    if (result.code === 200) {
      callback('')
    } else {
      callback(result.errorMsg || '添加购物车失败')
    }
  },
  async addToCart2({
    commit
  }, {
    skuId,
    skuNum
  }) {
    const result = await reqAddToCart(skuId, skuNum)
    // if (result.code === 200) {
    //   return ('')
    // } else {
    //   return (result.errorMsg || '添加购物车失败')
    // }
    return result.code === 200?'':result.errorMsg || '添加购物车失败'
  },

  //获取购物车数据列表的异步action
  async getCartList({
    commit
  }) {
    const result = await reqCartList()
    if (result.code === 200) {
      const cartList = result.data
      commit('RECEIVE_CART_LIST', cartList)
    }
  },
  
  async deleteCartItem({commit},skuId) {

    const result = await reqDeleteCartItem(skuId)
    return result.code === 200?'':result.message||'商品删除失败'
   
  },

  async checkCartItem({
    commit
  },{skuId,isChecked}) { 
    /* skuID
isChecked */
    const result = await reqCheckCartItem({skuId,isChecked})
    if (result.code !== 200) {
      throw new Error('勾选购物项失败')
    }
  },


}

const getters = {
  /* 
   总数量
   */
  totalCount(state) {
    /* let total = 0
    state.cartList.forEach((item, index) => {
      if (item.isChecked===1) {
        total += item.skuNum
      }
    }) 
    return total
    */

    // 使用reduce进行累计/累加的操作
    return state.cartList.reduce((pre, item) => {
      /* 
      if (item.isChecked===1) {
        return pre + item.skuNum
      } else {
        return pre
      } */
      return item.isChecked === 1 ? pre + item.skuNum : pre
    }, 0)
  },

  /* 
  总价格
  */
  totalPrice(state) {
    return state.cartList.reduce((pre, item) => {
      return item.isChecked === 1 ? pre + item.skuNum * item.cartPrice : pre
    }, 0)
  },

  /* 
  是否全选
  */
  isAllChecked(state) {
    // arr.every(): 判断所有的元素是否都满足条件
    return state.cartList.every((item, index) => item.isChecked === 1)
  },

  selectedItems(state) {
    // state.cartList.filter((item, index) => item.isChecked===1)
    return state.cartList.reduce((pre,item) => {
      if (item.isChecked ===1) {
        pre.push(item)
      }
      return pre
    },[]);
  }

}


export default {
  state,
  mutations,
  actions,
  getters
}
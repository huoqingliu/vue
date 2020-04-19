import {
  reqTradeInfo,
  reqPayInfo
} from "@/api";

const state = {
  orderInfo: {},
  orderPayInfo:{}
}
const mutations = {
  RECEIVE_ORDER_INFO(state, orderInfo) {
    state.orderInfo = orderInfo
  },
  RECEIVE_ORDER_PAY_INFO(state, orderPayInfo) {
    state.orderPayInfo = orderPayInfo
  }

}
const actions = {
  async getOrderInfo({ commit }) {
    const result = await reqTradeInfo()
    if (result.code === 200) {
      const orderInfo = result.data
      commit('RECEIVE_ORDER_INFO', orderInfo)
    }
  },
  async getOrderPayInfo({ commit }, orderId) {
    const result = await reqPayInfo(orderId)
    if (result.code === 200) {
      const orderPayInfo = result.data
      commit('RECEIVE_ORDER_PAY_INFO', orderPayInfo)
    }
  },
}
const getters = {
  userAddressList(state) {
    return state.orderInfo.userAddressList || [];
  },
  detailArrayList(state) {
    return state.orderInfo.detailArrayList || [];
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
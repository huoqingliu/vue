import {
  reqBaseCategoryList
} from "@/api";

const state = {
  baseCategoryList: []
}
const mutations = {
  RECEIVE_CATEGORYS(state, categorys) {
    state.baseCategoryList = categorys.splice(0, categorys.length-2)
  }

}
const actions = {
  async getBaseCategoryList({commit}) {
    const result = await reqBaseCategoryList()
    if (result.code === 200) {
      const categorys = result.data
      commit('RECEIVE_CATEGORYS', categorys)

    }
  }
}
const getters = {

}

export default {
  state,
  mutations,
  actions,
  getters
}
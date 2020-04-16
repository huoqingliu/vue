import { getUUID } from "@/utils/storageUtils";
import { reqRegistration, reqLogin ,reqLogout} from "@/api";

const state = {
  userInfo: JSON.parse(localStorage.getItem("USERINFO_KEY")) ||{},
  userTempId:getUUID()
}

const mutations = {
  RECEIVE_USER_INFO(state, userInfo) {
    state.userInfo = userInfo
  },
  RESET_USER_INFO(state) {
    state.userInfo = {}
  }
}
const actions = {
  async Registration({ commit }, userInfo) {
    // console.log({ mobile, password, code });
    
    const result = await reqRegistration(userInfo)
    
    return result.code === 200?'':result.message+':'+result.data||'注册失败'
  },

  async Login({ commit }, userInfo) {
    // console.log({ mobile, password,});
    
    const result = await reqLogin(userInfo)
    if (result.code === 200) {
      const userInfo = result.data
      commit('RECEIVE_USER_INFO',userInfo)
    } else {
      throw new Error(result.message||'登录失败')
    }
  },

  async Logout({ commit }) {
    const result = await reqLogout()
    if (result.code === 200) {
      commit('RESET_USER_INFO')
    } else {
      throw new Error(result.message||'退出登录失败')
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
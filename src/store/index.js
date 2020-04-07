import Vue from "vue";
import Vuex from "vuex";
import mutations from "./mutatuons";
import actions from "./actions";
import getters from "./getters";
import modules from "./modules";

Vue.use(Vuex)

export default new Vuex.Store({
  mutations,
  actions,
  getters,
  modules

})
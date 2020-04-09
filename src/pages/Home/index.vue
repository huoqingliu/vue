<template>
  <div class="home">
    <!-- 商品分类导航 -->
    <TypeNav />

    <!--列表-->
    <ListContainer />

    <!--今日推荐-->
    <TodyRecommend />

    <!-- 商品排行 -->
    <Rank />

    <!-- 猜你喜欢 -->
    <Like />

    <!--楼层-->
    <Floor v-for="floor in floors" :key="floor.id" :floor='floor'/>

    <!--商标-->
    <Brand />
  </div>
</template>

<script>
import TodyRecommend from "./TodayRecommend/TodayRecommend";
import Brand from "./Brand/Brand";
import Floor from "./Floor/Floor";
import Like from "./Like/Like";
import ListContainer from "./ListContainer/ListContainer";
import Rank from "./Rank/Rank";
import { mapState } from "vuex";
export default {
  name: "Home",

  mounted() {
    this.$store.dispatch("getBanners");
    this.$store.dispatch("getFloors");
  },
  computed: {
    ...mapState({
      floors: state => state.home.floors
    })
  },
  components: {
    // 局部注册, 只能在当前组件中使用
    TodyRecommend,
    Brand,
    Floor,
    Like,
    ListContainer,
    Rank
  }
};
</script>

<style lang="less" scoped>
</style>
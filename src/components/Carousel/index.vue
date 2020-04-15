<template>
  <div class="swiper-container" ref="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="b1 in carouselList" :key="b1.id">
        <img :src="b1.imgUrl" alt="carouselList" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>

    <!-- 如果需要滚动条 -->
    <!-- <div class="swiper-scrollbar"></div> -->
  </div>
</template>

<script type="text/ecmascript-6">
import Swiper from "swiper";
export default {
  name: "carousel",
  props: {
    carouselList: Array
    //外部传入的数据
  },
  mounted() {
    // console.log("mounted", this.carouselList.length);
  },

  watch: {
    carouselList: {
      handler() {
        if (this.carouselList.length==0) {
          return ;
        }
        // console.log("watch", this.carouselList.length);
        this.$nextTick(() => {
          // new Swiper(".swiper-container",{
          new Swiper(this.$refs.swiper, {
            // direction: "vertical", // 垂直切换选项
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination"
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev"
            }

            // 如果需要滚动条
            // scrollbar: {
            //   el: ".swiper-scrollbar"
            // }
          });
        });
      },
      immediate:true,//在初始显示时就立即调用一次handler
    }
  }
};
</script>

<style scoped>
</style>

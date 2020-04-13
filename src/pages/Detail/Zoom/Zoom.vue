<template>
  <div class="spec-preview">
    <img :src="skuInfo.skuDefaultImg" />
    <div class="mask" ref="mask" @mousemove="handleMove"></div>
    <div class="big">
      <img :src="skuInfo.skuDefaultImg" />
    </div>
    <div class="small" ref="small"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Zoom",
  // props: {
  //   skuDefaultImg: String
  // },
  computed: {
    ...mapGetters(["skuInfo"])
  },
  data(){
    return{

    }
  },
  mounted(){
    this.smallWidth = this.$refs.mask.clientWidth/2
    this.smallHeight = this.$refs.mask.clientHeight/2
    // console.log(this.smallHeight);

  },
  methods:{
    handleMove(event){
      const {offsetX,offsetY}=event
      // console.log(offsetX,offsetY);

      const smallWidth = this.smallWidth
      const smallHeight = this.smallHeight
      // console.log(smallWidth);
      
      let left = 0;
      let top = 0;
      left = offsetX -smallWidth/2
      top = offsetY -smallHeight/2
      if (left<0) {
        left=0
      }else if (left>smallWidth) {
        left=smallWidth
      }
      if (top<0) {
        top=0
      }else if (top>smallWidth) {
        top=smallWidth
      }
      const smallDiv = this.$refs.small
      smallDiv.style.left = left +'px'
      smallDiv.style.top = top+ 'px'
    }
  }
};
</script>

<style lang="less">
.spec-preview {
  position: relative;

  img {
    width: 100%;
    height: 100%;
  }

  .mask {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
  }

  .small {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #ccc;
    overflow: hidden;
    z-index: 998;
    display: none;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .mask:hover ~ .small,
  .mask:hover ~ .big {
    display: block;
  }
}
</style>
<template>
  <!--分页组件-->
  <div class="pagination">
    <!--上一页-->
    <button :disabled='currentPage===1' @click="changeCurrentPage(currentPage-1)">上一页</button>
    <!-- 第1页 -->
    <button 
    v-if="startEnd.start>1" @click="changeCurrentPage(1)">1</button>
    <!-- 省略号 -->
    <button disabled 
    v-if="startEnd.start>2">···</button>
    <!-- 连续页码 -->
    <button v-for="page in startEnd.end" :key="page"
     :class="{active: (currentPage===page)}" 
     v-if="page>=startEnd.start"
     @click="changeCurrentPage(page)">
     {{page}}
     </button>
    <!-- 省略号 -->
    <button disabled 
    v-if="startEnd.end<papeTotal-1">···</button>
    <!-- 最后一页 -->
    <button 
    v-if="startEnd.end<papeTotal" 
    @click="changeCurrentPage(papeTotal)">{{papeTotal}}</button>
    <!--下一页-->
    <button :disabled='currentPage===papeTotal' @click="changeCurrentPage(currentPage+1)">下一页</button>
    <!-- 总记录数 -->
    <button disabled style="margin-left: 30px">共 {{pageConfig.total}} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    pageConfig: {
      style: Object,
      default: {
        total: 0,
        pageSize: 5,
        pageNo: 1,
        showPageNo: 3
      }
    }
  },
  data() {
    return {
      currentPage: this.pageConfig.pageNo
    };
  },
  computed: {
    papeTotal() {
      const { total, pageSize } = this.pageConfig;
      // console.log(Math.ceil(total / pageSize));
      if (total && pageSize) {
        return Math.ceil(total / pageSize);
      } else {
        return 0;
      }
    },
    startEnd() {
      const{ currentPage,papeTotal,pageConfig:{showPageNo}} = this;
      let start = currentPage-Math.floor(showPageNo/2);
      if (start<1) {
        start=1
      }
      let end = start+showPageNo-1;

      if (end>papeTotal) {
        end=papeTotal
        start = end-showPageNo+1;
        if (start<1) {
          start=1
        }
      }
      return{start,end}
    }
  },
  methods: {
    changeCurrentPage(page) {
      this.currentPage = page
      this.$emit("changeCurrentPage", page);
    }
  },
  watch:{
    'pageConfig.pageNo'(value){
      this.currentPage = value
    }
  }
};
</script>
<style lang="less" scoped>
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;
    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }
    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
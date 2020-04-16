<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>谷粒商城欢迎您！</p>
          <p v-if="userInfo.name">
            {{userInfo.name}}
            <a href="javascript:" @click="logout">退出登录</a>
          </p>
          <p v-else>
            <span>请</span>
            <router-link to="/login">登录</router-link>
            <router-link to="/register" class="register">免费注册</router-link>
          </p>
        </div>
        <div class="typeList">
          <a href="###">我的订单</a>
          <router-link :to="{name: 'shopCart'}">我的购物车</router-link>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <a class="logo" title="谷粒商城" href="javascript:" target="_self" @click="toHome()">
          <img src="./images/logo.png" alt />
        </a>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyword" />
          <button class="sui-btn btn-xlarge btn-danger" type="button" @click="toSearch">搜索</button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Header",

  data() {
    return {
      keyword: ""
    };
  },

  methods: {
    toSearch() {
      const { path, query } = this.$route;
      if (this.keyword) {
        if (path.indexOf("/search") === 0) {
          this.$router.push({
            name: "search",
            params: { keyword: this.keyword },
            query
          });
        } else {
          this.$router.push({
            name: "search",
            params: { keyword: this.keyword }
          });
        }
      } else {
        if (path.indexOf("/search") === 0) {
          this.$router.replace({
            name: "search",
            params,
            query
          });
        } else {
          this.$router.replace({
            name: "search"
          });
        }
      }
    },
    toHome() {
      this.$router.push({ path: "/" });
    },
    async logout() {
      try {
        await this.$store.dispatch("Logout");
        alert("退出登录成功");
        window.localStorage.removeItem("USERINFO_KEY");
        // this.$router.push({ path: "/" });
      } catch (error) {
        alert(error);
      }
    }
  },
  mounted() {
    this.$bus.$on("removeKeyword", () => {
      this.keyword = "";
    });
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  }
};
</script>

<style lang="less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>
<template>
  <div class="content">
    <div class="left-box">
      <div class="logo" style="text-align:center;">
      </div>
      <el-col :span="8" style="width:100%">
        <el-menu style="background-color:#32323a" unique-opened :default-active="activeRoute" :default-openeds="openedRouteList">
          <el-submenu index="2">
            <template slot="title">账号管理</template>
            <el-menu-item-group>
              <router-link :to="{name:'GMList'}">
                <el-menu-item index="2-1" class="sub-title">管理员账号</el-menu-item>
              </router-link>
              <router-link :to="{name:'appList'}">
                <el-menu-item index="2-2" class="sub-title">平台列表</el-menu-item>
              </router-link>
              <router-link :to="{name:'tenantList'}">
                <el-menu-item index="2-3" class="sub-title">商家列表</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">平台配置</template>
            <el-menu-item-group>
              <router-link :to="{name:'insurerList'}">
                <el-menu-item index="3-1" class="sub-title">险企列表</el-menu-item>
              </router-link>
              <router-link :to="{name:'areaList'}">
                <el-menu-item index="3-2" class="sub-title">地区列表</el-menu-item>
              </router-link>
              <router-link :to="{name:'brandsList'}">
                <el-menu-item index="3-3" class="sub-title">汽车品牌列表</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">产品管理</template>
            <el-menu-item-group>
              <router-link :to="{name:'nonAutoCategoryList'}">
                <el-menu-item index="4-1" class="sub-title">非车险类型设置</el-menu-item>
              </router-link>
              <router-link :to="{name:'nonAutoProductEdit'}">
                <el-menu-item index="4-2" class="sub-title">非车险产品设置</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-col>
    </div>
    <div class="top-box">
    	<div style="float:right">
	        <div class="head-word">
	            <span @click="logOut" style="color:#4db3ff;font-size:14px;cursor:pointer">注销</span>
	        </div>
        </div>
    </div>
    <div class="content-box">
        <router-view></router-view>
    </div>
  </div>
</template>
<script>

// import { logout } from '../ajax/post.js'

export default {
  data() {
    return {
      account:'',
      roleName:null,
      activeRoute: '',
      openedRouteList: ['']
    }
  },
  methods: {
    logOut(){
      // logout().then((res) => {
        router.push({name:"sign-in"})
      // })
    }
  },
  mounted:function() {
    if (this.$route.name == 'GMList') {
      this.activeRoute = '2-1';
      this.openedRouteList = ['2'];
    }
    else if (this.$route.name == 'appList') {
      this.activeRoute = '2-2';
      this.openedRouteList = ['2'];
    }
    else if (this.$route.name == 'tenantList') {
      this.activeRoute = '2-3';
      this.openedRouteList = ['2'];
    }
    else if (this.$route.name == 'insurerList') {
      this.activeRoute = '3-1';
      this.openedRouteList = ['3'];
    }
    else if (this.$route.name == 'areaList') {
      this.activeRoute = '3-2';
      this.openedRouteList = ['3'];
    }
    else if (this.$route.name == 'brandsList') {
      this.activeRoute = '3-3';
      this.openedRouteList = ['3'];
    }
    else if (this.$route.name == 'nonAutoCategoryList') {
      this.activeRoute = '4-1';
      this.openedRouteList = ['4'];
    }
    else if (this.$route.name == 'nonAutoProductEdit') {
      this.activeRoute = '4-2';
      this.openedRouteList = ['4'];
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .content{
    background-color: #f1f2f7;
    height: 100%;
    width: 100%;
    padding-left: 260px;
    padding-top: 80px;
    .left-box{
      position: absolute;
      top: 0px;
      left: 0px;
      width: 260px;
      height: 100%;
      background-color: #32323a;
      .logo{
        padding: 7px 15px;
        width: 100%;
        height: 80px;
        background-color: #2c4c6d;
      }
      .el-menu-item, .el-submenu__title{
        color: #fff;
      }
      .el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item.is-active, .el-menu-item.is-active {
        color: #20a0ff !important;
      }
      .el-menu-item-group__title{
        padding-top: 0px;
      }
      .el-menu--horizontal.el-menu--dark .el-submenu .el-menu-item:hover, .el-menu--horizontal.el-menu--dark .el-submenu .el-submenu-title:hover, .el-menu-item:hover {
          background-color: #222126;
      }
      .el-submenu .el-menu-item:hover, .el-submenu__title:hover {
          background-color: #222126;
      }
      .el-submenu .el-menu {
        background-color: #32323a;
      }
      .sub-title{
        padding-left: 50px !important;
        height: 40px;
        line-height: 40px;
      }
      // .el-menu-item{
      //   background-color: #32323a;
      // }
    }
    .el-badge__content.is-fixed {
       top: 15px;
       right: 0px;
       height: 20px;
    }
    .top-box{
      position: absolute;
      top: 0px;
      left:260px;
      right:0px;
      height: 80px;
      border-bottom: 1px solid rgba(44, 77, 109, 0.2);
      background-color: #fff;
      padding: 10px 20px;
      box-shadow: 0 4px 4px 0 rgba(44, 77, 109, 0.2);
      -webkit-box-shadow: 0 0px 4px 0 rgba(44, 77, 109, 0.2);
      -moz-box-box-shadow: 0 0px 4px 0 rgba(44, 77, 109, 0.2);
      .head-image{
        float: left;
        width: 60px;
        height: 60px;
        background-color: #f1f2f7;
      }
      .head-word{
        float: left;
        margin-left: 20px;
        margin-top: 18px;
        .name{
          font-size: 16px;
          color: #333;
        }
        .position{
          font-size: 12px;
          color: #888;
        }
      }
      .head-input{
          float: right;
          width: 300px;
          height: 40px;
          background:#ffffff;
          border:1px solid #cccccc;
          border-radius:20px;
          padding-right: 80px;
          margin-top: 10px;
          position: relative;
          input{
            margin-left: 20px;
            border: none;
            width: 200px;
            height: 100%;         
          }
          .input-btn{
            text-align: center;
            color: #fff;
            line-height: 34px;
            cursor: pointer;
            top: 2px;
            right: 2px;
            position: absolute;
            width: 80px;
            height: 34px;
            border-radius: 20px;
            background-color: #4990e2;
          }
      }
    }
    .content-box{
      overflow: scroll;
      padding: 10px;
      width: 100%;
      height: 100%;
      .btnDefult{
        margin-bottom: 10px;
      }
    }
  }
  .iconfont{
    margin-right: 15px;
  }
  .marginBtn{
    float:right;
    margin-right:10px
    ;margin-left:10px;
  }
  .Btitle{
    .el-form-item__label{
      font-size: 18px;
    }
  }
</style>

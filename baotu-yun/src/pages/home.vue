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
                <el-menu-item index="2-2" class="sub-title">平台管理</el-menu-item>
              </router-link>
              <router-link :to="{name:'tenantList'}">
                <el-menu-item index="2-3" class="sub-title">商家管理</el-menu-item>
              </router-link>
              <router-link :to="{name:'GMList'}">
                <!-- <el-menu-item index="2-4" class="sub-title">角色管理*</el-menu-item> -->
              </router-link>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">设置</template>
            <el-menu-item-group>
              <router-link :to="{name:'insurerList'}">
                <el-menu-item index="3-1" class="sub-title">险企设置</el-menu-item>
              </router-link>
              <router-link :to="{name:'areaList'}">
                <el-menu-item index="3-2" class="sub-title">地区设置</el-menu-item>
              </router-link>
              <router-link :to="{name:'brandsList'}">
                <el-menu-item index="3-3" class="sub-title">特殊车辆管理</el-menu-item>
              </router-link>
              <router-link :to="{name:'insurerList'}">
                <!-- <el-menu-item index="3-4" class="sub-title">系统设置*</el-menu-item> -->
              </router-link>
              <router-link :to="{name:'insurerList'}">
                <!-- <el-menu-item index="3-5" class="sub-title">意见反馈管理*</el-menu-item> -->
              </router-link>
            </el-menu-item-group>
          </el-submenu>
         <!--  <el-submenu index="4">
            <template slot="title">产品管理</template>
            <el-menu-item-group>
              <router-link :to="{name:'nonAutoCategoryList'}">
                <el-menu-item index="4-1" class="sub-title">非车险管理</el-menu-item>
              </router-link>
              <router-link :to="{name:'nonAutoProductList'}">
                <el-menu-item index="4-2" class="sub-title">共享车险产品管理</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu> -->
          <el-submenu index="5">
            <template slot="title">系数管理</template>
            <el-menu-item-group>
              <router-link :to="{name:'poundageCoefficient'}">
                <el-menu-item index="5-1" class="sub-title">手续费系数管理</el-menu-item>
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
      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
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
    else if (this.$route.name == 'nonAutoProductList') {
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
      .tableBox {
        margin-top: 20px;
        .cell {
          word-break: break-all !important;
            text-overflow: ellipsis !important;
            display: -webkit-box !important; /** 对象作为伸缩盒子模型显示 **/
            -webkit-box-orient: vertical !important; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
          -webkit-line-clamp: 1 !important; /** 显示的行数 **/
            overflow: hidden !important;  /** 隐藏超出的内容 **/
        }
        .cell:hover {
          text-overflow:inherit !important; 
          white-space: nowrap !important; 
          overflow: auto !important;
        }
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
  .fade-enter-active, .fade-leave-active {
    transition: opacity .1s
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
    opacity: 0
  }
</style>

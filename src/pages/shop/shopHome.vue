<template>
  <div class="content">
    <div class="left-box">
      <div class="logo" style="text-align:center;">
      	<!-- <router-link :to="{name:'product-menu'}">
          <img src="/static/img/logo.png" style="height:70px;">
        </router-link> -->
      </div>
      <el-col :span="8" style="width:100%">
        <el-menu  style="background-color:#32323a" unique-opened :default-active="activeRoute" :default-openeds="openedRouteList">
          <!-- <router-link :to="{name:'admin-user-list'}">
            <el-menu-item index="1">账号管理</el-menu-item>
          </router-link> -->
          <el-submenu index="2">
            <template slot="title">账号管理*</template>
            <el-menu-item-group>
              <router-link :to="{name:'shop-shop-list'}">
                <el-menu-item index="2-1" class="sub-title">商家管理</el-menu-item>
              </router-link>
              <router-link :to="{name:'shop-user-list'}">
                <el-menu-item index="2-5" class="sub-title">用户信息</el-menu-item>
              </router-link>
              <router-link :to="{name:'shop-staff-list'}">
                <el-menu-item index="2-3" class="sub-title">员工管理</el-menu-item>
              </router-link>
              <router-link :to="{name:'shop-role-list'}">
                <el-menu-item index="2-2" class="sub-title">角色管理</el-menu-item>
              </router-link>
              <router-link :to="{name:'shop-verify'}">
                <el-menu-item index="2-4" class="sub-title">审核管理</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="6">
            <template slot="title">设置*</template>
            <el-menu-item-group>
              <router-link :to="{name:'shop-set-insuranceN'}">
                <el-menu-item index="6-1" class="sub-title">非车险险种设置</el-menu-item>
              </router-link>
            </el-menu-item-group>
            <!-- <el-menu-item-group>
              <router-link :to="{name:'shop-set-moneyClient'}">
                <el-menu-item index="6-2" class="sub-title">收款账户设置</el-menu-item>
              </router-link>
            </el-menu-item-group> -->
            <!-- <el-menu-item-group>
              <router-link :to="{name:'shop-set-phoneClient'}">
                <el-menu-item index="6-3" class="sub-title">客户电话设置</el-menu-item>
              </router-link>
            </el-menu-item-group> -->
            <el-menu-item-group>
              <router-link :to="{name:'shop-set-reward'}">
                <el-menu-item index="6-4" class="sub-title">奖励设置</el-menu-item>
              </router-link>
            </el-menu-item-group>
            <el-menu-item-group>
              <router-link :to="{name:'shop-set-rewardVerify'}">
                <el-menu-item index="6-5" class="sub-title">规模奖励审核</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">运营管理</template>
            <el-menu-item-group>
              <router-link :to="{name:'shop-run-rollimg'}">
                <el-menu-item index="3-1" class="sub-title">默认轮播图管理</el-menu-item>
              </router-link>
            </el-menu-item-group>
            <el-menu-item-group>
              <router-link :to="{name:'shop-run-qalist'}">
                <el-menu-item index="3-2" class="sub-title">问答专区管理</el-menu-item>
              </router-link>
            </el-menu-item-group>
            <el-menu-item-group>
              <router-link :to="{name:'shop-run-newslist'}">
                <el-menu-item index="3-3" class="sub-title">咨询专区管理</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="4">
            <template slot="title">产品管理*</template>
            <el-menu-item-group>
              <router-link :to="{name:'shop-autoinsurance-manage'}">
                <el-menu-item index="4-1" class="sub-title">车险管理</el-menu-item>
              </router-link>
            </el-menu-item-group>
            <el-menu-item-group>
              <router-link :to="{name:'shop-autoinsurance-ratio'}">
                <el-menu-item index="4-2" class="sub-title">车险自定义系数管理</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="7">
            <template slot="title">车险订单管理*</template>
            <el-menu-item-group>
              <router-link :to="{name:'shop-order-autoinsurance'}">
                <el-menu-item index="7-1" class="sub-title">车险订单列表</el-menu-item>
              </router-link>
            </el-menu-item-group>
            <el-menu-item-group>
              <router-link :to="{name:'shop-order-policyList'}">
                <el-menu-item index="7-2" class="sub-title">已出单列表</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="5">
            <template slot="title">消息体系</template>
            <el-menu-item-group>
              <router-link :to="{name:'shop-msg-business'}">
                <el-menu-item index="5-2" class="sub-title">线下业务通知</el-menu-item>
              </router-link>
            </el-menu-item-group>
            <el-menu-item-group>
              <router-link :to="{name:'shop-msg-notice'}">
                <el-menu-item index="5-1" class="sub-title">公告管理</el-menu-item>
              </router-link>
            </el-menu-item-group>
            <el-menu-item-group>
              <router-link :to="{name:'shop-msg-log'}">
                <el-menu-item index="5-3" class="sub-title">系统日志</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="8">
            <template slot="title">统计管理*</template>
            <el-menu-item-group>
              <router-link :to="{name:'shop-statistic-statisticManage'}">
                <el-menu-item index="8-1" class="sub-title">统计管理</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>

          <!-- <router-link :to="{name:'password'}">
            <el-menu-item index="3">修改密码</el-menu-item>
          </router-link> -->
        </el-menu>
      </el-col>
    </div>
    <div class="top-box">
    	<div style="float:right">
	        <!-- <div class="head-image" style="border-radius:50%">
	          	<img src="/static/img/logo.png" style="width:100%;height:100%;border-radius:50%">
	        </div> -->
	        <div class="head-word">
              <router-link :to="{name:'sign-in'}">
                <span @click="log" style="color:#4db3ff;font-size:14px;cursor:pointer">注销</span>
              </router-link>
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
      openedRouteList: [],
    }
  },
  methods: {
    log(){
      // logout().then((res) => {
      //   router.push({name:"sign-in"})
      // })
    }
  },
  mounted:function() {
    if (this.$route.name == 'shop-shop-list') {
      this.activeRoute = '2-1';
      this.openedRouteList = ['2'];
    }
    else if (this.$route.name == 'shop-role-list') {
      this.activeRoute = '2-2';
      this.openedRouteList = ['2'];
    }
    else if (this.$route.name == 'shop-staff-list') {
      this.activeRoute = '2-3';
      this.openedRouteList = ['2'];
    }
    else if (this.$route.name == 'shop-verify') {
      this.activeRoute = '2-4';
      this.openedRouteList = ['2'];
    }
    else if (this.$route.name == 'shop-user-list') {
      this.activeRoute = '2-5';
      this.openedRouteList = ['2'];
    }
    else if (this.$route.name == 'shop-run-rollimg') {
      this.activeRoute = '3-1';
      this.openedRouteList = ['3'];
    }
    else if (this.$route.name == 'shop-run-qalist') {
      this.activeRoute = '3-2';
      this.openedRouteList = ['3'];
    }
    else if (this.$route.name == 'shop-run-newslist') {
      this.activeRoute = '3-3';
      this.openedRouteList = ['3'];
    }
    else if (this.$route.name == 'shop-autoinsurance-manage') {
      this.activeRoute = '4-1';
      this.openedRouteList = ['4'];
    }
    else if (this.$route.name == 'shop-autoinsurance-ratio') {
      this.activeRoute = '4-2';
      this.openedRouteList = ['4'];
    }
    else if (this.$route.name == 'shop-autoinsurance-orders') {
      this.activeRoute = '4-3';
      this.openedRouteList = ['4'];
    }
    else if (this.$route.name == 'shop-msg-notice') {
      this.activeRoute = '5-1';
      this.openedRouteList = ['5'];
    }
    else if (this.$route.name == 'shop-msg-business') {
      this.activeRoute = '5-2';
      this.openedRouteList = ['5'];
    }
    else if (this.$route.name == 'shop-msg-log') {
      this.activeRoute = '5-3';
      this.openedRouteList = ['5'];
    }
    else if (this.$route.name == 'shop-set-insuranceN') {
      this.activeRoute = '6-1';
      this.openedRouteList = ['6'];
    }
    else if (this.$route.name == 'shop-set-moneyClient') {
      this.activeRoute = '6-2';
      this.openedRouteList = ['6'];
    }
    else if (this.$route.name == 'shop-set-phoneClient') {
      this.activeRoute = '6-3';
      this.openedRouteList = ['6'];
    }
    else if (this.$route.name == 'shop-set-reward') {
      this.activeRoute = '6-4';
      this.openedRouteList = ['6'];
    }
    else if (this.$route.name == 'shop-set-rewardVerify') {
      this.activeRoute = '6-5';
      this.openedRouteList = ['6'];
    }
    else if (this.$route.name == 'shop-order-autoinsurance') {
      this.activeRoute = '7-1';
      this.openedRouteList = ['7'];
    }
    else if (this.$route.name == 'shop-order-policyList') {
      this.activeRoute = '7-2';
      this.openedRouteList = ['7'];
    }
    else if (this.$route.name == 'shop-statistic-statisticManage') {
      this.activeRoute = '8-1';
      this.openedRouteList = ['8'];
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

<template>
  <div class="content">
    <div class="left-box">
      <div class="logo" style="text-align:center;" @click="gohome">
          <img src="../assets/topLogo.png" style="height:70px;">
      </div>
      <el-col :span="8" style="width:100%">
        <el-menu  style="background-color:#32323a" unique-opened :default-active="activeRoute" :default-openeds="openedRouteList">

          <el-submenu index="1" v-if="isPermiss('APP_account') && isAdmin">
            <template slot="title">账号管理</template>
            <el-menu-item-group>
              <router-link :to="{name:'shop-shop-list'}"  v-if="isPermiss('APP_account_tenant')">
                <el-menu-item index="1-1" class="sub-title">商家管理</el-menu-item>
              </router-link>
              <router-link :to="{name:'shop-user-list'}"  v-if="isPermiss('APP_account_userInfo')">
                <el-menu-item index="1-2" class="sub-title">用户信息</el-menu-item>
              </router-link>
              <router-link :to="{name:'shop-role-list'}"  v-if="isPermiss('APP_account_role')">
                <el-menu-item index="1-4" class="sub-title">角色管理</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>

          <router-link :to="{name:'shop-staff-list'}"  v-if="isPermiss('SHOP_staff') && !isAdmin">
            <el-menu-item index="1-3">员工管理</el-menu-item>
          </router-link>
          <router-link :to="{name:'shop-role-list'}"  v-if="isPermiss('SHOP_role') && !isAdmin">
            <el-menu-item index="1-4">角色管理</el-menu-item>
          </router-link>

          <el-submenu index="2" v-if="isPermiss('SHOP_set') && !isAdmin">
            <template slot="title">设置</template>
            <el-menu-item-group>
              <router-link :to="{name:'shop-autoinsurance-manage'}" v-if="isPermiss('SHOP_set_auto')">
                <el-menu-item index="2-1" class="sub-title">车险佣金设置</el-menu-item>
              </router-link>
            </el-menu-item-group>
            <!-- <el-menu-item-group>
              <router-link :to="{name:'shop-set-moneyClient'}">
                <el-menu-item index="2-4" class="sub-title">收款账户设置</el-menu-item>
              </router-link>
            </el-menu-item-group> -->
            <!-- <el-menu-item-group>
              <router-link :to="{name:'shop-set-phoneClient'}">
                <el-menu-item index="2-5" class="sub-title">客户电话设置</el-menu-item>
              </router-link>
            </el-menu-item-group> -->
            <el-menu-item-group >
              <router-link :to="{name:'shop-set-reward'}" v-if="isPermiss('SHOP_set_reward')">
                <el-menu-item index="2-2" class="sub-title">奖励设置</el-menu-item>
              </router-link>
            </el-menu-item-group>
            <el-menu-item-group>
              <router-link :to="{name:'shop-set-rewardVerify'}" v-if="isPermiss('SHOP_set_scale')">
                <el-menu-item index="2-3" class="sub-title">规模奖励审核</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="3" v-if="isPermiss('APP_run') && isAdmin">
            <template slot="title">运营管理</template>
            <el-menu-item-group>
              <router-link :to="{name:'shop-run-rollimg'}" v-if="isPermiss('APP_run_carousel')">
                <el-menu-item index="3-1" class="sub-title">轮播图管理</el-menu-item>
              </router-link>
            </el-menu-item-group>
            <el-menu-item-group>
              <router-link :to="{name:'shop-run-qalist'}" v-if="isPermiss('APP_run_ask')">
                <el-menu-item index="3-2" class="sub-title">问答管理</el-menu-item>
              </router-link>
            </el-menu-item-group>
            <el-menu-item-group>
              <router-link :to="{name:'shop-run-newslist'}" v-if="isPermiss('APP_run_news')">
                <el-menu-item index="3-3" class="sub-title">资讯管理</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>

          <!-- <el-submenu index="4" v-if="isPermiss('SHOP_product') && !isAdmin">
            <template slot="title">产品管理</template>
            <el-menu-item-group>
              <router-link :to="{name:'shop-set-insuranceN'}" v-if="isPermiss('SHOP_product_noAuto')">
                <el-menu-item index="4-1" class="sub-title">我的非车险</el-menu-item>
              </router-link>
            </el-menu-item-group>
            <el-menu-item-group>
              <router-link :to="{name:''}" v-if="isPermiss('SHOP_product_auto')">
                <el-menu-item index="4-2" class="sub-title">共享车险商城</el-menu-item>
              </router-link>
            </el-menu-item-group>
            <el-menu-item-group>
              <router-link :to="{name:''}" v-if="isPermiss('SHOP_product_myAuto')">
                <el-menu-item index="4-3" class="sub-title">我的共享车险</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu> -->

          <el-submenu index="5" v-if="isPermiss('SHOP_order') && !isAdmin">
            <template slot="title">订单管理</template>
            <el-menu-item-group>
              <router-link :to="{name:'shop-order-autoinsurance'}" v-if="isPermiss('SHOP_order_auto')">
                <el-menu-item index="5-1" class="sub-title">车险订单</el-menu-item>
              </router-link>
            </el-menu-item-group>
            <el-menu-item-group>
              <router-link :to="{name:'shop-order-policyList'}" v-if="isPermiss('SHOP_order_policy')">
                <el-menu-item index="5-2" class="sub-title">车险已出单</el-menu-item>
              </router-link>
            </el-menu-item-group>
            <!-- <el-menu-item-group>
              <router-link :to="{name:'shop-order-policyList'}" v-if="isPermiss('SHOP_order_sharing')">
                <el-menu-item index="5-3" class="sub-title">共享车险订单</el-menu-item>
              </router-link>
            </el-menu-item-group> -->
          </el-submenu>

          <!-- <el-submenu index="6" v-if="isPermiss('SHOP_msg') && !isAdmin">
            <template slot="title">消息体系</template>
            <el-menu-item-group>
              <router-link :to="{name:'shop-msg-business'}" v-if="isPermiss('SHOP_msg_underline')">
                <el-menu-item index="6-1" class="sub-title">线下业务通知</el-menu-item>
              </router-link>
            </el-menu-item-group>
            <el-menu-item-group>
              <router-link :to="{name:'shop-msg-notice'}" v-if="isPermiss('SHOP_msg_notice')">
                <el-menu-item index="6-2" class="sub-title">公告管理</el-menu-item>
              </router-link>
            </el-menu-item-group>
            <el-menu-item-group>
              <router-link :to="{name:'shop-msg-log'}" v-if="isPermiss('SHOP_msg_log')">
                <el-menu-item index="6-3" class="sub-title">系统日志</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu> -->

          <el-submenu index="7" v-if="isPermiss('SHOP_count') && !isAdmin">
            <template slot="title">统计管理</template>
            <el-menu-item-group>
              <router-link :to="{name:'shop-statistic-statisticManage'}" v-if="isPermiss('SHOP_count_count')">
                <el-menu-item index="7-1" class="sub-title">统计管理</el-menu-item>
              </router-link>
            </el-menu-item-group>
            <!-- <el-menu-item-group>
              <router-link :to="{name:''}" v-if="isPermiss('SHOP_count_business')">
                <el-menu-item index="7-2" class="sub-title">商品销售统计</el-menu-item>
              </router-link>
            </el-menu-item-group> -->
          </el-submenu>

          <router-link :to="{name:'shop-camera'}" v-if="isPermiss('SHOP_camera') && !isAdmin">
            <el-menu-item index="8">摄像头系统</el-menu-item>
          </router-link>
        </el-menu>
      </el-col>
    </div>
    <div class="top-box">
    	<div style="float:right">
        <div class="head-image" style="border-radius:50%">
          <img src="../assets/demoAvatar.jpg" style="width:100%;height:100%;border-radius:50%"/>
        </div>
        <div class="head-word">
            <router-link :to="{name:'sign-in'}">
              <span @click="logout" style="color:#4db3ff;font-size:14px;cursor:pointer">注销</span>
            </router-link>
        </div>
      </div>
      <div style="float:right;margin-right:20px;">
        <span style="line-height:60px">{{name}}</span>
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
import { autoApi } from '@/ajax/post.js'

export default {
  data() {
    return {
      account: '',
      name: null,
      avatar: null,
      activeRoute: '',
      openedRouteList: [],
      isAdmin: null,
      user_Modulars: [],
      employee_Modulars: [],
    }
  },
  methods: {
    logout() {
      router.push({
        name: "sign-in"
      })
    },
    gohome() {
      router.push({
        name: "home"
      });
    },
    getModulars() {
      autoApi({
        action: 'modulars_possessed',
        version: '1.0',
      }, window.localStorage.getItem('token')).then((res) => {
        if (res.code == 0) {
          if (res.attach) {
            if (this.isAdmin) { //平台端
              this.user_Modulars = res.attach.pmodulars;
            } else { //商家端
              if (res.attach.tenants[0]) {
                for (let i = 0; i < res.attach.tenants.length; i++) {
                  if (res.attach.tenants[i].employeeId == window.localStorage.getItem('employeeId')) { //判断进入的商家
                    this.employee_Modulars = res.attach.tenants[i].modulars;
                  }
                }
              }
            }
          }
        }
      })
    },
    isPermiss(modular) {
      if (this.isAdmin) { //平台端
        if (window.localStorage.getItem('isRoot_plate') == 'y') {
          return true;
        } else {
          for (let i = 0; i < this.user_Modulars.length; i++) {
            if (this.user_Modulars[i] == modular) {
              return true;
            }
          }
          return false;
        }
      } else { //商家端
        if (window.localStorage.getItem('isRoot_tenant') == 'y') {
          return true;
        } else {
          for (let i = 0; i < this.employee_Modulars.length; i++) {
            if (this.employee_Modulars[i] == modular) {
              return true;
            }
          }
          return false;
        }
      }
    },
  },
  mounted() {
    this.isAdmin = window.localStorage.getItem('baotuUserType') == 'pingtai' ? true : false;
    this.name = window.localStorage.getItem('top_name_plate');
    this.avatar = window.localStorage.getItem('top_avatar_plate');
    this.getModulars();
    if (this.$route.name == 'shop-shop-list') {
      this.activeRoute = '1-1';
      this.openedRouteList = ['1'];
    } else if (this.$route.name == 'shop-user-list') {
      this.activeRoute = '1-2';
      this.openedRouteList = ['1'];
    } else if (this.$route.name == 'shop-staff-list') {
      this.activeRoute = '1-3';
      this.openedRouteList = ['1'];
    } else if (this.$route.name == 'shop-role-list') {
      this.activeRoute = '1-4';
      this.openedRouteList = ['1'];
    } else if (this.$route.name == 'shop-autoinsurance-manage') {
      this.activeRoute = '2-1';
      this.openedRouteList = ['2'];
    } else if (this.$route.name == 'shop-set-reward') {
      this.activeRoute = '2-2';
      this.openedRouteList = ['2'];
    } else if (this.$route.name == 'shop-set-rewardVerify') {
      this.activeRoute = '2-3';
      this.openedRouteList = ['2'];
    } else if (this.$route.name == 'shop-run-rollimg') {
      this.activeRoute = '3-1';
      this.openedRouteList = ['3'];
    } else if (this.$route.name == 'shop-run-qalist') {
      this.activeRoute = '3-2';
      this.openedRouteList = ['3'];
    } else if (this.$route.name == 'shop-run-newslist') {
      this.activeRoute = '3-3';
      this.openedRouteList = ['3'];
    } else if (this.$route.name == 'shop-set-insuranceN') {
      this.activeRoute = '4-1';
      this.openedRouteList = ['4'];
    }
    // else if (this.$route.name == '') {
    //   this.activeRoute = '4-2';
    //   this.openedRouteList = ['4'];
    // }
    // else if (this.$route.name == '') {
    //   this.activeRoute = '4-3';
    //   this.openedRouteList = ['4'];
    // }
    else if (this.$route.name == 'shop-order-autoinsurance') {
      this.activeRoute = '5-1';
      this.openedRouteList = ['5'];
    } else if (this.$route.name == 'shop-order-policyList') {
      this.activeRoute = '5-2';
      this.openedRouteList = ['5'];
    } else if (this.$route.name == 'shop-order-policyList') {
      this.activeRoute = '5-3';
      this.openedRouteList = ['5'];
    } else if (this.$route.name == 'shop-msg-business') {
      this.activeRoute = '6-1';
      this.openedRouteList = ['6'];
    } else if (this.$route.name == 'shop-msg-notice') {
      this.activeRoute = '6-2';
      this.openedRouteList = ['6'];
    } else if (this.$route.name == 'shop-msg-log') {
      this.activeRoute = '6-3';
      this.openedRouteList = ['6'];
    } else if (this.$route.name == 'shop-statistic-statisticManage') {
      this.activeRoute = '7-1';
      this.openedRouteList = ['7'];
    }
    // else if (this.$route.name == '') {
    //   this.activeRoute = '7-2';
    //   this.openedRouteList = ['7'];
    // }
    else if (this.$route.name == 'shop-camera') {
      this.activeRoute = '8';
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
        cursor: pointer;
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
      min-width: 1000px;
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

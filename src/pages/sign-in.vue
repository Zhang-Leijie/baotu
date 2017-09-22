<template>
<div class="sign-in-body">
  <div class="sign-box">
  	<div class="sign-top" @click="cheats">
  		<img class="logimg" src="../assets/login2.png">
  	</div>
    {{specialCount}}
    <transition name="fade" mode="out-in">
      <div style="position:absolute; right:20px; top:20px;" v-if="specialSwitch">
        <span>当前的目标地址：</span>
        <el-input v-model="ipAddrPlate" style="width:200px"></el-input> 
        <el-button @click="confirmChangeIP">确定</el-button>
        <el-button @click="changeIpOpen">内网段</el-button> 
      </div>
    </transition>

    <div class="logo-box">
    	<img src="../assets/login.png" style="width:200px;margin-top:10px;margin-bottom:10px;">
      <el-form :model="form" style="width:370px;margin:0 auto;" :rules="rules">
        <el-tooltip class="item" effect="light" :content="platName?'平台名称：'+ platName:'请输入平台码'" placement="right">
          <el-input style="width:100%;" v-model="form.platCode" auto-complete="off" placeholder="平台码" @change="getPlat"></el-input>
        </el-tooltip>
        <el-tooltip class="item" effect="light" content="首次登录需设置密码" placement="right">
          <el-input style="width:100%; margin-top:20px;" v-model="form.account" auto-complete="off" placeholder="手机号"></el-input> 
          <!-- <el-input style="width:100%; margin-top:20px;" v-model="form.account" auto-complete="off" placeholder="手机号" @blur="checkPwd"></el-input>  -->
        </el-tooltip>
        <el-input style="width:100%; margin: 20px 0;" v-model="form.password" auto-complete="off" placeholder="密码" type="password"></el-input> 
  		</el-form>
      <div class="log blue" @click="login">登 录</div>
      <div style="padding-left: 310px;">        
          <el-button type="text" v-if="haveCode == 1 && form.platCode && form.account" @click="goSetCode">设置密码</el-button>
          <!-- <el-button type="text" v-if="haveCode == 2 && form.platCode && form.account" @click="goSetCode">忘记密码</el-button> -->
      </div>
    </div>
  </div>
</div>
</template>
<script>
import { logApi } from '@/ajax/post.js'

export default {
  data() {
    return {
      ipAddrPlate: null,
      platName: '',
      haveCode: 1,
      form: {
        platCode: null,
        account: '13295815927',
        password: 'aa111111',
      },
      rules: {
        platCode: [{
          required: true,
          message: '请输入平台码',
          trigger: 'blur'
        }, ],
        account: [{
          required: true,
          message: '请输入手机号',
          trigger: 'blur'
        }, ],
        password: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }, ],
      },
      specialCount: 0,
      specialSwitch: true,
    }
  },
  watch: {
    specialCount(curVal, oldVal) {
      var vm = this;

      function countdown(num) {
        if (num > 0) {
          setTimeout(function() {
            num = num - 1;
            vm.specialCount = num;
            countdown(num);
          }, 1000);
        }
      }
      if (curVal > 8) {
        this.specialSwitch = true;
      } else if (curVal > oldVal && curVal > 0) {
        countdown(curVal);
      }
    }
  },
  methods: {
    changeIpOpen() {
      this.ipAddrPlate = 'http://192.168.1.6';
      localStorage.setItem('ipAddrPlate', this.ipAddrPlate);
      this.$message({
        type: 'success',
        message: '已改变目标地址',
      });
    },
    confirmChangeIP() {
      localStorage.setItem('ipAddrPlate', this.ipAddrPlate);
      this.$message({
        type: 'success',
        message: '已改变目标地址',
      });
    },
    goSetCode() {
      if (this.form.platCode == '' || this.platName == '查询无该平台' || this.form.account == '') {
        swal({
          title: "请输入正确平台码或账号",
          type: 'warning',
          text: "",
          timer: 2000,
        })
      } else {
        router.push({
          name: 'setcode',
          query: {
            plat: this.platName,
            account: this.form.account,
            platCode: this.form.platCode
          }
        });
      }
    },
    getPlat() {
      this.platName = null;
      if (this.form.platCode) {
        let payload = {
          appId: this.form.platCode,
        }
        payload = JSON.stringify(payload);
        logApi({
          action: 'app_tips',
          payload: payload,
        }).then((res) => {
          if (res.code == 0) {
            this.platName = res.attach.name;
          } else {
            this.platName = '查询无该平台';
          }
        })
      }
    },
    // checkPwd(){
    //  logApi({
    //    action:'user_check',
    //    version:'1.0',
    //    client:'2',
    //    appId:'1',
    //    mobile:'+86'+this.form.account,
    //  }).then((res)=> {
    //    if (res.code == 0) {
    //      this.haveCode = 2
    //    } else {
    //      this.haveCode = 1
    //    }
    //  })
    // },
    login() {
      if (this.form.platCode == '' || this.platName == '查询无该平台') {
        swal({
          title: "登录失败",
          type: 'warning',
          text: "请输入正确平台码",
          timer: 2000,
        })
      } else if (this.form.account == '') {
        swal({
          title: "登录失败",
          type: 'warning',
          text: "请输入账号",
          timer: 2000,
        })
      } else if (this.form.password == '') {
        swal({
          title: "登录失败",
          type: 'warning',
          text: "请输入密码",
          timer: 2000,
        })
      } else {
        localStorage.setItem('ipAddrPlate', this.ipAddrPlate);
        let payload = {
          mobile: '+86' + this.form.account,
          pwd: this.form.password,
          appId: this.form.platCode,
        }
        payload = JSON.stringify(payload);
        logApi({
          action: 'login',
          client: '2',
          payload: payload,
        }).then((res) => {
          if (res.code == 0) {
            let cacheData = JSON.stringify(res.attach);
            localStorage.setItem('cacheData', cacheData);

            localStorage.setItem('token', res.attach.token);
            localStorage.setItem('appId', this.form.platCode);
            localStorage.setItem('userId_plate', res.attach.user.uid); //
            localStorage.setItem('userName_plate', this.form.account); //登录缓存
            localStorage.setItem('userPsd_plate', this.form.password); //登录缓存
            localStorage.setItem('top_name_plate', res.attach.user.name); //用于顶部展示用的用户姓名
            localStorage.setItem('top_avatar_plate', res.attach.user.avatar); //用顶部展示用用户头像

            router.push({
              name: 'home'
            })
            this.$message({
              type: 'success',
              message: '正在访问:' + window.localStorage.getItem('ipAddrPlate')
            });
          }
        })
      }
    },
    cheats() {
      this.specialCount = this.specialCount + 1;
    }
  },
  mounted() {
    this.ipAddrPlate = 'http://101.37.34.55';
    localStorage.setItem('ipAddrPlate', this.ipAddrPlate);
    if (window.localStorage.getItem('userName_plate') && window.localStorage.getItem('userPsd_plate')) {
      this.form.account = window.localStorage.getItem('userName_plate');
      this.form.password = window.localStorage.getItem('userPsd_plate');
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
    .sign-in-box{
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0px;  
        bottom: 0px;
    }
    .sign-box{
        z-index: 100;
        position: absolute;
        top: 0px;
        left: 0px;
        right: 0px;
        bottom: 0px;
        background: linear-gradient(to right, #236da0 0%,#6bddcf 100%);
        .sign-top{
        	position: relative;
        	text-align: center;
        	width: 100%;
        	height: 150px;
        	background-color: #f1f2f7;
        	.logimg{
        		width: 100px;
        		position: absolute;
        		left: 50%;
        		bottom: -50px;
        		transform: translate(-50%, 0%);
				-ms-transform: translate(-50%, 0%);
				-moz-transform: translate(-50%, 0%);
				-webkit-transform: translate(-50%, 0%);
				-o-transform: translate(-50%, 0%);
        	}
        }
        .logoimg{
            height: 30px;
            margin-top: 20px;
            margin-left: 40px;
        }
        .logo-box{
            padding-top: 40px;
            text-align: center;
            width: 500px;
            height: 370px;
            margin: auto auto;
            background-color: rgba(241, 242, 248, 0.8);
            margin-top: 10px;
            border-radius: 20px;
            .el-form-item__content{
            	text-align: left;
            }
            .input{
                font-size: 14px;
                // color: #ccc;
                padding: 10px;
                background-color: #fff !important;
                margin: 0px auto 20px;
                height: 50px;
                width: 340px;
                display: block;
                border: none;
            }
            .remember{
                width: 340px;
                margin: 0px auto 20px;
                text-align: left;
            }
            .log{
                display: inline-block;
                cursor: pointer;
                color: #333;
                line-height: 40px;
                margin: 0 auto;
                width: 370px;
                height: 40px;
                border-radius: 1px;
                background-color: #dfdfdf;
                box-shadow: 0 1px 1px #c1b1ad;
                font-family: Microsoft YaHei,Hiragino Sans GB,\5b8b\4f53;
                font-weight: 700;
                font-size: 14px;
            }
            .log:hover {
              background-color: #00b7d3;
            }
            .blue{
                background-color: #00C1DE;
                color: #fff;
            }
        }
    }
    .sign-foot{
        padding-top: 40px;
        background: linear-gradient(to bottom, #335474 0%,#2c4d6d 100%);
        position: absolute;
        left: 0px;
        right: 0px;
        bottom: 0px;
        height: 140px;
    }
    .fade-enter-active, .fade-leave-active {
      transition: opacity 1s
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active in below version 2.1.8 */ {
      opacity: 0
    }
</style>

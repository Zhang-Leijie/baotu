<template>
<div class="sign-in-body">
  <div class="sign-box">
    <div class="logo-box">
      <el-form :model="form" style="width:370px;margin:0 auto;" :rules="rules">
	      <div style="margin: 20px 0;">
          <el-tooltip class="item" effect="light" content="平台名称" placement="right">
            <el-input style="width:100%;" v-model="form.plat" :disabled="true"></el-input>
          </el-tooltip>
          <div style="margin:20px;"></div>
          <el-tooltip class="item" effect="light" content="账号" placement="right">
            <el-input style="width:100%;" v-model="form.account" :disabled="true"></el-input> 
          </el-tooltip>
          <div style="margin:20px;"></div>
          <el-input style="width:240px;" v-model="form.yzm" auto-complete="off" placeholder="请输入验证码"></el-input>
          <el-button type="text" style="margin-left:55px;width:70px;" @click="getYzm" :disabled="!(timeCount.toString() == '0')">{{timeCount > 0 && !form.yzm?timeCount + 's':'获取验证码'}}</el-button>
          <div style="margin:20px;"></div>
          <el-input style="width:100%;" v-model="form.password" auto-complete="off" placeholder="请输入密码" type="password"></el-input>
          <div style="margin:20px;"></div>
          <el-input style="width:100%;" v-model="form.passwordS" auto-complete="off" placeholder="请重复输入上方的密码" type="password"></el-input> 
        </div>
  		</el-form>
      <div style="margin:20px;"></div>
      <div class="log blue" @click="pwdReset">确认修改并登录</div>
      <div style="margin:20px;"></div>
      <div class="log blue" @click="goBack">返回登录页</div>
    </div>
  </div>
</div>
</template>
<script>

import { logApi } from '@/ajax/post.js'

export default {
    data() {
   	  var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.form.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
      	 haveCode:false,
         form:{
          plat:'',
         	platCode:'',
          account:'',
         	yzm:'',
         	password:'',
         	passwordS:'',
         },
         timeCount: 0,
         rules: {
          yzm: [
            { required: true, message: '请输入验证码', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],
          passwordS: [
            { validator: validatePass2, trigger: 'change' },
          ],
        }
      }
    },
    methods: {
       getYzm(){
        this.timeCount = 0;
        this.form.yzm = null;
        this.startCountdown(60);
       	logApi({
     			action:'captcha_obtain',
     			mobile: '+86'+this.$route.query.account,
     			appId: '1',
     		}).then((res)=> {
     			if (res.code == 0) {
     				this.form.yzm = res.attach
     			}
     		});
       },
       startCountdown(time) {
        var vm = this;
        if (time > 0) {
          time = time - 1;
          this.timeCount = time;
          setTimeout(function(){
            vm.startCountdown(time);
          },1000);
        }
        else
        {
          this.timeCount = 0;
        }
       },
       pwdReset(){
       	if (this.form.yzm == '') {
       		swal({
                title: "请输入验证码",
                type: 'warning',
                text: "",
                timer: 2000,
            })
       	} else if(this.form.password == '' || this.form.passwordS == ''){
       		swal({
                title: "请输入密码",
                type: 'warning',
                text: "",
                timer: 2000,
            })
       	} else if(this.form.password == this.form.passwordS){
       		logApi({
	       		pwd:this.form.passwordS,
	       		captcha:this.form.yzm,
  	   			action:'pwd_reset',
  	   			mobile: '+86'+this.$route.query.account,
  	   			appId: this.form.platCode,
  	   		}).then((res)=> {
  	   			if (res.code == 0) {
         				logApi({
                  appId: this.form.platCode,
                  action:'login',
                  client:'2',
                  mobile:'+86'+this.$route.query.account,
                  pwd:this.form.passwordS,
                }).then((res)=> {
                  if (res.code == 0) {
                    localStorage.setItem('token',res.attach.token);
                    localStorage.setItem('appId',this.form.platCode);
                    localStorage.setItem('userId_plate',res.attach.user.uid);
                    localStorage.setItem('userName_Plate',this.$route.query.account);
                    localStorage.setItem('userPsd_plate',this.form.password);
                    localStorage.setItem('top_name_plate',res.attach.user.name);
                    localStorage.setItem('top_avatar_plate',res.attach.user.avatar);


                    router.push({name:'home'})
                     this.$message({
                      type: 'success',
                      message: '正在访问:'+ window.localStorage.getItem('ipAddrPlate')
                    });   
                  }
                })
         			}
  	   		})
       	}
        else
        {
          this.$message({
            type: 'error',
            message: '两次输入密码不一致'
          }); 
        }     	
       },
       goBack() {
        router.push({
          name: 'sign-in'
        });
       }
    },
    mounted(){
        this.form.platCode = this.$route.query.platCode;
        this.form.plat = this.$route.query.plat;
        this.form.account = this.$route.query.account;
        this.form.yzm = '';
        this.form.password = '';
        this.form.passwordS = '';
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
        .el-form-item{
        	text-align: left;
        }
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
            padding: 40px 20px;
            text-align: center;
            width: 500px;
            // height: 380px;
            margin: auto auto;
            background-color: rgba(241, 242, 248, 0.8);
            margin-top: 150px;
            border-radius: 20px;
            .input{
                font-size: 14px;
                // color: #ccc;
                padding: 10px;
                background-color: #fff !important;
                margin: 0px auto 20px;
                height: 40px;
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
</style>

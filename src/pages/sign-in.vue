<template>
<div class="sign-in-body">
  <div class="sign-box">
  	<div class="sign-top">
  		<img class="logimg" src="../assets/login2.png">
  	</div>

    <div style="position:absolute; right:20px; top:20px;">
      <span>当前的目标地址：</span>
      <el-input v-model="ipAddrPlate" style="width:200px"></el-input> 
      <el-button @click="confirmChangeIP">确定</el-button>
      <el-button @click="changeIpOpen">内网段</el-button> 
    </div>

    <div class="logo-box">
    	<img src="../assets/login.png" style="width:200px;margin-top:10px;margin-bottom:10px;">
        <el-form :model="form" style="width:370px;margin:0 auto;" :rules="rules">
        	<el-form-item label="平台码" :label-width="formLabelWidth" prop="platCode">
		      <el-input style="width:287px;" v-model="form.platCode" auto-complete="off" placeholder="请输入平台码" @blur="getPlat"></el-input>
		      <div style="text-align:left;line-height:20px;">{{platName}}</div>
		    </el-form-item>
		    <el-form-item label="账号" :label-width="formLabelWidth" prop="account">
		      +86<el-input style="width:250px;margin-left:10px;" v-model="form.account" auto-complete="off" placeholder="请输入手机号" @blur="checkPwd"></el-input>
		    </el-form-item>
		    <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
		      <el-input style="width:287px;" v-model="form.password" auto-complete="off" placeholder="请输入密码" type="password"></el-input>
		    </el-form-item>
		    <div style="position:absolute">	    	
				    <el-button type="text" v-if="haveCode == 1" @click="goSetCode">设置密码</el-button>
			      <el-button type="text" v-if="haveCode == 2" @click="goSetCode">忘记密码</el-button>
		    </div>
		</el-form>
        <div class="log blue" @click="login">
            登 录
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
      	platName:'',
      	haveCode:3,
         form:{
         	platCode: null,
         	account:'13295815927',
         	password:'aa111111',
         },
         formLabelWidth: '80px',
         rules: {
          platCode: [
            { required: true, message: '请输入平台码', trigger: 'blur' },
          ],
          account: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],
        }
      }
    },
    methods: {
      changeIpOpen() {
        this.ipAddrPlate = '192.168.0.125';
        localStorage.setItem('ipAddrPlate','192.168.0.125');
        this.$message({
          type: 'success',
          message: '已改变目标地址'
        }); 
       },
      confirmChangeIP() {
        localStorage.setItem('ipAddrPlate',this.ipAddrPlate);
        this.$message({
          type: 'success',
          message: '已改变目标地址'
        });
      },
       goSetCode(){
       		if (this.form.platCode == '' || this.platName == '查询无该平台' || this.form.account == '') {
       			swal({
                    title: "请输入正确平台码或账号",
                    type: 'warning',
                    text: "",
                    timer: 2000,
                })
       		} else {
       			router.push({name:'setcode',query:{plat:this.platName,account:this.form.account}})
       		}
       },
       getPlat(){
          this.platName = null;
       		if(this.form.platCode) {
            logApi({
              action:'app_tips',
              appId:this.form.platCode,
            }).then((res)=> {
              console.log(res.code)
              if (res.code == 0) {
                this.platName = res.attach.name;
              } else {
                this.platName = '查询无该平台'
              }
            })
          }
       },
       checkPwd(){
       		logApi({
       			action:'user_check',
       			version:'1.0',
       			client:'2',
       			appId:'1',
       			mobile:'+86'+this.form.account,
       		}).then((res)=> {
       			if (res.code == 0) {
       				this.haveCode = 2
       			} else {
       				this.haveCode = 1
       			}
       		})
       },
       login(){
       		if (this.form.platCode == '' || this.platName == '查询无该平台') {
       			swal({
                    title: "登录失败",
                    type: 'warning',
                    text: "请输入正确平台码",
                    timer: 2000,
                })
       		} else if (this.form.account == ''){
       			swal({
                    title: "登录失败",
                    type: 'warning',
                    text: "请输入账号",
                    timer: 2000,
                })
       		} else if (this.form.password == ''){
       			swal({
                    title: "登录失败",
                    type: 'warning',
                    text: "请输入密码",
                    timer: 2000,
                })
       		} else {
            localStorage.setItem('ipAddrPlate',this.ipAddrPlate);
       			logApi({
       				appId:'1',
	       			action:'login',
	       			client:'2',
	       			mobile:'+86'+this.form.account,
	       			pwd:this.form.password,
	       		}).then((res)=> {
	       			if (res.code == 0) {
                localStorage.setItem('token',res.attach.token);
                // localStorage.setItem('userId',res.attach.user.uid);
                localStorage.setItem('appId',this.form.platCode);

                localStorage.setItem('userName',this.form.account);
                localStorage.setItem('userPsd',this.form.password);

	       				router.push({name:'home'})
                 this.$message({
                  type: 'success',
                  message: '正在访问:'+ window.localStorage.getItem('ipAddrPlate')
                });   
	       			}
	       		})
       		}
       },
    },
    mounted(){
        this.ipAddrPlate = '101.37.34.55';
        localStorage.setItem('ipAddrPlate',this.ipAddrPlate);
        this.form.account = window.localStorage.getItem('userName');
        this.form.password = window.localStorage.getItem('userPsd');
    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
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
            .el-form-item__content{
            	text-align: left;
            }
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
                width: 100px;
                height: 40px;
                border-radius: 20px;
                background-color: #dfdfdf;
            }
            .blue{
                background-color: #4990e2;
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

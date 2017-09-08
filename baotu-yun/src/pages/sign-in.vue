<template>
<div class="sign-in-body">
  <div class="sign-box">
  	<div class="sign-top">
  		<img class="logimg" src="../assets/login2.png">
  	</div>

    <div style="position:absolute; right:20px; top:20px;">
      <span>当前的目标地址：</span>
      <el-input v-model="ipAddr" style="width:200px"></el-input> 
      <el-button @click="changeIpInside">内网</el-button>
    </div>

    <div class="logo-box">
    	<img src="../assets/login.png" style="width:200px;margin-top:10px;margin-bottom:10px;">
      <el-form :model="form" style="width:370px;margin:0 auto;" :rules="rules">
	      <el-input style="width:100%;" v-model="form.account" auto-complete="off" placeholder="请输入工号"></el-input>
        <div style="margin:20px"></div>
	      <el-input style="width:100%;" v-model="form.password" auto-complete="off" placeholder="请输入密码" type="password"></el-input>
        <div style="margin:20px"></div>
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
         form:{
         	account:'1',
         	password:'123456',
         },
         rules: {
          account: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],
        },
        ipAddr: null
      }
    },
    methods: {
       goSetCode(){
       			router.push({name:'setcode',query:{account:this.form.account}});
       },
       login(){
          localStorage.setItem('ipAddr',this.ipAddr);
     			logApi({
       			action: 'login',
       			id: this.form.account,
       			pwd: this.form.password,
       		}).then((res)=> {
       			if (res.code == 0) {
              (res.attach.mod & 1) == 1?localStorage.setItem('isRoot_baotu','y'):localStorage.setItem('isRoot_baotu','n');
              localStorage.setItem('loginId_baotu',res.attach.uid);
              localStorage.setItem('tokenPlate',res.attach.token);
              // localStorage.setItem('userId',res.attach.user.uid);
              localStorage.setItem('uid',res.attach.uid);
       				router.push({name:'GMList'})
              this.$message({
                type: 'success',
                message: '正在访问:'+ window.localStorage.getItem('ipAddr')
              });   
       			}
       		})
       },
       changeIpInside() {
        this.ipAddr = '192.168.1.3';
        localStorage.setItem('ipAddr',this.ipAddr);
        this.$message({
          type: 'success',
          message: '已改变目标地址'
        }); 
       }
    },
    mounted(){
        this.ipAddr = '101.37.34.55';
        localStorage.setItem('ipAddr','101.37.34.55');
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
            height: 270px;
            margin: auto auto;
            background-color: rgba(241, 242, 248, 0.8);
            margin-top: 10px;
            border-radius: 10px;
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

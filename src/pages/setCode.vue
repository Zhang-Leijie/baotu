<template>
<div class="sign-in-body">
  <div class="sign-box">
    <div class="logo-box">
        <el-form :model="form" style="width:370px;margin:0 auto;" :rules="rules">
        	<el-form-item label="平台:" :label-width="formLabelWidth">
		      {{this.$route.query.plat}}
		    </el-form-item>
		    <el-form-item label="手机号:" :label-width="formLabelWidth">
		      +86{{this.$route.query.account}}
		    </el-form-item>
		    <el-form-item label="验证码:" :label-width="formLabelWidth" prop="yzm">
		      <el-input style="width:180px;" v-model="form.yzm" auto-complete="off" placeholder="请输入验证码"></el-input>
		      <el-button type="text" style="margin-left:15px;" @click="getYzm">获取验证码</el-button>
		    </el-form-item>
		    <el-form-item label="密码:" :label-width="formLabelWidth" prop="password">
		      <el-input style="width:270px;" v-model="form.password" auto-complete="off" placeholder="请输入密码" type="password"></el-input>
		    </el-form-item>
		    <el-form-item label="确认密码:" :label-width="formLabelWidth" prop="passwordS">
		      <el-input style="width:270px;" v-model="form.passwordS" auto-complete="off" placeholder="请输入密码" type="password"></el-input>
		    </el-form-item>
		</el-form>
        <div class="log blue" @click="pwdReset">
            确 定
        </div>
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
         	platCode:'',
         	yzm:'',
         	password:'',
         	passwordS:'',
         },
         formLabelWidth: '100px',
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
       	logApi({
   			action:'captcha_obtain',
   			mobile: '+86'+this.$route.query.account,
   			appId: '1',
   		}).then((res)=> {
   			if (res.code == 0) {
   				this.form.yzm = res.attach
   			}
   		})
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
       	} else{
       		logApi({
	       		pwd:this.form.passwordS,
	       		captcha:this.form.yzm,
	   			action:'pwd_reset',
	   			mobile: '+86'+this.$route.query.account,
	   			appId: '1',
	   		}).then((res)=> {
	   			if (res.code == 0) {
       				logApi({
                appId:'1',
                action:'login',
                client:'2',
                mobile:'+86'+this.$route.query.account,
                pwd:this.form.passwordS,
              }).then((res)=> {
                if (res.code == 0) {
                  localStorage.setItem('token',res.attach.token);
                  // localStorage.setItem('userId',res.attach.user.uid);
                  localStorage.setItem('appId',this.form.platCode);

                  localStorage.setItem('userName_Plate',this.$route.query.account);
                  localStorage.setItem('userPsd_plate',this.form.passwordS);

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
       }
    },
    mounted:function(){
        
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
            padding-top: 40px;
            text-align: center;
            width: 500px;
            height: 380px;
            margin: auto auto;
            background-color: rgba(241, 242, 248, 0.8);
            margin-top: 100px;
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

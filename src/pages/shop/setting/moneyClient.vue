<template>
	<div>
		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item :to="{name:'shop-shop-list'}">收款账户设置</el-breadcrumb-item>
		</el-breadcrumb>
		<el-form :label-position="labelPosition" label-width="130px" style="margin-top:20px;" class="appbox">
		  <el-form-item label="银行卡:" class="Btitle">
		    
		  </el-form-item>
		  <el-form-item class="appblock" label="开户姓名:">
		    <el-input type="text" style="width:300px;" v-model="form.name" auto-complete="off" placeholder="请输入开户姓名"></el-input>
		  </el-form-item>
		  <el-form-item class="appblock" label="银行账号:">
		    <el-input type="number" style="width:300px;" v-model="form.account" auto-complete="off" placeholder="请输入银行账号"></el-input>
		  </el-form-item>
		  <el-form-item class="appblock" label="开户行:">
		    <el-input type="text" style="width:300px;" v-model="form.bank" auto-complete="off" placeholder="请输入开户行"></el-input>
		  </el-form-item>
		  <el-form-item class="appblock" label="开户行所在地:">
		    <el-input type="number" style="width:300px;" v-model="form.banklocal" auto-complete="off" placeholder="请输入开户行所在地"></el-input>
		  </el-form-item>
		</el-form>
		<div style="clear:both"></div>
		<el-form :label-position="labelPosition" label-width="130px" style="margin-top:20px;" class="appbox">
		  <el-form-item label="支付宝:" class="Btitle">
		    
		  </el-form-item>
		  <el-form-item class="appblock" label="支付宝账号:">
		    <el-input type="text" style="width:300px;" v-model="formzfb.account" auto-complete="off" placeholder="请输入支付宝账号"></el-input>
		  </el-form-item>
		  <el-form-item class="appblock" label="姓名:">
		    <el-input type="text" style="width:300px;" v-model="formzfb.name" auto-complete="off" placeholder="请输入姓名"></el-input>
		  </el-form-item>
		  <el-form-item class="appblock" label="收款账户:">
		    <el-input type="text" style="width:300px;" v-model="formzfb.getmoney" auto-complete="off" placeholder="请输入收款账户"></el-input>
		  </el-form-item>
		  <el-form-item class="appblock" label="合作伙伴ID:">
		    <el-input type="text" style="width:300px;" v-model="formzfb.partner" auto-complete="off" placeholder="请输入合作伙伴ID"></el-input>
		  </el-form-item>
		  <el-form-item class="appblock" label="RSA私钥:">
		    <el-input type="text" style="width:300px;" v-model="formzfb.RSA" auto-complete="off" placeholder="请输入RSA私钥"></el-input>
		  </el-form-item>
		  <el-form-item class="appblock" label="RS私钥pkcs8格式:">
		    <el-input type="text" style="width:300px;" v-model="formzfb.RS" auto-complete="off" placeholder="请输入RS私钥pkcs8格式"></el-input>
		  </el-form-item>
		  <el-form-item class="appblock" label="支付宝公钥:">
		    <el-input type="text" style="width:300px;" v-model="formzfb.zfb" auto-complete="off" placeholder="请输入支付宝公钥"></el-input>
		  </el-form-item>
		</el-form>
		<div style="clear:both"></div>
		<div style="text-align:center;margin-top:20px;">
			<el-button type="primary">确定</el-button>
		</div>
	</div>
</template>
<script>
	export default {
	    data() {
	      return {
	        labelPosition: 'right',
	        info:'',
	        form:{
	        	name:'',
	        	account:'',
	        	bank:'',
	        	banklocal:'',
	        },
	        formzfb:{
	        	name:'',
	        	account:'',
	        	getmoney:'',
	        	partner:'',
	        	RSA:'',
	        	RS:'',
	        	zfb:'',
	        },
	      };
	    },
	    methods: {
	       formatDate(time){
			  var   x = time - 0
			  console.log(x)
			  var   now = new Date(x) 
			  var   year = now.getFullYear();     
			  var   month = "0" + (now.getMonth()+1);     
			  var   date = "0" +(now.getDate());   
			  var   hour = "0" +now.getHours();
			  var   min =  "0" +now.getMinutes();
			  return   year+"-"+month.substr(-2)+"-"+date.substr(-2)+'   '+ hour.substr(-2) +':'+min.substr(-2)
			},
	    },
	    mounted:function(){
	        
	    }
	}
</script>
<style lang="less">
	.appbox{
		.appblock{
			width: 50%;
			float: left;
		}
		.avatar-uploader .el-upload {
		    border: 1px dashed #d9d9d9;
		    border-radius: 6px;
		    cursor: pointer;
		    position: relative;
		    overflow: hidden;
		}
		.avatar-uploader .el-upload:hover {
		    border-color: #20a0ff;
		}
		.avatar-uploader-icon {
		    font-size: 28px;
		    color: #8c939d;
		    width: 178px;
		    height: 178px;
		    line-height: 178px;
		    text-align: center;
		}
		.avatar {
		    width: 178px;
		    height: 178px;
		    display: block;
		}
	}
</style>
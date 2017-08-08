<template>
	<div>
		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item :to="{name:'shop-shop-list'}">员工列表</el-breadcrumb-item>
		  	<el-breadcrumb-item>编辑</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- <el-form :label-position="labelPosition" label-width="140px" style="margin-top:20px;" class="appbox">
		  <el-form-item class="appblock" label="姓名:">
		    <el-input type="text" style="width:300px;" v-model="form.name" auto-complete="off" placeholder="请输入姓名"></el-input>
		  </el-form-item>
		  <el-form-item class="appblock" label="身份证号:">
		    <el-input type="number" style="width:300px;" v-model="form.password" auto-complete="off" placeholder="身份证号"></el-input>
		  </el-form-item>
		  <el-form-item class="appblock" label="手机号:">
		    <el-input type="number" style="width:300px;" v-model="form.phone" auto-complete="off" placeholder="请输入手机号"></el-input>
		  </el-form-item>
		  <el-form-item class="appblock" label="申请时间:">
		    2017-09-26 08:50:08
		  </el-form-item>
		  <el-form-item class="appblock" label="邀请人:">
		    <el-input type="text" style="width:300px;" v-model="form.people" auto-complete="off" placeholder="请输入邀请人"></el-input>
		  </el-form-item>
		  <el-form-item class="appblock" label="邀请码:">
		    <el-input type="text" style="width:300px;" v-model="form.code" auto-complete="off" placeholder="请输入邀请码"></el-input>
		  </el-form-item>
		  <el-form-item class="appblock" label="积分余额:">
		    300000
		  </el-form-item>
		  <el-form-item class="appblock" label="账号状态:">
		    正常
		  </el-form-item>
		  <el-form-item class="appblock" label="联系人身份证正面:">
		    <el-upload
			  class="avatar-uploader"
			  action="//jsonplaceholder.typicode.com/posts/"
			  :show-file-list="false"
			  :on-success="handleAvatarScucess">
			  <img v-if="imageUrl" :src="imageUrl" class="avatar">
			  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload>
		  </el-form-item>
		  <el-form-item class="appblock" label="联系人身份证反面:">
		    <el-upload
			  class="avatar-uploader"
			  action="//jsonplaceholder.typicode.com/posts/"
			  :show-file-list="false"
			  :on-success="handleAvatarScucess">
			  <img v-if="imageUrl" :src="imageUrl" class="avatar">
			  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload>
		  </el-form-item>
		</el-form>
		<div style="clear:both"></div> -->
		<el-form :label-position="labelPosition" label-width="140px" style="margin-top:20px;" class="appbox">
		  <el-form-item label="支付方式:">
			<el-radio class="radio" v-model="form.payway" label="128">全额支付</el-radio>
  		 	<el-radio class="radio" v-model="form.payway" label="256">净保费支付</el-radio>
  		 	<el-radio class="radio" v-model="form.payway" label="512">垫付</el-radio>
		  </el-form-item>
		  <el-form-item label="团队佣金:">
		    <el-checkbox-group v-model="form.teammoney">
			    <el-checkbox value='1' label="1">规模佣金</el-checkbox>
			    <el-checkbox value='2' label="2">管理佣金</el-checkbox>
			</el-checkbox-group>
		  </el-form-item>
		  <el-form-item label="普通佣金:">
		    <el-checkbox-group v-model="form.commonmoney">
			    <el-checkbox value='4' label="4">非营业客车</el-checkbox>
			    <el-checkbox value='8' label="8">非营业货车</el-checkbox>
			    <el-checkbox value='16' label="16">营业客车</el-checkbox>
			    <el-checkbox value='32' label="32">营业货车</el-checkbox>
			    <el-checkbox value='64' label="64">其他</el-checkbox>
			</el-checkbox-group>
		  </el-form-item>
		  <el-row style="margin-left: 70px;">
		  	<el-col :span="12">
		  		<span style="font-size: 14px;">商业险佣金比例(%): </span>
		  		<el-input-number size="small" v-model="CMRate" :step="0.1"></el-input-number>
		  	</el-col>
		  	<el-col :span="12">
		  		<span style="font-size: 14px;">交强险佣金比例(%): </span>
			    <el-input-number size="small" v-model="CPRate" :step="0.1"></el-input-number>
		  	</el-col>
		  </el-row>
		  <!-- el-form-item label="角色配置:">
		    <el-checkbox-group v-model="form.role">
			    <el-checkbox value='1' label="角色1"></el-checkbox>
			    <el-checkbox value='2' label="角色2"></el-checkbox>
			    <el-checkbox value='3' label="角色3"></el-checkbox>
			</el-checkbox-group>
		  </el-form-item> -->
		</el-form>
		<div style="clear:both"></div>
		<div style="text-align:center;margin-top:20px;">
			<el-button type="primary" @click="confirmEdit">确定</el-button>
		</div>
	</div>
</template>
<script>
import { autoApi } from '@/ajax/post.js'
	export default {
	    data() {
	      return {
	      	id: null,
	      	CMRate: 0,
	      	CPRate: 0,
	      	imageUrl: '',
	        labelPosition: 'right',
	        info:'',
	        form:{
	        	role:[],
	        	teammoney:[],
	        	commonmoney:[],
	        	code:'',
	        	name:'',
	        	account:'',
	        	password:'',
	        	phone:'',
	        	shopNum:'',
	        	pay:[],
	        	point:'',
	        	type:[],
	        	company:[],
	        	other:[],
	        	people:'',
	        	payway:'',
	        },
	        radio: '',
	        options: [{
	          value: '1',
	          label: '5'
	        }, {
	          value: '2',
	          label: '10'
	        }, {
	          value: '3',
	          label: '15'
	        }, {
	          value: '4',
	          label: '20'
	        }, {
	          value: '5',
	          label: '25'
	        }],
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
			handleAvatarScucess(res, file) {
		        this.imageUrl = URL.createObjectURL(file.raw);
		    },
		    confirmEdit() {
		    	let payload = {
		    		employeeId: window.localStorage.getItem('employeeId'),
		    		mod: 0,
		    		targetId: this.id,
		    		CMRate: 0,
		    		CPRate: 0
		    	}
		  		for (var i = 0; i < this.form.commonmoney.length; i++) {
		  			payload.mod = payload.mod + parseInt(this.form.commonmoney[i]);
		  		}
		  		for (var i = 0; i < this.form.teammoney.length; i++) {
		  			payload.mod = payload.mod + parseInt(this.form.teammoney[i]);
		  		}

		    	payload.mod = payload.mod + parseInt(this.form.payway);
		    	
		    	payload.CMRate = this.CMRate * 10;
		    	payload.CPRate = this.CPRate * 10;
		    	debugger
		    	payload = JSON.stringify(payload);
		    	autoApi({
		   			action: 'employee_edit',
		   			version: '1.0',
		   			payload: payload
		   		},window.localStorage.getItem('token')).then((res)=> {
		   			if (res.code == 0) {
		   				router.push({
					        path: '/shop/staff-list'
					    })
		   			}
		   		});
		    }
	    },
	    mounted(){
	        if (this.$route.query.id) {
	        	this.id = this.$route.query.id;
	        }
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
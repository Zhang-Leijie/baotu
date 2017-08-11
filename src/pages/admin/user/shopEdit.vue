<template>
	<div>
		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item :to="{name:'admin-shop-list'}">商家列表</el-breadcrumb-item>
		  	<el-breadcrumb-item>编辑</el-breadcrumb-item>
		</el-breadcrumb>
		<el-form :label-position="labelPosition" label-width="120px" style="margin-top:20px;" class="appbox">
		  <el-form-item class="appblock" label="商家名称:">
		    <el-input type="text" style="width:300px;" v-model="form.name" auto-complete="off" placeholder="请输入商家名称"></el-input>
		  </el-form-item>
		  <el-form-item class="appblock" label="营业执照号:">
		    <el-input type="number" style="width:300px;" v-model="form.password" auto-complete="off" placeholder="请输入营业执照号"></el-input>
		  </el-form-item>
		  <el-form-item class="appblock" label="联系人:">
		    <el-input type="text" style="width:300px;" v-model="form.people" auto-complete="off" placeholder="请输入联系人"></el-input>
		  </el-form-item>
		  <el-form-item class="appblock" label="账号:">
		    <el-input type="number" style="width:300px;" v-model="form.account" auto-complete="off" placeholder="请输入账号"></el-input>
		  </el-form-item>
		  <el-form-item class="appblock" label="手机号:">
		    <el-input type="number" style="width:300px;" v-model="form.phone" auto-complete="off" placeholder="请输入手机号"></el-input>
		  </el-form-item>
		  <el-form-item class="appblock" label="注册时间:">
		    2017-09-26 08:50:08
		  </el-form-item>
		  <el-form-item class="appblock" label="开通商家量:">
		    <el-select v-model="form.shopNum" placeholder="请选择" style="width:300px;">
			    <el-option
			      v-for="item in options"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			</el-select>
		  </el-form-item>
		  <el-form-item class="appblock" label="账号状态:">
		    正常
		  </el-form-item>
		</el-form>
		<div style="clear:both"></div>
		<el-form :label-position="labelPosition" label-width="120px" style="margin-top:20px;" class="appbox">
		  <el-form-item class="appblock" label="路由设置:">
		    <el-checkbox-group v-model="form.router">
			    <el-checkbox value='1' label="壁虎"></el-checkbox>
			    <el-checkbox value='2' label="乐宝吧"></el-checkbox>
			</el-checkbox-group>
		  </el-form-item>
		  <el-form-item class="appblock" label="归属地:">
		    <el-select v-model="value" placeholder="请选择">
			    <el-option
			      v-for="item in options"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			</el-select>
		  </el-form-item>
		  <el-form-item class="appblock" label="支付开通:">
		    <el-checkbox-group v-model="form.pay">
			    <el-checkbox value='1' label="银行卡"></el-checkbox>
			    <el-checkbox value='2' label="支付宝"></el-checkbox>
			</el-checkbox-group>
		  </el-form-item>
		  <el-form-item class="appblock" label="积分规则:">
		    <el-radio class="radio" v-model="form.point" label="1">开通</el-radio>
  			<el-radio class="radio" v-model="form.point" label="2">关闭</el-radio>
		  </el-form-item>
		  <el-form-item class="appblock" label="险种:">
		    <el-checkbox-group v-model="form.type">
			    <el-checkbox value='1' label="意外险"></el-checkbox>
			    <el-checkbox value='2' label="财产险"></el-checkbox>
			</el-checkbox-group>
		  </el-form-item>
		  <el-form-item class="appblock" label="险企:">
		    <el-checkbox-group v-model="form.company">
			    <el-checkbox value='1' label="平安保险"></el-checkbox>
			    <el-checkbox value='2' label="太平洋保险"></el-checkbox>
			</el-checkbox-group>
		  </el-form-item>
		  <el-form-item class="appblock" label="其他:">
		    <el-checkbox-group v-model="form.other">
			    <el-checkbox value='1' label="资讯"></el-checkbox>
			    <el-checkbox value='2' label="共享商城"></el-checkbox>
			</el-checkbox-group>
		  </el-form-item>
		</el-form>
		<div style="clear:both"></div>
		<el-form :label-position="labelPosition" label-width="130px" style="margin-top:20px;" class="appbox">
		  <el-form-item class="appblock" label="营业执照正面:">
		    <el-upload
			  class="avatar-uploader"
			  action="//jsonplaceholder.typicode.com/posts/"
			  :show-file-list="false"
			  :on-success="handleAvatarScucess">
			  <img v-if="imageUrl" :src="imageUrl" class="avatar">
			  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload>
		  </el-form-item>
		  <el-form-item class="appblock" label="营业执照反面:">
		    <el-upload
			  class="avatar-uploader"
			  action="//jsonplaceholder.typicode.com/posts/"
			  :show-file-list="false"
			  :on-success="handleAvatarScucess">
			  <img v-if="imageUrl" :src="imageUrl" class="avatar">
			  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload>
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
	      	value:'',
	      	imageUrl: '',
	        labelPosition: 'right',
	        info:'',
	        form:{
	        	name:'',
	        	account:'',
	        	password:'',
	        	phone:'',
	        	shopNum:'',
	        	router:[],
	        	pay:[],
	        	point:'',
	        	type:[],
	        	company:[],
	        	other:[],
	        	people:'',
	        },
	        radio: '',
	        options: [{
	          value: '1',
	          label: '杭州'
	        }, {
	          value: '2',
	          label: '绍兴'
	        }, {
	          value: '3',
	          label: '上海'
	        }, {
	          value: '4',
	          label: '北京'
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
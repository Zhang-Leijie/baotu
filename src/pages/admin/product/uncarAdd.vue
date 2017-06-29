<template>
	<div>
		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item :to="{name:'admin-uncar-manage'}">非车险管理</el-breadcrumb-item>
		  	<el-breadcrumb-item :to="{name:'admin-uncar-list'}">非车险产品列表</el-breadcrumb-item>
		  	<el-breadcrumb-item>新增</el-breadcrumb-item>
		</el-breadcrumb>
		<el-form :label-position="labelPosition" label-width="120px" style="margin-top:20px;" class="appbox">
		  <el-form-item class="appblock" label="名称:">
		    <el-input type="text" style="width:300px;" v-model="form.name" auto-complete="off" placeholder="名称"></el-input>
		  </el-form-item>
		  <el-form-item class="appblock" label="价格:">
		    <el-input type="number" style="width:300px;" v-model="form.price" auto-complete="off" placeholder="请输入价格"></el-input>
		  </el-form-item>
		  <el-form-item class="appblock" label="返利比例:">
		    <el-input type="text" style="width:300px;" v-model="form.profit" auto-complete="off" placeholder="请输入返利比例"></el-input>
		  </el-form-item>
		  <el-form-item class="appblock" label="保险公司:">
		    <el-input type="text" style="width:300px;" v-model="form.company" auto-complete="off" placeholder="请输入保险公司"></el-input>
		  </el-form-item>
		  <el-form-item class="appblock" label="保额:">
		    <el-input type="number" style="width:300px;" v-model="form.money" auto-complete="off" placeholder="请输入保额"></el-input>
		  </el-form-item>
		  <el-form-item class="appblock" label="产品简介:">
		    <el-input
		      style="width:300px;"
			  type="textarea"
			  :rows="2"
			  placeholder="请输入产品简介"
			  v-model="form.introduce">
			</el-input>
		  </el-form-item>
		  <el-form-item class="appblock" label="链接:">
		    <el-input type="number" style="width:300px;" v-model="form.link" auto-complete="off" placeholder="请输入连接"></el-input>
		  </el-form-item>
		</el-form>
		<div style="clear:both"></div>
		<el-form :label-position="labelPosition" label-width="130px" style="margin-top:20px;" class="appbox">
		  <el-form-item class="appblock" label="产品图片:">
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
		<el-form :label-position="labelPosition" label-width="120px" style="margin-top:20px;" class="appbox">
		  <el-form-item label="种类添加:" class="ft16"></el-form-item>
		  <el-form-item label="性别:">
		    <el-checkbox-group v-model="form.sex">
			    <el-checkbox value='1' label="男"></el-checkbox>
			    <el-checkbox value='2' label="女"></el-checkbox>
			</el-checkbox-group>
		  </el-form-item>
		  <el-form-item label="年龄:">
		    <el-checkbox-group v-model="form.age">
			    <el-checkbox value='1' label="10"></el-checkbox>
			    <el-checkbox value='2' label="20"></el-checkbox>
			    <el-checkbox value='3' label="30"></el-checkbox>
			</el-checkbox-group>
		  </el-form-item>
		  <el-form-item label="年份:">
		    <el-checkbox-group v-model="form.year">
			    <el-checkbox value='1' label="2016"></el-checkbox>
			    <el-checkbox value='2' label="2017"></el-checkbox>
			</el-checkbox-group>
		  </el-form-item>
		</el-form>
		<div style="clear:both"></div>
		<el-form :label-position="labelPosition" label-width="120px" style="margin-top:20px;" class="appbox">
		  <el-form-item label="标签管理:" class="ft16"></el-form-item>
		  <el-form-item label=" ">
		    <el-checkbox-group v-model="form.time">
			    <el-checkbox value='1' label="时间"></el-checkbox>
			    <el-checkbox value='2' label="价格"></el-checkbox>
			    <el-checkbox value='2' label="保额"></el-checkbox>
			</el-checkbox-group>
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
	      	imageUrl: '',
	        labelPosition: 'right',
	        info:'',
	        form:{
	        	name:'',
	        	price:'',
	        	profit:'',
	        	company:'',
	        	money:'',
	        	introduce:'',
	        	sex:'',
	        	age:'',
	        	year:'',
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
		    width: 300px;
		    height: 178px;
		    line-height: 178px;
		    text-align: center;
		}
		.avatar {
		    width: 300px;
		    height: 178px;
		    display: block;
		}
		.ft16{
			font-size: 16px !important;
		}
	}
</style>
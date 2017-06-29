<template>
	<div>
		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item :to="{name:'admin-setting-productM'}">商场商品管理列表</el-breadcrumb-item>
		  	<el-breadcrumb-item>编辑</el-breadcrumb-item>
		</el-breadcrumb>
		<el-form :label-position="labelPosition" label-width="120px" style="margin-top:20px;" class="appbox">
		  <el-form-item label="产品名称:">
		    <el-input type="text" style="width:300px;" v-model="form.name" auto-complete="off" placeholder="请输入产品名称"></el-input>
		  </el-form-item>
		  <el-form-item label="产品简介:">
		    <el-input type="number" style="width:300px;" v-model="form.summary" auto-complete="off" placeholder="请输入产品简介"></el-input>
		  </el-form-item>
		  <el-form-item label="价格:">
		    <el-input type="text" style="width:300px;" v-model="form.price" auto-complete="off" placeholder="请输入价格"></el-input>
		  </el-form-item>
		  <el-form-item label="库存:">
		    <el-input type="number" style="width:300px;" v-model="form.stock" auto-complete="off" placeholder="请输入库存"></el-input>
		  </el-form-item>
		  <el-form-item label="商场标签:">
		    <el-select v-model="form.tag" placeholder="请选择" style="width:300px;">
			    <el-option
			      v-for="item in options"
			      :label="item.label"
			      :value="item.value">
			    </el-option>
			</el-select>
		  </el-form-item>
		  <el-form-item label="图片:">
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
	      	imageUrl: '',
	        labelPosition: 'right',
	        info:'',
	        form:{
	        	name:'',
	        	summary:'',
	        	price:'',
	        	stock:'',
	        	tag:'',
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
		    width: 350px;
		    height: 178px;
		    line-height: 178px;
		    text-align: center;
		}
		.avatar {
		    width: 350px;
		    height: 178px;
		    display: block;
		}
	}
</style>
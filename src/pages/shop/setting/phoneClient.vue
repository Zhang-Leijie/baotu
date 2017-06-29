<template>
	<div>
		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item>客户电话设置</el-breadcrumb-item>
		</el-breadcrumb>
		<el-form :label-position="labelPosition" label-width="120px" style="margin-top:20px;" class="appbox">
		  <el-form-item class="appblock" label="客户电话:">
			<el-input type="text" style="width:300px;" v-model="form.phone" auto-complete="off" placeholder="请输入客户电话"></el-input>
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
	        form:{
	        	phone:'',
	        },
	      };
	    },
	    methods: {
	       
	    },
	    mounted:function(){
	        
	    }
	}
</script>
<style lang="less">
	.appbox{
		.appblock{
			
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
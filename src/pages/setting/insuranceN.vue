<template>
	<div>
		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item>非车险险种设置</el-breadcrumb-item>
		</el-breadcrumb>
		<el-form :label-position="labelPosition" label-width="120px" style="margin-top:20px;" class="appbox">
		  <el-form-item class="appblock" label="险种:">
			<el-checkbox-group v-model="form.insurance">
			    <el-checkbox value='1' label="险种1"></el-checkbox>
				<el-checkbox value='2' label="险种2"></el-checkbox>
				<el-checkbox value='3' label="险种3"></el-checkbox>
				<el-checkbox value='4' label="险种4"></el-checkbox>
				<el-checkbox value='5' label="险种5"></el-checkbox>
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
	        labelPosition: 'right',
	        form:{
	        	insurance:[],
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
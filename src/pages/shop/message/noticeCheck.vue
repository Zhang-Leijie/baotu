<template>
	<div class="newsadd">
		<div>
			<el-breadcrumb separator="/">
			  <el-breadcrumb-item :to="{name:'shop-msg-notice'}">公告管理</el-breadcrumb-item>
			  <el-breadcrumb-item>查看</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div style="margin-top:30px;">
			<el-form>
			    <el-form-item label="标题:" :label-width="formLabelWidth">
			      	公告标题
			    </el-form-item>
			    <el-form-item label="接收人:" :label-width="formLabelWidth">
			      	张三 李四
			    </el-form-item>
			    <el-form-item label="公告详情(必填):" :label-width="formLabelWidth">
					<div v-html="text"></div>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>
<script>
	export default {
	  data() {
	    return {
	       text:'<div>11111</div>',
	       formLabelWidth: '120px',
		}
	  },
	  methods: {
	  	
	  	
	  },
	  mounted:function() {
	  	
	  }
	}
</script>
<style lang="less">
	.newsadd{
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
	}
</style>
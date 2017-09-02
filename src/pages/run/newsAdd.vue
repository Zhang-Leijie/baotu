<template>
	<div class="newsaddBody">
		<div>
			<el-breadcrumb separator="/">
			  <el-breadcrumb-item :to="{name:'shop-run-newslist'}">资讯专区管理</el-breadcrumb-item>
			  <el-breadcrumb-item>新增</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div style="margin-top:30px;">
			<el-form :model="form" class="appbox">
			    <el-form-item label="标题" :label-width="formLabelWidth" class="appblock">
			      	<el-input style="width:300px;" v-model="form.title" placeholder="请输入标题"></el-input>
			    </el-form-item>
			    <el-form-item label="资讯链接" :label-width="formLabelWidth" class="appblock">
			      	<el-input style="width:300px;" v-model="form.link" placeholder="请输入标题"></el-input>
			    </el-form-item>
			    <el-form-item class="appblock" label="资讯图标:" :label-width="formLabelWidth">
				    <el-upload class="avatar-uploader"
					  action="//jsonplaceholder.typicode.com/posts/"
					  :show-file-list="false"
					  :on-success="handleAvatarScucess">
					  <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
					  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
				 </el-form-item>
			</el-form>
		</div>
		<div style="text-align:center;margin-top:20px;">
			<el-button type="primary" @click="getContent">确定</el-button>
		</div>
	</div>
</template>
<script>
import { autoApi } from '@/ajax/post.js'

	export default {
	  data() {
	    return {
	      form: {
	        title: '',
	        link: '',
	        imageUrl: ''
	      },
	      formLabelWidth: '120px'
		}
	  },
	  methods: {
	  	handleAvatarScucess(res, file) {
	        this.form.imageUrl = URL.createObjectURL(file.raw);
	    },
	  	getContent(){
	  		let payload = {
	  			title: this.form.title,
	  			icon: this.form.imageUrl,
	  			link: this.form.link
	  		}
	  		payload = JSON.stringify(payload);
	  		autoApi({
		   			action: 'article_add',
		   			version: '1.0',
		   			payload: payload,
		   		},window.localStorage.getItem('token')).then((res)=> {
		   			if (res.code == 0) {
		   				this.$message({
				            message: '新增资讯成功',
				            type: 'success'
				        });
				        router.push({
					        name: 'shop-run-newslist'
					    });
	       			}
		   		})
	  		}
	  },
	  mounted() {
	  	
	  }
	}
</script>
<style lang="less">
.newsaddBody{
	.appbox{
		.appblock{
			width: 50%;
			float: left;
		}
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
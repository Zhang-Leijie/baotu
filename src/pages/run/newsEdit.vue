<template>
	<div class="newsadd">
		<div>
			<el-breadcrumb separator="/">
			  <el-breadcrumb-item :to="{name:'shop-run-newslist'}">资讯专区管理</el-breadcrumb-item>
			  <el-breadcrumb-item>编辑</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div style="margin-top:30px;">
			<el-form :model="form" class="appbox">
			    <el-form-item label="标题" :label-width="formLabelWidth" class="appblock">
			      	<el-input v-model="form.title" auto-complete="off" placeholder="请输入标题"></el-input>
			    </el-form-item>
			    <el-form-item label="轮播图" :label-width="formLabelWidth" class="appblock">
			      <el-upload
			      	name='pictureUrl'
					class="avatar-uploader"
					action="//jsonplaceholder.typicode.com/posts/"
					:file-list="fileList"
					:on-success="handleAvatarScucess">
					<img v-if="imageUrl" :src="imageUrl" class="avatar">
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
	import { uploadFactory } from '@/ajax/post.js'

	export default {
	  data() {
	    return {
	      form: {
	        title: '',
	        author:'',
	        summary:'',
	      },
	      formLabelWidth: '120px',
	      imageUrl: '',
		  fileList:[],
		}
	  },
	  methods: {
	  	handleAvatarScucess(res, file, fileList) {
	        this.imageUrl = file.response.data;
        	$('.el-upload-list').remove();
	    },
	  	getContent(){
	  		if (this.form.title==''||this.form.author==''||this.summary==''||this.editor.getContent()=='') {
	  			swal({
                    title: "信息输入不完整",
                    type: 'warning',
                    text: "请完善必填信息",
                    timer: 2000,
                })
	  		} else {
	  			// addArticle({
	  			// 	articleName: this.form.title,
	  			// 	author: this.form.author,
	  			// 	articleAbstract: this.form.summary,
	  			// 	abstractContent: this.editor.getContent()
	  			// }).then((res) => {
	  			// 	if (res.code == null) {
	  			// 		swal({
		    //                 title: "创建成功",
		    //                 type: 'success',
		    //                 text: "",
		    //                 timer: 2000,
		    //             })
		    //             setTimeout(() => {
					 //        router.push({name:'content-article'})
					 //    }, 1000);
	  			// 	}
	  			// })
	  		}
	  	}
	  },
	  mounted:function() {
	  	var ret = uploadFactory('img_upload');
	    var editor = new tinymce.Editor('article', {
			selector: 'article',
			language: 'zh_CN',
			plugins: ['image'],
			toolbar: 'codesample | bold italic sizeselect fontselect fontsizeselect | hr alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | insertfile undo redo | forecolor backcolor emoticons | code',
			fontsize_formats: "8pt 10pt 12pt 14pt 18pt 24pt 36pt",
			file_browser_callback: ret.callback,
			height: 400
		}, tinymce.EditorManager)
		
		editor.render()

		this.editor = editor
	  }
	}
</script>
<style lang="less">
	.newsadd{
		.appbox{
			.appblock{
				width: 50%;
				float: left;
			}
		}
	}
</style>
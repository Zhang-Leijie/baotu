<template>
	<div class="newsadd">
		<div>
			<el-breadcrumb separator="/">
			  <el-breadcrumb-item :to="{name:'shop-msg-notice'}">公告管理</el-breadcrumb-item>
			  <el-breadcrumb-item>新增</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div style="margin-top:30px;">
			<el-form :model="form">
			    <el-form-item label="标题" :label-width="formLabelWidth">
			      	<el-input style="width:90%;" v-model="form.title" auto-complete="off" placeholder="请输入标题"></el-input>
			    </el-form-item>
			    <el-form-item label="接收人" :label-width="formLabelWidth">
			      	<el-tree
					  :data="regions"
					  show-checkbox
					  node-key="id"
					  :props="props"
					  ref="tree"
					  @check-change="getCheckedKeys">
					</el-tree>
			    </el-form-item>
			    <el-form-item label="公告详情(必填)" :label-width="formLabelWidth">
					<textarea style="width:80%;" id="article"></textarea>
					<input name="file" type="file" id="img_upload" style="display:none;">
				</el-form-item>
			</el-form>
		</div>
		<div style="text-align:center;margin-top:20px;">
			<el-button type="primary" @click="getarr">确定</el-button>
		</div>
	</div>
</template>
<script>
	import { uploadFactory, addArticle } from '@/ajax/post.js'

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
		  regions: [{
	        id: 'A1',
	        label: '一级 1',
	        children: [{
		        id: 1,
		        label: '二级 1-1',
		    }]
		  }, {
	        id: 'A2',
	        label: '一级 2',
	        children: [{
	            id: 2,
	            label: '二级 2-1'
	        }, {
	            id: 3,
	            label: '二级 2-2'
	        }]
	      }, {
	        id: 'A3',
	        label: '一级 3',
	        children: [{
	            id: 4,
	            label: '二级 3-1'
	        }, {
	            id: 5,
	            label: '二级 3-2'
	        }]
	      }],
	      props: {
	        children: 'children',
          	label: 'label'
	      },
	      arr:[],
		}
	  },
	  methods: {
	  	getCheckedKeys() {
	        this.arr = this.$refs.tree.getCheckedKeys();
	        console.log(this.arr);
	    },
	    getarr(){
	    	Array.prototype.indexOf = function(val) {
				for (var i = 0; i < this.length; i++) {
					if (this[i] == val) return i;
				}
				return -1;
		    };
		    Array.prototype.remove = function(val) {
				var index = this.indexOf(val);
				if (index > -1) {
					this.splice(index, 1);
				}
		 	};
	    	this.arr.remove('A1');
	    	this.arr.remove('A2');
	    	this.arr.remove('A3');
	        console.log(this.arr)
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
	  			addArticle({
	  				articleName: this.form.title,
	  				author: this.form.author,
	  				articleAbstract: this.form.summary,
	  				abstractContent: this.editor.getContent()
	  			}).then((res) => {
	  				if (res.code == null) {
	  					swal({
		                    title: "创建成功",
		                    type: 'success',
		                    text: "",
		                    timer: 2000,
		                })
		                setTimeout(() => {
					        router.push({name:'content-article'})
					    }, 1000);
	  				}
	  			})
	  		}
	  	}
	  },
	  mounted:function() {
	  	var ret = uploadFactory('img_upload');
	    var editor = new tinymce.Editor('article', {
			selector: '#article',
			language: 'zh_CN',
			plugins: ['powerpaste','image'],
			powerpaste_word_import: 'propmt',// 参数可以是propmt, merge, clear，效果自行切换对比
		    powerpaste_html_import: 'propmt',// propmt, merge, clear
		    powerpaste_allow_local_images: true,
		    paste_data_images: true,
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
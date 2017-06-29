<template>
	<div>
		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item>系统设置</el-breadcrumb-item>
		</el-breadcrumb>
		<el-tabs v-model="activeName">
		    <el-tab-pane label="公司介绍" name="first">
		    	<div>
		    		<textarea style="width:90%;" id="article"></textarea>
					<input name="file" type="file" id="img_upload" style="display:none;">
					<div style="text-align:center;margin-top:20px;">
						<el-button type="primary">确定</el-button>
					</div>
		    	</div>
			</el-tab-pane>
		    <el-tab-pane label="用户协议" name="second">
		    	<div>
		    		<textarea style="width:90%;" id="article2"></textarea>
					<input name="file" type="file" id="img_upload2" style="display:none;">
					<div style="text-align:center;margin-top:20px;">
						<el-button type="primary">确定</el-button>
					</div>
		    	</div>
			</el-tab-pane>
		    <el-tab-pane label="联系方式" name="third">
				<div>
					<el-form :label-position="labelPosition" label-width="120px" style="margin-top:20px;" class="appbox">
					  <el-form-item label="客户电话:">
						<el-input type="text" style="width:300px;" v-model="form.phone" auto-complete="off" placeholder="请输入客户电话"></el-input>
					  </el-form-item>
					</el-form>
					<div style="clear:both"></div>
					<div style="text-align:center;margin-top:20px;">
						<el-button type="primary">确定</el-button>
					</div>
				</div>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>
<script>
	import { uploadFactory } from '@/ajax/post.js'
	export default {
	    data() {
	      return {
	      	activeName: 'first',
	      	labelPosition: 'right',
	        form:{
	        	phone:'',
	        },
	      };
	    },
	    methods: {
	       
	    },
	    mounted:function(){
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
			}, tinymce.EditorManager);
			editor.render();
			this.editor = editor;

			var ret2 = uploadFactory('img_upload2');
		    var editor2 = new tinymce.Editor('article2', {
				selector: '#article2',
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
			}, tinymce.EditorManager);
			editor2.render();
			this.editor2 = editor2;
	    }
	}
</script>
<style lang="less">
	
</style>
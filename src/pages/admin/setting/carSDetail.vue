<template>
	<div>
		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item :to="{name:'admin-setting-carS'}">特殊车辆型号设置</el-breadcrumb-item>
		  	<el-breadcrumb-item>详情</el-breadcrumb-item>
		</el-breadcrumb>
		<el-form :label-position="labelPosition" label-width="120px" style="margin-top:20px;">
		  	<el-form-item label="品牌">
		    	宝马
		  	</el-form-item>
		  	<el-form-item label="车系">
		    	宝马三系
		  	</el-form-item>
		  	<el-form-item label="型号">
		    	320 320L
		  	</el-form-item>
		</el-form>
		<div style="clear:both"></div>
	</div>
</template>
<script>
	export default {
	    data() {
	      return {
	        labelPosition: 'right',
	      };
	    },
	    methods: {
	       
	    },
	    mounted:function(){
	        
	    }
	}
</script>
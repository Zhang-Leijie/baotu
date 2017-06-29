<template>
	<div>
		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item :to="{name:'admin-uncar-manage'}">非车险管理</el-breadcrumb-item>
		  	<el-breadcrumb-item>新增</el-breadcrumb-item>
		</el-breadcrumb>
		<el-form :label-position="labelPosition" label-width="180px" style="margin-top:20px;">
		  <el-form-item label="非车险险种:">
		    <el-input type="text" style="width:300px;" v-model="form.name" auto-complete="off" placeholder="请输入非车险险种"></el-input>
		  </el-form-item>
		  <el-form-item label="非车险图片:">
		    <el-upload
			  class="avatar-uploader"
			  action="//jsonplaceholder.typicode.com/posts/"
			  :show-file-list="false"
			  :on-success="handleAvatarScucess">
			  <img v-if="imageUrl" :src="imageUrl" class="avatar">
			  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload>
		  </el-form-item>
		  <el-form-item label="种类管理:">
		  	<el-button type="primary" style="margin-left:20px;margin-bottom:20px;">新增</el-button>
		  	<el-button type="primary" style="margin-left:20px;margin-bottom:20px;" @click="sortManage = 1" v-if="sortManage == 2">返回</el-button>
		    <el-table
		    	v-if="sortManage == 1"
			    :data="tableData1"
			    border
			    style="width: 80%;font-size:12px;">
			    <el-table-column
			      prop="name"
			      label="标签名"
			      min-width="80">
			    </el-table-column>
			    <el-table-column
			      label="操作"
			      min-width="150">
			      <template scope="scope">
			        <el-button type="text" size="small" @click="sortManage = 2">查看二级</el-button>
			        <el-button type="text" size="small">删除</el-button>
			      </template>
			    </el-table-column>
			</el-table>
			<el-table
				v-if="sortManage == 2"
			    :data="tableData1"
			    border
			    style="width: 80%;font-size:12px;">
			    <el-table-column
			      prop="name"
			      label="二级标签名"
			      min-width="80">
			    </el-table-column>
			    <el-table-column
			      label="操作"
			      min-width="150">
			      <template scope="scope">
			        <el-button type="text" size="small">删除</el-button>
			      </template>
			    </el-table-column>
			</el-table>
		  </el-form-item>
		  <el-form-item label="排序管理:">
		  	<el-button type="primary" style="margin-left:20px;margin-bottom:20px;">新增</el-button>
		    <el-table
			    :data="tableData1"
			    border
			    style="width: 80%;font-size:12px;">
			    <el-table-column
			      prop="name"
			      label="标签名"
			      min-width="80">
			    </el-table-column>
			    <el-table-column
			      label="操作"
			      min-width="150">
			      <template scope="scope">
			        <el-button type="text" size="small">删除</el-button>
			      </template>
			    </el-table-column>
			</el-table>
		  </el-form-item>
		  <el-form-item label="标签管理:">
		  	<el-button type="primary" style="margin-left:20px;margin-bottom:20px;">新增</el-button>
		    <el-table
			    :data="tableData1"
			    border
			    style="width: 80%;font-size:12px;">
			    <el-table-column
			      prop="name"
			      label="标签名"
			      min-width="80">
			    </el-table-column>
			    <el-table-column
			      label="操作"
			      min-width="150">
			      <template scope="scope">
			        <el-button type="text" size="small">删除</el-button>
			      </template>
			    </el-table-column>
			</el-table>
		  </el-form-item>
		</el-form>
		<div style="text-align:center;margin-top:20px;">
			<el-button type="primary">确定</el-button>
		</div>
	</div>
</template>
<script>
	export default {
	    data() {
	      return {
	      	sortManage:1,
	        labelPosition: 'right',
	        info:'',
	        form:{
	        	name:'',
	        },
	        radio: '',
	        imageUrl: '',
	        tableData1:[
		      	{name:'标签名'}
		    ],
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
<style lang='less'>
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
</style>
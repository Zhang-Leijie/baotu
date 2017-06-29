<template>
	<div class="rollimg">
		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item>默认轮播图管理</el-breadcrumb-item>
		</el-breadcrumb>
		<div style="margin-top:10px;margin-bottom:10px;">
			<el-button type="primary" class="marginBtn" @click="dialogFormVisible = true">新增</el-button>
			<div style="clear:both"></div>
		</div>
		<div style="margin-top:20px;">
			<el-table
			    :data="tableData"
			    border
			    style="width: 100%;font-size:12px;">
			    <el-table-column
			      prop="index"
			      label="序号"
			      min-width="80">
			    </el-table-column>
			    <el-table-column
			      prop="img"
			      label="轮播图"
			      min-width="100">
			    </el-table-column>
			    <el-table-column
			      prop="state"
			      label="状态"
			      min-width="100">
			    </el-table-column>
			    <el-table-column
			      label="操作"
			      min-width="150">
			      <template scope="scope">
			        <el-button type="text" size="small" @click="dialogFormVisible2 = true">编辑</el-button>
			        <el-button type="text" size="small">上线</el-button>
			        <el-button type="text" size="small">下线</el-button>
			        <el-button type="text" size="small">删除</el-button>
			      </template>
			    </el-table-column>
			</el-table>
			<el-pagination v-if="intotal"
		      @current-change="handleCurrentChange"
		      :current-page="currentPage"
		      :page-size="10"
		      layout="total , prev, pager, next, jumper"
		      :total='intotal'
		      style="margin:20px auto;text-align:center">
		    </el-pagination>
		</div>
		<el-dialog title="新增轮播图" v-model="dialogFormVisible" top="10%">
		  <el-form :model="form">
		    <el-form-item label="轮播图" :label-width="formLabelWidth">
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
		    <el-form-item label="跳转链接" :label-width="formLabelWidth">
		      <el-input style="width:90%;" v-model="form.link" auto-complete="off" placeholder="请输入跳转链接">
				<template slot="prepend">Http://</template>
		  	  </el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogFormVisible = false;form.link = '';form.remark = '';imageUrl = '';">取 消</el-button>
		    <el-button type="primary" @click="addPic">确 定</el-button>
		  </div>
		</el-dialog>
		<el-dialog title="编辑轮播图" v-model="dialogFormVisible2" top="10%">
		  <el-form :model="form">
		    <el-form-item label="轮播图" :label-width="formLabelWidth">
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
		    <el-form-item label="跳转链接" :label-width="formLabelWidth">
		      <el-input style="width:90%;" v-model="form.link" auto-complete="off" placeholder="请输入跳转链接">
				<template slot="prepend">Http://</template>
		  	  </el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogFormVisible2 = false;form.link = '';form.remark = '';imageUrl = '';">取 消</el-button>
		    <el-button type="primary" @click="editPic">确 定</el-button>
		  </div>
		</el-dialog>
	</div>
</template>
<script>

	function formatDate(time){
	  var   x = time - 0
	  console.log(x)
	  var   now = new Date(x) 
	  var   year = now.getFullYear();     
	  var   month = "0" + (now.getMonth()+1);     
	  var   date = "0" +(now.getDate());   
	  var   hour = "0" +now.getHours();
	  var   min =  "0" +now.getMinutes();
	  return   year+"-"+month.substr(-2)+"-"+date.substr(-2)+'   '+ hour.substr(-2) +':'+min.substr(-2)
	}

	export default {
	  data() {
	    return {
	      intotal:1,
	      searchName:'',
	      tableData:[
	      	{index:1,img:'轮播图',state:'上线'}
	      ],
	      form: {
	      	link:'',
	      	remark:'',
	      },
	      currentPage:1,
	      imageUrl: '',
	      dialogFormVisible: false,
	      dialogFormVisible2: false,
	      formLabelWidth: '120px',
	      fileList:[],
		}
	  },
	  methods: {
	  	handleCurrentChange(val) {
	        this.currentPage = val;
	        console.log(`当前页: ${val}`);
	        // this.getlist(); 
	    },
	    handleAvatarScucess(res, file, fileList) {
	        this.imageUrl = file.response.data;
        	$('.el-upload-list').remove();
	    },
	    addPic(){
	    	this.dialogFormVisible = false;
	    },
	    editPic(){
	    	this.dialogFormVisible2 = false;
	    }
	  },
	  mounted:function() {
	  	
	  }
	}
</script>
<style lang="less">
	.rollimg{
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
<template>
	<div>
		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item>商城标签管理</el-breadcrumb-item>
		</el-breadcrumb>
		<div style="margin-top:10px;margin-bottom:10px;">
			<el-button type="primary" style="float:right;margin-right:10px;margin-left:10px;" @click="dialogVisible = true">新增</el-button>
			<el-button style="float:right;margin-right:10px;margin-left:10px;">重置</el-button>
			<el-button style="float:right;margin-right:10px;margin-left:10px;">搜索</el-button>
			<el-input style="float:right;width:300px;" v-model="searchName" placeholder="请输入信息"></el-input>
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
			      prop="name"
			      label="名称"
			      min-width="100">
			    </el-table-column>
			    <el-table-column
			      prop="summary"
			      label="简介"
			      min-width="80">
			    </el-table-column>
			    <el-table-column
			      prop="tag"
			      label="标签"
			      min-width="140">
			    </el-table-column>
			    <el-table-column
			      prop="price"
			      label="价格(积分)"
			      min-width="180">
			    </el-table-column>
			    <el-table-column
			      prop="state"
			      label="状态"
			      min-width="80">
			    </el-table-column>
			    <el-table-column
			      label="操作"
			      min-width="150">
			      <template scope="scope">
		      		<el-button type="text" size="small" @click="dialogVisible2 = true">编辑</el-button>
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
		<el-dialog title="新增" v-model="dialogVisible">
		  <span>
		  	<el-form label-position="right" label-width="120px" style="margin-top:20px;" class="appbox">
				<el-form-item label="产品名称:">
				    <el-input type="text" style="width:300px;" v-model="name" auto-complete="off" placeholder="请输入产品名称"></el-input>
				</el-form-item>
			</el-form>
		  </span>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
		  </span>
		</el-dialog>
		<el-dialog title="编辑" v-model="dialogVisible2">
		  <span>
		  	<el-form label-position="right" label-width="120px" style="margin-top:20px;" class="appbox">
				<el-form-item label="产品名称:">
				    <el-input type="text" style="width:300px;" v-model="name2" auto-complete="off" placeholder="请输入产品名称"></el-input>
				</el-form-item>
			</el-form>
		  </span>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible2 = false">取 消</el-button>
		    <el-button type="primary" @click="dialogVisible2 = false">确 定</el-button>
		  </span>
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
	      name:'',
	      name2:'',
	      intotal:1,
	      searchName:'',
	      tableData:[
	      	{index:1,name:'洗发水',summary:'海飞丝',tag:'日用品',price:'200',state:'上线'}
	      ],
	      currentPage:1,
	      dialogVisible: false,
	      dialogVisible2: false,
		}
	  },
	  methods: {
	  	handleCurrentChange(val) {
	        this.currentPage = val;
	        console.log(`当前页: ${val}`);
	        // this.getlist(); 
	    },
	  },
	  mounted:function() {
	  	
	  }
	}
</script>
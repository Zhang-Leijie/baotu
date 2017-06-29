<template>
	<div>
		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item :to="{name:'admin-uncar-manage'}">非车险管理</el-breadcrumb-item>
		  	<el-breadcrumb-item>非车险产品列表</el-breadcrumb-item>
		</el-breadcrumb>
		<div style="margin-top:10px;margin-bottom:10px;">
			<router-link :to="{name:'admin-uncar-add'}">
				<el-button type="primary" style="float:right;margin-right:10px;margin-left:10px;">新增</el-button>
			</router-link>
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
			      min-width="50">
			    </el-table-column>
			    <el-table-column
			      prop="name"
			      label="名称"
			      min-width="100">
			    </el-table-column>
			    <el-table-column
			      prop="introduce"
			      label="简介"
			      min-width="100">
			    </el-table-column>
			    <el-table-column
			      prop="supply"
			      label="提供方"
			      min-width="80">
			    </el-table-column>
			    <el-table-column
			      prop="price"
			      label="价格"
			      min-width="80">
			    </el-table-column>
			    <el-table-column
			      prop="state"
			      label="状态"
			      min-width="80">
			    </el-table-column>
			    <el-table-column
			      prop="profit"
			      label="返利比例"
			      min-width="180">
			    </el-table-column>
			    <el-table-column
			      label="操作"
			      min-width="150">
			      <template scope="scope">
		      		<el-button type="text" size="small">
						<router-link :to="{name:'admin-uncar-edit',query:{id:scope.row.id}}">
			      			编辑
			      		</router-link>
		      		</el-button>
			        <el-button type="text" size="small">上架</el-button>
			        <el-button type="text" size="small">下架</el-button>
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
	      	{index:1,name:'平安境内旅游险',introduce:'保险期限可选',supply:'平安保险',price:'200',state:'上架'}
	      ],
	      currentPage:1,
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
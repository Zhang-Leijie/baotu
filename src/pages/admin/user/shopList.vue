<template>
	<div>
		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item>商家账号管理</el-breadcrumb-item>
		</el-breadcrumb>
		<div style="margin-top:10px;margin-bottom:10px;">
			<el-button class="marginBtn">重置</el-button>
			<el-button class="marginBtn">搜索</el-button>
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
			      prop="appname"
			      label="商家名"
			      min-width="100">
			    </el-table-column>
			    <el-table-column
			      prop="account"
			      label="账号"
			      min-width="80">
			    </el-table-column>
			    <el-table-column
			      prop="license"
			      label="营业执照号"
			      min-width="140">
			    </el-table-column>
			    <el-table-column
			      prop="timeB"
			      label="申请时间"
			      min-width="180">
			    </el-table-column>
			    <el-table-column
			      prop="timeE"
			      label="截止日期"
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
		      		<el-button type="text" size="small">
						<router-link :to="{name:'admin-shop-edit',query:{id:scope.row.id}}">
			      			配置
			      		</router-link>
		      		</el-button>
			        <el-button type="text" size="small">禁用</el-button>
			        <el-button type="text" size="small">启用</el-button>
			        <el-button type="text" size="small">轮播图</el-button>
			        <el-button type="text" size="small">删除</el-button>
			      </template>
			    </el-table-column>
			</el-table>
			<el-pagination v-if="intotal"
		      @current-change="handleCurrentChange"
		      :current-page="currentPage"
		      :page-size="10"
		      layout="total , prev, pager, next, jumper"
		      :page-count='intotal'
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
	      	{index:1,account:'管理员',appname:'商家名称', license:'111111111', timeB:'2015-09-26 08:50:08',timeE:'2015-09-26 08:50:08',state:'正常'}
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
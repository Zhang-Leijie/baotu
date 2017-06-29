<template>
	<div>
		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item>规模奖励审核</el-breadcrumb-item>
		</el-breadcrumb>
		<div style="margin-top:10px;margin-bottom:10px;">
			<router-link :to="{name:'shop-role-add'}">
				<el-button type="primary" class="marginBtn">新增</el-button>
			</router-link>
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
			      prop="leader"
			      label="团长"
			      min-width="80">
			    </el-table-column>
			    <el-table-column
			      prop="money"
			      label="统计保费额"
			      min-width="100">
			    </el-table-column>
			    <el-table-column
			      prop="per1"
			      label="商业险奖励比例"
			      min-width="100">
			    </el-table-column>
			    <el-table-column
			      prop="per2"
			      label="交强险奖励比例"
			      min-width="100">
			    </el-table-column>
			    <el-table-column
			      prop="teammates"
			      label="团队成员量"
			      min-width="100">
			    </el-table-column>
			    <el-table-column
			      prop="amount"
			      label="团队保费总额"
			      min-width="100">
			    </el-table-column>
			    <el-table-column
			      prop="point"
			      label="奖励积分"
			      min-width="100">
			    </el-table-column>
			    <el-table-column
			      label="操作"
			      min-width="150">
			      <template scope="scope">
		      		<el-button type="text" size="small">
						<router-link :to="{name:'shop-set-business',query:{id:scope.row.id}}">
			      			查看流水
			      		</router-link>
		      		</el-button>
			        <el-button type="text" size="small">同意</el-button>
			        <el-button type="text" size="small">拒绝</el-button>
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
	      	{leader:"张三",money:'15000',per1:'10%',per2:'10%',teammates:'李四',amount:'15000',point:'100'}
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
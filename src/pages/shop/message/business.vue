<template>
	<div>
		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item>线下业务管理</el-breadcrumb-item>
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
			      prop="people"
			      label="业务员"
			      min-width="100">
			    </el-table-column>
			    <el-table-column
			      prop="phone"
			      label="手机号"
			      min-width="100">
			    </el-table-column>
			    <el-table-column
			      prop="number"
			      label="订单号"
			      min-width="100">
			    </el-table-column>
			    <el-table-column
			      prop="time"
			      label="订单时间"
			      min-width="100">
			    </el-table-column>
			    <el-table-column
			      prop="carnumber"
			      label="车牌号"
			      min-width="100">
			    </el-table-column>
			    <el-table-column
			      prop="owner"
			      label="车主"
			      min-width="100">
			    </el-table-column>
			    <el-table-column
			      prop="company"
			      label="保险公司"
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
		      		<el-button type="text" size="small">
						<router-link :to="{name:'shop-msg-noticecheck',query:{id:scope.row.id}}">
			      			查看
			      		</router-link>
		      		</el-button>
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
	      	{index:1,time:'2017-09-26 08:50:08',people:'张三', phone:'18503060611', number:'123456789', carnumber:'浙A 12345', owner:'张三', company:'太平洋保险', state:'完成'}
	      ],
	      currentPage:1,
	      dialogVisible:false,
	      dialogVisible2:false,
	      textarea:''
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
<template>
	<div>
		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item>非车险管理</el-breadcrumb-item>
		</el-breadcrumb>
		<div style="margin-top:10px;margin-bottom:10px;">
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
			      prop="shop"
			      label="商家名称"
			      min-width="100">
			    </el-table-column>
			    <el-table-column
			      prop="goods"
			      label="商品名称"
			      min-width="100">
			    </el-table-column>
			    <el-table-column
			      prop="goods"
			      label="保险公司"
			      min-width="100">
			    </el-table-column>
			    <el-table-column
			      prop="timeB"
			      label="上架时间"
			      min-width="180">
			    </el-table-column>
			    <el-table-column
			      prop="timeE"
			      label="到期时间"
			      min-width="180">
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
		      		<el-button type="text" size="small" @click="dialogVisible = true">下架</el-button>
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
		<el-dialog title="下架理由" v-model="dialogVisible">
		  <span>
		  	<el-form label-position="right" label-width="120px" style="margin-top:20px;" class="appbox">
				<el-form-item label="下架理由:">
				    <el-input type="textarea" style="width:80%;" v-model="reason" auto-complete="off" placeholder="请输入产品名称"></el-input>
				</el-form-item>
			</el-form>
		  </span>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
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
	      reason:'',
	      intotal:1,
	      searchName:'',
	      tableData:[
	      	{index:1,shop:'阿里代理',goods:'车险宝',company:'中国平安',timeB:'2017-01-01 08:50:08',timeE:'2017-01-01 08:50:08',state:'上架'}
	      ],
	      currentPage:1,
	      dialogVisible:false,
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
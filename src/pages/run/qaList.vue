<template>
	<div>
		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item>问答专区管理</el-breadcrumb-item>
		</el-breadcrumb>
		<div style="margin-top:10px;margin-bottom:10px;">
			<el-button type="primary" class="marginBtn" @click="dialogVisible = true">新增</el-button>
			<el-button class="marginBtn">重置</el-button>
			<el-button class="marginBtn">搜索</el-button>
			<el-input style="float:right;width:300px;" v-model="searchName" placeholder="请输入信息"></el-input>
			<div style="clear:both"></div>
		</div>
		<div class="tableBox">
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
			      label="提问人"
			      min-width="100">
			    </el-table-column>
			    <el-table-column
			      prop="time"
			      label="发布时间"
			      min-width="100">
			    </el-table-column>
			    <el-table-column
			      prop="title"
			      label="标题"
			      min-width="100">
			    </el-table-column>
			    <el-table-column
			      label="操作"
			      min-width="150">
			      <template scope="scope">
					<router-link :to="{name:'shop-run-qadetail',query:{id:scope.row.id}}">
			      		<el-button type="text" size="small">查看</el-button>
		      		</router-link>
			        <el-button type="text" size="small" @click="dialogVisible2 = true">回复</el-button>
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
		<el-dialog title="发起提问" v-model="dialogVisible">
		  <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
		  </span>
		</el-dialog>
		<el-dialog title="回复" v-model="dialogVisible2">
		  <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea"></el-input>
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
	      	{index:1,name:'张三',time:'2015-09-26 08:50:08',title:'如何在网上购买车险？'}
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
	        
	        // this.getlist(); 
	    },
	  },
	  mounted:function() {
	  	
	  }
	}
</script>
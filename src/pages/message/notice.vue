<template>
	<div>
		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item>公告管理</el-breadcrumb-item>
		</el-breadcrumb>
		<div style="margin-top:10px;margin-bottom:10px;">
			<router-link :to="{name:'shop-msg-noticeadd'}">
				<el-button type="primary" class="marginBtn">新增</el-button>
			</router-link>
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
			      prop="account"
			      label="发布账号"
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
		      :page-count='intotal'
		      style="margin:20px auto;text-align:center">
		    </el-pagination>
		</div>
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
	      	{index:1,name:'张三',time:'2017-09-26 08:50:08',title:'关于太平洋保险新条例说明',account:'admin001'}
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
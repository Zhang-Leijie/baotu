<template>
	<div>
		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item>审核管理</el-breadcrumb-item>
		</el-breadcrumb>
		<div style="margin-top:10px;margin-bottom:10px;">
			<router-link :to="{name:'shop-shop-add'}">
				<el-button type="primary" class="marginBtn">新增</el-button>
			</router-link>
			<el-button class="marginBtn">重置</el-button>
			<el-button class="marginBtn">搜索</el-button>
			<el-input style="float:right;width:300px;" v-model="searchName" placeholder="请输入信息"></el-input>
			<div style="clear:both"></div>
		</div>
		<div style="margin-top:20px;">
			<el-table :data="tableData" border style="width: 100%;font-size:12px;">
			    <el-table-column prop="index" label="序号" min-width="70"></el-table-column>
			    <el-table-column prop="name" label="姓名" min-width="100"></el-table-column>
			    <el-table-column prop="ID" label="证件号" min-width="200"></el-table-column>
			    <el-table-column prop="account" label="账号" min-width="80"></el-table-column>
			    <el-table-column prop="timeB" label="申请时间" min-width="140"></el-table-column>
			    <el-table-column prop="invite" label="邀请人" min-width="180"></el-table-column>
			    <el-table-column prop="phone" label="邀请人手机号" min-width="120"></el-table-column>
			    <el-table-column prop="img" label="证件照片" min-width="180"></el-table-column>
			    <el-table-column label="操作" min-width="120">
			      <template scope="scope">
			        <el-button type="text" size="small" @click="confirm">同意</el-button>
			        <el-button type="text" size="small" @click="confirm">拒绝</el-button>
			      </template>
			    </el-table-column>
			</el-table>
			<el-pagination v-if="totalPage" @current-change="pageChange" :current-page="currentPage" :page-size="10" layout="total , prev, pager, next, jumper" :total='totalPage' style="margin:20px auto;text-align:center"></el-pagination>
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
	      searchName: '',
	      tableData: [
	      	// {index:1,account:'18503060611',name:'商家名称', invite:'Superadmin', timeB:'2015-09-26 08:50:08',state:'正常', phone:'13512677011', img:'',ID:'230804199006140059'}
	      ],
	      totalPage: 1,
	      currentPage: 1,
	      pageCount: null,
		}
	  },
	  methods: {
	  	getInfo() {
	  		//
	  	},
	  	pageChange(val) {
	        this.currentPage = val;
	        this.getInfo();
	    },
	    confirm(){
	  		// swal({
		   //      title: "",
		   //      text: "确定进行管理权限配置?",
		   //      type: "warning",
		   //      showCancelButton: true,
		   //      confirmButtonColor: "#DD6B55",
		   //      confirmButtonText: "是",
		   //      cancelButtonText: "否",
		   //      closeOnConfirm: true,
		   //      html: false
		   //  }, function(){
		        
		   //  })  
	    }
	  },
	  mounted:function() {
	  	
	  }
	}
</script>
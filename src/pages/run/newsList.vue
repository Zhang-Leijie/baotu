<template>
	<div>
		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item>资讯专区管理</el-breadcrumb-item>
		</el-breadcrumb>
		<div style="margin-top:10px;margin-bottom:10px;">
			<router-link :to="{name:'shop-run-newsadd'}">
				<el-button type="primary" class="marginBtn">新增</el-button>
			</router-link>
			<div style="clear:both"></div>
		</div>
		<div class="tableBox">
			<el-table :data="tableData" border style="width: 100%;font-size:12px;" @sort-change="sortChange">
			    <el-table-column prop="id" label="序号"></el-table-column>
			    <el-table-column prop="appId" label="所属appId"></el-table-column>
			    <el-table-column prop="title" label="标题"></el-table-column>
			    <el-table-column prop="browseNum" label="阅读数" sortable="custom" ></el-table-column>
			    <el-table-column prop="commentNum" label="评论数" sortable="custom"></el-table-column> 
			    <el-table-column label="资讯图标">
			    	<template scope="scope">
			    		<img :src="scope.row.icon">
			    	</template>
			    </el-table-column>  
			    <el-table-column prop="created" label="发布时间" sortable="custom">
			    	<template scope="scope">
			    		<span>{{scope.row.created?formatDate(scope.row.created):''}}</span>
			    	</template>
			    </el-table-column>
			    <el-table-column label="操作">
			      <template scope="scope">
		      		<el-button type="text" size="small">
						<a :href="scope.row.link">查看评论</a>
		      		</el-button>
			        <el-button type="text" size="small" @click="deleteNews(scope.row)">删除</el-button>
			      </template>
			    </el-table-column>
			</el-table>
			<el-pagination v-if="total" @current-change="pageChange" :current-page="currentPage" :page-size="pageSize" layout="total , prev, pager, next, jumper" :total='total' style="margin:20px auto;text-align:center"></el-pagination>
		</div>
	</div>
</template>
<script>
import { autoApi } from '@/ajax/post.js'

	export default {
	  data() {
	    return {
	      total: null,
	      searchName: '',
	      tableData: [],
	      currentPage: 1,
	      pageSize: 10,
	      sortCol: "TIME",						//默认按照时间排序
	      sortType: false
		}
	  },
	  methods: {
	  	formatDate(time){
			  var   x = (time - 0) * 1000

			  var   now = new Date(x) 
			  var   year = now.getFullYear();     
			  var   month = "0" + (now.getMonth()+1);     
			  var   date = "0" +(now.getDate());   
			  var   hour = "0" +now.getHours();
			  var   min =  "0" +now.getMinutes();
			  return   year+"-"+month.substr(-2)+"-"+date.substr(-2)+'   '+ hour.substr(-2) +':'+min.substr(-2)
			},

	  	getInfo() {
	  		let payload = {
			    page: this.currentPage,			// 页数
			    pageSize: this.pageSize,			// 每页显示条数
			    sortCol: this.sortCol,			// 排序列名
			    sortType: this.sortType			// 排序类型：false-降序、ture-升序
			}
			payload = JSON.stringify(payload);
	  		autoApi({
	   			action: 'article_list',
	   			version: '1.0',
	   			payload: payload, 						
	   			client: 2,
	   		},window.localStorage.getItem('token')).then((res)=> {
	   			if (res.code == 0) {
	   				if(res.attach.list[0]) {
	   					this.tableData = res.attach.list;
	   					this.total = res.attach.total;
	   				}
       			}
	   		})
	  	},
	  	pageChange(val) {
	        this.currentPage = val;
	        this.getInfo();
	    },
	    sortChange(val) {
	    	val.order == "ascending"?this.sortType = true:this.sortType = false;
	    	
	    	if (val.prop == "browseNum") {
	    		this.sortCol = "BROWSE_NUM";
	    	}
	    	else if (val.prop == "commentNum") {
	    		this.sortCol = "COMMENT_NUM";
	    	}
	    	else if (val.prop == "created") {
	    		this.sortCol = "TIME";
	    	}
	        this.getInfo();
	    },
	    deleteNews(row) {
	    	this.$confirm('此操作将永久删除该条, 是否继续?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
	        	let payload = {
	        		id: row.id
	        	}
	        	payload = JSON.stringify(payload);
	    		autoApi({
		   			action: 'article_delete',
		   			version: '1.0',
		   			payload: payload
		   		},window.localStorage.getItem('token')).then((res)=> {
		   			if (res.code == 0) {
		   				this.getInfo();
	       			}
		   		})
	        }).catch(() => {
	          this.$message({
	            type: 'info',
	            message: '已取消删除'
	          });          
	        });   	
	    }
	  },
	  mounted() {
	  	this.getInfo();
	  }
	}
</script>
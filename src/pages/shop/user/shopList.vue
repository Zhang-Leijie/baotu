<template>
	<div class="shopList">
		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item>商家账号管理</el-breadcrumb-item>
		</el-breadcrumb>

		<div class="toolBar">
			<div class="btnBox">
				<router-link :to="{name:'shop-shop-add'}">
				<el-button type="primary" class="marginBtn">新增</el-button>
			</router-link>
			</div>
			<div class="searchBox">
				<el-input icon="search" v-model="searchName" placeholder="请输入Name" :on-icon-click="search" style="width:240px"></el-input>
				<el-input icon="search" v-model="searchId" placeholder="请输入Id" :on-icon-click="search" style="width:240px"></el-input>
			</div>
		</div>

		<div class="tableBox">
			<el-table
			    :data="tableData"
			    border
			    style="width: 100%;font-size:12px;">
			    <el-table-column prop="tid" label="商户ID"></el-table-column>
			    <el-table-column prop="name" label="商家名"></el-table-column>
			    <el-table-column prop="teamDepth" label="最大团队层级"></el-table-column>
			    <el-table-column prop="regionName" label="行政区划名称"></el-table-column>
			    <el-table-column prop="licenseFace" label="营业执照">
			    	<template scope="scope">
		            	<el-popover ref="popoverPic" trigger="click" placement="left" width="500px">
		            	    <img :src="scope.row.licenseFace" class="bre"  slot="reference" style="width: 80px;">
	                    	<img :src='scope.row.licenseFace' style="width: 475px;">
	                	</el-popover>
	                	<el-popover ref="popoverPic" trigger="click" placement="left" width="500px">
		            	    <img :src="scope.row.licenseBack" class="bre"  slot="reference" style="width: 80px;">
	                    	<img :src='scope.row.licenseBack' style="width: 475px;">
	                	</el-popover>
			    	</template>
			    </el-table-column>
			    <el-table-column label="注册时间">
			    	<template scope="scope">
			    		<span>{{formatDate(scope.row.created)}}</span>
			    	</template>
			    </el-table-column>
			    <el-table-column prop="timeLastChange" label="最近修改时间">
			    	<template scope="scope">
			    		<span>{{formatDate(scope.row.updated)}}</span>
			    	</template>
			    </el-table-column>
			    <el-table-column label="操作">
			      <template scope="scope">
		      		<el-button type="text" size="small">
						<router-link :to="{name:'shop-shop-edit',query:{id:scope.row.tid}}">
			      			编辑
			      		</router-link>
		      		</el-button>
			        <el-button type="text" size="small">禁用</el-button>
			        <el-button type="text" size="small">启用</el-button>
			        <el-button type="text" size="small">轮播图</el-button>
			        <el-button type="text" size="small">删除</el-button>
			      </template>
			    </el-table-column>
			</el-table>

			<el-pagination v-if="pageCount"
		      @current-change="pageChange"
		      :current-page="currentPage"
		      :page-size="pageSize"
		      layout="total , prev, pager, next, jumper"
		      :total='pageCount'
		      style="margin:20px auto;text-align:center">
		    </el-pagination>

		</div>
	</div>
</template>
<script>
import { autoApi,commonApi } from '@/ajax/post.js'

export default {
	  data() {
	    return {
	      searchName: null,
	      searchId: null,
	      tableData:[
	      	// {index:1,account:'管理员',appname:'商家名称', license:'111111111', timeB:'2015-09-26 08:50:08',timeE:'2015-09-26 08:50:08',state:'正常'}
	      ],
	      pageCount: null,
	      currentPage: 1,
	      pageSize: 10
		}
	  },
	  methods: {
	  	formatDate(time){
		  var   x = (time - 0) * 1000
		  var   now = new Date(x) 
		  var   year = now.getFullYear();     
		  var   month = "0" + (now.getMonth()+1);     
		  var   date = "0" + (now.getDate());   
		  var   hour = "0" + now.getHours();
		  var   min =  "0" + now.getMinutes();
		  return   year + "-" + month.substr(-2) + "-" + date.substr(-2) + ' ' + hour.substr(-2) + ':' + min.substr(-2)
		},

	  	getInfo() {
  			let tenantSearcher = {
  				page: this.currentPage,
  				pageSize: this.pageSize,
  			};

  			if (this.searchId) {
  				tenantSearcher.tid = this.searchId;
  			}

  			if (this.searchName) {
  				tenantSearcher.name = this.searchName;
  			}

  			tenantSearcher = JSON.stringify(tenantSearcher);

	  		autoApi({
	   			action: 'tenant_list',
	   			version: '1.0',
	   			tenantSearcher: tenantSearcher,
	   			client: 2
	   		},window.localStorage.getItem('token')).then((res)=> {
	   			if (res.code == 0) {
	   				this.tableData = res.attach.list;
	   				this.pageCount = res.attach.total;
	   				// this.$message({
			     //        message: '修改的设置已保存',
			     //        type: 'success'
			     //    });
       			}
	   		})
	  	},

	  	pageChange(val) {
	        this.getInfo(); 
	    },

	    search() {
	    	this.getInfo(); 
	    }
	  },
	  mounted() {
	  	this.getInfo();
	  }
	}
</script>

<style lang="less">
.shopList {
	.toolBar {
		width: 100%;
		overflow: hidden;
		.searchBox, .btnBox {
			float: right;
		}
	}
	.tableBox {
		margin-top: 20px;
	}
}
</style>
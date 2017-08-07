<template>
	<div class="tenantList">
		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item>商家列表</el-breadcrumb-item>
		</el-breadcrumb>

		<div style="margin-top:20px;">
			<el-table :data="tableData" border style="width: 100%;font-size:12px;">
			    <el-table-column prop="tid" label="商户ID"></el-table-column>
			    <el-table-column prop="name" label="商户名"></el-table-column>
			    <el-table-column prop="appId" label="平台ID"></el-table-column>
			    <el-table-column prop="appName" label="平台名字"></el-table-column>
			    <el-table-column prop="jianJieId" label="简捷Id"></el-table-column>
			    <el-table-column prop="teamDepth" label="团队层级"></el-table-column>
			    <el-table-column prop="regionName" label="行政区划"></el-table-column>
			    <el-table-column label="营业执照">
			    	<template scope="scope">
		            	<el-popover ref="popoverPic" trigger="hover" placement="left" width="500px">
		            	    <img :src="scope.row.licenseFace" class="bre"  slot="reference" style="width: 80px;">
	                    	<img :src='scope.row.licenseFace' style="width: 475px;">
	                	</el-popover>
	                	<el-popover ref="popoverPic" trigger="hover" placement="left" width="500px">
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
			    <el-table-column label="最近修改时间">
			    	<template scope="scope">
			    		<span>{{formatDate(scope.row.updated)}}</span>
			    	</template>
			    </el-table-column>
			    <el-table-column label="操作">
			    	<template scope="scope">
			    		<el-button type="text" size="small">
			    			<router-link :to="{name:'tenant-edit',query:{tid:scope.row.tid}}">
			      			设置
				      		</router-link>
			    		</el-button>
			    	</template>
			    </el-table-column>
			</el-table>
			<el-pagination v-if="total" @current-change="pageChange" :current-page="currentPage" :page-size="pageSize" layout="total , prev, pager, next, jumper" :total='total' style="margin:20px auto;text-align:center"></el-pagination>
		</div>
	</div>
</template>
<script>
import { masterApi } from '@/ajax/post.js'

	export default {
	  data() {
	    return {
	      currentPage: 1,
	      total: null,
	      pageSize: 10,
	      tableData: [],
		}
	  },
	  methods: {
	  	formatDate(time) {
		  var   x = (time - 0) * 1000;
		  
		  var   now = new Date(x) 
		  var   year = now.getFullYear();     
		  var   month = "0" + (now.getMonth()+1);     
		  var   date = "0" +(now.getDate());   
		  var   hour = "0" +now.getHours();
		  var   min =  "0" +now.getMinutes();

		  return   year+"-"+month.substr(-2)+"-"+date.substr(-2)+'   '+ hour.substr(-2) +':'+min.substr(-2)
		},

	  	getInfo() {
	  		let tenantSearcher = {
	  			page: this.currentPage,
	  			pageSize: this.pageSize,
	  			tid: this.tidSearch,
	  			name: this.nameSearch,
	  			appId: this.appIdSearch,
	  			// sortCol: null
	  			asc: true
	  		}
	  		tenantSearcher = JSON.stringify(tenantSearcher);
	  		masterApi({
	   			action: 'tenant_list',
	   			version: '1.0',
	   			tenantSearcher: tenantSearcher
	   		},window.localStorage.getItem('token')).then((res)=> {
	   			if (res.code == 0) {
	   				this.tableData = res.attach.list;
	   				this.total = res.attach.total;
       			}
	   		})
	  	},

	  	pageChange(pg) {
	  		this.currentPage = pg;
	        this.getInfo(); 
	    },
	  },
	  mounted() {
	  	this.getInfo();
	  }
	}
</script>
<style lang="less">
.tenantList{
	.toolBar{
		width: 100%;
		overflow: hidden;
		.toolBarR {
			float: right;
		}
	}
}
</style>
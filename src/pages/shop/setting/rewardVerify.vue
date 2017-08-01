<template>
	<div>
		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item>规模奖励审核</el-breadcrumb-item>
		</el-breadcrumb>
		<div style="margin-top:10px;margin-bottom:10px;">
			<router-link :to="{name:'shop-role-add'}">
				<el-button type="primary" class="marginBtn">新增</el-button>
			</router-link>
			<div style="clear:both"></div>
		</div>
		<div style="margin-top:20px;">
			<el-table :data="tableData" border style="width: 100%;font-size:12px;">
	    		<el-table-column prop="employeeId" label="雇员号"></el-table-column>
	    		<el-table-column prop="name" label="名字"></el-table-column>
	    		<el-table-column label="总保费">
	    			<template scope="scope">
	    				<span>{{ scope.row.quota }}元</span>
	    			</template>
	    		</el-table-column>
	    		<el-table-column label="统计总保费">
	    			<template scope="scope">
	    				<span>{{ scope.row.SCQuota }}元</span>
	    			</template>
	    		</el-table-column>
	    		<el-table-column label="奖励总保费">
	    			<template scope="scope">
	    				<span>{{ scope.row.RCQuota }}元</span>
	    			</template>
	    		</el-table-column>
	    		<el-table-column label="商业险比例">
	    			<template scope="scope">
	    				<span>{{ scope.row.CMRate / 10}}%</span>
	    			</template>
	    		</el-table-column>
	    		<el-table-column label="交强险比例">
	    			<template scope="scope">
	    				<span>{{ scope.row.CORate / 10}}%</span>
	    			</template>
	    		</el-table-column>
	    		<el-table-column label="审核状态">
	    			<template scope="scope">
	    				<span>{{ scope.row.state == 'AUDIT'?'待审核':(scope.row.state == 'AGREE'?'同意':(scope.row.state == 'REJECT'?'拒绝':''))}}</span>
	    			</template>
	    		</el-table-column>
	    		<el-table-column label="操作">
	    			<template scope="scope">		
			      		<el-button type="text" size="small">
							<router-link :to="{name:'demo-route',query:{id:scope.row.id}}">
				      			查看
				      		</router-link>
			      		</el-button>
				    </template>
	    		</el-table-column>
	    	</el-table>

			<el-pagination @current-change="pageChange" :current-page="currentPage" :page-size="pageSize" layout="prev, pager, next, jumper" :total="pageCount" v-if="pageCount"></el-pagination>
		</div>
	</div>
</template>
<script>
import { autoApi } from '@/ajax/post.js'
export default {
	  data() {
	    return {
	      tableData: [],
	      currentPage: 1,
 		  pageSize: 10,
 		  pageCount: null,
		}
	  },
	  methods: {
	  	//时间戳格式化
  		add0(m) { return m<10?'0'+m:m },
	    getFormTime(shijianchuo) {
	        //shijianchuo是整数，否则要parseInt转换
	        var time = new Date(shijianchuo);
	        var y = time.getFullYear();
	        var m = time.getMonth()+1;
	        var d = time.getDate();
	        var h = time.getHours();
	        var mm = time.getMinutes();
	        var s = time.getSeconds();
	        return y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s);
	    },
	    getInfo() {
	    	let payload = {
	    		 	page: this.currentPage,
				    pageSize: this.pageSize,
				    employeeId: window.localStorage.getItem('employeeId')
	    	}
	    	payload = JSON.stringify(payload);
	    	autoApi({
	   			action: 'bonus_scale_audits',
	   			version: '1.0',
	   			payload: payload
	   		},window.localStorage.getItem('token')).then((res)=> {
	   			if (res.code == 0) {
	   				if(res.attach.list) {
	   					this.tableData = res.attach.list;
	   					this.pageCount = res.attach.total;
	   				}
       			}
	   		})
	    },
	  	//分页逻辑
	    pageChange(page) {
	    	this.currentPage = page;
	    	this.getInfo();
	    }
	  },
	  mounted() {
	  	this.getInfo();
	  }
}
</script>
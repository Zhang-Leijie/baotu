<template>
	<div class="ordersList">
		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item>列表</el-breadcrumb-item>
		</el-breadcrumb>

		<div class="toolBar">
			<div class="toolBarR">
				<el-select v-model="search.state" placeholder="请选择" style="width:150px;">
				    <el-option v-for="item in stateList" :label="item.label" :value="item.value"></el-option>
				</el-select>
				<el-button type="primary" @click="searchState">搜索</el-button>
				<el-button @click="addDemo">详情页测试</el-button>
			</div>
		</div>

		<div style="margin-top:20px;">
			<el-table :data="formData" border style="width: 100%;font-size:12px;">
			    <el-table-column prop="orders" label=""></el-table-column>
			    <el-table-column label="">
			    	<template scope="scope">
			    		<span>{{scope.row?scope.row:''}}</span>
			    	</template>
			    </el-table-column>
			    <el-table-column label="操作">
			    	<template scope="scope">
			    		<el-button type="text" size="small">
			    			<router-link :to="{name:'shop-order-autoInsuranceOrderDetail',query:{id: scope.row.id}}">
			      			查看详情
				      		</router-link>
			    		</el-button>
			    	</template>
			    </el-table-column>
			</el-table>
			<el-pagination v-if="pageCount" @current-change="pageChange" :current-page="currentPage" :page-size="pageSize" layout="total , prev, pager, next, jumper" :page-count='pageCount' style="margin:20px auto;text-align:center"></el-pagination>
		</div>
	</div>
</template>
<script>
import { autoApi } from '@/ajax/post.js'

	export default {
	  data() {
	    return {
	      dialogFormVisible: false,	
	      currentPage: 1,
	      pageCount: null,
	      pageSize: 10,
	      tableData: [],
	      formData: [],
	      search: {
	      	state: null
	      },
	      stateList: [
	      	  {
		      	value: "INSURE",
		      	label: "核保"
		      },
		      {
		      	value: "QUOTE_SUCCESS",
		      	label: "未核保"
		      },
		      {
		      	value: "INSURE_FAILURE",
		      	label: "核保失败"
		      },
		      {
		      	value: "INSURING",
		      	label: "核保中"
		      },
		      {
		      	value: "ISSUE",
		      	label: "出单"
		      },
		      {
		      	value: "INSURE_SUCCESS",
		      	label: "待预约"
		      },
		      {
		      	value: "ISSUE_SUCCES",
		      	label: "待出单"
		      },
		      {
		      	value: "ISSUED",
		      	label: "已出单"
		      }
	      ]
		}
	  },
	  methods: {
	  	formatDate(time) {
		  var   x = (time - 0) * 1000;
		  
		  var   now = new Date(x) 
		  var   year = now.getFullYear();     
		  var   month = "0" + (now.getMonth()+1);     
		  var   date = "0" + (now.getDate());   
		  var   hour = "0" + now.getHours();
		  var   min =  "0" + now.getMinutes();

		  return   year+"-"+month.substr(-2)+"-"+date.substr(-2)+'   '+ hour.substr(-2) +':'+min.substr(-2)
		},

	  	getInfo() {
	  		if (this.search.state) {
	  			var vehicleOrderSearcher = {
		  			page: null,
		  			pageSize: null,
		  			// uid: null,	保途端
		  			state: null
		  		};
		  		vehicleOrderSearcher.page = this.currentPage;
		  		vehicleOrderSearcher.pageSize = this.pageSize;
		  		vehicleOrderSearcher.state = this.search.state;
	  		}
	  		else
	  		{
	  			var vehicleOrderSearcher = {
		  			page: null,
		  			pageSize: null,
		  			// uid: null,	保途端
		  			employeeId: window.localStorage.getItem('employeeId')
		  		};
		  		vehicleOrderSearcher.page = this.currentPage;
		  		vehicleOrderSearcher.pageSize = this.pageSize;
	  		}
	  			
	  		vehicleOrderSearcher = JSON.stringify(vehicleOrderSearcher)
	  		autoApi({
	   			action: 'vehicle_orders',
	   			version: '1.0',
		  		employeeId: window.localStorage.getItem('employeeId'),
	   			vehicleOrderSearcher: vehicleOrderSearcher
	   		},window.localStorage.getItem('token')).then((res)=> {
	   			if (res.code == 0) {
	   				if (res.attach) {
	   					this.tableData = res.attach;
	   					this.length = res.attach.length;
	   					this.pageCount = parseInt((this.length - 1) / this.pageSize) + 1;
	   					this.showPage();
	   				}
       			}
	   		})
	  	},

	  	searchState() {
	  		this.getInfo();
	  	},
 
	  	addDemo() {
	  		 router.push({
	  		 	name: "shop-order-autoInsuranceOrderDetail"
	  		 })
	  	},

	  	pageChange(pg) {
	  		this.currentPage = pg;
	        this.getInfo(); 
	    },

	    showPage() {
	  		this.formData = [];
	  		if(this.length * this.pageCount < this.pageSize * this.currentPage)
	  		{
	  			for (let i = 0; i < this.tableData.length; i++) {
	  				if (i >= (this.currentPage - 1) * this.pageSize) {
	  					this.formData.push(this.tableData[i])
	  				}
	  			}
	  		}
	  		else
	  		{
	  			for (let i = 0; i < this.tableData.length; i++) {
	  				if (i >= (this.currentPage - 1) * this.pageSize && i < this.currentPage * this.pageSize) {
	  					this.formData.push(this.tableData[i])
	  				}
	  			}
	  		}
	  	}
	  },
	  mounted() {
	  	this.getInfo();
	  }
	}
</script>
<style lang="less">
.ordersList{
	.toolBar{
		width: 100%;
		overflow: hidden;
		.toolBarR {
			float: right;
		}
	}
}
</style>
<template>
	<div class="policyListBody">
		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item>保单列表</el-breadcrumb-item>
		</el-breadcrumb>

		<div class="toolBar">
			<div class="searchBox">
				<el-select v-model="search.type" @change="searchIt" style="width:160px">
					<el-option v-for="item in types" :label="item.label" :value="item.value" :key="item.value"></el-option>
				</el-select>
				<el-input icon="search" v-model="search.company" placeholder="搜索保险公司" :on-icon-click="searchIt" style="width:160px"></el-input>
				<el-input icon="search" v-model="search.sale" placeholder="搜索业务员" :on-icon-click="searchIt" style="width:160px"></el-input>
				<el-button @click="reset">重置</el-button>
			</div>
		</div>

		<div class="tableBox">
			<el-table :data="tableData" border style="width: 100%;font-size:12px;">
			    <!-- <el-table-column prop="tid" label="序号"></el-table-column> -->
			    <el-table-column prop="_id" label="订单编号"></el-table-column>
			    <el-table-column prop="owner" label="车主"></el-table-column>
			    <el-table-column prop="license" label="车牌"></el-table-column>
			    <el-table-column prop="salesman" label="业务员"></el-table-column>
			    <el-table-column prop="insurerName" label="保险公司"></el-table-column>
			    <el-table-column label="签单日期">
			    	<template scope="scope">
			    		<span>{{formatDate(scope.row.issuanceTime)}}</span>
			    	</template>
			    </el-table-column>
			    <el-table-column label="配送方式">
			    	<template scope="scope">
			    		<span>{{scope.row.deliveryInfo?reDelivery(scope.row.deliveryInfo.type):''}}</span>
			    	</template>
			    </el-table-column>
			    <el-table-column prop="" label="礼品"></el-table-column>
			    <el-table-column prop="" label="单证状态"></el-table-column>
			    
			    <el-table-column label="操作">
			      <template scope="scope">
		      		<el-button type="text" size="small">
						<router-link :to="{name:'shop-order-policyDetail',query:{id:scope.row._id}}">查看</router-link>
		      		</el-button>
			      </template>
			    </el-table-column>
			</el-table>

			<el-pagination v-if="total" @current-change="pageChange" :current-page="currentPage" :page-size="pageSize" layout="total , prev, pager, next, jumper" :total='total' style="margin:20px auto;text-align:center"></el-pagination>

			<el-button @click="sync" type="primary" style="margin:20px auto;text-align:left;">同步保单</el-button>
		</div>
	</div>
</template>
<script>
import { autoApi } from '@/ajax/post.js'

export default {
	  data() {
	    return {
	      search: {
	      	company: null,
	      	sale: null,
	      	type: null,
	      },
	      types: [{
	      	value: 'EXTERNAL',
	      	label: '外部保单',
	      },
	      {
	      	value: 'TENANT_SELF',
	      	label: '自售保单',
	      },
	      {
	      	value: 'TENANT_OTHER',
	      	label: '挂售保单',
	      }],
	      tableData:[],
	      total: null,
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
  			let payload = {
  				page: this.currentPage,
  				pageSize: this.pageSize,
	   			employeeId: window.localStorage.getItem('employeeId'),
	   			type: this.search.type?this.search.type:null,
	   			salesman: this.search.sale?this.search.sale:null,
	   			// type: this.search.type?this.search.type:null,
  			};
  			
	  		if (this.search.sale) {
	  			payload.salesman = this.search.sale;	
	  		}

  			payload = JSON.stringify(payload);

	  		autoApi({
	   			action: 'vehicle_policies',
	   			version: '1.0',
	   			payload: payload
	   		},window.localStorage.getItem('token')).then((res)=> {
	   			if (res.code == 0) {
	   				this.tableData = res.attach.list;
	   				this.total = res.attach.total;
	   				// this.$message({
			     //        message: '修改的设置已保存',
			     //        type: 'success'
			     //    });
       			}
	   		})
	  	},

	  	pageChange(pg) {
	  		this.currentPage = pg;
	        this.getInfo(); 
	    },

	    searchIt() {
	    	this.getInfo(); 
	    },

	    reset() {
	    	this.search.type = null;
	    	this.search.sale = null;
	    	this.search.company = null;
	    	this.getInfo();
	    },

	    deleteShop(row) {
	    	this.$confirm('此操作将永久删除该系数, 是否继续?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
	         	 this.$message({
		            type: 'info',
		            message: 'API未接入,因此操作未执行'
		          });   
	        }).catch(() => {
	          this.$message({
	            type: 'info',
	            message: '已取消删除'
	          });          
	        });   	
	    },

	    sync() {
	    	let payload = {
	    		employeeId: window.localStorage.getItem('employeeId')
	    	}
	    	payload = JSON.stringify(payload);
	    	autoApi({
	   			action: 'jian_jie_fetch',
	   			version: '1.0',
	   			payload: payload,
	   		},window.localStorage.getItem('token')).then((res)=> {
	   			if (res.code == 0) {
	   				this.$message({
	   					message: '保单已同步',
	   					type: 'success'
	   				});
	   				this.getInfo();
       			}
	   		})
	    },

	    reDelivery(val) {
	    	switch(val) {
	    		case 'EXPRESS':
	    			return '快递'
	    			break;
	    		case 'ACTIVE_PICK':
	    			return '网点自取'
	    			break;
	    		case 'DOT_DISPATCH':
	    			return  '网点配送'
	    			break;
	    		default:
	    			return val
	    			break;
	    	}
	    }
	  },
	  mounted() {
	  	this.getInfo();
	  }
	}
</script>

<style lang="less">
.policyListBody {
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
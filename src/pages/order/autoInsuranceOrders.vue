<template>
	<div class="autoInsuranceOrdersBody">
		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item>列表</el-breadcrumb-item>
		</el-breadcrumb>

		<div class="toolBar">
			<div class="toolBarR">
				<el-button @click="reSetSearch">重置</el-button>
				<el-select v-model="search.state" placeholder="请选择" style="width:150px;">
				    <el-option v-for="item in stateList" :label="item.label" :value="item.value" :key="item.value"></el-option>
				</el-select>
				<el-button type="primary" @click="searchState">搜索</el-button>
			</div>
		</div>

		<div class="tableBox">
			<el-table :data="tableData" border style="width: 100%;font-size:12px;">
			    <el-table-column prop="id" label="保单id"></el-table-column>
			    <el-table-column label="订单时间">
			    	<template scope="scope">
			    		<span>{{formatDate(scope.row.created)}}</span>
			    	</template>
			    </el-table-column>
			    <el-table-column prop="price" label="订单金额"></el-table-column>
			    <el-table-column prop="userName" label="业务员"></el-table-column>
			    <el-table-column label="订单状态">
			    	<template scope="scope">
			    		<span>{{ showState(scope.row.state) }}</span>
			    	</template>
			    </el-table-column>
			    <el-table-column label="操作">
			    	<template scope="scope">
			    		<el-button type="text" size="small">
			    			<router-link :to="{name:'shop-order-autoInsuranceOrderDetail',query:{id: scope.row.id}}">查看详情</router-link>
			    		</el-button>
			    	</template>
			    </el-table-column>
			</el-table>
			<el-pagination v-if="total" @current-change="pageChange" :current-page="currentPage" :page-size="pageSize" layout="total , prev, pager, next, jumper" :total='total' style="margin:20px auto;text-align:center"></el-pagination>
		</div>
	</div>
</template>
<script>
import {
	autoApi
} from '@/ajax/post.js'

export default {
	data() {
		return {
			currentPage: 1,
			total: 0,
			pageSize: 10,
			tableData: [],
			search: {
				state: null,
			},
			stateList: [{
				value: "INSURE",
				label: "核保"
			}, {
				value: "SYSTEM_ERROR",
				label: "系统错误"
			}, {
				value: "QUOTING",
				label: "报价中"
			}, {
				value: "QUOTE_SUCCESS",
				label: "报价成功"
			}, {
				value: "INSURE_FAILURE",
				label: "核保失败"
			}, {
				value: "QUOTE_FAILURE",
				label: "报价失败"
			}, {
				value: "INSURING",
				label: "核保中"
			}, {
				value: "ISSUE",
				label: "出单"
			}, {
				value: "INSURE_SUCCESS",
				label: "核保成功"
			}, {
				value: "ISSUE_SUCCES",
				label: "待出单"
			}, {
				value: "ISSUE_APPOINTED",
				label: "已预约"
			}, {
				value: "ISSUED",
				label: "已出单"
			}]
		}
	},
	methods: {
		formatDate(time) {
			var x = (time - 0) * 1000;

			var now = new Date(x)
			var year = now.getFullYear();
			var month = "0" + (now.getMonth() + 1);
			var date = "0" + (now.getDate());
			var hour = "0" + now.getHours();
			var min = "0" + now.getMinutes();

			return year + "-" + month.substr(-2) + "-" + date.substr(-2) + '   ' + hour.substr(-2) + ':' + min.substr(-2)
		},

		getInfo() {
			if (this.search.state) {
				var payload = {
					page: this.currentPage,
					pageSize: this.pageSize,
					state: this.search.state,
					employeeId: window.localStorage.getItem('employeeId')
				};
			} else {
				var payload = {
					page: this.currentPage,
					pageSize: this.pageSize,
					employeeId: window.localStorage.getItem('employeeId')
				};
			}

			payload = JSON.stringify(payload);
			autoApi({
				action: 'vehicle_orders',
				version: '1.0',
				employeeId: window.localStorage.getItem('employeeId'),
				payload: payload
			}, window.localStorage.getItem('token')).then((res) => {
				if (res.code == 0) {
					if (res.attach) {
						this.tableData = res.attach.list;
						this.total = res.attach.total;
					}
				}
			})
		},

		searchState() {
			this.getInfo();
		},

		reSetSearch() {
			this.search.state = null;
			this.getInfo();
		},

		pageChange(pg) {
			this.currentPage = pg;
			this.getInfo();
		},

		showState(state) {
			for (let i = 0; i < this.stateList.length; i++) {
				if (this.stateList[i].value == state) {
					return this.stateList[i].label;
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
.autoInsuranceOrdersBody{
	.toolBar{
		width: 100%;
		overflow: hidden;
		.toolBarR {
			float: right;
		}
	}
}
</style>
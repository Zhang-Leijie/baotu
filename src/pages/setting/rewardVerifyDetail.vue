<template>
	<div class="rewardVerifyDetailBody">
		<el-breadcrumb separator="/">
			<el-breadcrumb-item>
				<router-link :to="{name:'shop-set-rewardVerify'}">规模奖励审核</router-link>
			</el-breadcrumb-item>
		  	<el-breadcrumb-item>业务流水</el-breadcrumb-item>
		</el-breadcrumb>

		<div class="tableBox">
			<el-table :data="tableData" border style="width: 100%;font-size:12px;">
	    		<el-table-column prop="employeeId" label="序号"></el-table-column>
	    		<el-table-column prop="name" label="队员姓名"></el-table-column>
	    		<el-table-column label="成交时间">
	    			<template scope="scope">
	    				<span>{{ getFormTime(scope.row.time) }}</span>
	    			</template>
	    		</el-table-column>
	    		<el-table-column label="成交金额">
	    			<template scope="scope">
	    				<span>{{ scope.row.quota }}元</span>
	    			</template>
	    		</el-table-column>
	    		<!-- <el-table-column label="订单状态">
	    			<template scope="scope">
	    				<span>{{ showType(scope.row.bonusType) }}</span>
	    			</template>
	    		</el-table-column>
	    		<el-table-column label="车险类型">
	    			<template scope="scope">
	    				<span>{{ showType(scope.row.bonusType) }}</span>
	    			</template>
	    		</el-table-column> -->
	    		<el-table-column label="车辆种类">
	    			<template scope="scope">
	    				<span>{{ showType(scope.row.bonusType) }}</span>
	    			</template>
	    		</el-table-column>
	    	</el-table>

			<el-pagination @current-change="pageChange" :current-page="currentPage" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="length" v-if="length"></el-pagination>
		</div>
	</div>
</template>
<script>
import { autoApi } from '@/ajax/post.js'
export default {
	data() {
		return {
			tableData: [],
			pageCount: null,
			pageSize: 10,
			currentPage: 1,
			length: 0
		}
	},
	methods: {
		//时间戳格式化
		add0(m) {
			return m < 10 ? '0' + m : m
		},
		getFormTime(shijianchuo) {
			//shijianchuo是整数，否则要parseInt转换
			var time = new Date(shijianchuo);
			var y = time.getFullYear();
			var m = time.getMonth() + 1;
			var d = time.getDate();
			var h = time.getHours();
			var mm = time.getMinutes();
			var s = time.getSeconds();
			return y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s);
		},

		getInfo(id) {
			let payload = {
				key: id
			}
			payload = JSON.stringify(payload);
			autoApi({
				action: 'bonus_scale_details',
				version: '1.0',
				payload: payload
			}, window.localStorage.getItem('token')).then((res) => {
				if (res.code == 0) {
					if (res.attach && res.attach.length > 0) {
						this.tableData = res.attach;
						this.length = res.attach.length;
						this.pageCount = parseInt((this.length - 1) / this.pageSize) + 1;
						this.showPage();
					}
				}
			})
		},

		showPage() {
			this.tableData = [];
			if (this.length * this.pageCount < this.pageSize * this.currentPage) {
				for (let i = 0; i < this.tableData.length; i++) {
					if (i >= (this.currentPage - 1) * this.pageSize) {
						this.tableData.push(this.tableData[i])
					}
				}
			} else {
				for (let i = 0; i < this.tableData.length; i++) {
					if (i >= (this.currentPage - 1) * this.pageSize && i < this.currentPage * this.pageSize) {
						this.tableData.push(this.tableData[i])
					}
				}
			}
		},

		//分页逻辑
		pageChange(pg) {
			this.currentPage = pg;
			this.showPage();
		},

		showType(value) {
			var bonusTypeList = [ //PC-营利客车，PT-营利货车，NPC-非营利客车，NPT-非营利货车，OTHER-其他
				{
					value: "PC",
					label: "营利客车",
				}, {
					value: "PT",
					label: "营利货车",
				}, {
					value: "NPC",
					label: "非营利客车",
				}, {
					value: "NPT",
					label: "非营利货车",
				}, {
					value: "OTHER",
					label: "其他",
				},
			]
			for (var i = 0; i < bonusTypeList.length; i++) {
				if (bonusTypeList[i].value == value) {
					return bonusTypeList[i].label;
				}
			}
		}
	},
	mounted() {
		if (this.$route.query.id) {
			this.getInfo(this.$route.query.id);
		}
	}
}
</script>
<style lang="less">
.rewardVerifyDetailBody {
	
}
</style>
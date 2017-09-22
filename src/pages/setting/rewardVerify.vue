<template>
	<div class="rewardVerifyBody">
		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item>规模奖励审核</el-breadcrumb-item>
		</el-breadcrumb>

		<div class="toptool">
			<el-select v-model="demo" placeholder="请选择">
			    <el-option v-for="item in options" :label="item.label" :value="item.value" :key="item.value"></el-option>
			</el-select>

			<div style="display:inline-block;margin:20px;"></div>
			
			<span>统计间隔: 月度</span>
			<!-- <el-radio class="radio" v-model="radio" label="1">月度</el-radio> -->
	  		<!-- <el-radio class="radio" v-model="radio" label="2">季度</el-radio> -->

	  		<el-date-picker v-model="demo" type="month" align="right" placeholder="选择日期范围"></el-date-picker>
		</div>

		<div class="tableBox">
			<el-table :data="tableData" border style="width: 100%;font-size:12px;">
	    		<el-table-column prop="name" label="团长"></el-table-column>
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
	    		<el-table-column label="商业险奖励比例">
	    			<template scope="scope">
	    				<span>{{ scope.row.CMRate / 10}}%</span>
	    			</template>
	    		</el-table-column>
	    		<el-table-column label="交强险奖励比例">
	    			<template scope="scope">
	    				<span>{{ scope.row.CORate / 10}}%</span>
	    			</template>
	    		</el-table-column>
	    		<el-table-column label="团队成员量"></el-table-column>
	    		<el-table-column label="规模保费总额">
	    			<template scope="scope">
	    				<span>{{ scope.row.quota }}元</span>
	    			</template>
	    		</el-table-column>
	    		<el-table-column label="处理状态">
	    			<template scope="scope">
	    				<span>{{ scope.row.state == 'AUDIT'?'待审核':(scope.row.state == 'AGREE'?'同意':(scope.row.state == 'REJECT'?'拒绝':''))}}</span>
	    			</template>
	    		</el-table-column>
	    		<el-table-column label="操作">
	    			<template scope="scope">
						<router-link :to="{name:'shop-set-rewardVerifyDetail',query:{id:scope.row.employeeId}}">
			      			查看流水
			      		</router-link>
			      		<el-button type="text" size="small" @click="checkThisOne(scope.row,true)">同意</el-button>
			      		<el-button type="text" size="small" @click="checkThisOne(scope.row,false)">拒绝</el-button>
		      		</el-button>
				    </template>
	    		</el-table-column>
	    	</el-table>

			<el-pagination @current-change="pageChange" :current-page="currentPage" :page-size="pageSize" layout="total, prev, pager, next, jumper" :total="total" v-if="total"></el-pagination>
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
			total: null,
			radio: '1',
			demo: null,
			options: [{
				label: '未处理',
				value: '1',
			}, {
				label: '已处理',
				value: '2',
			}],
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
			}, window.localStorage.getItem('token')).then((res) => {
				if (res.code == 0) {
					if (res.attach.list) {
						this.tableData = res.attach.list;
						this.total = res.attach.total;
					}
				}
			})
		},
		checkThisOne(row, agree) {
			let payload = {
				key: row.employeeId,
				agree: agree
			}
			payload = JSON.stringify(payload);
			autoApi({
				action: 'bonus_scale_audit',
				version: '1.0',
				payload: payload
			}, window.localStorage.getItem('token')).then((res) => {
				if (res.code == 0) {
					this.getInfo();
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
<style lang="less">
.rewardVerifyBody {
	.toptool {
		margin: 20px 0;
		float: right;	
		.labelSpan {
			display: inline-block;
			margin-left: 20px;
		}
	}
}
</style>
<template>
	<div class="policyListBody">
		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item>摄像头系统</el-breadcrumb-item>
		</el-breadcrumb>

		<div class="toolBar">
			<div class="searchBox">
				<el-date-picker v-model="search.timeRange" @change="searchIt" type="datetimerange" placeholder="选择时间范围"></el-date-picker>
				<el-select v-model="search.type" @change="searchIt" style="width:160px">
					<el-option v-for="item in types" :label="item.label" :value="item.value" :key="item.value"></el-option>
				</el-select>
				<el-select v-model="search.state" @change="searchIt" style="width:160px">
					<el-option v-for="item in states" :label="item.label" :value="item.value" :key="item.value"></el-option>
				</el-select>
			</div>
		</div>

		<div class="tableBox">
			<el-table :data="tableData" border style="width: 100%;font-size:12px;" :row-class-name="highlight">
			    <el-table-column prop="a" label="车牌号"></el-table-column>
			    <el-table-column prop="b" label="车主"></el-table-column>
			    <el-table-column prop="c" label="品牌型号"></el-table-column>
			    <el-table-column prop="d" label="上年承保公司"></el-table-column>
			    <el-table-column prop="e" label="商业险到期日"></el-table-column>
			    <el-table-column label="交强险到期日">
			    	<template scope="scope">
			    		<span>{{(scope.row.f)}}</span>
			    	</template>
			    </el-table-column>
			    <el-table-column label="到店时间">
			    	<template scope="scope">
			    		<span>{{(scope.row.g)}}</span>
			    	</template>
			    </el-table-column>
			    <el-table-column label="原报价业务员">
			    	<template scope="scope">
			    		<span>{{scope.row.h?scope.row.h:'无'}}</span>
			    	</template>
			    </el-table-column>
			    <el-table-column label="客户属性">
			    	<template scope="scope">
			    		<span>{{scope.row.i?'续保':'非续保'}}</span>
			    	</template>
			    </el-table-column>
			    <el-table-column label="分配状态">
			    	<template scope="scope">
			    		<span>{{scope.row.j?'已分配':'未分配'}}</span>
			    	</template>
			    </el-table-column>
			    <el-table-column label="操作">
			      <template scope="scope">
		      		<el-button type="text" size="small" @click="allot(scope.row)">分配</el-button>
			      </template>
			    </el-table-column>
			</el-table>

			<el-pagination v-if="total" @current-change="pageChange" :current-page="currentPage" :page-size="pageSize" layout="total , prev, pager, next, jumper" :total='total' style="margin:20px auto;text-align:center"></el-pagination>

			<div class="toolBarR">
				<el-upload class="avatar-uploader" action="" :show-file-list="false" :before-upload="importExcel">
			        <el-button @click="" type="primary">导入</el-button>
			    </el-upload>
			</div>

			<el-dialog title="分配" v-model="dialogVisible" size="tiny">
				<div class="contentBox">
					<el-radio-group v-model="sale">
					    <el-radio :label="item.label" v-for="item in sales" :key="item.label">{{item.name}}</el-radio>
					</el-radio-group>
				</div>
			  	<span slot="footer" class="dialog-footer">
			    	<el-button @click="dialogVisible = false">取 消</el-button>
			    	<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
			  	</span>
			</el-dialog>
		</div>
	</div>
</template>
<script>
import { autoApi } from '@/ajax/post.js'

var wb;//读取完成的数据
var rABS = false; //是否将文件读取为二进制字符串

export default {
	data() {
		return {
			search: {
				timeRange: null,
				type: null,
				state: null,
			},
			sale: null,
			types: [],
			states: [],
			sales: [],
			tableData: [],
			total: null,
			currentPage: 1,
			pageSize: 10,
			dialogVisible: false,
		}
	},
	methods: {
		formatDate(time) {
			var x = (time - 0) * 1000
			var now = new Date(x)
			var year = now.getFullYear();
			var month = "0" + (now.getMonth() + 1);
			var date = "0" + (now.getDate());
			var hour = "0" + now.getHours();
			var min = "0" + now.getMinutes();
			return year + "-" + month.substr(-2) + "-" + date.substr(-2) + ' ' + hour.substr(-2) + ':' + min.substr(-2)
		},

		init() {
			this.types = [{
				value: 'EXTERNAL',
				label: '续保',
			}, {
				value: 'TENANT_SELF',
				label: '非续保',
			}, {
				value: null,
				label: '全部',
			}];

			this.states = [{
				value: 'EXTERNAL',
				label: '未分配',
			}, {
				value: 'TENANT_SELF',
				label: '已分配',
			}, {
				value: null,
				label: '全部',
			}];
			this.sales = [{
				name: '业务员1',
				label: 1,
			}, {
				name: '业务员2',
				label: 2,
			}, {
				name: '业务员3',
				label: 3,
			}]
		},

		getInfo() {
			let payload = {

			};

			payload = JSON.stringify(payload);

			this.tableData = [{
				a: '浙A82T63',
				b: '毛建明',
				c: '宝马BMW',
				d: '人保车险',
				e: '2017-09-26',
				f: '2017-09-26',
				g: '2017-09-15  9：36',
				h: '毛建明',
				i: false,
				j: false
			}, {
				a: '浙A92T63',
				b: '汪乃平',
				c: '宝马BMW',
				d: '人保车险',
				e: '2017-09-26',
				f: '2017-09-26',
				g: '2017-09-15  9：36',
				h: null,
				i: false,
				j: false
			}]

			// autoApi({
			// 		action: 'vehicle_policies',
			// 		version: '1.0',
			// 		payload: payload
			// 	},window.localStorage.getItem('token')).then((res)=> {
			// 		if (res.code == 0) {
			// 			this.tableData = res.attach.list;
			// 			this.total = res.attach.total;
			// }
			// 	})
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

		allot(row) {
			//  
			this.dialogVisible = true;
		},

		importExcel(f) { //导入
			var vm = this;
			var reader = new FileReader();
			reader.onload = function(e) {
				var data = e.target.result;
				if (rABS) {
					wb = XLSX.read(btoa(vm.fixdata(data)), { //手动转化
						type: 'base64'
					});
				} else {
					wb = XLSX.read(data, {
						type: 'binary'
					});
				}
				//wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
				//wb.Sheets[Sheet名]获取第一个Sheet的数据
				vm.turnData(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]));
			};
			if (rABS) {
				reader.readAsArrayBuffer(f);
			} else {
				reader.readAsBinaryString(f);
			}
			return false
		},

		turnData(data) {
			var vm = this;
			vm.tableData = [];
			for (let title in data) {
				let buf = {
					a: data[title]['姓名'],
					b: data[title]['车牌号'],
				}
				vm.tableData.push(buf);
			}
		},

		fixdata(data) { //文件流转BinaryString
			var o = "",
				l = 0,
				w = 10240;
			for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
			o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
			return o;
		},

		reDelivery(val) {

		},

		highlight(row, index) {
			if (index == 1) {
				return 'highlighted';
			}
		},
	},
	mounted() {
		this.init();
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

	.highlighted {
		color: rgb(255,0,0);
	}

	.toolBarR {
		float: right;
		margin: 20px 0;
	}

	.contentBox {
		margin: 20px auto;
		text-align: center;
	}
}
</style>
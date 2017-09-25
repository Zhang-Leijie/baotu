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
			    
			    <el-table-column label="操作" min-width="160px">
			      <template scope="scope">
			      	<router-link :to="{name:'shop-order-policyDetail',query:{id:scope.row._id}}">
						<el-button type="text" size="small">查看</el-button>
					</router-link>
					<el-button type="text" size="small" @click="docAudit(scope.row)" style="margin-left: 10px;">单证审核</el-button>
					<el-button type="text" size="small" @click="">配送</el-button>
			      </template>
			    </el-table-column>
			</el-table>

			<el-pagination v-if="total" @current-change="pageChange" :current-page="currentPage" :page-size="pageSize" layout="total , prev, pager, next, jumper" :total='total' style="margin:20px auto;text-align:center"></el-pagination>

			<el-button @click="sync" type="primary" style="margin:20px auto;text-align:left;">同步保单</el-button>
			<el-button @click="downloadExl(tableData)">导出表格</el-button>
		</div>

		<el-dialog title="单证审核" :visible.sync="checkDioalogVisible" size="small" :before-close="handleAuditClose">
			<el-form label-position="right" label-width="100px" style="margin-top:20px;" class="appbox">
			  <el-form-item class="appblock" label="行驶证正面:">
			    <img :src="check.driveCardFace">
			  </el-form-item>
			  <el-form-item class="appblock" label="行驶证反面:">
			   	<img :src="check.driveCardBack">
			  </el-form-item>
			  <el-form-item class="appblock" label="身份证正面:">
			    <img :src="check.idCardFace">
			  </el-form-item>
			  <el-form-item class="appblock" label="身份证反面:">
			    <img :src="check.idCardBack">
			  </el-form-item>
			  <el-form-item class="appblock" label="审核结果:">
			    <el-radio class="radio" v-model="check.isAgree" label="1" value="1">同意</el-radio>
		  		<el-radio class="radio" v-model="check.isAgree" label="0" value="0">拒绝</el-radio>
			  </el-form-item>
			  <el-form-item class="appblock" label="拒绝原因:" v-show="check.isAgree == '0'">
			    <textarea v-model="check.refuseReason" rows="3" cols="20" style="width:100%;padding: 10px;"></textarea>
			  </el-form-item>
			</el-form>
		    <div slot="footer" class="dialog-footer">
		        <el-button @click="handleAuditClose">取 消</el-button>
		        <el-button type="primary" @click="docAuditConfirm">确 定</el-button>
		    </div>
		</el-dialog>

		<a href="" download="保单.xlsx" id="hf"></a>
	</div>
</template>
<script>
var tmpDown; //导出的二进制对象
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
			}, {
				value: 'TENANT_SELF',
				label: '自售保单',
			}, {
				value: 'TENANT_OTHER',
				label: '挂售保单',
			}],
			check: {
				id: null,
				driveCardFace: null,
				driveCardBack: null,
				idCardFace: null,
				idCardBack: null,
				isAgree: null,
				refuseReason: null,
			},
			tableData: [],
			total: null,
			currentPage: 1,
			pageSize: 10,
			checkDioalogVisible: false,
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

		getInfo() {
			let payload = {
				page: this.currentPage,
				pageSize: this.pageSize,
				employeeId: window.localStorage.getItem('employeeId'),
				type: this.search.type ? this.search.type : null,
				salesman: this.search.sale ? this.search.sale : null,
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
			}, window.localStorage.getItem('token')).then((res) => {
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

		sync() {
			let payload = {
				employeeId: window.localStorage.getItem('employeeId')
			}
			payload = JSON.stringify(payload);
			autoApi({
				action: 'jian_jie_fetch',
				version: '1.0',
				payload: payload,
			}, window.localStorage.getItem('token')).then((res) => {
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
			switch (val) {
				case 'EXPRESS':
					return '快递'
					break;
				case 'ACTIVE_PICK':
					return '网点自取'
					break;
				case 'DOT_DISPATCH':
					return '网点配送'
					break;
				default:
					return val
					break;
			}
		},

		docAudit(row) {//接口缺少四个图片的字段
			this.checkDioalogVisible = true;
			// this.check.driveCardFace = row.a;
			// this.check.driveCardBack = row.a;
			// this.check.idCardFace = row.a;
			// this.check.idCardBack = row.a;
		},

		handleAuditClose() {
			this.checkDioalogVisible = false;
		},

		docAuditConfirm() {
			this.checkDioalogVisible = false;
			//post this.check.id;
		},

		downloadExl(jsonData, type) {
			var vm = this;
			if (jsonData[0]) {
				var json = []; //解决数组引用赋值的问题
				for (var i = 0; i < jsonData.length; i++) {
					let buf = {
						'险种': '',
						'车主': jsonData[i].owner,
						'车牌号': jsonData[i].license,
						'签单日期': vm.formatDate(jsonData[i].issuanceTime),
						'保费': Number(jsonData[i].commercialDetail.price) + Number(jsonData[i].compulsoryDetail.price) + Number(jsonData[i].compulsoryDetail.vesselPrice),
						'佣金': '',
						'到期日期': '',
						'使用性质': '',
						'业务员': jsonData[i].salesman,
						'保单号': jsonData[i]._id,
						'保险公司': jsonData[i].insurerName,
					}
					json.push(buf);
				}
				//生成excel
				var tmpdata = json[0];
				var tmpDown; //导出的二进制对象
				json.unshift({});
				var keyMap = []; //获取keys
				for (var k in tmpdata) {
					keyMap.push(k);
					json[0][k] = k;
				}
				tmpdata = []; //用来保存转换好的json 

				json.map((v, i) => keyMap.map((k, j) => Object.assign({}, {
					v: v[k],
					position: (j > 25 ? vm.getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
				}))).reduce((prev, next) => prev.concat(next)).forEach((v, i) => tmpdata[v.position] = {
					v: v.v
				});
				var outputPos = Object.keys(tmpdata); //设置区域,比如表格从A1到D10
				var tmpWB = {
					SheetNames: ['mySheet'], //保存的表标题
					Sheets: {
						'mySheet': Object.assign({},
						tmpdata, //内容
						{
							'!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1] //设置填充区域
						})
					}
				};

				tmpDown = new Blob([vm.s2ab(XLSX.write(tmpWB, {
						bookType: (type == undefined ? 'xlsx' : type),
						bookSST: false,
						type: 'binary'
					} //这里的数据是用来定义导出的格式类型
				))], {
					type: ""
				}); //创建二进制对象写入转换好的字节流

				var href = URL.createObjectURL(tmpDown); //创建对象超链接
				document.getElementById("hf").href = href; //绑定a标签
				document.getElementById("hf").click(); //模拟点击实现下载
				setTimeout(function() { //延时释放
					URL.revokeObjectURL(tmpDown); //用URL.revokeObjectURL()来释放这个object URL
				}, 100);
			} else {
				this.$message({
					message: '导出列表为空',
					type: 'info',
				});
			}
		},

		s2ab(s) { //字符串转字符流
			var buf = new ArrayBuffer(s.length);
			var view = new Uint8Array(buf);
			for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
			return buf;
		},
		// 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。

		getCharCol(n) {
			let temCol = '',
				s = '',
				m = 0
			while (n > 0) {
				m = n % 26 + 1
				s = String.fromCharCode(m + 64) + s
				n = (n - m) / 26
			}
			return s
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
	.appbox{
		.appblock{
			width: 50%;
			float: left;
			img {
				max-width: 100%;
			}
		}
	}
}
</style>
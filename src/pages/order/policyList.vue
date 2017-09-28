<template>
	<div class="policyListBody">
		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item>保单列表</el-breadcrumb-item>
		</el-breadcrumb>

		<div class="toolBar">
			<div class="searchBox">
				<el-date-picker v-model="search.dateStart" type="date" align="right" placeholder="选择日期范围" :picker-options="pickerDisableStart" @change="searchIt" :clearable="false"></el-date-picker>
				<span>-</span>
				<el-date-picker v-model="search.dateEnd" type="date" align="right" placeholder="选择日期范围" :picker-options="pickerDisableEnd" @change="searchIt" :clearable="false"></el-date-picker>
				<el-select v-model="search.type" @change="searchIt" style="width:160px">
					<el-option v-for="item in types" :label="item.label" :value="item.value" :key="item.value"></el-option>
				</el-select>
				<el-input icon="search" v-model="search.company" placeholder="搜索保险公司" :on-icon-click="searchIt" style="width:160px"></el-input>
				<el-input icon="search" v-model="search.sale" placeholder="搜索业务员" :on-icon-click="searchIt" style="width:160px"></el-input>
				<el-button @click="reset">重置</el-button>
			</div>
		</div>

		<div class="tableBox">
			<el-table :data="tableData" border style="width: 100%;font-size:12px;" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55"></el-table-column>
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
			    <el-table-column prop="" label="单证状态"></el-table-column>
			    
			    <el-table-column label="操作" min-width="160px">
			      <template scope="scope">
			      	<router-link :to="{name:'shop-order-policyDetail',query:{id:scope.row._id}}">
						<el-button type="text" size="small">查看</el-button>
					</router-link>
					<el-button type="text" size="small" @click="docAudit(scope.row)" style="margin-left: 10px;">单证审核</el-button>
					<el-button type="text" size="small" @click="dispatch(scope.row)">配送</el-button>
			      </template>
			    </el-table-column>
			</el-table>

			<el-pagination v-if="total" @size-change="handleSizeChange" @current-change="pageChange" :current-page="currentPage" :page-sizes="[10, 50, 1000]" :page-size="pageSize" layout="total , sizes, prev, pager, next, jumper" :total='total' style="margin:20px auto;text-align:center"></el-pagination>

			<el-button @click="sync" style="margin:20px auto;text-align:left;">同步保单</el-button>
			<el-button @click="downloadExl(outPutData)">导出表格</el-button>
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

		<el-dialog title="配送" :visible.sync="dispatchDioalogVisible" size="tiny" :before-close="handleDispatchClose">
			<el-form label-position="right" label-width="100px" style="margin-top:20px;">
			  <el-form-item class="appblock" label="配送方式:">
			    <span>{{send.way}}</span>
			  </el-form-item>
			  <el-form-item class="appblock" label="礼品:">
			   	<span>{{send.gift}}</span>
			  </el-form-item>
			  <el-form-item class="appblock" label="运单号:">
			    <el-input v-model="send.NO"></el-input>
			  </el-form-item>
			</el-form>
		    <div slot="footer" class="dialog-footer">
		        <el-button @click="handleDispatchClose">取 消</el-button>
		        <el-button type="primary" @click="dispatchConfirm">确 定</el-button>
		    </div>
		</el-dialog>

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
				dateStart: '',
				dateEnd: '',
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
			send: {
				id: null,
				way: null,
				gift: null,
				NO: null,
			},
			tableData: [],
			outPutData: [],
			total: null,
			currentPage: 1,
			pageSize: 10,
			checkDioalogVisible: false,
			dispatchDioalogVisible: false,
			pickerDisableStart: null,
			pickerDisableEnd: null,
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
			var vm = this;
			this.pickerDisableStart = {
				disabledDate(day) {
					if (vm.search.dateEnd) {
						if ((vm.search.dateEnd.getTime() - 1000 * 60 * 60 * 24 * 31 > day.getTime()) || (vm.search.dateEnd.getTime() < day.getTime() + 1000 * 60 * 60 * 24)) {
							return true;
						} else {
							return false;
						}
					} else {
						return false;
					}
				}
			},
			this.pickerDisableEnd = {
				disabledDate(day) {
					if (vm.search.dateStart) {
						if ((vm.search.dateStart.getTime() + 1000 * 60 * 60 * 24 * 31 < day.getTime()) || (vm.search.dateStart.getTime() > day.getTime() - 1000 * 60 * 60 * 24)) {
							return true;
						} else {
							return false;
						}
					} else {
						return false;
					}
				}
			}
		},

		getInfo() {
			let payload = {
				page: this.currentPage,
				pageSize: this.pageSize,
				employeeId: window.localStorage.getItem('employeeId'),
				type: this.search.type ? this.search.type : null,
				salesman: this.search.sale ? this.search.sale : null,
				insurerId: this.search.company ? this.search.company : null,
				beginTime: ((this.search.dateStart != '') && (this.search.dateEnd != ''))? this.search.dateStart.getTime() / 1000 : null,
				endTime: ((this.search.dateStart != '') && (this.search.dateEnd != ''))? this.search.dateEnd.getTime() / 1000 : null,
				// type: this.search.type?this.search.type:null,
			};

			payload = JSON.stringify(payload);

			autoApi({
				action: 'vehicle_policies',
				version: '1.0',
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

		handleSelectionChange(select) {
			this.outPutData = select;
		},

		handleSizeChange(size) {
			this.pageSize = size;
			this.getInfo();
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
			this.search.dateEnd = '';
			this.search.dateStart = '';
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

		dispatch(row) {
			this.dispatchDioalogVisible = true;
			this.send.way = row.deliveryInfo?this.reDelivery(row.deliveryInfo.type):'';
			//this.send.gift = row.a;
		},

		handleDispatchClose() {
			this.dispatchDioalogVisible = false;
		},

		dispatchConfirm() {
			this.dispatchDioalogVisible = false;
			//post this.send.id;
		},

		downloadExl(jsonData, type) {
			var vm = this;
			if (jsonData[0]) {
				var json = []; //解决数组引用赋值的问题
				for (var i = 0; i < jsonData.length; i++) {
					let buf = {
						'保险公司': jsonData[i].insurerName,
						'交强险保单号': jsonData[i].compulsoryDetail ? jsonData[i].compulsoryDetail.no : '无',
						'商业险保单号': jsonData[i].commercialDetail ? jsonData[i].commercialDetail.no : '无',
						'业务员': jsonData[i].salesman,
						'车主': jsonData[i].owner,
						'身份证号码': jsonData[i].idNo,
						'车牌号': jsonData[i].license,
						'车辆种类': this.reBonusType(jsonData[i].bonusType),
						'车辆型号': jsonData[i].name,
						'发动机号': jsonData[i].engine,
						'车架号': jsonData[i].vin,
						'初次登记年月': jsonData[i].enrollDate,
						'签单日期': vm.formatDate(jsonData[i].issuanceTime),
						'商业险起保日期': jsonData[i].commercialDetail?jsonData[i].commercialDetail.startDate:'无',
						'交强险起保日期': jsonData[i].compulsoryDetail?jsonData[i].compulsoryDetail.startDate:'无',
						'交强险保费': jsonData[i].compulsoryDetail ? jsonData[i].compulsoryDetail.price : 0,
						'车船税': jsonData[i].compulsoryDetail ? jsonData[i].compulsoryDetail.vesselPrice : 0,
						'商业险保费': jsonData[i].commercialDetail ? jsonData[i].commercialDetail.price : 0,
						'保费': Number(jsonData[i].commercialDetail ? jsonData[i].commercialDetail.price : 0) + Number(jsonData[i].compulsoryDetail ? jsonData[i].compulsoryDetail.price : 0) + Number(jsonData[i].compulsoryDetail ? jsonData[i].compulsoryDetail.vesselPrice : 0),
						'第三者责任险(保额)': jsonData[i].insurances?(jsonData[i].insurances.THIRD?jsonData[i].insurances.THIRD.quota:'无'):'无',
						'第三者责任险(保费)': jsonData[i].insurances?(jsonData[i].insurances.THIRD?jsonData[i].insurances.THIRD.price:'无'):'无',
						// '车上人员责任险(司机)(保额)': jsonData[i].insurances?(jsonData[i].insurances.DRIVER?jsonData[i].insurances.DRIVER.quota:'无'):'无',
						'车上人员责任险(司机)(保费)': jsonData[i].insurances?(jsonData[i].insurances.DRIVER?jsonData[i].insurances.DRIVER.price:'无'):'无',
						// '车上人员责任险(乘客)(保额)': jsonData[i].insurances?(jsonData[i].insurances.PASSENGER?jsonData[i].insurances.PASSENGER.quota:'无'):'无',
						'车上人员责任险(乘客)(保费)': jsonData[i].insurances?(jsonData[i].insurances.PASSENGER?jsonData[i].insurances.PASSENGER.price:'无'):'无',
						// '机动车损失保险(保额)': jsonData[i].insurances?jsonData[i].insurances.DAMAGE.quota:'无',
						'机动车损失保险(保费)': jsonData[i].insurances?jsonData[i].insurances.DAMAGE.price:'无',
						// '不计免赔险(车损)(保额)': jsonData[i].insurances?(jsonData[i].insurances.DAMAGE_DEDUCTIBLE?jsonData[i].insurances.DAMAGE_DEDUCTIBLE.quota:'无'):'无',
						'不计免赔险(车损)(保费)': jsonData[i].insurances?(jsonData[i].insurances.DAMAGE_DEDUCTIBLE?jsonData[i].insurances.DAMAGE_DEDUCTIBLE.price:'无'):'无',
						// '不计免赔险(三者)(保额)': jsonData[i].insurances?(jsonData[i].insurances.THIRD_DEDUCTIBLE?jsonData[i].insurances.THIRD_DEDUCTIBLE.quota:'无'):'无',
						'不计免赔险(三者)(保费)': jsonData[i].insurances?(jsonData[i].insurances.THIRD_DEDUCTIBLE?jsonData[i].insurances.THIRD_DEDUCTIBLE.price:'无'):'无',
						// '不计免赔险(司机)	(保额)': jsonData[i].insurances?(jsonData[i].insurances.DRIVER_DEDUCTIBLE?jsonData[i].insurances.DRIVER_DEDUCTIBLE.quota:'无'):'无',
						'不计免赔险(司机)	(保费)': jsonData[i].insurances?(jsonData[i].insurances.DRIVER_DEDUCTIBLE?jsonData[i].insurances.DRIVER_DEDUCTIBLE.price:'无'):'无',
						// '不计免赔险(乘客)(保额)': jsonData[i].insurances?(jsonData[i].insurances.PASSENGER_DEDUCTIBLE?jsonData[i].insurances.PASSENGER_DEDUCTIBLE.quota:'无'):'无',
						'不计免赔险(乘客)(保费)': jsonData[i].insurances?(jsonData[i].insurances.PASSENGER_DEDUCTIBLE?jsonData[i].insurances.PASSENGER_DEDUCTIBLE.price:'无'):'无',
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

				//下载xlsx
				const a = document.createElement('a');
				var href = URL.createObjectURL(tmpDown); //创建对象超链接
				a.setAttribute('href', href);
				a.setAttribute('download', '保单.xlsx');
				a.click();

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
		},

		reBonusType(val) {
			switch(val) {
				case 'PC':
					return '营利客车';
					break;
				case 'PT':
					return '营利货车';
					break;
				case 'NPC':
					return '非营利客车';
					break;
				case 'NPT':
					return '非营利货车';
					break;
				case 'OTHER':
					return '其他';
					break;
				default:
					return val;
					break;
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
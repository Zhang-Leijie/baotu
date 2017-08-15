<template>
	<div class="demoList">
		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item>列表</el-breadcrumb-item>
		</el-breadcrumb>

		<el-row class="tableBox">
		    <el-col :span="24">
		        <el-table :data="editData" border style="width: 100%">
		          	<el-table-column label="系数类型名">
		             	<template scope="scope">
		                	<span>{{scope.row.typeName}}</span>
		             	</template>
		            </el-table-column>
		            <el-table-column label="系数名称">
		             	<template scope="scope">
		                	<el-select v-model="scope.row.choosed" placeholder="请选择" @change="chooseOneCoefficient(scope.row)" v-if="scope.row.coefficients && !(isAdded && isAdded == scope.row.typeId) && !(isEdited && isEdited == scope.row.choosed)">
							    <el-option v-for="item in scope.row.coefficients" :label="item.name" :value="item.id"></el-option>
							</el-select>
							<el-input v-model="scope.row.name" v-if="(isEdited && isEdited == scope.row.choosed) || (isAdded && isAdded == scope.row.typeId) && (!editMode || editMode == 'chepai')"></el-input>
							<el-select v-model="scope.row.name" placeholder="请选择" v-if="(isEdited && isEdited == scope.row.choosed) || (isAdded && isAdded == scope.row.typeId) && editMode == 'xubao'">
							    <el-option v-for="item in xubao" :label="item.name" :value="item.id"></el-option>
							</el-select>
							<el-select v-model="scope.row.name" placeholder="请选择" v-if="(isEdited && isEdited == scope.row.choosed) || (isAdded && isAdded == scope.row.typeId) && editMode == 'xingbie'">
							    <el-option v-for="item in xingbie" :label="item.name" :value="item.id"></el-option>
							</el-select>
		             	</template>
		            </el-table-column>
		            <el-table-column label="比较器类型">
		             	<template scope="scope">
		             		<span v-if="!(isAdded && isAdded == scope.row.typeId) && !(isEdited && isEdited == scope.row.choosed)">{{reComparisonName(scope.row.comparisonType)}}</span>
		             		<el-select v-model="scope.row.comparisonType" placeholder="请选择" v-if="(isEdited && isEdited == scope.row.choosed) || (isAdded && isAdded == scope.row.typeId) && !(editMode == 'chepai')">
    							<el-option v-for="item in comparisons" :label="item.label" :value="item.value"></el-option>
  							</el-select>
  							<el-select v-model="scope.row.comparisonType" placeholder="请选择" v-if="(isEdited && isEdited == scope.row.choosed) || (isAdded && isAdded == scope.row.typeId) && editMode == 'chepai'">
    							<el-option v-for="item in chepaiComparisons" :label="item.label" :value="item.value"></el-option>
  							</el-select>
		             	</template>
		            </el-table-column>
		            <el-table-column label="比较器数值">
		             	<template scope="scope">
		             		<span v-if="!(isAdded && isAdded == scope.row.typeId) && !(isEdited && isEdited == scope.row.choosed)">{{comparisonValueShow(scope.row)}}</span>
		             		<el-input v-model="scope.row.comparisonValue" :placeholder="editMode == 'chepai'?'浙A':'区间数值请用下划线 _ 隔开'" v-if="(isEdited && isEdited == scope.row.choosed) || (isAdded && isAdded == scope.row.typeId)"></el-input>
		             	</template>
		            </el-table-column>
		            <el-table-column label="操作">
		             	<template scope="scope">
		               		<el-button type="text" @click="addOne(scope.row)" v-if="!isAdded && !isFull(scope.row) && !isEdited">新增</el-button>
		               		<el-button type="text" @click="confirmAdd(scope.row)" v-if="isAdded == scope.row.typeId">确认添加</el-button>
		               		<el-button type="text" @click="cancelAdd(scope.row)" v-if="isAdded == scope.row.typeId">取消添加</el-button>
		               		<el-button type="text" @click="editThisOne(scope.row)" v-if="!isEdited && !isAdded && scope.row.choosed">编辑</el-button>
		               		<el-button type="text" @click="confirmEdit(scope.row)" v-if="isEdited && (isEdited == scope.row.choosed)">确认编辑</el-button>
		               		<el-button type="text" @click="cancelEdit(scope.row)" v-if="isEdited && (isEdited == scope.row.choosed)">取消编辑</el-button>
		               		<el-button type="text" @click="deleteThisOne(scope.row)" v-if="!isEdited && !isAdded && scope.row.choosed">删除</el-button>
		             	</template>
		            </el-table-column>
		        </el-table>
		    </el-col>
		</el-row>

	</div>
</template>
<script>
import { masterApi } from '@/ajax/post.js'

	export default {
	  data() {
	    return {
	      editing: false,	//系数编辑模式
	      editData: [],
	      isEdited: null,	//被编辑的系数id
	      isAdded: null,	//被添加的系数
	      comparisons: [
	      	{
	      		value: 'gt',
	      		label: "大于"
	      	},
	      	{
	      		value: 'gte',
	      		label: "大于等于"
	      	},
	      	{
	      		value: 'lt',
	      		label: "小于"
	      	},
	      	{
	      		value: 'lte',
	      		label: "小于等于"
	      	},
	      	{
	      		value: 'eq',
	      		label: "等于"
	      	},
	      	// {
	      	// 	value: 6,
	      	// 	label: "不等于"
	      	// },
	      	{
	      		value: 'bteween',
	      		label: "开区间 ( )"
	      	},
	      	{
	      		value: 'lbteween',
	      		label: "前闭后开区间 [ )"
	      	},
	      	{
	      		value: 'rbteween',
	      		label: "前开后闭区间 ( ]"
	      	},
	      	// {
	      	// 	value: 10,
	      	// 	label: "在 ... 之中"
	      	// },
	      	// {
	      	// 	value: 11,
	      	// 	label: "不在 ... 之中"
	      	// }
	      ],
	      chepaiComparisons: [{
      		  value: 'eq',
      		  label: "等于"
      	  }],
	      xubao: [{
	      	id: 1,
	      	name: '新车'
	      },
	      {
	      	id: 2,
	      	name: '转保'
	      },
	      {
	      	id: 3,
	      	name: '续保'
	      }],
	      xingbie: [{
	      	id: 0,
	      	name: '男'
	      },
	      {
	      	id: 1,
	      	name: '女'
	      }],
	      editMode: null		//'xubao':转续保,'chepai':车牌,'xingbie':性别
		}
	  },
	  methods: {
	  	//获取节点编辑配置
	    getEditSetting() {
	    	let payload = {}
	    	payload = JSON.stringify(payload);
	    	masterApi({
	   			action: 'poundage_coefficients',
	   			version: '1.0',
	   			payload: payload
	   		},window.localStorage.getItem('tokenPlate')).then((res)=> {
	   			if (res.code == 0) {
	   				if (res.attach) {
	   					for (var i = 0; i < res.attach.length; i++) {
		   					res.attach[i]['choosed'] = null;			//当前选择的系数id
			   				res.attach[i]['name'] = null;			//需要编辑/添加的系数名称
		   					res.attach[i]['comparisonValue'] = null;
		   					res.attach[i]['comparisonType'] = null;
		   					res.attach[i]['addORdec'] = null;
		   					res.attach[i]['rate'] = null;
		   				}
	   				}

	   				if (res.attach) {
	   					for (var j = 0; j < res.attach.length; j++) {
		   					if (res.attach[j].coefficients) {
		   						for (var i = 0; i < res.attach[j].coefficients.length; i++) {
			   						if (res.attach[j].coefficients[i].rate) {
			   							res.attach[j].choosed = res.attach[j].coefficients[i].id;
			   							res.attach[j].rate = res.attach[j].coefficients[i].rate / 10;
			   							res.attach[j].addORdec = res.attach[j].coefficients[i].rate?(res.attach[j].coefficients[i].rate > 0?1:2):0;
			   						}
			   					}
		   					}
		   					if (res.attach.typeId == 3) {
		   						for (var i = 0; i < res.attach[j].coefficients.length; i++) {
			   						if (res.attach[j].coefficients.name == '0') {
			   							res.attach[j].coefficients.name = '男';
			   						}
			   						if (res.attach[j].coefficients.name == '1') {
			   							res.attach[j].coefficients.name = '女';
			   						}
			   					}
		   					}
		   					if (res.attach.typeId == 4) {
			   						for (var i = 0; i < res.attach[j].coefficients.length; i++) {
				   						if (res.attach[j].coefficients.name == '1') {
				   							res.attach[j].coefficients.name = '新车';
				   						}
				   						if (res.attach[j].coefficients.name == '2') {
				   							res.attach[j].coefficients.name = '转保';
				   						}
				   						if (res.attach[j].coefficients.name == '4') {
				   							res.attach[j].coefficients.name = '侯保';
				   						}
				   					}
			   					}
		   				}
	   				}

	   				this.editData = res.attach;
       			}
	   		})
	    },
	    editMode() {
	    	this.editing = true;
	    },
	    endEditMode() {
	    	this.editing = false;
	    	this.getSetting();
	    },
	    editThisOne(row) {
	    	switch(row.typeId) {
	    		case 4: 
	    		this.editMode = 'xubao';
	    		break;
	    		case 6: 
	    		this.editMode = 'chepai';
	    		break;
	    		case 3: 
	    		this.editMode = 'xingbie';
	    		break;
	    		default: 
	    		this.editMode = false;
	    		break;
	    	}
	    	this.isEdited = row.choosed;
	    	for (var i = 0; i < row.coefficients.length; i++) {
	    		if (row.coefficients[i].id === row.choosed) {
	    			row.name = row.coefficients[i].name;
	    		}
	    	}
	    },
	    confirmEdit(row) {
	    	let checkChange = false;
	    	for (var i = 0; i < row.coefficients.length; i++) {
	    		if (row.coefficients[i].id === row.choosed) {
	    			if(row.coefficients[i].comparableValue == row.comparisonValue && row.coefficients[i].comparison == row.comparisonType && row.coefficients[i].name == row.name)
	    			{
	    				checkChange = false;
	    				this.$message({
				            message: "数值未修改",
				            type: 'info'
				        });
	    			}
	    			else
	    			{
	    				checkChange = true;
	    			}
	    		}
	    	}
	    	if (checkChange) {
		    	let coefficientType = this.reCoefficientType(row.typeId);
		    	let comparison = row.comparisonType;
		    	let name = row.name;
		    	let array = row.comparisonValue.split("_");
		    	let id = row.choosed;
		    	if (array[0] >= array[1]) {
		    		this.$message({
			            message: "区间数值应当从小到大排列,请检查输入",
			            type: 'error'
			        });
		    	}
		    	else
		    	{
		    		let payload = {
			   			employeeId: 1,	//无意义的参数
			   			coefficientType: coefficientType,
			   			id: id,
			   			symbol: comparison,
			   			val: array,
			   			name: name,
		    		}
		    		payload = JSON.stringify(payload);
		    		masterApi({
			   			action: 'poundage_coefficient_edit',
			   			version: '1.0',
			   			crudType: 4,	//4:修改
			   			payload: payload
			   		},window.localStorage.getItem('tokenPlate')).then((res)=> {
			   			if (res.code == 0) {
			   				this.isEdited = null;
			    			this.getEditSetting();
			   				this.$message({
					            message: '系数编辑完成',
					            type: 'success'
					        });
		       			}
		       			else if (res.code == 7) {
		       				this.$message({
					            message: '操作失败,请检查输入',
					            type: 'error'
					        });
		       			}
			   		})
		    	}
	    	}
		    this.editMode = false;	
	    },
	    cancelEdit(row) {
	    	this.isEdited = null;
	    	// 重新填写选择的系数信息,因为只有在choosed的情况下才会编辑,所以不用对choosed做判断,coefficients也是一样,只有coefficients不为空时才可以choose
	    	for (var i = 0; i < row.coefficients.length; i++) {
	    		if (row.coefficients[i].id === row.choosed) {
	    			row.comparisonType = row.coefficients[i].comparison;
	    			row.comparisonValue = row.coefficients[i].comparableValue;
	    		}
	    	}
		    this.editMode = false;	
	    },
	    deleteThisOne(row) {
	    	this.$confirm('此操作将永久删除该系数, 是否继续?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
	         	let payload = {
			    	coefficientType: this.reCoefficientType(row.typeId),
			    	id: row.choosed,
	         	}
	         	payload = JSON.stringify(payload);
	    		masterApi({
		   			action: 'poundage_coefficient_edit',
		   			version: '1.0',
		   			crudType: 8,	//4:修改
		   			payload: payload
		   		},window.localStorage.getItem('tokenPlate')).then((res)=> {
		   			if (res.code == 0) {
		    			this.getEditSetting();
		   				this.$message({
				            message: '系数已删除',
				            type: 'success'
				        });
	       			}
	       			else if (res.code == 7) {
	       				this.$message({
				            message: '操作失败,请检查输入',
				            type: 'error'
				        });
	       			}
		   		})
	        }).catch(() => {
	          this.$message({
	            type: 'info',
	            message: '已取消删除'
	          });          
	        });   	
	    },
	    addOne(row) {
	    	switch(row.typeId) {
	    		case 4: 
	    		this.editMode = 'xubao';
	    		break;
	    		case 6: 
	    		this.editMode = 'chepai';
	    		break;
	    		case 3: 
	    		this.editMode = 'xingbie';
	    		break;
	    		default: 
	    		this.editMode = false;
	    		break;
	    	}
	    	this.isAdded = row.typeId;
	    	row.name = null;
	    	row.comparisonType = null;
	    	row.comparisonValue = null;
	    },
	    confirmAdd(row) {
	    	let coefficientType = this.reCoefficientType(this.isAdded);
	    	let comparison = row.comparisonType;
	    	let name = row.name;
	    	let array = row.comparisonValue.split("_");
	    	if (array[0] >= array[1]) {
	    		this.$message({
		            message: "区间数值应当从小到大排列,请检查输入",
		            type: 'error'
		        });
	    	}
	    	else
	    	{
	    		let payload = {
	    			employeeId: 1,	//无效的参数
		   			coefficientType: coefficientType,
		   			symbol: comparison,
		   			val: array,
		   			name: name,
	    		}
	    		payload = JSON.stringify(payload);
	    		masterApi({
		   			action: 'poundage_coefficient_edit',
		   			version: '1.0',
		   			crudType: 1,	//1:添加
		   			payload: payload
		   		},window.localStorage.getItem('tokenPlate')).then((res)=> {
		   			if (res.code == 0) {
		   				this.isAdded = null;
		    			this.getEditSetting();
		   				this.$message({
				            message: '添加了新的系数',
				            type: 'success'
				        });
	       			}
	       			else if (res.code == 7) {
	       				this.$message({
				            message: '操作失败,请检查输入',
				            type: 'error'
				        });
	       			}
		   		})
	    	}
		    this.editMode = false;		
	    },
	    cancelAdd(row) {
	    	this.isAdded = null;
	    	//重新填写选择的数据,根据是否选择有两种处理方法
	    	if(row.choosed) {
	    		for (var i = 0; i < row.coefficients.length; i++) {
		    		if (row.coefficients[i].id === row.choosed) {
		    			row.comparisonType = row.coefficients[i].comparison;
		    			row.comparisonValue = row.coefficients[i].comparableValue;
		    		}
		    	}
	    	}
	    	else
	    	{
	    		row.name = null;
	    		row.comparisonType = null;
	    		row.comparisonValue = null;
	    	}
		    this.editMode = false;		
	    },
	    //判断系数数量是否达到了最大值
	    isFull(row) {
	    	if (row.coefficients && row.maxCustomNum) {// 0 表示无限制
	    		if (row.maxCustomNum <= row.coefficients.length) {
	    			return true;
	    		}
	    	}
	    	else
	    	{
	    		return false;
	    	}
	    },
	    chooseOneCoefficient(row) {
	    	for (var i = 0; i < row.coefficients.length; i++) {
	    		if (row.coefficients[i].id === row.choosed) {
	    			row.comparisonType = row.coefficients[i].comparison;
	    			row.comparisonValue = row.coefficients[i].comparableValue;
	    		}
	    	}
	    },
	    reComparisonName(val) {
	    	switch(val)
	    	{
	    		case 1:
					return "大于"
					break;
				case 2:
					return "大于等于"
					break;
				case 3:
					return "小于"
					break;
				case 4:
					return "小于等于"
					break;
				case 5:
					return "等于"
					break;
				// case 6:
				// 	return "不等于"
				// 	break;
				case 7:
					return "开区间"
					break;
				case 8:
					return "前闭后开区间"
					break;
				case 9:
					return "前开后闭区间"
					break;
				// case 10:
				// 	return "在 ... 之中"
				// 	break;
				// case 11:
				// 	return "不在 ... 之中"
				// 	break;
				case 'gt':
					return "大于"
					break;
				case 'gte':
					return "大于等于"
					break;
				case 'lt':
					return "小于"
					break;
				case 'lte':
					return "小于等于"
					break;
				case 'eq':
					return "等于"
					break;
				// case 6:
				// 	return "不等于"
				// 	break;
				case 'bteween':
					return "开区间"
					break;
				case 'lbteween':
					return "前闭后开区间"
					break;
				case 'rbteween':
					return "前开后闭区间"
					break;
				// case 10:
				// 	return "在 ... 之中"
				// 	break;
				// case 11:
				// 	return "不在 ... 之中"
				// 	break;
	    	}
	    },
	    reCoefficientType(val) {
	    	switch(val)
	    	{
				case 1:
					return "CLAIMS"
					break;
				case 2:
					return "NO_CLAIMS"
					break;
				case 3:
					return "GENDER"
					break;
				case 4:
					return "ZXB"
					break;
				case 5:
					return "SEAT_COUNT"
					break;
				case 6:
					return "LICENSE"
					break;
				case 7:
					return "VEHICLE_AGE"
					break;
				case 8:
					return "PURCHASE_PRICE"
					break;
				case 9:
					return "AGE"
					break;
				// case 10:
				// 	return "在 ... 之中"
				// 	break;
				// case 11:
				// 	return "不在 ... 之中"
				// 	break;
				default:
					return val
					break;
	    	}
	    	
	    },
	    comparisonValueShow(row) {
	    	if(row.comparisonValue)
	    	{
	    		let value = row.comparisonValue.split("_");
		    	if (value[1]) {
		    		switch(row.comparisonType)
		    		{
		    			case 7:
		    				return "( " + value[0] + " , " + value[1] + " )"
		    				break;
		    			case 8:
		    				return "[ " + value[0] + " , " + value[1] + " )"
		    				break;
		    			case 9:
		    				return "( " + value[0] + " , " + value[1] + " ]"
		    				break;
		    			default:
		    				return row.comparisonValue
		    		}
		    	}
		    	else 
		    	{
		    		return row.comparisonValue
		    	}
	    	}
	    }
	  },
	  mounted() {
	  	this.getEditSetting();
	  }
	}
</script>
<style lang="less">
.demoList{
	.toolBar{
		width: 100%;
		overflow: hidden;
		.toolBarR {
			float: right;
		}
	}
}
</style>
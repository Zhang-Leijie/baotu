<template>
	<div>
		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item :to="{name:'shop-order-policyList'}">车险订单列表</el-breadcrumb-item>
		</el-breadcrumb>

		<div style="text-align:right;margin-top:20px;">
			<el-button @click="goback">返回</el-button>
		</div>

		<table class="tableA" border="11">
          <tr>
            <th>车牌号</th>
            <td>{{ tableData.license }}</td>
            <th>发动机号</th>
            <td>{{ tableData.engine }}</td>
            <th>车架号</th>
            <td>{{ tableData.vin }}</td>
          </tr>
          <tr>
            <th>车主姓名</th>
            <td>{{ tableData.owner.name }}</td>
            <th>证件类型</th>
            <td>{{ tableData.owner.idType }}</td>
            <th>证件号码</th>
            <td>{{ tableData.owner.idNo }}</td>
          </tr>
          <tr>
            <th>注册日期</th>
            <td>{{ tableData.demo }}</td>
            <th>品牌型号</th>
            <td>{{ tableData.name }}</td>
            <th>是否过户车</th>
            <td>{{ tableData.transfer?"是":"否" }}</td>
          </tr>
          <tr>
            <th>新车购置价</th>
            <td>{{ tableData.price }}</td>
            <th>座位数</th>
            <td>{{ tableData.seatCount }}</td>
          </tr>
          <tr>
            <th>商业险起保时间</th>
            <td>{{ tableData.schema.commercialStart }}</td>
            <th>交强险险起保时间</th>
            <td>{{ tableData.schema.commercialEnd }}</td>
          </tr>
        </table>

        <table class="tableB">
          <tr>
            <th>承保险种</th>
           	<th>保额</th>
           	<th>保险费</th>
          </tr>
          <tr>
            <th>机动车损失保险</th>
            <td>{{ tableData.schema.insurances.DAMAGE.quota }}</td>
            <td>{{ tableData.schema.insurances.DAMAGE.price }}</td>
          </tr>
          <tr>
            <th>第三者责任险</th>
            <td>{{ tableData.schema.insurances.THIRD.quota }}</td>
            <td>{{ tableData.schema.insurances.THIRD.price }}</td>
          </tr>
          <tr>
            <th>车上人员责任险(司机)</th>
            <td>{{ tableData.schema.insurances.DRIVER.quota }}</td>
            <td>{{ tableData.schema.insurances.DRIVER.price }}</td>
          </tr>
          <tr>
            <th>车上人员责任险(乘客)</th>
            <td>{{ tableData.insurances.PASSENGER.quota }}</td>
            <td>{{ tableData.insurances.PASSENGER.price }}</td>
          </tr>
          <tr>
            <th>不计免赔险(车损)</th>
            <td>{{ tableData.schema.insurances.DAMAGE_DEDUCTIBLE.quota }}</td>
            <td>{{ tableData.schema.insurances.DAMAGE_DEDUCTIBLE.price }}</td>
          </tr>
          <tr>
            <th>不计免赔险(三者)</th>
            <td>{{ tableData.schema.insurances.THIRD.quota }}</td>
            <td>{{ tableData.schema.insurances.THIRD.price }}</td>
          </tr>
          <tr>
            <th>不计免赔险(乘客)</th>
            <td>{{ tableData.schema.insurances.THIRD_DEDUCTIBLE.quota }}</td>
            <td>{{ tableData.schema.insurances.THIRD_DEDUCTIBLE.price }}</td>
          </tr>
          <tr>
            <th>不计免赔险(司机)</th>
            <td>{{ tableData.schema.insurances.DRIVER_DEDUCTIBLE.quota }}</td>
            <td>{{ tableData.schema.insurances.DRIVER_DEDUCTIBLE.price }}</td>
          </tr>
          <tr>
            <th>商业险保费合计</th>
            <td colspan="2">{{ tableData.schema.commericalTotal }}</td>
          </tr>
          <tr>
            <th>交强险保费合计</th>
            <td colspan="2">{{ tableData.schema.compulsiveTotal }}</td>
          </tr>
          <tr>
            <th>车船税合计</th>
            <td colspan="2">{{ tableData.schema.vehicleVesselTotal }}</td>
          </tr>
          <tr>
            <th>保费总金额</th>
            <td colspan="2">{{ tableData.demo }}</td>
          </tr>
        </table>

	</div>
</template>
<script>
import { autoApi } from '@/ajax/post.js'

	export default {
	    data() {
	      return {
	      	tableData: {}
	      };
	    },
	    methods: {
	       formatDate(time){
			  var   x = (time - 0) * 1000
			  console.log(x)
			  var   now = new Date(x) 
			  var   year = now.getFullYear();     
			  var   month = "0" + (now.getMonth()+1);     
			  var   date = "0" +(now.getDate());   
			  var   hour = "0" +now.getHours();
			  var   min =  "0" +now.getMinutes();
			  return   year+"-"+month.substr(-2)+"-"+date.substr(-2)+'   '+ hour.substr(-2) +':'+min.substr(-2)
			},

			getInfo(id) {
				autoApi({
		   			action: 'vehicle_policy_info',
		   			version: '1.0',
		   			orderId: id,
	   				employeeId: window.localStorage.getItem('employeeId')
		   		},window.localStorage.getItem('token')).then((res)=> {
		   			if (res.code == 0) {
		   				if (res.attach) {
		   					this.tableData = res.attach;
		   					this.length = res.attach.length;
		   				}
	       			}
		   		})
			},

			goback() {
				router.push({
			  	  name: "shop-order-autoinsurance"
			    })
			}
	    },
	    mounted(){
	        if (this.$route.query) {
	        	this.getInfo(this.$route.query.id);
	        }
	    }
	}
</script>
<style lang="less">
	.tableA {
		font-size: 16px;
		margin: 20px 0;
		th {
			height: 24px;
		}
		td {
			text-align: center;
			height: 24px;
		}
	}
	.tableB {
		font-size: 16px;
		th {
			width: 300px;
			height: 24px;
		}
		td {
			text-align: center;
			height: 24px;
		}
	}
</style>
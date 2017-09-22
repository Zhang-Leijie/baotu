<template>
  <div class="policyDetailBody">
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{name:'shop-order-policyList'}">保单列表</el-breadcrumb-item>
        <el-breadcrumb-item>保单详情</el-breadcrumb-item>
    </el-breadcrumb>

    <div style="text-align:right;margin-top:20px;">
      <el-button @click="goback">返回</el-button>
    </div>

    <table class="tableA" border="3">
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
            <td>{{ tableData.enrollDate }}</td>
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
            <th>交强险起保时间</th>
            <td>{{ tableData.schema.compulsoryStart }}</td>
          </tr>
        </table>

        <table class="tableB" border="1">
          <tr>
            <th>承保险种</th>
            <th>保额</th>
            <th>保险费</th>
          </tr>
          <tr>
            <th>机动车损失保险</th>
            <td>{{ tableData.schema.insurances.DAMAGE.quota?tableData.schema.insurances.DAMAGE.quota:0 }}</td>
            <td>{{ tableData.schema.insurances.DAMAGE.price }}</td>
          </tr>
          <tr>
            <th>第三者责任险</th>
            <td>{{ tableData.schema.insurances.THIRD.quota?tableData.schema.insurances.THIRD.quota:0 }}</td>
            <td>{{ tableData.schema.insurances.THIRD.price }}</td>
          </tr>
          <tr>
            <th>车上人员责任险(司机)</th>
            <td>{{ tableData.schema.insurances.DRIVER.quota?tableData.schema.insurances.DRIVER.quota:0 }}</td>
            <td>{{ tableData.schema.insurances.DRIVER.price }}</td>
          </tr>
          <tr>
            <th>车上人员责任险(乘客)</th>
            <td>{{ tableData.schema.insurances.PASSENGER.quota?tableData.schema.insurances.PASSENGER.quota:0 }}</td>
            <td>{{ tableData.schema.insurances.PASSENGER.price }}</td>
          </tr>
          <tr>
            <th>不计免赔险(车损)</th>
            <td>{{ (tableData.schema.insurances.DAMAGE_DEDUCTIBLE.quota == 1)?'投保':'未投保' }}</td>
            <td>{{ tableData.schema.insurances.DAMAGE_DEDUCTIBLE.price }}</td>
          </tr>
          <tr>
            <th>不计免赔险(三者)</th>
            <td>{{ (tableData.schema.insurances.THIRD_DEDUCTIBLE.quota == 1)?'投保':'未投保'}}</td>
            <td>{{ tableData.schema.insurances.THIRD_DEDUCTIBLE.price }}</td>
          </tr>
          <tr>
            <th>不计免赔险(乘客)</th>
            <td>{{ (tableData.schema.insurances.PASSENGER_DEDUCTIBLE.quota == 1)?'投保':'未投保' }}</td>
            <td>{{ tableData.schema.insurances.PASSENGER_DEDUCTIBLE.price }}</td>
          </tr>
          <tr>
            <th>不计免赔险(司机)</th>
            <td>{{ (tableData.schema.insurances.DRIVER_DEDUCTIBLE.quota == 1)?'投保':'未投保' }}</td>
            <td>{{ tableData.schema.insurances.DRIVER_DEDUCTIBLE.price }}</td>
          </tr>
          <tr>
            <th>商业险保费合计</th>
            <td colspan="2">{{ tableData.schema.commericialTotal }}</td>
          </tr>
          <tr>
            <th>交强险保费合计</th>
            <td colspan="2">{{ tableData.schema.compulsoryTotal }}</td>
          </tr>
          <tr>
            <th>车船税合计</th>
            <td colspan="2">{{ tableData.schema.vehicleVesselTotal }}</td>
          </tr>
          <tr>
            <th>保费总金额</th>
            <td colspan="2">{{ Number(tableData.schema.commericialTotal) + Number(tableData.schema.compulsoryTotal) + Number(tableData.schema.vehicleVesselTotal) }}</td>
          </tr>
        </table>

  </div>
</template>
<script>
import {
  autoApi
} from '@/ajax/post.js'

export default {
  data() {
    return {
      tableData: {
        "license": "",
        "vin": "",
        "engine": "",
        "enrollDate": "",
        "transfer": false,
        "vehicleUsedType": "",
        "seat": 0,
        "year": 0,
        "name": "",
        "price": 0,
        "priceNoTax": 0,
        "owner": {
          "type": "",
          "name": "",
          "mobile": "",
          "idType": "",
          "idNo": ""
        },
        "insurer": {
          "type": "",
          "name": "",
          "mobile": "",
          "idType": "",
          "idNo": ""
        },
        "insured": {
          "type": "",
          "name": "",
          "mobile": "",
          "idType": "",
          "idNo": ""
        },
        "schema": {
          "commericialTotal": 0,
          "commercialStart": "",
          "compulsoryTotal": 0,
          "vehicleVesselTotal": 0,
          "compulsoryStart": "",
          "insurances": {
            "DAMAGE": {
              "quota": 0,
              "price": 0
            },
            "DAMAGE_DEDUCTIBLE": {
              "quota": 0,
              "price": 0
            },
            "THIRD": {
              "quota": 0,
              "price": 0
            },
            "THIRD_DEDUCTIBLE": {
              "quota": 0,
              "price": 0
            },
            "DRIVER": {
              "quota": 0,
              "price": 0
            },
            "DRIVER_DEDUCTIBLE": {
              "quota": 0,
              "price": 0
            },
            "PASSENGER": {
              "quota": 0,
              "price": 0
            },
            "PASSENGER_DEDUCTIBLE": {
              "quota": 0,
              "price": 0
            }
          }
        }
      }
    };
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
      return year + "-" + month.substr(-2) + "-" + date.substr(-2) + '   ' + hour.substr(-2) + ':' + min.substr(-2)
    },

    getInfo(id) {
      let payload = {
        employeeId: window.localStorage.getItem('employeeId'),
        policyId: id,
      }

      payload = JSON.stringify(payload);

      autoApi({
        action: 'vehicle_policy',
        version: '1.0',
        payload: payload
      }, window.localStorage.getItem('token')).then((res) => {
        if (res.code == 0) {
          if (res.attach) {
            let data = res.attach;
            let tableData = this.tableData;
            tableData.license = data.license;
            tableData.engine = data.engine;
            tableData.vin = data.vin;
            tableData.enrollDate = data.enrollDate; //注册日期
            tableData.name = data.name;
            tableData.transfer = data.transfer;
            if (data.commercialDetail) {
              tableData.price = data.price; //新车购置价
            }
            tableData.seatCount = data.seat; //座位数
            // if (data.owner) {
            tableData.owner.name = data.owner;
            // tableData.owner.idType = data.owner.idType;
            tableData.owner.idNo = data.idNo;
            // }
            if (data.commercialDetail) {
              tableData.schema.commercialStart = data.commercialDetail.startDate;
              tableData.schema.commericialTotal = data.commercialDetail.price
            }
            if (data.compulsoryDetail) {
              tableData.schema.compulsoryStart = data.compulsoryDetail.startDate;
              tableData.schema.compulsoryTotal = data.compulsoryDetail.price
                //车船税合计
              tableData.schema.vehicleVesselTotal = data.compulsoryDetail.vesselPrice;
            }
            if (data.insurances) {
              if (data.insurances.DAMAGE) {
                tableData.schema.insurances.DAMAGE.quota = data.insurances.DAMAGE.quota
                tableData.schema.insurances.DAMAGE.price = data.insurances.DAMAGE.price
              }
              if (data.insurances.THIRD) {
                tableData.schema.insurances.THIRD.quota = data.insurances.THIRD.quota;
                tableData.schema.insurances.THIRD.price = data.insurances.THIRD.price;
              }
              if (data.insurances.DRIVER) {
                tableData.schema.insurances.DRIVER.quota = data.insurances.DRIVER.quota;
                tableData.schema.insurances.DRIVER.price = data.insurances.DRIVER.price;
              }
              if (data.insurances.PASSENGER) {
                tableData.schema.insurances.PASSENGER.quota = data.insurances.PASSENGER.quota;
                tableData.schema.insurances.PASSENGER.price = data.insurances.PASSENGER.price;
              }
              if (data.insurances.DAMAGE_DEDUCTIBLE) {
                tableData.schema.insurances.DAMAGE_DEDUCTIBLE.quota = data.insurances.DAMAGE_DEDUCTIBLE.quota;
                tableData.schema.insurances.DAMAGE_DEDUCTIBLE.price = data.insurances.DAMAGE_DEDUCTIBLE.price;
              }
              if (data.insurances.THIRD) {
                tableData.schema.insurances.THIRD.quota = data.insurances.THIRD.quota;
                tableData.schema.insurances.THIRD.price = data.insurances.THIRD.price;
              }
              if (data.insurances.THIRD_DEDUCTIBLE) {
                tableData.schema.insurances.THIRD_DEDUCTIBLE.quota = data.insurances.THIRD_DEDUCTIBLE.quota;
                tableData.schema.insurances.THIRD_DEDUCTIBLE.price = data.insurances.THIRD_DEDUCTIBLE.price;
              }
              if (data.insurances.DRIVER_DEDUCTIBLE) {
                tableData.schema.insurances.DRIVER_DEDUCTIBLE.quota = data.insurances.DRIVER_DEDUCTIBLE.quota;
                tableData.schema.insurances.DRIVER_DEDUCTIBLE.price = data.insurances.DRIVER_DEDUCTIBLE.price;
              }
              if (data.insurances.PASSENGER_DEDUCTIBLE) {
                tableData.schema.insurances.PASSENGER_DEDUCTIBLE.quota = data.insurances.PASSENGER_DEDUCTIBLE.quota;
                tableData.schema.insurances.PASSENGER_DEDUCTIBLE.price = data.insurances.PASSENGER_DEDUCTIBLE.price;
              }
            }

            if (data.schema) {
              // tableData.schema.commercialStart = data.schema.commercialStart;
              // tableData.schema.compulsoryStart = data.schema.compulsoryStart;
              // tableData.schema.commericialTotal = data.schema.commericialTotal;
              // tableData.schema.compulsoryTotal = data.schema.compulsoryTotal;
              // tableData.schema.vehicleVesselTotal = data.schema.vehicleVesselTotal;
            }
            this.tableData = tableData;
          }
        }
      })
    },

    goback() {
      router.push({
        name: "shop-order-policyList"
      })
    }
  },
  mounted() {
    if (this.$route.query) {
      this.getInfo(this.$route.query.id);
    }
  }
}
</script>
<style lang="less">
.policyDetailBody {
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
}
</style>
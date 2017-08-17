<template>
	<div>
		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item>模块权限设置</el-breadcrumb-item>
		</el-breadcrumb>

		<el-tree
		  :data="data2"
		  show-checkbox
		  default-expand-all
		  node-key="id"
		  ref="tree"
		  highlight-current
		  :props="defaultProps">
		</el-tree>

	</div>
</template>
<script>
import { masterApi } from '@/ajax/post.js'

	export default {
	    data() {
	      return {
	        form: {},
	        data2: [{
	          id: 1,
	          label: '一级 1',
	          children: [{
	            id: 4,
	            label: '二级 1-1',
	            children: [{
	              id: 9,
	              label: '三级 1-1-1'
	            }, {
	              id: 10,
	              label: '三级 1-1-2'
	            }]
	          }]
	        }, {
	          id: 2,
	          label: '一级 2',
	          children: [{
	            id: 5,
	            label: '二级 2-1'
	          }, {
	            id: 6,
	            label: '二级 2-2'
	          }]
	        }, {
	          id: 3,
	          label: '一级 3',
	          children: [{
	            id: 7,
	            label: '二级 3-1'
	          }, {
	            id: 8,
	            label: '二级 3-2'
	          }]
	        }],
	        defaultProps: {
	          children: 'children',
	          label: 'label'
	        },
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

			getInfo() {
				// masterApi({
				// 	action: 'modulars_admin',
				// 	version: '1.0',
				// },window.localStorage.getItem('tokenPlate')).then((res)=> {
					let res = {
							code: 0, 
							attach: {
								1: {
									node: {
										name: '平台管理',
										created: 1501827835,
										updated: 1501827835,
										left: 0,
										right: 15,
										id: 1,
										layer: 1,
									},
									children: {
										2: {
											node: {
												name: '用户管理',
												created: 1501829430,
												updated: 1501829430,
												left: 1,
												right: 4,
												id: 2,
												layer: 2,
												parentId: 1,
											},
											children: {
												32: {
													node: {
														name: '商户编辑',
														created: 1501829812,
														updated: 1501838261,
														left: 2,
														right: 3,
														id: 32,
														layer: 3,
														parentId: 2,
													}
												}
											}
										}
									}
								}
							},
							createTime: 1501898496089,
							messageType: 2,
						}
				// })
				this.drawTree(res.attach);
			},

			drawTree(nodeData) {
				var countDeep = 0;
				var formData = [];
				function deep(data) {
					for (let children in data) {
						let buf = {
							id: data[children].node.id,
							label: data[children].node.name,
							children: data[children].children
						}
						formData.push(buf);
						if (data[children].children) {
							deep(data[children].children);
						}
					}
				}

				deep(nodeData);
				debugger
				alert('数据总层数:' + countDeep);
			},

			handleCheckChange(data, checked, indeterminate) {
		        console.log(data, checked, indeterminate);
		      },
		   
	    },
	    mounted(){
	        this.getInfo();
	    }
	}
</script>
<style lang="less">
	.appbox{
		margin-top: 20px;
		.appblock{
			width: 50%;
			float: left;
		}
	}
</style>
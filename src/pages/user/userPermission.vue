<template>
	<div class="GMPermissionBody">
		<el-breadcrumb separator="/">
		  	<el-breadcrumb-item :to="{name:'shop-user-list'}">用户列表</el-breadcrumb-item>
		  	<el-breadcrumb-item>用户授权-{{$route.query.name}}</el-breadcrumb-item>
		</el-breadcrumb>

		<div class="contentBox">
			<el-tree
			  :data="dataTree"
			  show-checkbox
			  default-expand-all
			  node-key="id"
			  ref="tree"
			  highlight-current
			  :props="defaultProps"
			  :expand-on-click-node="false"
			  :check-strictly="true"
			  :default-checked-keys="choosed"
			  @check-change="handleCheckChange">
			</el-tree>
		</div>
		
		<div style="margin-left: 120px;margin-top: 20px;">
			<el-button @click="goback">取消</el-button>
			<el-button type="primary" @click="comfirmSave">保存授权</el-button>
		</div>
	</div>
</template>
<script>
import { autoApi } from '@/ajax/post.js'

	export default {
	    data() {
	      return {
	      	id: null,
        	dataTree: [],
        	sourceData: {},	//数据缓存
        	choosed: [],
	        defaultProps: {
	          children: 'children',
	          label: 'label',
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
				autoApi({
					action: 'modulars_user',
					version: '1.0',
				},window.localStorage.getItem('token')).then((res)=> {
					this.sourceData = res.attach;
					this.drawTree(res.attach);
				})
				
			},

			drawTree(nodeData) {
				function deep(data,formData) {//递归处理数据,将对象转化成对象数组并精简数据
					for (let children in data) {
						let buf = {
							id: data[children].node.id,
							label: data[children].node.name,
							children: []
						}
						formData.push(buf);
						for (let i = 0; i < formData.length; i++) {
							if (formData[i].id == children) {//判断子节点的归属
								deep(data[children].children,formData[i].children,checkRepeat);
							}
						}
					}
				}
				
				let formData = [];
				let checkRepeat = [];
				deep(nodeData,formData);
				this.dataTree = formData;
				console.log(formData);
			},

			handleCheckChange(data, checked, indeterminate) {
				//data:传递给 data 属性的数组中该节点所对应的对象、
				//checked:节点本身是否被选中、
				//indeterminate:节点的子树中是否有被选中的节点
				if (checked) {
					for (let i = 0; i < this.choosed.length; i++) {//基于树形控件的事件返回机制作出的补充,防止同一个id被push多次
						if (this.choosed[i] == data.id) {
							return
						}
					}
					this.choosed.push(data.id);
					//如果子节点被选中,父节点也被选中
					function traversal(data,formData) {//遍历树的数据,展开并保留父子关系的记录
						for (let i in data) {
							formData.push(data[i]);
							if (data[i].children) {
							    traversal(data[i].children,formData);
							}
						}
					}
					let formData = [];
					let parent = [];
					traversal(this.dataTree,formData);
					function findParent(data,id,parent) {//data为travelsal展开后的二维数据,id为子节点id,parent为寻找到的父节点id数组
						for (let i = 0; i < data.length; i++) {
							if (data[i].children) {
								for (let j = 0; j < data[i].children.length; j++) {
									if (data[i].children[j].id == id) {
										parent.push(data[i].id);
										findParent(data,data[i].id,parent);//找到父节点后,继续寻找父节点的父节点
									}
								}
							}
						}
					}
					findParent(formData,data.id,parent);
					//parent 数组与 this.choosed数组去重合并
					for (let i = 0; i < parent.length; i++) {
						var isParentChoosed = false;
						for (let j = 0; j < this.choosed.length; j++) {
							if(this.choosed[j] == parent[i]) {
								isParentChoosed = true;
							}
						}
						if (!isParentChoosed) {
							this.choosed.push(parent[i]);
						}
					}
				}
				else
				{
					for (let i = 0; i < this.choosed.length; i++) {
						if (this.choosed[i] == data.id) {
							this.choosed.splice(i,1)
						}
					}
					//如果父节点被取消,子节点也被取消
					function findChildren(data,children) {//data为以父节点所在的节点为根节点的树,children为父节点所有的子节点id数组
						for (let i = 0; i < data.length; i++) {
							children.push(data[i].id);
							if (data[i].children) {
								findChildren(data[i].children,children)
							}
						}
					}
					let children = [];
					if (data.children) { //若父节点有子节点,则找出所有子节点
						findChildren(data.children,children);
					}
					//去除子节点的选中状态(如果子节点id在choosed数组里的话)
					for (let i = 0; i < children.length; i++) {
						for (let j = 0; j < this.choosed.length; j++) {
							if (this.choosed[j] == children[i]) {
								this.choosed.splice(j,1);
							}
						}
					}
				}

				this.$refs.tree.setCheckedKeys(this.choosed,false);

				//因为element选中逻辑和需求不一致,因此重写了逻辑
			},

			comfirmSave() {
				let payload = {
					tarId: this.id,
					modulars: this.choosed,
				}
				payload = JSON.stringify(payload);
				autoApi({
					action: 'authorize_user',
					version: '1.0',
					payload: payload
				},window.localStorage.getItem('token')).then((res)=> {
					this.$message({
						message: '授予模块成功',
						type: 'success',
					});
					router.push({
				  	  name: "shop-user-list"
				    });

				})
			},

			goback() {
				router.push({
			  	  name: "shop-user-list"
			    })
			}
	    },
	    mounted(){
	        if (this.$route.query.id) {
	        	this.id = this.$route.query.id;
	        }
	        this.getInfo();
	    }
	}
</script>
<style lang="less">
	.GMPermissionBody{
		.contentBox{
			margin-top: 20px;
			margin-left: 10px;
		}
	}
</style>
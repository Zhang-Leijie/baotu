import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
	{
        path: "/sign-in",
        name: "sign-in",
        component(resolve) {
            require(['./pages/sign-in.vue'],resolve)
        }
    },{
        path: "/setcode",
        name: "setcode",
        component(resolve) {
            require(['./pages/setCode.vue'],resolve)
        }
    },{
        path: "/home",
        name: "home",
        component(resolve) {
            require(['./pages/home.vue'],resolve)
        },
        children: []
    },{
        path: "/shop/home",
        name: "shopHome",
        component(resolve) {
            require(['./pages/shop/shopHome.vue'],resolve)
        },
        children: [{
            path: "/shop/Sbusiness",
            name: 'shop-set-business',
            component(resolve) {
                require(['./pages/shop/setting/business.vue'],resolve)
            }
        },{
            path: "/shop/rewardVerify",
            name: 'shop-set-rewardVerify',
            component(resolve) {
                require(['./pages/shop/setting/rewardVerify.vue'],resolve)
            }
        },{
            path: "/shop/rewardVerifyDetail",
            name: 'shop-set-rewardVerifyDetail',
            component(resolve) {
                require(['./pages/shop/setting/rewardVerifyDetail.vue'],resolve)
            }
        },{
            path: "/shop/reward",
            name: 'shop-set-reward',
            component(resolve) {
                require(['./pages/shop/setting/reward.vue'],resolve)
            }
        },{
            path: "/shop/phoneClient",
            name: 'shop-set-phoneClient',
            component(resolve) {
                require(['./pages/shop/setting/phoneClient.vue'],resolve)
            }
        },{
            path: "/shop/moneyClient",
            name: 'shop-set-moneyClient',
            component(resolve) {
                require(['./pages/shop/setting/moneyClient.vue'],resolve)
            }
        },{
            path: "/shop/insuranceN",
            name: 'shop-set-insuranceN',
            component(resolve) {
                require(['./pages/shop/setting/insuranceN.vue'],resolve)
            }
        },{
            path: "/shop/log",
            name: 'shop-msg-log',
            component(resolve) {
                require(['./pages/shop/message/log.vue'],resolve)
            }
        },{
            path: "/shop/business",
            name: 'shop-msg-business',
            component(resolve) {
                require(['./pages/shop/message/business.vue'],resolve)
            }
        },{
            path: "/shop/notice",
            name: 'shop-msg-notice',
            component(resolve) {
                require(['./pages/shop/message/notice.vue'],resolve)
            }
        },{
            path: "/shop/notice-add",
            name: 'shop-msg-noticeadd',
            component(resolve) {
                require(['./pages/shop/message/noticeAdd.vue'],resolve)
            }
        },{
            path: "/shop/notice-check",
            name: 'shop-msg-noticecheck',
            component(resolve) {
                require(['./pages/shop/message/noticeCheck.vue'],resolve)
            }
        },{
            path: "/shop/autoinsurance-manage",
            name: 'shop-autoinsurance-manage',
            component(resolve) {
                require(['./pages/shop/product/autoInsuranceManage.vue'],resolve)
            }
        },{
            path: "/shop/autoinsurance-ratio",
            name: 'shop-autoinsurance-ratio',
            component(resolve) {
                require(['./pages/shop/product/autoInsuranceRatio.vue'],resolve)
            }
        },{
            path: "/shop/rollImg",
            name: 'shop-run-rollimg',
            component(resolve) {
                require(['./pages/shop/run/rollImg.vue'],resolve)
            }
        },{
            path: "/shop/qa-list",
            name: 'shop-run-qalist',
            component(resolve) {
                require(['./pages/shop/run/qaList.vue'],resolve)
            }
        },{
            path: "/shop/qa-detail",
            name: 'shop-run-qadetail',
            component(resolve) {
                require(['./pages/shop/run/qaDetail.vue'],resolve)
            }
        },{
            path: "/shop/news-list",
            name: 'shop-run-newslist',
            component(resolve) {
                require(['./pages/shop/run/newslist.vue'],resolve)
            }
        },{
            path: "/shop/news-detail",
            name: 'shop-run-newsdetail',
            component(resolve) {
                require(['./pages/shop/run/newsDetail.vue'],resolve)
            }
        },{
            path: "/shop/news-add",
            name: 'shop-run-newsadd',
            component(resolve) {
                require(['./pages/shop/run/newsAdd.vue'],resolve)
            }
        },{
            path: "/shop/news-edit",
            name: 'shop-run-newsedit',
            component(resolve) {
                require(['./pages/shop/run/newsEdit.vue'],resolve)
            }
        },{
            path: "/shop/user-list",
            name: 'shop-user-list',
            component(resolve) {
                require(['./pages/shop/user/userList.vue'],resolve)
            }
        },{
            path: "/shop/verify",
            name: 'shop-verify',
            component(resolve) {
                require(['./pages/shop/user/verify.vue'],resolve)
            }
        },{
            path: "/shop/staff-list",
            name: 'shop-staff-list',
            component(resolve) {
                require(['./pages/shop/user/staffList.vue'],resolve)
            }
        },{
            path: "/shop/staff-add",
            name: 'shop-staff-add',
            component(resolve) {
                require(['./pages/shop/user/staffAdd.vue'],resolve)
            }
        },{
            path: "/shop/staff-edit",
            name: 'shop-staff-edit',
            component(resolve) {
                require(['./pages/shop/user/staffEdit.vue'],resolve)
            }
        },{
            path: "/shop/role-list",
            name: 'shop-role-list',
            component(resolve) {
                require(['./pages/shop/user/roleList.vue'],resolve)
            }
        },{
            path: "/shop/role-add",
            name: 'shop-role-add',
            component(resolve) {
                require(['./pages/shop/user/roleAdd.vue'],resolve)
            }
        },{
            path: "/shop/role-edit",
            name: 'shop-role-edit',
            component(resolve) {
                require(['./pages/shop/user/roleEdit.vue'],resolve)
            }
        },{
            path: "/shop/shop-list",
            name: 'shop-shop-list',
            component(resolve) {
                require(['./pages/shop/user/shopList.vue'],resolve)
            }
        },{
            path: "/shop/shop-add",
            name: 'shop-shop-add',
            component(resolve) {
                require(['./pages/shop/user/shopAdd.vue'],resolve)
            }
        },{
            path: "/shop/shop-edit",
            name: 'shop-shop-edit',
            component(resolve) {
                require(['./pages/shop/user/shopEdit.vue'],resolve)
            }
        },{
            path: "/shop/order-autoinsurance",
            name: 'shop-order-autoinsurance',
            component(resolve) {
                require(['./pages/shop/order/autoInsuranceOrders.vue'],resolve)
            }
        },{
            path: "/shop/order-autoInsuranceOrderDetail",
            name: 'shop-order-autoInsuranceOrderDetail',
            component(resolve) {
                require(['./pages/shop/order/autoInsuranceOrderDetail.vue'],resolve)
            }
        },{
            path: "/shop/statistic-statisticManage",
            name: 'shop-statistic-statisticManage',
            component(resolve) {
                require(['./pages/shop/statistic/statisticManage.vue'],resolve)
            }
        },{
            path: "/shop/order-policyList",
            name: 'shop-order-policyList',
            component(resolve) {
                require(['./pages/shop/order/policyList.vue'],resolve)
            }
        },{
            path: "/shop/order-policyDetail",
            name: 'shop-order-policyDetail',
            component(resolve) {
                require(['./pages/shop/order/policyDetail.vue'],resolve)
            }
        },{
            path: "/shop/home",
            redirect: '/shop/shop-list'
        }]
    },{
        path: "/admin/home",
        name: "adminHome",
        component(resolve) {
            require(['./pages/admin/adminHome.vue'],resolve)
        },
        children: [{
            path: "/admin/order",
            name: 'admin-order-order',
            component(resolve) {
                require(['./pages/admin/order/order.vue'],resolve)
            }
        },{
            path: "/admin/sell",
            name: 'admin-order-sell',
            component(resolve) {
                require(['./pages/admin/order/sell.vue'],resolve)
            }
        },{
            path: "/admin/shareV",
            name: 'admin-setting-shareV',
            component(resolve) {
                require(['./pages/admin/product/shareVerify.vue'],resolve)
            }
        },{
            path: "/admin/tagM",
            name: 'admin-setting-tagM',
            component(resolve) {
                require(['./pages/admin/mall/tagM.vue'],resolve)
            }
        },{
            path: "/admin/productM-edit",
            name: 'admin-setting-productMedit',
            component(resolve) {
                require(['./pages/admin/mall/productMEdit.vue'],resolve)
            }
        },{
            path: "/admin/productM-edit",
            name: 'admin-setting-productMedit',
            component(resolve) {
                require(['./pages/admin/mall/productMEdit.vue'],resolve)
            }
        },{
            path: "/admin/productM-add",
            name: 'admin-setting-productMadd',
            component(resolve) {
                require(['./pages/admin/mall/productMAdd.vue'],resolve)
            }
        },{
            path: "/admin/productM",
            name: 'admin-setting-productM',
            component(resolve) {
                require(['./pages/admin/mall/productM.vue'],resolve)
            }
        },{
            path: "/admin/carSDetail",
            name: 'admin-setting-carSDetail',
            component(resolve) {
                require(['./pages/admin/setting/carSDetail.vue'],resolve)
            }
        },{
            path: "/admin/carS",
            name: 'admin-setting-carS',
            component(resolve) {
                require(['./pages/admin/setting/carS.vue'],resolve)
            }
        },{
            path: "/admin/suggest",
            name: 'admin-setting-suggest',
            component(resolve) {
                require(['./pages/admin/setting/suggest.vue'],resolve)
            }
        },{
            path: "/admin/system",
            name: 'admin-setting-system',
            component(resolve) {
                require(['./pages/admin/setting/system.vue'],resolve)
            }
        },{
            path: "/admin/uncar-list",
            name: 'admin-uncar-list',
            component(resolve) {
                require(['./pages/admin/product/uncarList.vue'],resolve)
            }
        },{
            path: "/admin/uncar-add",
            name: 'admin-uncar-add',
            component(resolve) {
                require(['./pages/admin/product/uncarAdd.vue'],resolve)
            }
        },{
            path: "/admin/uncar-edit",
            name: 'admin-uncar-edit',
            component(resolve) {
                require(['./pages/admin/product/uncarEdit.vue'],resolve)
            }
        },{
            path: "/admin/uncar-manage",
            name: 'admin-uncar-manage',
            component(resolve) {
                require(['./pages/admin/product/uncarManage.vue'],resolve)
            }
        },{
            path: "/admin/uncar-manageAdd",
            name: 'admin-uncar-manageAdd',
            component(resolve) {
                require(['./pages/admin/product/uncarManageAdd.vue'],resolve)
            }
        },{
            path: "/admin/uncar-manageEdit",
            name: 'admin-uncar-manageEdit',
            component(resolve) {
                require(['./pages/admin/product/uncarManageEdit.vue'],resolve)
            }
        },{
            path: "/admin/app-list",
            name: 'admin-app-list',
            component(resolve) {
                require(['./pages/admin/user/appList.vue'],resolve)
            }
        },{
            path: "/admin/app-add",
            name: 'admin-app-add',
            component(resolve) {
                require(['./pages/admin/user/appAdd.vue'],resolve)
            }
        },{
            path: "/admin/app-edit",
            name: 'admin-app-edit',
            component(resolve) {
                require(['./pages/admin/user/appEdit.vue'],resolve)
            }
        },{
            path: "/admin/user-list",
            name: 'admin-user-list',
            component(resolve) {
                require(['./pages/admin/user/userList.vue'],resolve)
            }
        },{
            path: "/admin/user-edit",
            name: 'admin-user-edit',
            component(resolve) {
                require(['./pages/admin/user/userEdit.vue'],resolve)
            }
        },{
            path: "/admin/user-add",
            name: 'admin-user-add',
            component(resolve) {
                require(['./pages/admin/user/userAdd.vue'],resolve)
            }
        },{
            path: "/admin/shop-list",
            name: 'admin-shop-list',
            component(resolve) {
                require(['./pages/admin/user/shopList.vue'],resolve)
            }
        },{
            path: "/admin/shop-edit",
            name: 'admin-shop-edit',
            component(resolve) {
                require(['./pages/admin/user/shopEdit.vue'],resolve)
            }
        },{
            path: "/admin/home",
            redirect: '/admin/user-list'
        }]
    },{
        path: "/",
        redirect: '/sign-in'
    }
]

export default new VueRouter({
	routes
})

export const routerState = {
  previous: null
}
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
            require(['./pages/mainBase.vue'],resolve)
        },
        children: [{
            path: "/shop/Sbusiness",
            name: 'shop-set-business',
            component(resolve) {
                require(['./pages/setting/business.vue'],resolve)
            }
        },{
            path: "/shop/rewardVerify",
            name: 'shop-set-rewardVerify',
            component(resolve) {
                require(['./pages/setting/rewardVerify.vue'],resolve)
            }
        },{
            path: "/shop/rewardVerifyDetail",
            name: 'shop-set-rewardVerifyDetail',
            component(resolve) {
                require(['./pages/setting/rewardVerifyDetail.vue'],resolve)
            }
        },{
            path: "/shop/reward",
            name: 'shop-set-reward',
            component(resolve) {
                require(['./pages/setting/reward.vue'],resolve)
            }
        },{
            path: "/shop/phoneClient",
            name: 'shop-set-phoneClient',
            component(resolve) {
                require(['./pages/setting/phoneClient.vue'],resolve)
            }
        },{
            path: "/shop/moneyClient",
            name: 'shop-set-moneyClient',
            component(resolve) {
                require(['./pages/setting/moneyClient.vue'],resolve)
            }
        },{
            path: "/shop/insuranceN",
            name: 'shop-set-insuranceN',
            component(resolve) {
                require(['./pages/setting/insuranceN.vue'],resolve)
            }
        },{
            path: "/shop/log",
            name: 'shop-msg-log',
            component(resolve) {
                require(['./pages/message/log.vue'],resolve)
            }
        },{
            path: "/shop/business",
            name: 'shop-msg-business',
            component(resolve) {
                require(['./pages/message/business.vue'],resolve)
            }
        },{
            path: "/shop/notice",
            name: 'shop-msg-notice',
            component(resolve) {
                require(['./pages/message/notice.vue'],resolve)
            }
        },{
            path: "/shop/notice-add",
            name: 'shop-msg-noticeadd',
            component(resolve) {
                require(['./pages/message/noticeAdd.vue'],resolve)
            }
        },{
            path: "/shop/notice-check",
            name: 'shop-msg-noticecheck',
            component(resolve) {
                require(['./pages/message/noticeCheck.vue'],resolve)
            }
        },{
            path: "/shop/autoinsurance-manage",
            name: 'shop-autoinsurance-manage',
            component(resolve) {
                require(['./pages/product/autoInsuranceManage.vue'],resolve)
            }
        },{
            path: "/shop/autoinsurance-ratio",
            name: 'shop-autoinsurance-ratio',
            component(resolve) {
                require(['./pages/product/autoInsuranceRatio.vue'],resolve)
            }
        },{
            path: "/shop/rollImg",
            name: 'shop-run-rollimg',
            component(resolve) {
                require(['./pages/run/rollImg.vue'],resolve)
            }
        },{
            path: "/shop/qa-list",
            name: 'shop-run-qalist',
            component(resolve) {
                require(['./pages/run/qaList.vue'],resolve)
            }
        },{
            path: "/shop/qa-detail",
            name: 'shop-run-qadetail',
            component(resolve) {
                require(['./pages/run/qaDetail.vue'],resolve)
            }
        },{
            path: "/shop/news-list",
            name: 'shop-run-newslist',
            component(resolve) {
                require(['./pages/run/newslist.vue'],resolve)
            }
        },{
            path: "/shop/news-detail",
            name: 'shop-run-newsdetail',
            component(resolve) {
                require(['./pages/run/newsDetail.vue'],resolve)
            }
        },{
            path: "/shop/news-add",
            name: 'shop-run-newsadd',
            component(resolve) {
                require(['./pages/run/newsAdd.vue'],resolve)
            }
        },{
            path: "/shop/news-edit",
            name: 'shop-run-newsedit',
            component(resolve) {
                require(['./pages/run/newsEdit.vue'],resolve)
            }
        },{
            path: "/shop/user-list",
            name: 'shop-user-list',
            component(resolve) {
                require(['./pages/user/userList.vue'],resolve)
            }
        },{
            path: "/shop/user-permission",
            name: 'shop-user-permission',
            component(resolve) {
                require(['./pages/user/userPermission.vue'],resolve)
            }
        },{
            path: "/shop/verify",
            name: 'shop-verify',
            component(resolve) {
                require(['./pages/user/verify.vue'],resolve)
            }
        },{
            path: "/shop/staff-list",
            name: 'shop-staff-list',
            component(resolve) {
                require(['./pages/user/staffList.vue'],resolve)
            }
        },{
            path: "/shop/staff-add",
            name: 'shop-staff-add',
            component(resolve) {
                require(['./pages/user/staffAdd.vue'],resolve)
            }
        },{
            path: "/shop/staff-edit",
            name: 'shop-staff-edit',
            component(resolve) {
                require(['./pages/user/staffEdit.vue'],resolve)
            }
        },{
            path: "/shop/staff-permission",
            name: 'shop-staff-permission',
            component(resolve) {
                require(['./pages/user/staffPermission.vue'],resolve)
            }
        },{
            path: "/shop/role-list",
            name: 'shop-role-list',
            component(resolve) {
                require(['./pages/user/roleList.vue'],resolve)
            }
        },{
            path: "/shop/role-add",
            name: 'shop-role-add',
            component(resolve) {
                require(['./pages/user/roleAdd.vue'],resolve)
            }
        },{
            path: "/shop/role-edit",
            name: 'shop-role-edit',
            component(resolve) {
                require(['./pages/user/roleEdit.vue'],resolve)
            }
        },{
            path: "/shop/shop-list",
            name: 'shop-shop-list',
            component(resolve) {
                require(['./pages/user/shopList.vue'],resolve)
            }
        },{
            path: "/shop/shop-add",
            name: 'shop-shop-add',
            component(resolve) {
                require(['./pages/user/shopAdd.vue'],resolve)
            }
        },{
            path: "/shop/shop-edit",
            name: 'shop-shop-edit',
            component(resolve) {
                require(['./pages/user/shopEdit.vue'],resolve)
            }
        },{
            path: "/shop/shop-permission",
            name: 'shop-shop-permission',
            component(resolve) {
                require(['./pages/user/shopPermission.vue'],resolve)
            }
        },{
            path: "/shop/order-autoinsurance",
            name: 'shop-order-autoinsurance',
            component(resolve) {
                require(['./pages/order/autoInsuranceOrders.vue'],resolve)
            }
        },{
            path: "/shop/order-autoInsuranceOrderDetail",
            name: 'shop-order-autoInsuranceOrderDetail',
            component(resolve) {
                require(['./pages/order/autoInsuranceOrderDetail.vue'],resolve)
            }
        },{
            path: "/shop/statistic-statisticManage",
            name: 'shop-statistic-statisticManage',
            component(resolve) {
                require(['./pages/statistic/statisticManage.vue'],resolve)
            }
        },{
            path: "/shop/order-policyList",
            name: 'shop-order-policyList',
            component(resolve) {
                require(['./pages/order/policyList.vue'],resolve)
            }
        },{
            path: "/shop/order-policyDetail",
            name: 'shop-order-policyDetail',
            component(resolve) {
                require(['./pages/order/policyDetail.vue'],resolve)
            }
        },{
            path: "/shop/home",
            redirect: '/shop/shop-list'
        },{
            path: "/welcome/shopWelcome",
            name: 'shopWelcome',
            component(resolve) {
                require(['./pages/welcome/shopWelcome.vue'],resolve)
            }
        },{
            path: "/welcome/adminWelcome",
            name: 'adminWelcome',
            component(resolve) {
                require(['./pages/welcome/adminWelcome.vue'],resolve)
            }
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
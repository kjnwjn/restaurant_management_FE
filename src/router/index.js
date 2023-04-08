import Vue from "vue";
import VueRouter from "vue-router";
import auth from "@/middlewares/auth";
import getMenuData from "@/middlewares/getMenuData";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "index",
        beforeEnter: () => {
            router.push("/dashboard/table");
        },
    },
    {
        path: "/home",
        name: "home",
        beforeEnter: auth,
        component: () => import(/* webpackChunkName: "home" */ "../views/POSView.vue"),
    },
    {
        path: "/client/table/:tableId",
        name: "client/table",
        beforeEnter: getMenuData,
        component: () => import(/* webpackChunkName: "client/table" */ "../views/TableView.vue"),
    },
    {
        path: "/client/table/:tableId/order-session",
        name: "client/table/order-session",
        component: () => import(/* webpackChunkName: "client/table" */ "../views/OrderPending.vue"),
    },
    {
        path: "/client/table/:tableId/:categoryId",
        name: "client/table",
        beforeEnter: getMenuData,
        component: () => import(/* webpackChunkName: "client/table" */ "../views/TableView.vue"),
    },

    {
        path: "/dashboard/account",
        name: "dashboardAccount",
        beforeEnter: auth,
        component: () => import(/* webpackChunkName: "dashboardAccount" */ "../views/dashboard/AccountList.vue"),
    },
    {
        path: "/dashboard/account/register",
        name: "dashboardRegister",
        beforeEnter: auth,
        component: () => import(/* webpackChunkName: "dashboardRegister" */ "../views/dashboard/AccountNew.vue"),
    },
    {
        path: "/dashboard/food/category",
        name: "foodCategory",
        beforeEnter: auth,
        component: () => import(/* webpackChunkName: "foodCategory" */ "../views/dashboard/FoodCategory.vue"),
    },
    {
        path: "/dashboard/food/dish",
        name: "foodDish",
        beforeEnter: auth,
        component: () => import(/* webpackChunkName: "foodDish" */ "../views/dashboard/FoodDish.vue"),
    },
    {
        path: "/dashboard/table",
        name: "dashboardTable",
        beforeEnter: auth,
        component: () => import(/* webpackChunkName: "dashboardTable" */ "../views/dashboard/TableManagement.vue"),
    },
    {
        path: "/dashboard/table/:tableId/:orderId",
        name: "dashboardTableDetail",
        beforeEnter: auth,
        component: () => import(/* webpackChunkName: "dashboardTable" */ "../views/OrderDetailManagement.vue"),
    },

    {
        path: "/dashboard/order",
        name: "/dashboard/order",
        beforeEnter: auth,
        component: () => import(/* webpackChunkName: "Order" */ "../views/OrderManagement.vue"),
    },
    {
        path: "/dashboard/order/payment/:orderId",
        name: "dashboardOrderPayment",
        beforeEnter: auth,
        component: () => import(/* webpackChunkName: "Order" */ "../views/OrderPaymentManagement.vue"),
    },
    {
        path: "/dashboard/order/orderNew/:tableId",
        name: "dashboardOrderNew",
        beforeEnter: auth,
        component: () => import(/* webpackChunkName: "Order" */ "../views/OrderNew.vue"),
    },
    {
        path: "/dashboard/pendingOrder",
        name: "/dashboard/pendingOrder",
        beforeEnter: auth,
        component: () => import(/* webpackChunkName: "Order" */ "../views/PendingOrderManagement.vue"),
    },
    {
        path: "/login",
        name: "login",
        component: () => import(/* webpackChunkName: "login" */ "../views/LoginView.vue"),
    },
    {
        path: "*",
        name: "notfound",
        beforeEnter: auth,
        component: () => import(/* webpackChunkName: "notfound" */ "../views/NotFound.vue"),
    },
];

const router = new VueRouter({
    mode: "history",
    linkExactActiveClass: "is-active",
    base: process.env.BASE_URL,
    routes,
});

export default router;

import Vue from "vue";
import VueRouter from "vue-router";
import auth from "@/middlewares/auth";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "home",
        beforeEnter: () => {
            router.push("/pos");
        },
    },
    {
        path: "/pos",
        name: "pos",
        beforeEnter: auth,
        component: () => import(/* webpackChunkName: "pos" */ "../views/POSView.vue"),
    },
    {
        path: "/transaction/:transactionID",
        name: "transactionDetail",
        beforeEnter: auth,
        component: () => import(/* webpackChunkName: "transactionDetail" */ "../views/TransactionView.vue"),
    },
    {
        path: "/dashboard/account",
        name: "dashboardAccount",
        beforeEnter: auth,
        component: () => import(/* webpackChunkName: "dashboardAccount" */ "../views/dashboard/AccountList.vue"),
    },
    {
        path: "/dashboard/account/:userCode/detail",
        name: "dashboardAccountDetail",
        beforeEnter: auth,
        component: () => import(/* webpackChunkName: "dashboardAccountDetail" */ "../views/dashboard/AccountDetail.vue"),
    },
    {
        path: "/dashboard/account/register",
        name: "dashboardRegister",
        beforeEnter: auth,
        component: () => import(/* webpackChunkName: "dashboardRegister" */ "../views/dashboard/AccountNew.vue"),
    },
    {
        path: "/dashboard/product-list",
        name: "dashboardProduct",
        beforeEnter: auth,
        component: () => import(/* webpackChunkName: "dashboardProduct" */ "../views/dashboard/ProductList.vue"),
    },
    {
        path: "/dashboard/supplier-list",
        name: "dashboardProduct",
        beforeEnter: auth,
        component: () => import(/* webpackChunkName: "dashboardProduct" */ "../views/dashboard/SupplierList.vue"),
    },
    {
        path: "/dashboard/product-supplier/import",
        name: "dashboardProductImport",
        beforeEnter: auth,
        component: () => import(/* webpackChunkName: "dashboardProductImport" */ "../views/dashboard/ProductImport.vue"),
    },
    {
        path: "/dashboard/product/out-of-stock",
        name: "dashboardProductOutOfStock",
        beforeEnter: auth,
        component: () => import(/* webpackChunkName: "dashboardProductOutOfStock" */ "../views/dashboard/ProductStock.vue"),
    },
    {
        path: "/attendance",
        name: "attendance",
        beforeEnter: auth,
        component: () => import(/* webpackChunkName: "attendance" */ "../views/dashboard/AttendanceView.vue"),
    },
    {
        path: "/customer",
        name: "customer",
        beforeEnter: auth,
        component: () => import(/* webpackChunkName: "customer" */ "../views/dashboard/CustomerView.vue"),
    },
    {
        path: "/employee",
        name: "employee",
        beforeEnter: auth,
        component: () => import(/* webpackChunkName: "employee" */ "../views/dashboard/EmployeeView.vue"),
    },
    {
        path: "/employee/:userCode/detail",
        name: "employeeDetail",
        beforeEnter: auth,
        component: () => import(/* webpackChunkName: "employeeDetail" */ "../views/dashboard/EmployeeDetail.vue"),
    },
    {
        path: "/employee/salary/visualize",
        name: "employeeSalaryVisualize",
        beforeEnter: auth,
        component: () => import(/* webpackChunkName: "employeeSalaryVisualize" */ "../views/dashboard/EmployeeSalary.vue"),
    },
    {
        path: "/finance/sales",
        name: "financeSales",
        beforeEnter: auth,
        component: () => import(/* webpackChunkName: "financeSales" */ "../views/dashboard/FinanceSales.vue"),
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

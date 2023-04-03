import Vue from "vue";
import VueRouter from "vue-router";
import auth from "@/middlewares/auth";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "home",
        beforeEnter: () => {
            router.push("/home");
        },
    },
    {
        path: "/home",
        name: "home",
        beforeEnter: auth,
        component: () => import(/* webpackChunkName: "home" */ "../views/POSView.vue"),
    },
    {
        path: "/dashboard/account",
        name: "dashboardAccount",
        beforeEnter: auth,
        component: () => import(/* webpackChunkName: "dashboardAccount" */ "../views/dashboard/AccountList.vue"),
    },
    {
<<<<<<< HEAD
        path: "/dashboard/account/:userCode/detail",
        name: "dashboardAccountDetail",
        beforeEnter: auth,
        component: () =>
            import(/* webpackChunkName: "dashboardAccountDetail" */ "../views/dashboard/AccountDetail.vue"),
    },
    {
=======
>>>>>>> ebc2fa626c6f337e2e9a8c7db50a6fe2c41d5f38
        path: "/dashboard/account/register",
        name: "dashboardRegister",
        beforeEnter: auth,
        component: () => import(/* webpackChunkName: "dashboardRegister" */ "../views/dashboard/AccountNew.vue"),
    },
    {
<<<<<<< HEAD
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
        component: () =>
            import(/* webpackChunkName: "dashboardProductImport" */ "../views/dashboard/ProductImport.vue"),
    },
    {
        path: "/dashboard/product/out-of-stock",
        name: "dashboardProductOutOfStock",
        beforeEnter: auth,
        component: () =>
            import(/* webpackChunkName: "dashboardProductOutOfStock" */ "../views/dashboard/ProductStock.vue"),
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
        path: "/food/category",
=======
        path: "/dashboard/food/category",
>>>>>>> ebc2fa626c6f337e2e9a8c7db50a6fe2c41d5f38
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
<<<<<<< HEAD
        component: () => import(/* webpackChunkName: "employeeDetail" */ "../views/dashboard/EmployeeDetail.vue"),
    },
    {
        path: "/employee/salary/visualize",
        name: "employeeSalaryVisualize",
        beforeEnter: auth,
        component: () =>
            import(/* webpackChunkName: "employeeSalaryVisualize" */ "../views/dashboard/EmployeeSalary.vue"),
    },
    {
        path: "/finance/sales",
        name: "financeSales",
        beforeEnter: auth,
        component: () => import(/* webpackChunkName: "financeSales" */ "../views/dashboard/FinanceSales.vue"),
=======
        component: () => import(/* webpackChunkName: "dashboardTable" */ "../views/dashboard/TableManagement.vue"),
>>>>>>> ebc2fa626c6f337e2e9a8c7db50a6fe2c41d5f38
    },

    {
        path: "/pos",
        name: "pos",
        component: () => import(/* webpackChunkName: "login" */ "../views/TransactionView.vue"),
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

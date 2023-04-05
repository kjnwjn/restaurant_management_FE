export default {
    toastify: null,
    accessToken: localStorage.getItem("x-access-token") ? JSON.parse(localStorage.getItem("x-access-token")) : "",
    payload: localStorage.getItem("payload") ? JSON.parse(localStorage.getItem("payload")) : "",
    tableData: localStorage.getItem("tableData") ? JSON.parse(localStorage.getItem("tableData")) : "",
    menuIndex: localStorage.getItem("menuIndex") ? JSON.parse(localStorage.getItem("menuIndex")) : "",
    pendingOrderData: localStorage.getItem("pendingOrderData") ? JSON.parse(localStorage.getItem("pendingOrderData")) : [],
    menuList: localStorage.getItem("menuList") ? JSON.parse(localStorage.getItem("menuList")) : [],
};

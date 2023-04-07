export default {
    set_access_token(state, token) {
        state.accessToken = token;
    },
    set_payload(state, payload) {
        state.payload = payload;
    },
    set_toastify(state, obj) {
        state.toastify = obj;
    },
    set_tableData(state, tableData) {
        state.tableData = tableData;
    },
    set_menuIndex(state, index) {
        state.menuIndex = index;
    },
    set_pendingOrderData(state, index) {
        state.pendingOrderData.push(index);
    },
    set_defaultPOD(state, pendingOrderData) {
        state.pendingOrderData = pendingOrderData;
    },
    set_pendingItem(state, newPendingItem, i) {
        state.pendingOrderData[i] = newPendingItem;
    },
    set_menuList(state, menuList) {
        state.menuList = menuList;
    },
    set_pendingOrderList(state, pendingOrderList) {
        state.pendingOrderList = pendingOrderList;
    },
    set_pendingOrderListIndex(state, index) {
        state.pendingOrderList.push(index);
    },
    set_pendingItemUpdateStatus(state, pendingItemUpdateStatus) {
        state.pendingItemUpdateStatus = pendingItemUpdateStatus;
    },
    set_dishData(state, dishData) {
        state.dishData = dishData;
    },
};

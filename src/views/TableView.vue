<template>
    <section class="bg-white bg-gray-900" v-if="menuList && menuList.length > 0">
        <DashboardMenu :menu="menuList" />
        <main class="main-container">
            <Loading :active="isLoading" :is-full-page="true" :can-cancel="false" />
            <div class="flex items-center mb-4 text-green-700 font-bold text-lg uppercase">
                <ThemifyIcon icon="menu" />
                <h1 class="ml-2">Cart summary:</h1>
            </div>
            <div class="mb-4">
                <div class="mb-1 text-md font-medium text-gray-900 flex items-center">
                    <ThemifyIcon icon="settings" />
                    <p class="ml-2">
                        Current item count:
                        {{
                            pendingOrderData.reduce((total, item, index) => {
                                total += item.qty;
                                return total;
                            }, 0)
                        }}
                    </p>
                </div>
                <div class="mb-1 text-md font-medium text-gray-900 flex items-center">
                    <ThemifyIcon icon="settings" />
                    <p class="ml-2">
                        Temporary total:
                        {{
                            priceFormat(
                                pendingOrderData.reduce((total, item, index) => {
                                    total += item.dish.price * item.qty;
                                    return total;
                                }, 0)
                            )
                        }}
                    </p>
                </div>
            </div>
            <div class="flex items-center mb-4 text-green-700 font-bold text-lg uppercase">
                <ThemifyIcon icon="menu" />
                <h1 class="ml-2">Menu items:</h1>
            </div>
            <div class="mb-6" id="main-menu-list">
                <template v-if="getCategoryList() && getCategoryList()?.disList.length > 0">
                    <div class="" v-for="(dish, i) in getCategoryList().disList" :key="i">
                        <template v-if="dishData && dishData?.dishId == dish.dishId">
                            <card-dish :dish="dishData"></card-dish>
                        </template>
                        <template v-else>
                            <card-dish :dish="dish"></card-dish>
                        </template>
                    </div>
                </template>
                <template v-else>
                    <div class="flex items-center mb-4 text-red-600 text-lg">
                        <h1 class="ml-2">Select items in the left menu for ordering</h1>
                    </div>
                </template>
            </div>
        </main>
        <div id="cart-container">
            <div class="flex items-center justify-center text-center font-semibold text-[25px] my-3">
                <h1 class="flex justify-center">Table no.{{ tableData?.tableData?.tableId }}</h1>
            </div>
            <div id="cjss" class="flex flex-col overflow-auto">
                <div class="text-white flex text-18px font-semibold pl-3 py-2 rounded-t">
                    <h1 class="w-[35%]">Name</h1>
                    <h1 class="w-[15%]">Qty</h1>
                    <h1 class="w-[25%]">Amount</h1>
                </div>
                <div class="flex flex-col my-5 pending-dish_item" v-if="pendingOrderData.length > 0">
                    <div class="flex text-18px font-medium pl-3 py-2 border-b-[1px] border-slate-700" v-for="(pending, i) in pendingOrderData" :key="i">
                        <h1 class="w-[35%]">{{ pending.dish.name }}</h1>
                        <h1 class="w-[15%]">{{ pending.qty }}</h1>
                        <h1 class="w-[25%]">{{ priceFormat(pending.dish.price * pending.qty) }}</h1>
                    </div>
                </div>
            </div>
            <div id="confirm-section" class="font-semibold py-5 text-[16px] mb-5" v-if="pendingOrderData.length > 0">
                <div class="mb-4">
                    <h1 class="mb-1">Qty: {{ totalQty(pendingOrderData).totalQty }}</h1>
                    <h1 class="mb-1">Total: {{ priceFormat(totalQty(pendingOrderData).totalPrice) }}</h1>
                </div>
                <div class="mb-4" v-if="pendingOrderData.length > 0">
                    <label class="text-white">Note:</label>
                    <input name="note" class="text-gray-800 rounded-lg outline-none w-full py-2 px-4" v-model="note" />
                </div>
                <button type="button" class="w-full rounded-full btn-order py-4" @click="handleOrder(pendingOrderData)">Order</button>
            </div>
        </div>
    </section>
    <section v-else>
        <h1>No data for dished, please insert into database!</h1>
    </section>
</template>

<script>
import axios from "axios";
import DashboardMenu from "@/components/DashboardMenu.vue";
import dateFormat from "@/helpers/dateFormat";
import priceFormat from "@/helpers/priceFormat";
import dateFormatV2 from "@/helpers/dateFormatV2";
import cardDish from "@/components/CardDish.vue";
import { mapState } from "vuex";
import ThemifyIcon from "vue-themify-icons/ThemifyIcon.vue";
import Loading from "vue-loading-overlay";
import store from "@/store";

export default {
    data() {
        return {
            isLoading: true,
            note: "",
            categoryList: null,
            dishData: null,
        };
    },
    sockets: {
        connect: function () {
            console.log("socket connected");
        },
        "update-table-status": function (table) {
            if (table) {
                if (table.tableId == this.$route.params.tableId) {
                    let tableData = {
                        tableData: table,
                        pendingOrder: [],
                    };
                    store.commit("set_tableData", tableData);
                }
            }
        },
        "update-dish-status": function (dish) {
            if (dish) {
                this.dishData = dish;
            }
        },
    },
    async mounted() {
        await this.fetchData();
    },
    methods: {
        dateFormat,
        priceFormat,
        dateFormatV2,
        async fetchData() {
            this.isLoading = true;
            await axios
                .get(`${process.env.VUE_APP_API_URL}/table/get-order/${this.$route.params.tableId}`)
                .then(async (res) => {
                    if (res.data.status && res.data.data) {
                        this.$store.commit("set_tableData", res.data.data);
                    } else {
                        this.$store.commit("set_tableData", { tableId: this.$route.params.tableId });
                    }
                })
                .catch(() => {});
            localStorage.setItem("set_defaultPOD", JSON.stringify([]));
            this.$store.commit("set_defaultPOD", []);
            this.isLoading = false;
        },
        totalQty(arr) {
            let i = 0;
            let totalPrice = 0;
            arr.forEach((item) => {
                i += item.qty;
                totalPrice += item.dish.price * item.qty;
            });
            return { totalPrice: totalPrice, totalQty: i };
        },
        async handleOrder(pendingOrderData) {
            this.isLoading = true;
            const orderData = [];
            pendingOrderData.forEach((pending) => {
                const dishId = pending.dish.dishId;
                const qty = pending.qty;
                orderData.push({ dishId, qty });
            });
            this.$store.state.toastify
                .prompt({
                    body: "Are you sure?",
                    answers: { Yes: true, No: false },
                })
                .then(async (value) => {
                    if (value) {
                        await axios
                            .post(`${process.env.VUE_APP_API_URL}/pendingOrder/new`, {
                                orderId: this.tableData.tableData.orderId,
                                orderData,
                                note: this.note,
                            })
                            .then(async (res) => {
                                if (res.data.status && res.data.data) {
                                    this.$router.push(`/client/table/${this.tableData.tableData.tableId}/order-session`);
                                } else {
                                    this.$store.state.toastify.error(res.data.msg.en);
                                }
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    }
                });

            this.isLoading = false;
        },
        getCategoryList() {
            const categoryId = this.$route.params.categoryId;
            const categoryLis = this.menuList.filter((item) => item.category.categoryId == categoryId);
            return categoryLis.length > 0 ? categoryLis[0] : null;
        },
    },
    components: { Loading, cardDish, DashboardMenu, ThemifyIcon },
    computed: {
        ...mapState(["menuIndex", "tableData", "pendingOrderData", "toastify", "menuList"]),
    },
};
</script>
<style>
.order-detail {
    background: #1c6758;
    border-radius: 18px;
    position: fixed;
    bottom: 0;
    right: 0;
    top: 0;
    width: 57vh;
}
#cjss {
    height: 60%;
    overflow: hidden scroll;
}
#cjss::-webkit-scrollbar {
    width: 2px;
}
#cjss::-webkit-scrollbar-thumb {
    background: #888;
}
.btn-order {
    background: #d6cda4;
    color: rgb(61, 131, 97);
    cursor: pointer;
    z-index: 1000000;
}
.btn-order:hover {
    background: #a8a181;
}
#cjss::-webkit-scrollbar-thumb:hover {
    background: #225a4f;
}
#cart-container {
    padding: 10px;
    width: 380px;
    height: 100vh;
    color: white;
    background: #797cbd;
    box-shadow: -4px 0px 10px -6px #00000033;
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
}
main.main-container {
    width: calc(100% - 680px) !important;
}
#main-menu-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
}
#confirm-section {
    position: absolute;
    width: 95%;
    bottom: 0;
}
</style>

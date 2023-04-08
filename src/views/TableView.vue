<template>
    <section class="bg-white dark:bg-gray-900" v-if="menuList && menuList.length > 0">
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
                        <card-dish :dish="dish"></card-dish>
                    </div>
                </template>
                <template v-else>
                    <div class="flex items-center mb-4 text-red-600 text-lg">
                        <h1 class="ml-2">Select items in the left menu for ordering</h1>
                    </div>
                </template>
            </div>

            <!-- <div class="grid grid-cols-3 p-4">
                <div class="col-span-3 pr-2">
                    <div class="grid grid-cols-3">
                        <template v-if="getCategoryList() && getCategoryList()?.disList.length > 0">
                            <div class="col-span-1 pr-2" v-for="(dish, i) in getCategoryList().disList" :key="i">
                                <card-dish :dish="dish"></card-dish>
                            </div>
                        </template>
                        <template v-else>
                            <div class="flex items-center mb-4 text-red-700 font-bold text-lg uppercase">
                                <h1 class="ml-2">Select items in the left menu</h1>
                            </div>
                        </template>
                    </div>
                </div>

                <div class="order-detail absolute h-full flex flex-col w-full px-[20px] py-[15px] gap-3" v-if="tableData?.tableData">
                    <button class="minimize-btn absolute text-medium inline-flex items-center px-3 text-sm font-medium text-gray-300" type="button">
                        <ThemifyIcon icon="angle-double-up" />
                    </button>

                    <div class="flex flex-col absolute inset-0 mx-auto my-auto px-2 py-2 rounded-[20px]">
                        <div class="flex items-center justify-center text-center text-gray-300 font-semibold text-[25px] my-3">
                            <h1 class="flex justify-center">ORDER SESSITON FOR TABLE {{ tableData.tableData.tableId }}</h1>
                        </div>
                        <div class="flex flex-col gap-1 text-gray-300 w-[100%] justify-center items-center text-[15px]">
                            <h1>Order session</h1>
                        </div>
                        <div id="cjss" class="flex flex-col overflow-auto h-1/2" v-if="pendingOrderData.length > 0">
                            <div class="text-gray-200 flex text-18px font-semibold pl-3 py-2 rounded-t">
                                <div class="flex gap-2 w-[35%]">
                                    <h1 class="">List dish</h1>
                                </div>
                                <h1 class="w-[15%]">Qty</h1>
                                <h1 class="w-[25%]">Unit</h1>
                                <h1 class="w-[25%]">Amount</h1>
                            </div>
                            <div class="flex flex-col my-5 pending-dish_item">
                                <div class="flex text-18px font-medium pl-3 py-2 border-b-[1px] border-slate-700" v-for="(pending, i) in pendingOrderData" :key="i">
                                    <h1 class="w-[35%]">{{ pending.dish.name }}</h1>
                                    <h1 class="w-[15%]">{{ pending.qty }}</h1>
                                    <h1 class="w-[25%]">{{ priceFormat(pending.dish.price) }}</h1>
                                    <h1 class="w-[25%]">{{ priceFormat(pending.dish.price * pending.qty) }}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="text-gray-200 pending-note mt-auto z-50 flex justify-between items-center h-14" v-if="pendingOrderData.length > 0">
                        <label for="note" class="">Note</label>
                        <textarea name="note" id="" cols="30" class="h-full rounded-lg outline-none pl-4" rows="10" v-model="note"></textarea>
                    </div>
                    <div class="flex justify-between items-center text-yellow-300 font-semibold py-5 text-[16px] mb-5" v-if="pendingOrderData.length > 0">
                        <h1 class="w-[35%] ml-2">Total</h1>
                        <h1 class="w-[15%]">{{ totalQty(pendingOrderData).totalQty }}</h1>
                        <h1 class="w-[25%]">{{ priceFormat(totalQty(pendingOrderData).totalPrice) }}</h1>
                        <button type="button" class="w-[25%] rounded-lg btn-order" @click="handleOrder(pendingOrderData)">order</button>
                    </div>
                </div>
            </div> -->
        </main>
        <div id="cart-container"></div>
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
.minimize-btn {
    top: 0;
    z-index: 1000;
    background: #13483e;
    left: 16px;
    border-radius: 5px;
}
.pending-dish_item {
    color: #d6cda4;
}
.cjss {
    background: #d6cda4;
    border-radius: 10px;
}
#cjss::-webkit-scrollbar {
    width: 10px;
}

/* Track */
#cjss::-webkit-scrollbar-track {
    background: #1c6758;
}

/* Handle */
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

/* Handle on hover */
#cjss::-webkit-scrollbar-thumb:hover {
    background: #225a4f;
}
.pending-note textarea {
    background: #d6cda4;
    color: #3d8361;
}
#cart-container {
    width: 300px;
    height: 100vh;
    background: black;
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
}
main.main-container {
    width: calc(100% - 600px) !important;
}
#main-menu-list {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(217px, 1fr));
    gap: 20px;
}
</style>

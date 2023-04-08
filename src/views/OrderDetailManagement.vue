<template>
    <div>
        <DashboardMenu />

        <main class="main-container">
            <Loading :active="isLoading" :is-full-page="true" :can-cancel="false" />
            <div class="flex items-center justify-center text-center text-slate-600 font-semibold text-[25px] my-3" v-if="orderData">
                <h1 class="flex justify-center">ORDER {{ orderData.orderId }} FOR TABLE {{ orderData.tableId }}</h1>
            </div>
            <div class="flex gap-1 text-slate-600 w-[100%] justify-center items-center text-[15px]">
                <button type="button" class="w-[25%] bg-red-400 py-3 rounded-lg text-lg text-gray-50 uppercase btn-order" @click="handleCancelOrder(orderData.orderId)">cancel order</button>
                <button type="button" class="w-[25%] bg-green-600 py-3 rounded-lg text-lg text-gray-50 uppercase btn-order" @click="handleGetTempOrder(orderData.orderId)">get provisional invoice</button>
            </div>

            <div class="pending-list p-4" v-if="orderData">
                <div class="flex flex-col inset-0 mx-auto my-auto px-2 py-2 rounded-[20px]">
                    <div id="cjss" class="flex flex-col" v-if="orderData.status == 'PENDING' && pendingOrderList">
                        <table class="overflow-scroll w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="py-3 px-6">Pending order id</th>
                                    <th scope="col" class="py-3 px-6">orderId</th>
                                    <th scope="col" class="py-3 px-6">tableId</th>
                                    <th scope="col" class="py-3 px-6">status</th>
                                    <th scope="col" class="py-3 px-6">note</th>
                                    <th scope="col" class="py-3 px-6">Create At</th>
                                </tr>
                            </thead>
                            <tbody v-if="pendingOrderList">
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" v-for="(pendingItem, i) in pendingOrderList" :key="i">
                                    <td class="py-4 px-6 flex justify-between items-center">
                                        <button
                                            :class="pendingItem.status ? 'py-4 px-6 bg-green-500' : 'py-4 px-6 bg-red-500'"
                                            class="inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white rounded-full border border-gray-300"
                                            type="button"
                                            v-on:click="handleGetDishItem(pendingItem)"
                                        >
                                            {{ pendingItem.pendingId }}
                                        </button>
                                    </td>
                                    <td class="py-4 px-6">{{ pendingItem.orderId }}</td>
                                    <td class="py-4 px-6">{{ pendingItem.tableId }}</td>
                                    <template v-if="pendingItemUpdateStatus">
                                        <td :class="pendingItemUpdateStatus.status ? 'py-4 px-6 text-green-400' : 'py-4 px-6 text-red-500'" v-if="pendingItemUpdateStatus.pendingId == pendingItem.pendingId">
                                            {{ pendingItemUpdateStatus.status ? "Available" : "Unavailable" }}
                                        </td>
                                        <td :class="pendingItem.status ? 'py-4 px-6 text-green-400' : 'py-4 px-6 text-red-500'" v-else>{{ pendingItem.status ? "Available" : "Unavailable" }}</td>
                                    </template>
                                    <template v-else>
                                        <td :class="pendingItem.status ? 'py-4 px-6 text-green-400' : 'py-4 px-6 text-red-500'">{{ pendingItem.status ? "Available" : "Unavailable" }}</td>
                                    </template>
                                    <td class="py-4 px-6">{{ pendingItem.note }}</td>
                                    <td class="py-4 px-6">{{ dateFormat(pendingItem.createdAt) }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div class="flex items-center mb-4 text-green-700 font-bold text-lg uppercase" v-if="pendingOrderId">
                <ThemifyIcon icon="menu" />
                <h1 class="ml-2">List of dish belong to pending order : {{ pendingOrderId }}</h1>
            </div>
            <div class="dish-list p-4" v-if="dish && dish.length > 0">
                <div class="pending-list-child col-span-3 pr-6">
                    <div class="overflow-x-auto relative">
                        <table class="overflow-scroll w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="py-3 px-6">Dish Id</th>
                                    <th scope="col" class="py-3 px-6">Dish Name</th>
                                    <th scope="col" class="py-3 px-6">Dish price</th>
                                    <th scope="col" class="py-3 px-6">Dish Qty</th>
                                </tr>
                            </thead>
                            <tbody v-if="dish">
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" v-for="(item, i) in dish" :key="i">
                                    <td class="py-4 px-6 flex justify-between items-center">
                                        <button class="inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white rounded-full border border-gray-300" type="button">
                                            {{ item.dish.dishId }}
                                        </button>
                                    </td>
                                    <td class="py-4 px-6">{{ item.dish.name }}</td>
                                    <td class="py-4 px-6">{{ item.dish.price }}</td>
                                    <td class="py-4 px-6">{{ item.qty }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import axios from "axios";
// import ThemifyIcon from "vue-themify-icons/ThemifyIcon.vue";
import dateFormat from "@/helpers/dateFormat";
import dateFormatV2 from "@/helpers/dateFormatV2";
import priceFormat from "@/helpers/priceFormat";
import { mapState } from "vuex";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import DashboardMenu from "@/components/DashboardMenu.vue";
import store from "@/store";

export default {
    data() {
        return {
            isLoading: true,
            orderData: null,
            pendingOrderList: null,
            pendingOrderId: null,
            dishList: null,
            dish: [],
        };
    },
    sockets: {
        connect: function () {},
        "new-pending-order": (pendingOrder) => {
            if (pendingOrder) {
                store.commit("set_pendingOrderListIndex", pendingOrder);
            }
        },
        "update-pending-order-status": (pendingData) => {
            if (pendingData) {
                store.commit("set_pendingItemUpdateStatus", pendingData);
            }
        },
    },
    async mounted() {
        this.fetchData();
        this.handleGetPendingOrder(this.$route.params.orderId);
    },
    methods: {
        dateFormat,
        priceFormat,
        dateFormatV2,
        async fetchData() {
            this.isLoading = true;
            await axios
                .get(`${process.env.VUE_APP_API_URL}/order/get-one/${this.$route.params.orderId}?token=${this.$store.state.accessToken}`)
                .then(async (res) => {
                    if (res.data.status && res.data.data) {
                        this.orderData = res.data.data;
                    } else {
                        this.toastify.error(res.data.msg.en);
                    }
                })
                .catch((err) => console.log(err));

            await axios
                .get(`${process.env.VUE_APP_API_URL}/dish/get-all?token=${this.$store.state.accessToken}`)
                .then(async (res) => {
                    if (res.data.status && res.data.data) {
                        this.dishList = res.data.data;
                    } else {
                        this.toastify.error(res.data.msg.en);
                    }
                })
                .catch((e) => console.log(e));
            this.isLoading = false;
        },
        async handleGetPendingOrder(orderId) {
            this.isLoading = true;
            await axios.get(`${process.env.VUE_APP_API_URL}/pendingOrder/query/${orderId}?token=${this.$store.state.accessToken}`).then((res) => {
                if (res.data.status) {
                    this.pendingOrderList = res.data.data;
                } else {
                    this.toastify.error(res.data.msg.en);
                }
            });
            this.isLoading = false;
        },

        handleGetDishItem(pendingItem) {
            this.dish = [];
            this.pendingOrderId = pendingItem.pendingId;
            pendingItem.orderData.forEach((item) => {
                const isExist = this.dishList.filter((dish) => Number(dish.dishId) == Number(item.dishId));
                if (isExist.length > 0) {
                    this.dish.push({ dish: isExist[0], qty: item.qty });
                }
            });
        },
        async handleGetTempOrder(orderId) {
            this.isLoading = true;

            this.$store.state.toastify
                .prompt({
                    body: "Are you sure?",
                    answers: { Yes: true, No: false },
                })
                .then(async (value) => {
                    if (value) {
                        await axios
                            .put(`${process.env.VUE_APP_API_URL}/order/update-order?token=${this.$store.state.accessToken}`, {
                                orderId,
                            })
                            .then((res) => {
                                console.log(res);
                                if (res.data.status) {
                                    this.$router.push(`/dashboard/order/payment/${orderId}`);
                                } else {
                                    this.toastify.error(res.data.msg.en);
                                }
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    }
                });

            this.isLoading = false;
        },
        async handleCancelOrder(orderId) {
            this.isLoading = true;

            this.$store.state.toastify
                .prompt({
                    body: "Are you sure?",
                    answers: { Yes: true, No: false },
                })
                .then(async (value) => {
                    if (value) {
                        await axios
                            .delete(`${process.env.VUE_APP_API_URL}/order/remove-order/${orderId}?token=${this.$store.state.accessToken}`)
                            .then((res) => {
                                console.log(res);
                                if (res.data.status) {
                                    this.$router.push(`/dashboard/table`);
                                } else {
                                    this.toastify.error(res.data.msg.en);
                                }
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    }
                });

            this.isLoading = false;
        },
    },
    computed: { ...mapState(["accessToken", "payload", "toastify", "pendingItemUpdateStatus"]) },
    components: { Loading, DashboardMenu },
};
</script>
<style>
.pending-list {
    height: 40vh;
    overflow: hidden;
}
.dish-list {
    height: 40vh;
    overflow: hidden;
}
.pending-list-child {
    height: 100%;
    overflow: hidden scroll;
}
</style>

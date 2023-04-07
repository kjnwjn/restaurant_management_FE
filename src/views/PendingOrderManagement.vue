<template>
    <div>
        <DashboardMenu />

        <main class="main-container">
            <!-- <pre>{{ pendingOrderList }}</pre> -->
            <Loading :active="isLoading" :is-full-page="true" :can-cancel="false" />

            <div class="pending-list grid grid-cols-3 p-4" v-if="pendingOrderList">
                <div class="pending-list-child col-span-3 pr-6">
                    <div class="overflow-x-auto relative">
                        <table class="overflow-scroll w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="py-3 px-6">Pending order id</th>
                                    <th scope="col" class="py-3 px-6">orderId</th>
                                    <th scope="col" class="py-3 px-6">tableId</th>
                                    <th scope="col" class="py-3 px-6">status</th>
                                    <th scope="col" class="py-3 px-6">note</th>
                                    <th scope="col" class="py-3 px-6">Create At</th>
                                    <th scope="col" class="py-3 px-6">Action</th>
                                </tr>
                            </thead>
                            <tbody v-if="pendingOrderList">
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" v-for="(pendingItem, i) in pendingOrderList" :key="i">
                                    <td class="py-4 px-6 flex justify-between items-center">
                                        <button
                                            :class="pendingItem.status ? 'py-4 px-6 bg-green-500' : 'py-4 px-6 bg-red-500'"
                                            class="inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white rounded-full border border-gray-300"
                                            type="button"
                                            v-on:click="handleGetPendingOrder(pendingItem)"
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
                                    <td class="py-4 px-6">
                                        <div v-on:click="switchStatus(pendingItem.pendingId)" class="text-blue-500 cursor-pointer p-2">Switch status</div>
                                    </td>
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
            <div class="dish-list grid grid-cols-3 p-4" v-if="dish && dish.length > 0">
                <div class="pending-list-child col-span-3 pr-6">
                    <div class="overflow-x-auto relative">
                        <table class="overflow-scroll w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="py-3 px-6">Dish Id</th>
                                    <th scope="col" class="py-3 px-6">Dish Name</th>
                                    <th scope="col" class="py-3 px-6">Dish price</th>
                                    <th scope="col" class="py-3 px-6">Dish status</th>
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
                                    <td class="py-4 px-6">{{ item.dish.status }}</td>
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
            dishList: null,
            dish: [],
            pendingOrderId: null,
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
    },
    methods: {
        dateFormat,
        priceFormat,
        dateFormatV2,
        async fetchData() {
            this.isLoading = true;
            await axios
                .get(`${process.env.VUE_APP_API_URL}/pendingOrder/get-all?token=${this.$store.state.accessToken}`)
                .then(async (res) => {
                    if (res.data.status && res.data.data) {
                        this.$store.commit("set_pendingOrderList", res.data.data.queryPendingOrder);
                    } else {
                        this.toastify.error(res.data.msg.en);
                    }
                })
                .catch((e) => console.log(e));

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
        handleGetPendingOrder(pendingItem) {
            this.dish = [];
            this.pendingOrderId = pendingItem.pendingId;
            pendingItem.orderData.forEach((item) => {
                const isExist = this.dishList.filter((dish) => Number(dish.dishId) == Number(item.dishId));
                if (isExist.length > 0) {
                    this.dish.push({ dish: isExist[0], qty: item.qty });
                }
            });
        },
        async switchStatus(pendingId) {
            this.isLoading = true;
            await axios.put(`${process.env.VUE_APP_API_URL}/pendingOrder/update-status/${pendingId}?token=${this.accessToken}`).then((res) => {
                if (res.data.status) {
                    this.toastify.success(res.data.msg.en);
                } else {
                    this.toastify.error(res.data.msg.en);
                }
            });
            this.fetchData();
            this.isLoading = false;
        },
    },
    computed: { ...mapState(["accessToken", "payload", "toastify", "pendingOrderList", "pendingItemUpdateStatus"]) },
    components: { Loading, DashboardMenu },
};
</script>
<style>
.pending-list {
    height: 50vh;
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

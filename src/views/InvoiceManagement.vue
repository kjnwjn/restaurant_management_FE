<template>
    <div>
        <DashboardMenu />

        <main class="main-container">
            <Loading :active="isLoading" :is-full-page="true" :can-cancel="false" />

            <div class="flex mb-8" v-if="orderList && orderList?.paid">
                <input v-model="dateFrom" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full py-2.5 px-4" type="text" placeholder="Date From" />
                <input v-model="dateTo" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full py-2.5 px-4" type="text" placeholder="Date To" />
                <button class="bg-blue-400 py-4 px-8 rounded-lg text-white ml-4 hover:bg-blue-500 transition-all" @click="handleFilterBtn">Filter</button>
            </div>

            <div class="flex items-center mb-4 text-green-700 font-bold text-lg uppercase">
                <ThemifyIcon icon="menu" />
                <h1 class="ml-2">List of order</h1>
            </div>
            <div class="grid grid-cols-3 p-4">
                <div class="col-span-3 pr-6">
                    <div class="overflow-x-auto relative">
                        <table class="overflow-scroll w-full text-sm text-left text-gray-500 text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 text-gray-400">
                                <tr>
                                    <th scope="col" class="py-3 px-6">order Id</th>
                                    <th scope="col" class="py-3 px-6">table Id</th>
                                    <th scope="col" class="py-3 px-6">userCode</th>
                                    <th scope="col" class="py-3 px-6">status</th>
                                    <th scope="col" class="py-3 px-6">total Amount</th>
                                    <th scope="col" class="py-3 px-6">created At</th>
                                </tr>
                            </thead>
                            <tbody v-if="orderList && orderList?.paid">
                                <tr class="bg-white border-b bg-gray-800 border-gray-700" v-for="(orderItem, i) in orderList.paid.list" :key="i">
                                    <td class="py-4 px-6 flex justify-between items-center">
                                        <button class="inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white rounded-full border border-gray-300" type="button" v-on:click="handleGetPendingOrder(orderItem.orderId)">
                                            {{ orderItem.orderId }}
                                        </button>
                                    </td>
                                    <td class="py-4 px-6">{{ orderItem.tableId }}</td>
                                    <td class="py-4 px-6">{{ orderItem.userCode }}</td>
                                    <td class="py-4 px-6">{{ orderItem.status }}</td>
                                    <td class="py-4 px-6">{{ priceFormat(orderItem.totalAmount) }}</td>
                                    <td class="py-4 px-6">{{ dateFormat(orderItem.createdAt) }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div class="flex items-center mb-4 text-green-700 font-bold text-lg uppercase" v-if="pendingOrderList">
                <ThemifyIcon icon="menu" />
                <h1 class="ml-2">List of pending order belong to order : {{ pendingOrderList[0].orderId }}</h1>
            </div>
            <div class="grid grid-cols-3 p-4" v-if="pendingOrderList">
                <div class="col-span-3 pr-6">
                    <div class="overflow-x-auto relative">
                        <table class="overflow-scroll w-full text-sm text-left text-gray-500 text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 text-gray-400">
                                <tr>
                                    <th scope="col" class="py-3 px-6">Pending order id</th>
                                    <th scope="col" class="py-3 px-6">orderId</th>
                                    <th scope="col" class="py-3 px-6">tableId</th>
                                    <th scope="col" class="py-3 px-6">status</th>
                                    <th scope="col" class="py-3 px-6">note</th>
                                    <th scope="col" class="py-3 px-6">Pending Order Data</th>
                                    <th scope="col" class="py-3 px-6">Create At</th>
                                </tr>
                            </thead>
                            <tbody v-if="pendingOrderList">
                                <tr class="bg-white border-b bg-gray-800 border-gray-700" v-for="(pendingItem, i) in pendingOrderList" :key="i">
                                    <td class="py-4 px-6 flex justify-between items-center">
                                        <button class="inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white rounded-full border border-gray-300" type="button" v-on:click="handleGetPendingOrder(pendingItem.pendingId)">
                                            {{ pendingItem.pendingId }}
                                        </button>
                                    </td>
                                    <td class="py-4 px-6">{{ pendingItem.orderId }}</td>
                                    <td class="py-4 px-6">{{ pendingItem.tableId }}</td>
                                    <td class="py-4 px-6">{{ pendingItem.status }}</td>
                                    <td class="py-4 px-6">{{ pendingItem.note }}</td>
                                    <td class="py-4 px-6">{{ pendingItem.note }}</td>
                                    <td class="py-4 px-6">{{ dateFormat(pendingItem.createdAt) }}</td>
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

export default {
    data() {
        return {
            dateFrom: null,
            dateTo: null,
            isLoading: true,
            orderList: null,
            pendingOrderList: null,
            dish: null,
        };
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
            const _this = this;
            await axios
                .get(`${process.env.VUE_APP_API_URL}/invoice/get-data?token=${this.$store.state.accessToken}`)
                .then(function (res) {
                    if (res.data.status) {
                        _this.orderList = res.data.data;
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
            this.fetchData();
            this.isLoading = false;
        },
        async handleFilterBtn() {
            this.isLoading = true;
            await axios.get(`${process.env.VUE_APP_API_URL}/invoice/get-data/filter?dateFrom=${this.dateFrom}&dateTo=${this.dateTo}&token=${this.$store.state.accessToken}`).then((res) => {
                if (res.data.status) {
                    this.orderList = res.data.data;
                } else {
                    this.toastify.error(res.data.msg.en);
                }
            });
            this.isLoading = false;
        },
    },
    computed: { ...mapState(["accessToken", "payload", "toastify"]) },
    components: { Loading, DashboardMenu },
};
</script>

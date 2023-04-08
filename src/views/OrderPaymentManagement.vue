<template>
    <div>
        <DashboardMenu />
        <main class="main-container">
            <Loading :active="isLoading" :is-full-page="true" :can-cancel="false" />
            <div class="flex items-center justify-center text-center text-slate-600 font-semibold text-[25px] my-3" v-if="orderData">
                <h1 class="flex justify-center">ORDER {{ orderData.orderId }} DETAILS</h1>
            </div>
            <div class="flex items-center mb-4 text-green-700 font-bold text-lg uppercase" v-if="orderData">
                <ThemifyIcon icon="menu" />
                <h1 class="ml-2">List of dish belong to order : {{ orderData.orderId }}</h1>
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
            <template v-if="orderData">
                <div class="mb-6 grid grid-cols-2">
                    <h1 class="col-span-1 mb-2 text-lg font-medium text-gray-900 dark:text-gray-300">Status: {{ orderData.status }}</h1>
                    <h1 class="col-span-1 mb-2 text-lg font-medium text-gray-900 dark:text-gray-300">Created by: {{ orderData.userCode }}</h1>
                </div>
                <div class="mb-6 grid grid-cols-2">
                    <h1 class="col-span-1 mb-2 text-lg font-medium text-gray-900 dark:text-gray-300">Create At: {{ dateFormat(orderData.createdAt) }}</h1>
                    <h1 class="col-span-1 mb-2 text-lg font-medium text-gray-900 dark:text-gray-300">Table: {{ orderData.tableId }}</h1>
                </div>
                <div class="mb-6 grid grid-cols-2">
                    <input v-model="money" type="number" class="col-span-1 bg-gray-50 border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/5 outline-none p-2.5" placeholder="Money" required="" />
                    <h1 class="col-span-1 block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300">Change due : {{ orderData.change }}</h1>
                </div>
                <div class="flex items-center justify-center text-center text-slate-600 font-semibold text-[25px] my-3" v-if="orderData">
                    <h1 class="flex justify-center">Total: {{ priceFormat(orderData.tempAmount) }}</h1>
                </div>
                <div class="flex gap-1 text-slate-600 w-[100%] justify-center items-center text-[15px]" v-if="!orderData.isPaid">
                    <button type="button" class="w-[25%] bg-green-600 py-3 rounded-lg text-lg text-gray-50 uppercase btn-order" @click="handlePayment(orderData.orderId)">PayMent</button>
                </div>
                <div class="flex gap-1 text-slate-600 w-[100%] justify-center items-center text-[15px]" v-else>
                    <button type="button" class="w-[25%] bg-blue-600 py-3 rounded-lg text-lg text-gray-50 uppercase btn-order" @click="handleBackBtn">Back</button>
                </div>
            </template>
        </main>
    </div>
</template>

<script>
import axios from "axios";
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
            isLoading: true,
            orderData: null,
            dishList: null,
            dish: [],
            money: null,
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

            await axios
                .get(`${process.env.VUE_APP_API_URL}/order/payment/${this.$route.params.orderId}?token=${this.$store.state.accessToken}`)
                .then(async (res) => {
                    console.log(res);
                    if (res.data.status && res.data.data) {
                        this.orderData = res.data.data;
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
            this.getDish();
            this.isLoading = false;
        },
        async getDish() {
            this.dish = [];
            this.orderData.orderData.forEach((item) => {
                const isExist = this.dishList.filter((dish) => Number(dish.dishId) == Number(item.dishId));
                if (isExist.length > 0) {
                    this.dish.push({ dish: isExist[0], qty: item.qty });
                }
            });
        },
        handleBackBtn() {
            this.$router.push(`/dashboard/table`);
        },
        async handlePayment(orderId) {
            this.isLoading = true;

            this.toastify
                .prompt({
                    body: "Are you sure?",
                    answers: { Yes: true, No: false },
                })
                .then(async (value) => {
                    if (value) {
                        await axios
                            .post(`${process.env.VUE_APP_API_URL}/order/payment/${orderId}?token=${this.$store.state.accessToken}`, {
                                money: this.money,
                            })
                            .then((res) => {
                                if (res.data.status) {
                                    this.orderData = res.data.data;
                                    this.toastify.success(res.data.msg.en);
                                } else {
                                    this.toastify.error(res.data.msg.en);
                                }
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    }
                });
            this.fetchData();
            this.isLoading = false;
        },
    },
    computed: { ...mapState(["accessToken", "payload", "toastify"]) },
    components: { Loading, DashboardMenu },
};
</script>

<style>
.dish-list {
    height: 40vh;
    overflow: hidden;
}

.pending-list-child {
    height: 100%;
    overflow: hidden scroll;
}
</style>

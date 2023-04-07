<template>
    <div>
        <DashboardMenu />

        <main class="main-container">
            <Loading :active="isLoading" :is-full-page="true" :can-cancel="false" />

            <div class="order-detail absolute h-full flex flex-col w-full px-[20px] py-[15px] gap-3" v-if="orderData">
                <!-- chi tiết bảng hóa đơn -->
                <div class="flex flex-col absolute inset-0 mx-auto my-auto px-2 py-2 rounded-[20px]">
                    <div class="flex items-center justify-center text-center text-slate-600 font-semibold text-[25px] my-3">
                        <h1 class="flex justify-center">ORDER {{ orderData.orderId }} FOR TABLE {{ orderData.tableId }}</h1>
                    </div>
                    <div class="flex flex-col gap-1 text-slate-600 w-[100%] justify-center items-center text-[15px]">
                        <h1>Order session</h1>
                    </div>
                    <div id="cjss" class="flex flex-col overflow-auto h-1/2" v-if="orderData.status == 'PENDING' && pendingOrderList">
                        <pre>{{ pendingOrderList }}</pre>
                        <div class="text-gray-200 flex text-18px font-semibold pl-3 py-2 rounded-t">
                            <div class="flex gap-2 w-[35%]">
                                <h1 class="">List dish</h1>
                            </div>
                            <h1 class="w-[15%]">Qty</h1>
                            <h1 class="w-[25%]">Unit</h1>
                            <h1 class="w-[25%]">Amount</h1>
                        </div>
                        <!-- <div class="flex flex-col my-5 pending-dish_item">
                            <div class="flex text-18px font-medium pl-3 py-2 border-b-[1px] border-slate-700" v-for="(pending, i) in pendingOrderList" :key="i">
                                <div class="flex flex-col gap-1 text-slate-600 w-[100%] justify-center items-center text-[15px]">
                                    <h1>Order session create at :{{ pending.createAt }}</h1>
                                </div>
                                <h1 class="w-[35%]">{{ pending.dish.name }}</h1>
                                <h1 class="w-[15%]">{{ pending.qty }}</h1>
                                <h1 class="w-[25%]">{{ priceFormat(pending.dish.price) }}</h1>
                                <h1 class="w-[25%]">{{ priceFormat(pending.dish.price * pending.qty) }}</h1>
                            </div>
                        </div> -->
                    </div>
                </div>
                <!-- <div class="text-gray-200 pending-note mt-auto z-50 flex justify-between items-center h-14" v-if="pendingOrderData.length > 0">
                        <label for="note" class="">Note</label>
                        <textarea name="note" id="" cols="30" class="h-full rounded-lg outline-none pl-4" rows="10" v-model="note"></textarea>
                    </div>
                    <div class="flex justify-between items-center text-yellow-300 font-semibold py-5 text-[16px] mb-5" v-if="pendingOrderData.length > 0">
                        <h1 class="w-[35%] ml-2">Total</h1>
                        <h1 class="w-[15%]">{{ totalQty(pendingOrderData).totalQty }}</h1>
                        <h1 class="w-[25%]">{{ priceFormat(totalQty(pendingOrderData).totalPrice) }}</h1>
                        <button type="button" class="w-[25%] rounded-lg btn-order" @click="handleOrder(pendingOrderData)">order</button>
                    </div> -->
            </div>
            <!-- <pre>{{ orderData }}</pre> -->
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
            isLoading: true,
            orderData: null,
            pendingOrderList: null,
            dish: null,
        };
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
                    }
                })
                .catch((err) => console.log(err));
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
    },
    computed: { ...mapState(["accessToken", "payload", "toastify"]) },
    components: { Loading, DashboardMenu },
};
</script>

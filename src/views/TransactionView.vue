<template>
    <main>
        <Loading :active="isLoading" :is-full-page="true" :can-cancel="false" />
        <div v-if="transactionDetail && !transactionDetail.payStatus">
            <div
                class="py-2 bg-red-400 hover:bg-red-500 transition-all rounded-full text-white text-center mb-9 font-bold text-lg cursor-pointer"
                v-on:click="handleCancelTransaction"
            >
                <ThemifyIcon icon="close" />
                <button class="ml-3">Cancel this transaction</button>
            </div>
        </div>
        <div class="flex mb-8" v-if="transactionDetail && !transactionDetail.payStatus">
            <input
                v-model="barcode"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full py-2.5 px-4"
                type="text"
                placeholder="Enter barcode here..."
                :disabled="transactionDetail && transactionDetail.payStatus"
            />
            <button class="bg-blue-400 py-4 px-8 rounded-lg text-white ml-4 hover:bg-blue-500 transition-all" v-on:click="orderHandler">Enter</button>
        </div>
        <div class="grid grid-cols-3 p-4">
            <div class="col-span-2 pr-6">
                <div class="overflow-x-auto relative">
                    <table class="overflow-scroll w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="py-3 px-6">Barcode</th>
                                <th scope="col" class="py-3 px-6">Product name</th>
                                <th scope="col" class="py-3 px-6">Qty</th>
                                <th scope="col" class="py-3 px-6">Unit cost</th>
                            </tr>
                        </thead>
                        <tbody v-if="transactionDetail && transactionDetail.details">
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" v-for="(product, i) in transactionDetail.details" :key="i">
                                <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                                    {{ product.barcode }}
                                </th>
                                <td class="py-4 px-6">{{ product.productName }}</td>
                                <td class="py-4 px-6 flex justify-between items-center">
                                    <button
                                        class="inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white rounded-full border border-gray-300"
                                        type="button"
                                        v-on:click="handleUpdateQuantity(product, 'descrease')"
                                    >
                                        <svg class="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path>
                                        </svg>
                                    </button>
                                    <div>
                                        <input type="number" class="px-3 py-1 bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg" :value="product.qty" />
                                    </div>
                                    <button
                                        class="inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white rounded-full border border-gray-300"
                                        type="button"
                                        v-on:click="handleUpdateQuantity(product, 'increase')"
                                    >
                                        <svg class="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                fill-rule="evenodd"
                                                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                                clip-rule="evenodd"
                                            ></path>
                                        </svg>
                                    </button>
                                </td>
                                <td class="py-4 px-6">{{ priceFormat(product.unitCost) }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="bg-gray-100 p-4 rounded-md shadow-md">
                <div class="relative mb-4">
                    <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <ThemifyIcon icon="user" />
                    </div>
                    <input
                        type="text"
                        class="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border"
                        placeholder="Customer"
                        v-model="customerID"
                        :disabled="transactionDetail && transactionDetail.payStatus"
                    />
                    <button
                        class="text-white absolute right-2.5 bottom-2.5 transition-all font-medium rounded-lg text-sm px-4 py-2"
                        :class="{
                            'bg-blue-400 hover:bg-blue-500 cursor-pointer': transactionDetail && !transactionDetail.payStatus,
                            'bg-gray-400 ': transactionDetail && transactionDetail.payStatus,
                        }"
                        :disabled="transactionDetail && transactionDetail.payStatus"
                        v-on:click="handleAddCustomer"
                    >
                        Add
                    </button>
                </div>

                <div class="mb-4">
                    <table class="overflow-scroll w-full text-sm text-left text-gray-500 dark:text-gray-400 mb-4">
                        <tbody>
                            <tr>
                                <th class="py-1 px-6 text-left font-bold text-gray-900 whitespace-nowrap">
                                    <p>InvoiceID</p>
                                </th>
                                <td class="py-1 px-6">
                                    <p>: {{ transactionDetail && transactionDetail.transactionID }}</p>
                                </td>
                            </tr>
                            <tr>
                                <th class="py-1 px-6 text-left font-bold text-gray-900 whitespace-nowrap">
                                    <p>Cashier code</p>
                                </th>
                                <td class="py-1 px-6">
                                    <p>: {{ transactionDetail && transactionDetail.cashierCode }}</p>
                                </td>
                            </tr>
                            <tr>
                                <th class="py-1 px-6 text-left font-bold text-gray-900 whitespace-nowrap">
                                    <p>Cashier</p>
                                </th>
                                <td class="py-1 px-6">
                                    <p>: {{ transactionDetail && transactionDetail.cashierName }}</p>
                                </td>
                            </tr>
                            <tr>
                                <th class="py-1 px-6 text-left font-bold text-gray-900 whitespace-nowrap">
                                    <p>Created at</p>
                                </th>
                                <td class="py-1 px-6">
                                    <p>: {{ dateFormat(transactionDetail ? transactionDetail.createdAt : "") }}</p>
                                </td>
                            </tr>
                            <tr>
                                <th class="py-1 px-6 text-left font-bold text-gray-900 whitespace-nowrap">
                                    <p>Last modified</p>
                                </th>
                                <td class="py-1 px-6">
                                    <p>: {{ dateFormat(transactionDetail ? transactionDetail.updatedAt : "") }}</p>
                                </td>
                            </tr>
                            <tr>
                                <th class="py-1 px-6 text-left font-bold text-gray-900 whitespace-nowrap">
                                    <p>Customer</p>
                                </th>
                                <td class="py-1 px-6">
                                    <p>: {{ transactionDetail && transactionDetail.customerID ? transactionDetail.customerID : "N/A" }}</p>
                                </td>
                            </tr>
                            <tr v-if="customerDetail">
                                <th class="py-1 px-6 text-left font-bold text-gray-900 whitespace-nowrap">
                                    <p>Customer point</p>
                                </th>
                                <td class="py-1 px-6">
                                    <p>: {{ priceFormat(customerDetail.point) }}</p>
                                </td>
                            </tr>
                            <tr>
                                <th class="py-1 px-6 text-left font-bold text-gray-900 whitespace-nowrap">
                                    <p>Sub-total</p>
                                </th>
                                <td class="py-1 px-6">
                                    <p>: {{ priceFormat(transactionDetail ? transactionDetail.subTotal : "") }}</p>
                                </td>
                            </tr>
                            <tr>
                                <th class="py-1 px-6 text-left font-bold text-gray-900 whitespace-nowrap">
                                    <p>Cash</p>
                                </th>
                                <td class="py-1 px-6">
                                    <p>: {{ priceFormat(transactionDetail ? transactionDetail.cash : "") }}</p>
                                </td>
                            </tr>
                            <tr>
                                <th class="py-1 px-6 text-left font-bold text-gray-900 whitespace-nowrap">
                                    <p>Discount</p>
                                </th>
                                <td class="py-1 px-6">
                                    <p>: {{ priceFormat(transactionDetail ? transactionDetail.disCount : "") }}</p>
                                </td>
                            </tr>
                            <tr>
                                <th class="py-1 px-6 text-left font-bold text-gray-900 whitespace-nowrap">
                                    <p>Change due</p>
                                </th>
                                <td class="py-1 px-6">
                                    <p>: {{ priceFormat(transactionDetail ? transactionDetail.changeDue : "null") }}</p>
                                </td>
                            </tr>
                            <tr>
                                <th class="py-1 px-6 text-left font-bold text-gray-900 whitespace-nowrap">
                                    <p>Total price</p>
                                </th>
                                <td class="py-1 px-6">
                                    <p>: {{ priceFormat(transactionDetail ? transactionDetail.totalPrice : "") }}</p>
                                </td>
                            </tr>
                            <tr v-if="this.customerDetail">
                                <td class="py-2 pb-3 px-6" colspan="2">
                                    <div class="flex items-center mb-4">
                                        <input
                                            v-model="allowPoint"
                                            :disabled="transactionDetail && transactionDetail.payStatus"
                                            v-on:change="togglePointHandler"
                                            id="default-checkbox"
                                            type="checkbox"
                                            class="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label for="default-checkbox" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Allow use customer's point</label>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div class="mb-2">
                    <div class="relative mb-4">
                        <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <ThemifyIcon icon="money" />
                        </div>
                        <input
                            v-model="cash"
                            type="number"
                            class="block py-4 px-10 w-full text-sm text-gray-900 rounded-lg border mb-4"
                            placeholder="Cash"
                            :disabled="transactionDetail && transactionDetail.payStatus"
                        />
                    </div>
                    <div
                        class="py-3 rounded-full text-white text-center font-bold text-lg transition-all"
                        v-on:click="handlePay"
                        :class="{
                            'bg-blue-400 cursor-pointer hover:bg-blue-500 ': transactionDetail && !transactionDetail.payStatus,
                            'bg-gray-400': transactionDetail && transactionDetail.payStatus,
                        }"
                    >
                        <ThemifyIcon icon="credit-card" />
                        <button :disabled="transactionDetail && transactionDetail.payStatus" class="ml-3">PAY</button>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import axios from "axios";
import ThemifyIcon from "vue-themify-icons/ThemifyIcon.vue";
import dateFormat from "../helpers/dateFormat";
import priceFormat from "../helpers/priceFormat";
import { mapState } from "vuex";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
    data() {
        return {
            isLoading: true,
            transactionDetail: null,
            barcode: "",
            cash: null,
            customerID: null,
            customerDetail: null,
            allowPoint: false,
        };
    },
    async mounted() {
        this.fetchData();
    },
    methods: {
        dateFormat,
        priceFormat,
        async fetchData() {
            this.isLoading = true;
            await axios
                .get(`${process.env.VUE_APP_API_URL}/transaction/${this.$route.params.transactionID}?token=${this.$store.state.accessToken}`)
                .then(async (res) => {
                    if (res.data.status && res.data.transactionQuery) {
                        this.transactionDetail = res.data.transactionQuery;
                        this.allowPoint = res.data.transactionQuery.usePoint;
                        await axios.get(`${process.env.VUE_APP_API_URL}/customer/${res.data.transactionQuery.customerID}/detail?token=${this.accessToken}`).then((res) => {
                            if (res.data.status) {
                                this.customerDetail = res.data.data;
                            } else {
                                this.customerDetail = null;
                            }
                        });
                    }
                })
                .catch(() => this.$router.push("/pos"));
            this.isLoading = false;
        },
        async handleCancelTransaction() {
            this.isLoading = true;
            const transactionID = this.$route.params.transactionID;
            await axios.delete(`${process.env.VUE_APP_API_URL}/transaction/${transactionID}/delete?token=${this.$store.state.accessToken}`).then((res) => {
                if (res.data.status) {
                    this.$store.state.toastify.success(res.data.msg.en);
                    this.$router.push("/pos");
                } else {
                    this.toastify.error(res.data.msg.en);
                }
            });
            this.isLoading = false;
        },
        async orderHandler() {
            this.isLoading = true;
            await axios
                .post(`${process.env.VUE_APP_API_URL}/transaction/${this.transactionDetail.transactionID}/order?token=${this.accessToken}`, {
                    barcode: this.barcode,
                })
                .then((res) => {
                    if (!res.data.status) this.toastify.error(res.data.msg.en);
                })
                .catch((err) => {
                    console.log(err);
                    this.toastify.error(err.response.data.msg.en || "Error occurred while processing order.");
                });
            this.fetchData();
            this.isLoading = false;
        },
        async handlePay() {
            this.isLoading = true;
            await axios
                .post(`${process.env.VUE_APP_API_URL}/transaction/${this.transactionDetail.transactionID}/pay?token=${this.accessToken}`, {
                    cash: this.cash,
                })
                .then((res) => {
                    if (res.data.status) {
                        this.toastify.success(res.data.msg.en);
                    } else {
                        this.toastify.error(res.data.msg.en);
                    }
                })
                .catch((err) => {
                    this.toastify.error(err.response.data.msg.en || "Error occurred while processing order.");
                });
            this.fetchData();
            this.isLoading = false;
        },
        async handleUpdateQuantity(product, type) {
            this.isLoading = true;
            let qty = product.qty;
            let barcode = product.barcode;
            await axios
                .post(`${process.env.VUE_APP_API_URL}/transaction/${this.transactionDetail.transactionID}/order?token=${this.accessToken}`, {
                    barcode,
                    qty: type == "increase" ? (qty += 1) : (qty -= 1),
                })
                .then((res) => {
                    if (res.data.status) {
                        this.toastify.success(res.data.msg.en);
                    } else {
                        this.toastify.error(res.data.msg.en);
                    }
                })
                .catch((err) => {
                    this.toastify.error(err.response.data.msg.en || "Error occurred while processing order.");
                });
            this.fetchData();
            this.isLoading = false;
        },
        async handleAddCustomer() {
            this.isLoading = true;
            await axios
                .post(`${process.env.VUE_APP_API_URL}/transaction/${this.transactionDetail.transactionID}/add-customer?token=${this.accessToken}`, {
                    customerID: this.customerID,
                })
                .then((res) => {
                    if (res.data.status) {
                        this.toastify.success(res.data.msg.en);
                    } else {
                        this.toastify.error(res.data.msg.en);
                    }
                })
                .catch((err) => {
                    this.toastify.error(err.response.data.msg.en || "Error occurred while processing order.");
                });
            this.fetchData();
            this.isLoading = false;
        },
        async togglePointHandler() {
            await axios.post(`${process.env.VUE_APP_API_URL}/transaction/${this.transactionDetail.transactionID}/toggle-point?token=${this.accessToken}`).then((res) => {
                console.log(res.data);
            });
            this.fetchData();
        },
    },
    computed: { ...mapState(["accessToken", "payload", "toastify"]) },
    components: { ThemifyIcon, Loading },
};
</script>

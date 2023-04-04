<template>
    <section class="bg-white dark:bg-gray-900">
        <DashboardMenu :menu="menu" />
        <main class="main-container">
            <div class="grid grid-cols-3 p-4">
                <div class="col-span-3 pr-2">
                    <div class="grid grid-cols-3" v-if="menuIndex">
                        <template v-if="menu[menuIndex - 1].disList.length > 0">
                            <div class="col-span-1 pr-2" v-for="(dish, i) in menu[menuIndex - 1].disList" :key="i">
                                <card-dish :dish="dish"></card-dish>
                            </div>
                        </template>
                        <template v-else>
                            <div class="flex items-center mb-4 text-red-700 font-bold text-lg uppercase">
                                <h1 class="ml-2">Category empty</h1>
                            </div>
                        </template>
                    </div>
                </div>
                <!-- <div class="col-span-1"> -->
                <div class="order-detail h-full flex flex-col w-full px-[20px] py-[15px] gap-3">
                    <!-- <button class="minimize-btn absolute text-medium inline-flex items-center px-3 text-sm font-medium text-white-500 bg-red-500" type="button"></button> -->

                    <!-- chi tiết bảng hóa đơn -->
                    <div class="flex flex-col absolute inset-0 mx-auto my-auto px-2 py-2 rounded-[20px]">
                        <div class="flex items-center justify-center text-gray-300 font-semibold text-[25px] my-3">
                            <h1 class="flex justify-center">ORDER DETAIL FOR TABLE 1</h1>
                            <font-awesome-icon icon="fa-solid fa-xmark" class="absolute top-0 right-2 cursor-pointer text-gray-300" />
                        </div>
                        <div class="flex flex-col gap-1 text-lime-400 w-[100%] justify-center items-center text-[15px]">
                            <h1>Mã hóa đơn : 123456789</h1>
                            <h1>Thời gian : 7:45 31/3/2023</h1>
                        </div>
                        <div id="cjss" class="flex flex-col overflow-auto h-1/2">
                            <div class="flex text-18px font-semibold pl-3 py-2 rounded-t">
                                <div class="flex gap-2 w-[65%]">
                                    <h1 class="">Danh sách món ăn</h1>
                                </div>
                                <h1 class="w-[15%]">Số lượng</h1>
                                <h1 class="w-[15%]">Đơn giá</h1>
                                <h1 class="w-[15%]">Thành tiền</h1>
                            </div>
                            <div class="flex flex-col my-5">
                                <h1 class="rounded px-2 flex items-center justify-center">Lần 1 - 22:10 - 31/3/2023</h1>
                                <div class="flex text-18px font-medium text-gray-200 pl-3 py-2 border-b-[1px] border-slate-700">
                                    <h1 class="w-[65%]">Cá hồi</h1>
                                    <h1 class="w-[15%]">2</h1>
                                    <h1 class="w-[15%]">100k</h1>
                                    <h1 class="w-[15%]">200k</h1>
                                </div>
                                <div class="flex text-18px font-medium text-gray-200 pl-3 py-2 border-b-[1px] border-slate-700">
                                    <h1 class="w-[65%]">Cá chim</h1>
                                    <h1 class="w-[15%]">3</h1>
                                    <h1 class="w-[15%]">100k</h1>
                                    <h1 class="w-[15%]">300k</h1>
                                </div>
                            </div>
                            <div class="flex flex-col my-5">
                                <h1 class="rounded px-2 flex items-center justify-center">Lần 1 - 22:10 - 31/3/2023</h1>
                                <div class="flex text-18px font-medium text-gray-200 pl-3 py-2 border-b-[1px] border-slate-700">
                                    <h1 class="w-[65%]">Cá hồi</h1>
                                    <h1 class="w-[15%]">2</h1>
                                    <h1 class="w-[15%]">100k</h1>
                                    <h1 class="w-[15%]">200k</h1>
                                </div>
                                <div class="flex text-18px font-medium text-gray-200 pl-3 py-2 border-b-[1px] border-slate-700">
                                    <h1 class="w-[65%]">Cá chim</h1>
                                    <h1 class="w-[15%]">3</h1>
                                    <h1 class="w-[15%]">100k</h1>
                                    <h1 class="w-[15%]">300k</h1>
                                </div>
                            </div>
                            <div class="flex flex-col my-5">
                                <h1 class="rounded px-2 flex items-center justify-center">Lần 1 - 22:10 - 31/3/2023</h1>
                                <div class="flex text-18px font-medium text-gray-200 pl-3 py-2 border-b-[1px] border-slate-700">
                                    <h1 class="w-[65%]">Cá hồi</h1>
                                    <h1 class="w-[15%]">2</h1>
                                    <h1 class="w-[15%]">100k</h1>
                                    <h1 class="w-[15%]">200k</h1>
                                </div>
                                <div class="flex text-18px font-medium text-gray-200 pl-3 py-2 border-b-[1px] border-slate-700">
                                    <h1 class="w-[65%]">Cá chim</h1>
                                    <h1 class="w-[15%]">3</h1>
                                    <h1 class="w-[15%]">100k</h1>
                                    <h1 class="w-[15%]">300k</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex text-yellow-300 font-semibold py-5 text-[16px] mt-auto mb-5 sdsad">
                        <h1 class="w-[65%] ml-2">Tổng</h1>
                        <h1 class="w-[15%]">5</h1>
                        <h1 class="w-[15%]"></h1>
                        <h1 class="w-[15%]">500k</h1>
                    </div>
                </div>
                <!-- </div> -->
            </div>
        </main>
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

export default {
    data() {
        return {
            menu: null,
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
                .get(`${process.env.VUE_APP_API_URL}/menu/get-data`)
                .then(async (res) => {
                    if (res.data.status && res.data.data) {
                        this.menu = res.data.data;
                    }
                })
                .catch(() => {});
            await axios
                .get(`${process.env.VUE_APP_API_URL}/table/get-order/${this.$route.params.tableId}`)
                .then(async (res) => {
                    if (res.data.status && res.data.data) {
                        localStorage.setItem("tableData", JSON.stringify(res.data.data));
                        this.$store.commit("set_tableData", res.data.data);
                    } else {
                        localStorage.setItem("tableData", JSON.stringify({ tableId: this.$route.params.tableId }));
                        this.$store.commit("set_tableData", { tableId: this.$route.params.tableId });
                    }
                })
                .catch(() => {});

            this.isLoading = false;
        },
    },
    components: { cardDish, DashboardMenu },
    computed: {
        ...mapState(["menuIndex", "tableData"]),
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
    left: 10px;
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

/* Handle on hover */
#cjss::-webkit-scrollbar-thumb:hover {
    background: #225a4f;
}
</style>

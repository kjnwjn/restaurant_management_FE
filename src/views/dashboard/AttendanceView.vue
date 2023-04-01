<template>
    <main>
        <Loading :active="isLoading" :is-full-page="true" :can-cancel="false" />
        <div class="flex items-center mb-4 text-green-700 font-bold text-lg uppercase">
            <ThemifyIcon icon="menu" />
            <h1 class="ml-2">Attendance system</h1>
        </div>
        <div class="grid grid-cols-3">
            <div class="col-span-2">
                <div class="overflow-x-auto relative">
                    <table class="overflow-scroll w-full text-sm text-left text-gray-500 dark:text-gray-400 mb-4">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="py-3 px-6">Date</th>
                                <th scope="col" class="py-3 px-6">UserCode</th>
                                <th scope="col" class="py-3 px-6">TimeIn</th>
                                <th scope="col" class="py-3 px-6">TimeOut</th>
                                <th scope="col" class="py-3 px-6">WorkTime</th>
                            </tr>
                        </thead>
                        <tbody v-if="attendanceList && attendanceList.length > 0">
                            <template v-for="attendance in attendanceList">
                                <!-- <tr class="bg-blue-400 border-b dark:bg-gray-800 dark:border-gray-700">
                                    <td class="py-4 px-6" colspan="5">{{ attendance.dateString }}</td>
                                </tr> -->
                                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" v-for="(account, i) in attendance.data" :key="i">
                                    <td class="py-4 px-6">{{ attendance.dateString }}</td>
                                    <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {{ account.userCode }}
                                    </th>
                                    <td class="py-4 px-6">{{ dateFormat(account.timeIn) }}</td>
                                    <td class="py-4 px-6">{{ dateFormat(account.timeOut) }}</td>
                                    <td class="py-4 px-6">{{ account.totalWorkTime }}</td>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                    <div v-if="attendanceList && attendanceList.length <= 0" class="flex w-full justify-center p-8">
                        <h1 class="">Empty list, there is no data!</h1>
                    </div>
                </div>
            </div>
            <div class="px-2">
                <div class="mb-8">
                    <div class="mb-4 flex items-center text-green-900 font-bold">
                        <ThemifyIcon icon="settings" />
                        <h1 class="ml-2">Select the start and the end date for detail:</h1>
                    </div>
                    <div class="grid grid-cols-2 bg-gray-200 rounded-md mt-5">
                        <div class="flex flex-col p-4">
                            <label class="mb-2 font-bold">Date Start:</label>
                            <input v-model="startDate" type="date" class="px-3 py-2 rounded-sm focus:outline-none" placeholder="dd-mm-yyyy" />
                        </div>
                        <div class="flex flex-col p-4">
                            <label class="mb-2 font-bold">Date End:</label>
                            <input v-model="endDate" type="date" class="px-3 py-2 rounded-sm focus:outline-none" placeholder="dd-mm-yyyy" />
                        </div>
                    </div>
                    <button
                        v-on:click="getAttendanceHandler"
                        class="text-white py-2 w-full my-4 rounded-md transition-all"
                        :class="{ 'bg-blue-400 hover:bg-blue-500 cursor-pointer': startDate && endDate, 'bg-gray-400 cursor-default': !startDate || !endDate }"
                    >
                        Confirm
                    </button>
                </div>
                <div class="flex flex-col mt-4 mb-8">
                    <div class="mb-4 flex items-center text-green-900 font-bold">
                        <ThemifyIcon icon="settings" />
                        <h1 class="ml-2">Enter user code for a attendance:</h1>
                    </div>
                    <div class="flex justify-center items-center">
                        <input v-model="accountDetail.userCode" type="text" placeholder="User code here..." class="py-2 px-5 border-2 rounded-lg w-full mr-4" />
                        <button class="bg-blue-400 hover:bg-blue-500 px-8 py-2 text-white rounded-lg transition-all" v-on:click="confirmAccountHandler">Confirm</button>
                    </div>
                </div>
                <div class="bg-gray-100 p-8 rounded-md" v-if="accountDetail && accountDetail.userCode && accountDetail.fullName">
                    <div class="flex items-center mb-2">
                        <h1 class="font-bold mr-2">UserCode:</h1>
                        <h1>{{ accountDetail.userCode }}</h1>
                    </div>
                    <div class="flex items-center mb-2">
                        <h1 class="font-bold mr-2">Fullname:</h1>
                        <h1>{{ accountDetail.fullName }}</h1>
                    </div>
                    <div class="mt-5">
                        <button class="px-3 py-2 bg-blue-400 hover:bg-blue-500 transition-all text-white mr-2 rounded-md w-50" v-on:click="attendanceHandler('checkIn')">
                            CheckIn
                        </button>
                        <button class="px-3 py-2 bg-blue-400 hover:bg-blue-500 transition-all text-white ml-2 rounded-md w-50" v-on:click="attendanceHandler('checkOut')">
                            CheckOut
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import dateFormat from "@/helpers/dateFormat";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
    data() {
        return {
            isLoading: false,
            accountDetail: {
                userCode: "",
            },
            startDate: null,
            endDate: null,
            attendanceList: [],
        };
    },
    methods: {
        dateFormat,
        async attendanceHandler(type) {
            this.isLoading = true;
            await axios
                .post(`${process.env.VUE_APP_API_URL}/attendance/${type == "checkIn" ? "checkin" : "checkout"}?token=${this.accessToken}`, {
                    userCode: this.accountDetail.userCode,
                })
                .then((res) => {
                    if (res.data.status) {
                        this.toastify.success(res.data.msg.en);
                        this.accountDetail = { userCode: "" };
                    } else {
                        this.toastify.error(res.data.msg.en);
                    }
                });
            this.isLoading = false;
        },
        async confirmAccountHandler() {
            this.isLoading = true;
            await axios
                .get(`${process.env.VUE_APP_API_URL}/account/${this.accountDetail.userCode ? this.accountDetail.userCode : "null"}/detail?token=${this.accessToken}`)
                .then((res) => {
                    if (res.data.status) {
                        this.accountDetail = res.data.data;
                    } else {
                        this.toastify.error(res.data.msg.en);
                    }
                });
            this.isLoading = false;
        },
        async getAttendanceHandler() {
            this.isLoading = true;
            if (this.startDate && this.endDate) {
                const dayFrom = this.startDate.split("-")[2];
                const monthFrom = this.startDate.split("-")[1];
                const yearFrom = this.startDate.split("-")[0];
                const dayTo = this.endDate.split("-")[2];
                const monthTo = this.endDate.split("-")[1];
                const yearTo = this.endDate.split("-")[0];
                const dateFrom = `${dayFrom}/${monthFrom}/${yearFrom}`;
                const dateTo = `${dayTo}/${monthTo}/${yearTo}`;
                await axios.get(`${process.env.VUE_APP_API_URL}/attendance/report?dateFrom=${dateFrom}&dateTo=${dateTo}&token=${this.accessToken}`).then((res) => {
                    if (res.data.status) {
                        this.attendanceList = res.data.result;
                    } else {
                        this.toastify.error(res.data.msg.en);
                    }
                });
            }
            this.isLoading = false;
        },
    },
    computed: {
        ...mapState(["accessToken", "payload", "toastify"]),
    },
    components: { Loading },
};
</script>

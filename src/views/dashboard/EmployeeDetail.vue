<template>
    <main>
        <Loading :active="isLoading" :is-full-page="true" :can-cancel="false" />
        <div class="flex items-center mb-4 text-green-700 font-bold text-lg uppercase">
            <ThemifyIcon icon="menu" />
            <h1 class="ml-2">Employee management</h1>
        </div>
        <div class="mb-6">
            <div class="mb-6 text-md font-medium text-gray-900 flex items-center">
                <ThemifyIcon icon="settings" />
                <p class="ml-2">Detail of Employee:</p>
            </div>
            <div class="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">User code</label>
                    <input v-model="employee.userCode" disabled class="bg-gray-200 border border-gray-300 text-gray-500 text-sm rounded-lg block w-full p-2.5" />
                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Full name</label>
                    <input v-model="employee.fullName" type="text" disabled class="bg-gray-200 border border-gray-300 text-gray-500 text-sm rounded-lg block w-full p-2.5" />
                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Basic salary</label>
                    <input
                        :disabled="payload.role != 'ADMIN'"
                        :class="{
                            ' bg-gray-200 text-gray-500': payload.role != 'ADMIN',
                            'border-gray-300 text-gray-900': payload.role == 'ADMIN',
                        }"
                        v-model="employee.preSalary"
                        type="number"
                        class="border-gray-200 border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Role</label>
                    <input disabled v-model="employee.role" class="bg-gray-200 border border-gray-300 text-gray-500 text-sm rounded-lg block w-full p-2.5" />
                </div>
            </div>
            <button
                type="submit"
                v-on:click="updateSalaryHandler"
                :class="{
                    'bg-blue-400 hover:bg-blue-500 ': payload.role == 'ADMIN',
                    'bg-gray-400 cursor-default': payload.role != 'ADMIN',
                }"
                class="text-white transition-all focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-8 py-2.5 text-center"
            >
                Update
            </button>
        </div>
    </main>
</template>

<script>
import axios from "axios";
import ThemifyIcon from "vue-themify-icons/ThemifyIcon.vue";
import { mapState } from "vuex";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
    components: { ThemifyIcon, Loading },
    data() {
        return {
            isLoading: false,
            employee: {
                userCode: null,
                fullName: null,
                role: null,
                preSalary: null,
            },
        };
    },
    async mounted() {
        this.fetchData();
    },
    methods: {
        async updateSalaryHandler() {
            this.isLoading = true;
            await axios
                .post(`${process.env.VUE_APP_API_URL}/employee/salary/updateSalary?token=${this.accessToken}`, {
                    userCode: this.employee.userCode,
                    newSalary: this.employee.preSalary,
                })
                .then((res) => {
                    if (res.data.status) {
                        this.toastify.success(res.data.msg.en);
                    } else {
                        this.toastify.error(res.data.msg.en);
                    }
                })
                .catch((err) => {
                    this.toastify.error(err.response.data.msg.en);
                });
            this.isLoading = false;
            this.fetchData();
        },
        async fetchData() {
            this.isLoading = true;
            await axios.get(`${process.env.VUE_APP_API_URL}/employee/${this.$route.params.userCode}/detail?token=${this.accessToken}`).then((res) => {
                if (res.data.status && res.data.result) {
                    this.employee = res.data.result;
                } else {
                    this.employee = {
                        userCode: null,
                        fullName: null,
                        role: null,
                        preSalary: null,
                    };
                }
            });
            this.isLoading = false;
        },
    },
    computed: { ...mapState(["accessToken", "payload", "toastify"]) },
};
</script>

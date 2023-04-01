<template>
    <main>
        <Loading :active="isLoading" :is-full-page="true" :can-cancel="false" />
        <div class="flex items-center mb-4 text-green-700 font-bold text-lg uppercase">
            <ThemifyIcon icon="menu" />
            <h1 class="ml-2">Account management</h1>
        </div>
        <div class="mb-6">
            <div class="mb-6 text-md font-medium text-gray-900 flex items-center">
                <ThemifyIcon icon="settings" />
                <p class="ml-2">Detail of account:</p>
            </div>
            <div class="grid gap-6 mb-6 grid-cols-2">
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">User code</label>
                    <input :value="accountData.userCode" disabled class="bg-gray-200 border border-gray-300 text-gray-500 text-sm rounded-lg block w-full p-2.5" />
                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Full name</label>
                    <input
                        v-model="accountData.fullName"
                        placeholder="Fullname"
                        type="text"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email</label>
                    <input
                        v-model="accountData.email"
                        type="email"
                        placeholder="example@example.com"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Phone number</label>
                    <input
                        type="tel"
                        pattern="[0-9]{4}-[0-9]{3}-[0-9]{3}"
                        placeholder="0123-456-789"
                        v-model="accountData.phoneNumber"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    />
                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Role</label>
                    <select v-model="accountData.role" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5">
                        <option value="MANAGER" :selected="accountData.role == 'MANAGER'">MANAGER</option>
                        <option value="STAFF" :selected="accountData.role == 'STAFF'">STAFF</option>
                    </select>
                </div>
                <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Last login</label>
                    <input disabled :value="dateFormat(accountData.lastLogin)" class="bg-gray-200 border border-gray-300 text-gray-500 text-sm rounded-lg block w-full p-2.5" />
                </div>
            </div>
            <button
                type="submit"
                v-on:click="updateHandler"
                class="text-white transition-all bg-blue-400 hover:bg-blue-500 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-8 py-2.5 text-center"
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
import dateFormat from "../../helpers/dateFormat";

export default {
    components: { ThemifyIcon, Loading },
    data() {
        return {
            isLoading: false,
            accountData: {
                userCode: null,
                fullName: null,
                role: null,
                email: null,
                phoneNumber: null,
                lastLogin: null,
            },
        };
    },
    async mounted() {
        this.fetchData();
    },
    methods: {
        dateFormat,
        async updateHandler() {
            this.isLoading = true;
            await axios
                .put(`${process.env.VUE_APP_API_URL}/account/${encodeURIComponent(this.$route.params.userCode)}/update?token=${this.accessToken}`, {
                    email: this.accountData.email,
                    fullName: this.accountData.fullName,
                    phoneNumber: this.accountData.phoneNumber,
                    role: this.accountData.role,
                })
                .then((res) => {
                    if (res.data.status) {
                        this.toastify.success(res.data.msg.en);
                    } else {
                        this.toastify.error(res.data.msg.en);
                    }
                });
            this.isLoading = false;
            this.fetchData();
        },
        async fetchData() {
            this.isLoading = true;
            await axios.get(`${process.env.VUE_APP_API_URL}/account/${encodeURIComponent(this.$route.params.userCode)}/detail?token=${this.accessToken}`).then((res) => {
                if (res.data.status && res.data.data) {
                    this.accountData = res.data.data;
                } else {
                    this.accountData = {
                        userCode: null,
                        fullName: null,
                        role: null,
                        email: null,
                        phoneNumber: null,
                        lastLogin: null,
                    };
                }
            });
            this.isLoading = false;
        },
    },
    computed: { ...mapState(["accessToken", "payload", "toastify"]) },
};
</script>

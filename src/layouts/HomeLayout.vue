<template>
    <div class="flex min-h-screen min-w-screen bg-slate-600">
        <hea-der class="" />
        <div class="lg:pl-[308px] lg:pr-[288px] min-h-screen w-full">
            <router-link to="/" class="flex lg:hidden h-[200px] bg-slate-800 fixed z-30 items-center justify-center gap-2 w-full" v-on:click="counter.Show_Search = 1">
                <img src="@/assets/logo.png" class="text-[30px] text-cyan-600 w-[150px]" />
                <h1 class="font-bold text-yellow-500 text-[35px]">Food King</h1>
            </router-link>
            <router-view />
            <div v-show="counter.Show_bang_khach_hang == true" class="flex flex-col fixed inset-0 z-50 mx-auto mt-[15px] bg-slate-900 border-[2px] border-slate-800 px-2 py-2 max-w-[800px] max-h-[1000px] rounded-[20px]">
                <div class="flex items-center justify-center text-gray-300 font-semibold text-[25px] relative my-3">
                    <h1 class="flex justify-center">Bảng danh sách món ăn khách hàng đã đặt</h1>
                    <font-awesome-icon icon="fa-solid fa-xmark" v-on:click="counter.Show_bang_khach_hang = !counter.Show_bang_khach_hang" class="absolute top-2 right-2 cursor-pointer text-gray-300" />
                </div>
                <!-- <div class="flex flex-col gap-1 text-lime-400 w-[100%] justify-center items-center text-[15px]">
                <h1>Mã hóa đơn : 123456789</h1>
                <h1>Thời gian : 7:45 31/3/2023</h1>
            </div> -->
                <div id="cjss" class="flex flex-col overflow-auto min-h-[500px]">
                    <div v-for="(i, index) in counter.Data_Food_King_NVB" class="flex flex-col my-5">
                        <div class="flex text-18px font-semibold bg-slate-700 text-blue-400 pl-3 py-2 rounded-t">
                            <div class="flex flex-col gap-2 w-[65%]">
                                <div class="flex gap-2">
                                    <h1 class="bg-slate-800 rounded px-2 shadow-inner">Bàn {{ i.Ban_so }}</h1>
                                    <h1 class="bg-slate-800 rounded px-2 shadow-inner">Lần {{ index + 1 }}</h1>
                                    <h1 class="bg-slate-800 rounded px-2 shadow-inner">MHĐ : {{ i.Ma_HD }}</h1>
                                    <h1 class="bg-slate-800 rounded px-2 shadow-inner">TG : 22:10 31/3/2023</h1>
                                </div>
                                <div class="flex gap-2">
                                    <h1 class="text-blue-500">Danh sách món ăn khách hàng đặt</h1>
                                    <div class="w-[13%] flex relative">
                                        <button class="bg-slate-800 px-2 py-1 shrink-0 rounded" @mouseover="i.Show_ghi_chu = 1" @mouseleave="i.Show_ghi_chu = 0">Xem ghi chú</button>
                                        <textarea
                                            v-show="i.Show_ghi_chu == 1"
                                            class="text-gray-300 flex absolute z-50 text-left top-10 border-gray-600 border-[1px] px-2 py-2 text-[15px] font-medium bg-slate-800 rounded grow-0 w-[200px] min-h-[100px] outline-none pointer-events-none"
                                            >{{ i.Ghi_chu }}</textarea
                                        >
                                    </div>
                                </div>
                            </div>
                            <h1 class="w-[10%]">Số lượng</h1>
                            <h1 class="w-[10%]">Giá</h1>
                            <h1 class="w-[15%]">Thành tiền</h1>
                        </div>
                        <div v-for="(j, index) in i.Haisan" v-show="j.SL > 0" :class="{ 'opacity-50': j.CH == 'Hết hàng' }" class="flex text-18px font-medium text-gray-200 pl-3 py-2 border-b-[1px] border-slate-700">
                            <h1 class="w-[65%]">{{ j.Ten }}</h1>
                            <h1 class="w-[10%]">{{ j.SL }}</h1>
                            <h1 class="w-[10%]">{{ j.Gia }}</h1>
                            <h1 class="w-[15%]">{{ j.Gia * j.SL }}</h1>
                        </div>
                        <div v-for="(j, index) in i.Thuysan" v-show="j.SL > 0" :class="{ 'opacity-50': j.CH == 'Hết hàng' }" class="flex text-18px font-medium text-gray-200 pl-3 py-2 border-b-[1px] border-slate-700">
                            <h1 class="w-[65%]">{{ j.Ten }}</h1>
                            <h1 class="w-[10%]">{{ j.SL }}</h1>
                            <h1 class="w-[10%]">{{ j.Gia }}</h1>
                            <h1 class="w-[15%]">{{ j.Gia * j.SL }}</h1>
                        </div>
                        <div v-for="(j, index) in i.Cacloaithit" v-show="j.SL > 0" :class="{ 'opacity-50': j.CH == 'Hết hàng' }" class="flex text-18px font-medium text-gray-200 pl-3 py-2 border-b-[1px] border-slate-700">
                            <h1 class="w-[65%]">{{ j.Ten }}</h1>
                            <h1 class="w-[10%]">{{ j.SL }}</h1>
                            <h1 class="w-[10%]">{{ j.Gia }}</h1>
                            <h1 class="w-[15%]">{{ j.Gia * j.SL }}</h1>
                        </div>
                        <div v-for="(j, index) in i.Khac" v-show="j.SL > 0" :class="{ 'opacity-50': j.CH == 'Hết hàng' }" class="flex text-18px font-medium text-gray-200 pl-3 py-2 border-b-[1px] border-slate-700">
                            <h1 class="w-[65%]">{{ j.Ten }}</h1>
                            <h1 class="w-[10%]">{{ j.SL }}</h1>
                            <h1 class="w-[10%]">{{ j.Gia }}</h1>
                            <h1 class="w-[15%]">{{ j.Gia * j.SL }}</h1>
                        </div>
                        <div v-for="(j, index) in i.Douong" v-show="j.SL > 0" :class="{ 'opacity-50': j.CH == 'Hết hàng' }" class="flex text-18px font-medium text-gray-200 pl-3 py-2 border-b-[1px] border-slate-700">
                            <h1 class="w-[65%]">{{ j.Ten }}</h1>
                            <h1 class="w-[10%]">{{ j.SL }}</h1>
                            <h1 class="w-[10%]">{{ j.Gia }}</h1>
                            <h1 class="w-[15%]">{{ j.Gia * j.SL }}</h1>
                        </div>
                        <div v-for="(j, index) in i.Trangmieng" v-show="j.SL > 0" :class="{ 'opacity-50': j.CH == 'Hết hàng' }" class="flex text-18px font-medium text-gray-200 pl-3 py-2 border-b-[1px] border-slate-700">
                            <h1 class="w-[65%]">{{ j.Ten }}</h1>
                            <h1 class="w-[10%]">{{ j.SL }}</h1>
                            <h1 class="w-[10%]">{{ j.Gia }}</h1>
                            <h1 class="w-[15%]">{{ j.Gia * j.SL }}</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <foo-ter class="" />
        <div class="flex lg:hidden fixed z-50 w-screen h-[50px] bg-slate-900 text-slate-100 bottom-0 text-[25px] justify-center items-center cursor-pointer">
            <font-awesome-icon
                icon="fa-solid fa-list-ul"
                class="w-1/2"
                v-on:click="
                    counter.Menu = !counter.Menu;
                    counter.HD = false;
                "
            />
            <font-awesome-icon
                icon="fa-solid fa-file-lines"
                class="w-1/2 border-l-[2px] border-slate-100"
                v-on:click="
                    counter.HD = !counter.HD;
                    counter.Menu = false;
                "
            />
        </div>
    </div>
    <div v-show="counter.Show_Table_Hoa_don == false" class="flex flex-col justify-center items-center fixed inset-0 z-50 h-screen w -screen bg-slate-800 gap-5">
        <div class="flex flex-col">
            <img src="@/assets/logo.png" class="text-[30px] text-cyan-600 w-[150px]" />
            <h1 class="font-bold text-yellow-500 text-[35px]">Food King</h1>
        </div>
        <div class="flex gap-2">
            <router-link to="/" class="border-b-[2px] border-lime-500 text-gray-200 font-semibold px-2 py-1 rounded">Đăng nhập bàn</router-link>
            <router-link to="/manager" class="font-semibold text-gray-200 px-2 py-1 rounded">Đăng nhập NVQL</router-link>
            <router-link to="/chef" class="font-semibold text-gray-200 px-2 py-1 rounded">Đăng nhập NVB</router-link>
            <!-- <h1>{{ counter.Path_Route.path.length }}</h1> -->
        </div>
        <div class="flex flex-col justify-center items-center gap-3 border-[1px] border-lime-500 px-5 py-5 rounded">
            <h1 class="font-bold text-gray-300 text-[23px]">Đăng nhập bàn</h1>
            <input placeholder="Tài khoản" v-model="counter.Username" type="text" class="bg-gray-700 py-2 px-2 border-slate-500 rounded text-gray-200 w-[300px]" />
            <input placeholder="Mật khẩu" v-model="counter.Password" type="password" class="bg-gray-700 py-2 px-2 border-slate-500 rounded text-gray-200 w-[300px]" />
            <button
                class="font-bold text-lime-500 text-[15px] hover:bg-slate-600 bg-slate-700 px-2 py-2 rounded border-b-[2px] border-lime-500"
                v-on:click="
                    counter.Login_Account();
                    counter.Show_Table_Hoa_don = true;
                "
            >
                Đăng nhập
            </button>
            <!-- <input placeholder="Số bàn" type="text" class="bg-gray-700 py-2 px-2 border-slate-500 rounded text-gray-200 w-[300px]"/> -->
        </div>
    </div>
</template>

<script>
// Import thành phần (components) NavBar, SideBar, FooterBar để sử dụng
import HeaDer from "@/components/HeaDer.vue";
import FooTer from "@/components/FooTer.vue";

import { useCounterStore } from "@/stores/counter";

// Để sử dụng được các thẻ (tag) của các component tương ứng
// <nav-bar />     -> component NavBar
// <side-bar />    -> component SideBar
// <footer-bar />  -> component FooterBar
// Chúng ta phải khai báo trong thuộc tính `components` của phần export default {}
export default {
    setup() {
        const counter = useCounterStore();
        return { counter };
    },
    //  fetchData() {
    //     // Will be implemented next
    //      return fetch(`${process.env.VUE_APP_API_URL}`, {
    //         method: 'get',
    //         headers: {
    //           'content-type': 'application/json'
    //         }
    //       })
    //         .then(res => {
    //           // a non-200 response code
    //           if (!res.ok) {
    //             // create error instance with HTTP status text
    //             const error = new Error(res.statusText);
    //             error.json = res.json();
    //             throw error;
    //           }

    //           return res.json();
    //         })
    //         .then(json => {
    //           // set the response data
    //           data.value = json.data;
    //         })
    //         .catch(err => {
    //           error.value = err;
    //           // In case a custom JSON error response was provided
    //           if (err.json) {
    //             return err.json.then(json => {
    //               // set the JSON response message
    //               error.value.message = json.message;
    //             });
    //           }
    //         })
    //         .then(() => {
    //           loading.value = false;
    //         });
    //   },

    //   mounted : function (){
    //     // fetchData()
    //   },
    components: {
        HeaDer,
        FooTer,
    },
};
</script>

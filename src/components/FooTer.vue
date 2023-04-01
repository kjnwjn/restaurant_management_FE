<template>
    <div class="hidden  lg:flex lg:flex-col fixed z-30 right-[0px] bg-slate-800 min-w-[280px] max-w-[280px] min-h-screen max-h-screen items-center  text-slate-100 font-bold overflow-auto" >
        <div class="flex flex-col justify-center items-center border-b-[1px] border-slate-700 w-full py-3 px-3">
            <h1 class="text-[22px]">Hóa đơn</h1>
            <div class="flex gap-1 ml-6"><h1 class="text-red-500">Bàn số :</h1><input class="text-red-500 font-normal bg-transparent text-left grow-0 w-[30px] pointer-events-none" v-model="counter.Data_Food_King.Ban_so" /></div>
            <div class="flex gap-1 ml-10"><h1 class="shrink-0 text-red-500">Mã hóa đơn : </h1><input class="text-red-500 flex justify-start text-left font-normal bg-transparent  grow-0 w-[100px] pointer-events-none" v-model="counter.Data_Food_King.Ma_HD" /></div>
        </div>
        <div class="flex flex-col justify-center items-center border-b-[1px] border-slate-700 w-full py-3 px-3">
            <h1 class="text-[18px] text-lime-600">Danh sách món ăn đã chọn</h1>
            <div class="grid grid-cols-10 w-full mt-3 text-[14px] text-slate-300"><h1 class="col-span-4">Tên SP</h1><h1 class="col-span-2">Giá</h1><h1 class="col-span-1">SL</h1><h1 class="col-span-2">Thành tiền</h1><h1 class="col-span-1">Đã giao</h1></div>
            <div class="grid grid-cols-10 w-full mt-3 text-[13px] font-normal" v-for="i in counter.Data_Food_King.Haisan" v-show="i.SL > 0">
                <h1 class="col-span-4">{{ i.Ten }}</h1>
                <h1 class="col-span-2">{{ i.Gia }}k</h1>
                <h1 class="col-span-1">{{ i.SL }}</h1>
                <h1 class="col-span-2">{{ i.SL*i.Gia }}k</h1>
                <h1 class="col-span-1 ">{{ i.DG }}/{{ i.SL }}</h1>
            </div>
            <div class="grid grid-cols-10 w-full mt-3 text-[13px] font-normal" v-for="i in counter.Data_Food_King.Thuysan" v-show="i.SL > 0">
                <h1 class="col-span-4">{{ i.Ten }}</h1>
                <h1 class="col-span-2">{{ i.Gia }}k</h1>
                <h1 class="col-span-1">{{ i.SL }}</h1>
                <h1 class="col-span-2">{{ i.SL*i.Gia }}k</h1>
                <h1 class="col-span-1 ">{{ i.DG }}/{{ i.SL }}</h1>
            </div>
            <div class="grid grid-cols-10 w-full mt-3 text-[13px] font-normal" v-for="i in counter.Data_Food_King.Cacloaithit" v-show="i.SL > 0">
                <h1 class="col-span-4">{{ i.Ten }}</h1>
                <h1 class="col-span-2">{{ i.Gia }}k</h1>
                <h1 class="col-span-1">{{ i.SL }}</h1>
                <h1 class="col-span-2">{{ i.SL*i.Gia }}k</h1>
                <h1 class="col-span-1 ">{{ i.DG }}/{{ i.SL }}</h1>
            </div>
            <div class="grid grid-cols-10 w-full mt-3 text-[13px] font-normal" v-for="i in counter.Data_Food_King.Douong" v-show="i.SL > 0">
                <h1 class="col-span-4">{{ i.Ten }}</h1>
                <h1 class="col-span-2">{{ i.Gia }}k</h1>
                <h1 class="col-span-1">{{ i.SL }}</h1>
                <h1 class="col-span-2">{{ i.SL*i.Gia }}k</h1>
                <h1 class="col-span-1 ">{{ i.DG }}/{{ i.SL }}</h1>
            </div>
            <div class="grid grid-cols-10 w-full mt-3 text-[13px] font-normal" v-for="i in counter.Data_Food_King.Trangmieng" v-show="i.SL > 0">
                <h1 class="col-span-4">{{ i.Ten }}</h1>
                <h1 class="col-span-2">{{ i.Gia }}k</h1>
                <h1 class="col-span-1">{{ i.SL }}</h1>
                <h1 class="col-span-2">{{ i.SL*i.Gia }}k</h1>
                <h1 class="col-span-1 ">{{ i.DG }}/{{ i.SL }}</h1>
            </div>
            <div class="grid grid-cols-10 w-full mt-3 text-[13px] font-normal" v-for="i in counter.Data_Food_King.Khac" v-show="i.SL > 0">
                <h1 class="col-span-4">{{ i.Ten }}</h1>
                <h1 class="col-span-2">{{ i.Gia }}k</h1>
                <h1 class="col-span-1">{{ i.SL }}</h1>
                <h1 class="col-span-2">{{ i.SL*i.Gia }}k</h1>
                <h1 class="col-span-1 ">{{ i.DG }}/{{ i.SL }}</h1>
            </div>
        </div>
        <div class="flex flex-col justify-center items-center border-b-[1px] border-slate-700 w-full pb-3 px-3">
            <div class="grid grid-cols-10 w-full mt-3 text-[13px] text-yellow-500"><h1 class="col-span-4">Tổng</h1><h1 class="col-span-2"></h1><h1 class="col-span-1">{{ counter.Data_Food_King.Tong.SL }}</h1><h1 class="col-span-2">{{ counter.Data_Food_King.Tong.TT }}k</h1><h1 class="col-span-1">{{ counter.Data_Food_King.Tong.DG }}/{{ counter.Data_Food_King.Tong.SL }}</h1></div>
        </div>
        <div class="flex flex-col justify-center items-center border-b-[1px] border-slate-700 w-full py-3 px-3">
            <h1 class="text-[15px]">Ghi chú khách hàng:</h1>
            <textarea class="text-gray-300 flex  text-left mt-2 border-gray-600 border-[1px] px-2 py-2 text-[13px] font-medium bg-slate-800 rounded grow-0 w-full min-h-[100px] outline-none" v-model="counter.Data_Food_King.Ghi_chu" placeholder="Ghi chú món ăn ..."></textarea>
        </div>
        <div class="flex flex-col justify-center items-center border-b-[1px] border-slate-700 w-full py-3 px-3">
            <button class="flex flex-col bg-yellow-500 hover:bg-yellow-400 px-6 py-3 items-center justify-center rounded-full w-full text-slate-900 text-[16px] gap-2" v-on:click="counter.F_Table_Code_Oder(); counter.Update_Code_Oder=3; counter.Update_Dist_New(); counter.Dat_hang_theo_lan(); counter.Reset_Ban() ">
                <div class="flex justify-items-center items-center gap-1 text-[18px]"><font-awesome-icon icon="fa-solid fa-file-circle-plus" /><h1>Đặt hàng</h1></div>
            </button>
            <div class="flex justify-items-center items-center text-[14px] gap-1 text-red-500 font-semibold mt-2" v-show="counter.Update_Code_Oder==2"><font-awesome-icon icon="fa-solid fa-circle-info" /><h1>Chưa cập nhập đơn hàng</h1></div>
            <div class="flex justify-items-center items-center text-[14px] gap-1 text-lime-600 font-semibold mt-2" v-show="counter.Update_Code_Oder==3"><font-awesome-icon icon="fa-solid fa-circle-check" /><h1>Cập nhật đơn hàng thành công</h1></div>
        </div>
        <div class="flex flex-col justify-center items-center border-b-[1px] border-slate-700 w-full py-3 px-3">
            <button class="flex flex-col bg-yellow-500 hover:bg-yellow-400 px-6 py-3 items-center justify-center rounded-full w-full text-slate-900 text-[16px] gap-2" >
                <div class="flex justify-items-center items-center gap-1 text-[18px]"><font-awesome-icon icon="fa-solid fa-credit-card" /><h1>Thanh toán</h1></div>
            </button>
        </div>
    </div>

    <!-- manhinh < lg -->
    <div class="lg:hidden  flex flex-col fixed z-20 right-0  bg-slate-800 min-w-[280px] max-w-[280px] min-h-screen max-h-screen items-center  text-slate-100 font-bold overflow-auto" v-show="counter.HD==true">
        <div class="flex flex-col justify-center items-center border-b-[1px] border-slate-700 w-full py-3 px-3">
            <h1 class="text-[22px]">Hóa đơn</h1>
            <h1 class="text-red-500">Bàn số: 1</h1>
            <div class="flex "><h1 class="shrink-0 text-red-500">Mã hóa đơn : </h1><input class="text-red-500 font-normal bg-transparent text-center grow-0 w-[60px] pointer-events-none" v-model="counter.Table_Code_Oder.Coder_Oder"></div>
        </div>
        <div class="flex flex-col justify-center items-center border-b-[1px] border-slate-700 w-full py-3 px-3">
            <h1 class="text-[18px] text-lime-600">Danh sách món ăn đã chọn</h1>
            <div class="grid grid-cols-10 w-full mt-3 text-[14px] text-slate-300"><h1 class="col-span-4">Tên SP</h1><h1 class="col-span-2">Giá</h1><h1 class="col-span-1">SL</h1><h1 class="col-span-2">Thành tiền</h1><h1 class="col-span-1">Đã giao</h1></div>
            <div class="grid grid-cols-10 w-full mt-3 text-[13px] font-normal" v-for="i in counter.Data_Food_King.Haisan" v-show="i.SL > 0">
                <h1 class="col-span-4">{{ i.Ten }}</h1>
                <h1 class="col-span-2">{{ i.Gia }}k</h1>
                <h1 class="col-span-1">{{ i.SL }}</h1>
                <h1 class="col-span-2">{{ i.SL*i.Gia }}k</h1>
                <h1 class="col-span-1 ">{{ i.DG }}/{{ i.SL }}</h1>
            </div>
            <div class="grid grid-cols-10 w-full mt-3 text-[13px] font-normal" v-for="i in counter.Data_Food_King.Thuysan" v-show="i.SL > 0">
                <h1 class="col-span-4">{{ i.Ten }}</h1>
                <h1 class="col-span-2">{{ i.Gia }}k</h1>
                <h1 class="col-span-1">{{ i.SL }}</h1>
                <h1 class="col-span-2">{{ i.SL*i.Gia }}k</h1>
                <h1 class="col-span-1 ">{{ i.DG }}/{{ i.SL }}</h1>
            </div>
            <div class="grid grid-cols-10 w-full mt-3 text-[13px] font-normal" v-for="i in counter.Data_Food_King.Cacloaithit" v-show="i.SL > 0">
                <h1 class="col-span-4">{{ i.Ten }}</h1>
                <h1 class="col-span-2">{{ i.Gia }}k</h1>
                <h1 class="col-span-1">{{ i.SL }}</h1>
                <h1 class="col-span-2">{{ i.SL*i.Gia }}k</h1>
                <h1 class="col-span-1 ">{{ i.DG }}/{{ i.SL }}</h1>
            </div>
            <div class="grid grid-cols-10 w-full mt-3 text-[13px] font-normal" v-for="i in counter.Data_Food_King.Douong" v-show="i.SL > 0">
                <h1 class="col-span-4">{{ i.Ten }}</h1>
                <h1 class="col-span-2">{{ i.Gia }}k</h1>
                <h1 class="col-span-1">{{ i.SL }}</h1>
                <h1 class="col-span-2">{{ i.SL*i.Gia }}k</h1>
                <h1 class="col-span-1 ">{{ i.DG }}/{{ i.SL }}</h1>
            </div>
            <div class="grid grid-cols-10 w-full mt-3 text-[13px] font-normal" v-for="i in counter.Data_Food_King.Trangmieng" v-show="i.SL > 0">
                <h1 class="col-span-4">{{ i.Ten }}</h1>
                <h1 class="col-span-2">{{ i.Gia }}k</h1>
                <h1 class="col-span-1">{{ i.SL }}</h1>
                <h1 class="col-span-2">{{ i.SL*i.Gia }}k</h1>
                <h1 class="col-span-1 ">{{ i.DG }}/{{ i.SL }}</h1>
            </div>
            <div class="grid grid-cols-10 w-full mt-3 text-[13px] font-normal" v-for="i in counter.Data_Food_King.Khac" v-show="i.SL > 0">
                <h1 class="col-span-4">{{ i.Ten }}</h1>
                <h1 class="col-span-2">{{ i.Gia }}k</h1>
                <h1 class="col-span-1">{{ i.SL }}</h1>
                <h1 class="col-span-2">{{ i.SL*i.Gia }}k</h1>
                <h1 class="col-span-1 ">{{ i.DG }}/{{ i.SL }}</h1>
            </div>
        </div>
        <div class="flex flex-col justify-center items-center border-b-[1px] border-slate-700 w-full pb-3 px-3">
            <div class="grid grid-cols-10 w-full mt-3 text-[13px] text-yellow-500"><h1 class="col-span-4">Tổng</h1><h1 class="col-span-2"></h1><h1 class="col-span-1">{{ counter.Data_Food_King.Tong.SL }}</h1><h1 class="col-span-2">{{ counter.Data_Food_King.Tong.TT }}k</h1><h1 class="col-span-1">{{ counter.Data_Food_King.Tong.DG }}/{{ counter.Data_Food_King.Tong.SL }}</h1></div>
        </div>
        <div class="flex flex-col justify-center items-center border-b-[1px] border-slate-700 w-full py-3 px-3">
            <h1 class="text-[15px]">Ghi chú khách hàng:</h1>
            <input class="text-red-500 flex justify-start text-left font-normal bg-transparent bg-slate-700 rounded grow-0 w-[100px] min-h-[100px] pointer-events-none" v-model="counter.Data_Food_King.Ghi_chu" />
        </div>
        <div class="flex flex-col justify-center items-center border-b-[1px] border-slate-700 w-full py-3 px-3">
            <button class="flex flex-col bg-yellow-500 hover:bg-yellow-400 px-6 py-3 items-center justify-center rounded-full w-full text-slate-900 text-[16px] gap-2" v-on:click="counter.F_Table_Code_Oder(); counter.Update_Code_Oder=3; counter.Update_Dist_New()">
                <div class="flex justify-items-center items-center gap-1 text-[18px]"><font-awesome-icon icon="fa-solid fa-file-circle-plus" /><h1>Đặt hàng</h1></div>
            </button>
            <div class="flex justify-items-center items-center text-[14px] gap-1 text-red-500 font-semibold mt-2" v-show="counter.Update_Code_Oder==2"><font-awesome-icon icon="fa-solid fa-circle-info" /><h1>Chưa cập nhập đơn hàng</h1></div>
            <div class="flex justify-items-center items-center text-[14px] gap-1 text-lime-600 font-semibold mt-2" v-show="counter.Update_Code_Oder==3"><font-awesome-icon icon="fa-solid fa-circle-check" /><h1>Cập nhật đơn hàng thành công</h1></div>
        </div>
        <!-- <div class="flex flex-col justify-center items-center border-b-[1px] border-slate-700 w-full py-3 px-3">
            <button class="flex flex-col bg-yellow-500 hover:bg-yellow-400 px-6 py-3 items-center justify-center rounded-full w-full text-slate-900 text-[16px] gap-2" >
                <div class="flex justify-items-center items-center gap-1 text-[18px]"><font-awesome-icon icon="fa-solid fa-file-circle-plus" /><h1>Thanh toán</h1></div>
            </button>
        </div> -->
    </div>
</template>


<script>
    import { useCounterStore } from '@/stores/counter';
    import axios from 'axios';
    import VueCookies from 'vue-cookies'


    export default {

    setup() {
        const counter = useCounterStore();
        return {counter}
    },
    }
</script>
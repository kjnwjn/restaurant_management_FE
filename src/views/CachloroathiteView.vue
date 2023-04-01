<template>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-2 place-content-start  rounded min-h-screen w-full font-semibold text-[#087990] ">
        <div v-for="i in counter.Data_Food_King.Cacloaithit" class="flex flex-col justify-center items-center  bg-slate-800  grow rounded px-2 py-2" v-bind:class="{'border-4 border-lime-600':i.SL>0}">
            <img :src="i.Anh" class="w-full rounded"/>
            <div class="flex text-yellow-500 text-[25px] font-bold my-3 items-center justify-center bg-slate-700 w-full rounded gap-3 cursor-pointer"  v-on:click=" counter.Show_Table_Information=!counter.Show_Table_Information;">
                <h1 class="">{{ i.Ten }}</h1>
                <font-awesome-icon icon="fa-solid fa-caret-down"  v-show="counter.Show_Table_Information==false"/>
                <font-awesome-icon icon="fa-solid fa-caret-up" v-show="counter.Show_Table_Information==true"/>
            </div>
            <div class="flex flex-col px-2 py-2 mb-3  bg-slate-700 w-full rounded gap-1 cursor-pointer" v-show="counter.Show_Table_Information==true">
                <h1 class="text-sky-400 font-bold">Thông tin sản phẩm</h1>
                <ul class="list-disc list-inside text-slate-200 font-medium">
                    <li v-for="j in i.Thongtin.split('\r\n')">{{ j }}</li>
                </ul>
            </div>
            <div class="flex ">
                <div class="flex items-center justify-center gap-3 bg">
                    <div class="text-yellow-500 bg-slate-700 drop-shadow-md shadow-inner px-2 py-2 rounded w-[150px]">
                        <div class="flex  border-b-[1px] border-yellow-500 items-center justify-center"><h1 class="place-items-center w-1/2 flex items-center justify-center pb-1">Giá</h1><h1 class="flex items-center justify-center border-l-[1px] border-yellow-500 w-1/2 pb-1">Sl</h1></div>
                        <div class="flex items-center justify-center"><h1 class="place-items-center w-1/2 flex items-center justify-center pt-1">{{ i.Gia }}</h1><input class="flex items-center justify-center text-center pointer-events-none border-l-[1px] border-yellow-500 w-1/2 pt-1 bg-transparent" v-model="i.SL"></div>
                    </div>
                    <div class="flex flex-col gap-2">
                        <font-awesome-icon icon="fa-solid fa-circle-minus" class="text-red-600 text-[28px] cursor-pointer hover:text-red-500" v-on:click="if(i.SL>0 && i.SL>i.DG){i.SL--}; counter.F_Tong(); counter.Update_Code_Oder=2;"/>
                        <font-awesome-icon icon="fa-solid fa-circle-plus" class="text-red-600 text-[28px] cursor-pointer hover:text-red-500" v-on:click="i.SL++; counter.F_Tong(); counter.Update_Code_Oder=2;"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { useCounterStore } from '@/stores/counter';
    import axios from 'axios';


    export default {

    setup() {
        const counter = useCounterStore();
        return {counter}
    },
    mounted:function(){
        
    },
    components: {
    }
    }
</script>



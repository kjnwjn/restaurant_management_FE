<template>
    <div v-show="counter. Tab_Chef==1" class="bg-slate-700 min-h-screen w-full ml-[310px] relative">
        <div class="flex flex-col bg-slate-800 min-h-screen w-full  px-[20px] py-[15px] gap-3">
            <div class="flex justify-between px-3 items-center bg-slate-700 max-w-[300px] h-[40px] rounded" >
                <div class="flex items-center gap-3 w-full">
                    <font-awesome-icon icon="fa-solid fa-magnifying-glass"  class="cursor-pointer text-gray-300" />
                    <input v-model="counter.Search"  placeholder="Tìm kiếm món ăn..." class="bg-transparent text-gray-300 outline-none w-full grow"/>
                </div>
                <font-awesome-icon icon="fa-solid fa-xmark" v-on:click="counter.Search=''"  class="pl-3 cursor-pointer text-gray-300"/>
            </div>
            <!-- chi tiết bảng hóa đơn -->
            <div  class="flex flex-col  mx-auto mt-[15px] bg-slate-600 px-2 py-2 w-full h-full rounded-[20px]">
                <div class="flex items-center justify-center text-gray-300 font-semibold text-[25px] relative my-3">
                    <h1 class=" flex justify-center ">Bảng danh sách món ăn khách hàng đã đặt</h1>
                    <font-awesome-icon icon="fa-solid fa-xmark"   class=" absolute top-2 right-2 cursor-pointer text-gray-300"/>
                </div>
                <!-- <div class="flex flex-col gap-1 text-lime-400 w-[100%] justify-center items-center text-[15px]">
                    <h1>Mã hóa đơn : 123456789</h1>
                    <h1>Thời gian : 7:45 31/3/2023</h1>
                </div> -->
                <div id="cjss" class="flex flex-col overflow-auto min-h-[500px]">
                    <div v-for="(i,index) in counter.Data_Food_King_NVB" class="flex flex-col my-5">
                        <div class="flex text-18px font-semibold bg-slate-700 text-blue-400 pl-3 py-2 rounded-t">
                            <div class="flex flex-col gap-2 w-[46%]">
                                <div class="flex gap-2">
                                    <h1 class="bg-slate-800 rounded px-2 shadow-inner ">Bàn {{ i.Ban_so }}</h1>
                                    <h1 class="bg-slate-800 rounded px-2 shadow-inner ">Lần {{ index+1 }}</h1>
                                    <h1 class="bg-slate-800 rounded px-2 shadow-inner ">MHĐ : {{ i.Ma_HD }}</h1>
                                    <h1 class="bg-slate-800 rounded px-2 shadow-inner ">TG : 22:10 31/3/2023</h1>
                                </div>
                                <div class="flex gap-2">
                                    <h1 class="text-blue-500">Danh sách món ăn khách hàng đặt</h1>
                                    <div class="w-[13%] flex relative ">
                                        <button  class="bg-slate-800  px-2 py-1 shrink-0 rounded" @mouseover="i.Show_ghi_chu=1" @mouseleave="i.Show_ghi_chu=0">Xem ghi chú</button>
                                        <textarea v-show="i.Show_ghi_chu==1" class="text-gray-300 flex absolute z-50 text-left top-10  border-gray-600 border-[1px] px-2 py-2 text-[15px] font-medium bg-slate-800 rounded grow-0 w-[200px] min-h-[100px] outline-none  pointer-events-none"  >{{ i.Ghi_chu }}</textarea>
                                    </div>
                                </div>
                            </div>
                            <h1 class="w-[10%]">Số lượng</h1>
                            <h1 class="w-[10%]">Giá</h1>
                            <h1 class="w-[10%]">Thành tiền</h1>
                            <h1 class="w-[11%]">Hiện tại</h1>
                            <h1 class="w-[13%]">Trạng thái</h1>
                        </div>
                        <div v-for=" (j,index) in i.Haisan" v-show="j.SL>0" :class="{'opacity-50':j.CH=='Hết hàng'}"  class="flex text-18px font-medium text-gray-200 pl-3 py-2 border-b-[1px] border-slate-700">
                            <h1 class="w-[46%]">{{ j.Ten }}</h1>
                            <h1 class="w-[10%]">{{ j.SL }}</h1>
                            <h1 class="w-[10%]">{{ j.Gia }}</h1>
                            <h1 class="w-[10%]">{{ j.Gia*j.SL }}</h1>
                            <div class="w-[11%] flex relative ">
                                <button v-on:click="counter.Show_CH=index+i+j.Ten" class="bg-blue-500  px-2 py-1 shrink-0 rounded">{{ j.CH }}</button>
                                <div v-show="counter.Show_CH==index+i+j.Ten" class="bg-blue-500 flex flex-col  absolute z-50 top-10  cursor-pointer rounded">
                                    <button v-on:click="counter.Show_CH=0; j.CH='Còn hàng'" class="w-full hover:bg-blue-600 px-2 py-1 rounded-t">Còn hàng</button>
                                    <button v-on:click="counter.Show_CH=0; j.CH='Hết hàng'" class="w-full hover:bg-blue-600 px-2 py-1 rounded-b">Hết hàng</button>
                                </div>
                            </div>
                            <div class="w-[13%] flex relative ">
                                <button v-on:click="counter.Show_CHT=index+i+j.Ten" class="bg-blue-500  px-2 py-1 shrink-0 rounded">{{ j.CHT }}</button>
                                <div v-show="counter.Show_CHT==index+i+j.Ten" class="bg-blue-500 flex flex-col  absolute z-50 top-10  cursor-pointer rounded">
                                    <button v-on:click="counter.Show_CHT=0; j.CHT='Hoàn thành'" class="w-full hover:bg-blue-600 px-2 py-1 rounded-t">Hoàn thành</button>
                                    <button v-on:click="counter.Show_CHT=0; j.CHT='Chưa hoàn thành'" class="w-full hover:bg-blue-600 px-2 py-1 rounded-b">Chưa hoàn thành</button>
                                </div>
                            </div>
                        </div>
                        <div v-for=" (j,index) in i.Thuysan" v-show="j.SL>0" :class="{'opacity-50':j.CH=='Hết hàng'}"  class="flex text-18px font-medium text-gray-200 pl-3 py-2 border-b-[1px] border-slate-700">
                            <h1 class="w-[46%]">{{ j.Ten }}</h1>
                            <h1 class="w-[10%]">{{ j.SL }}</h1>
                            <h1 class="w-[10%]">{{ j.Gia }}</h1>
                            <h1 class="w-[10%]">{{ j.Gia*j.SL }}</h1>
                            <div class="w-[11%] flex relative ">
                                <button v-on:click="counter.Show_CH=index+i+j.Ten" class="bg-blue-500  px-2 py-1 shrink-0 rounded">{{ j.CH }}</button>
                                <div v-show="counter.Show_CH==index+i+j.Ten" class="bg-blue-500 flex flex-col  absolute z-50 top-10  cursor-pointer rounded">
                                    <button v-on:click="counter.Show_CH=0; j.CH='Còn hàng'" class="w-full hover:bg-blue-600 px-2 py-1 rounded-t">Còn hàng</button>
                                    <button v-on:click="counter.Show_CH=0; j.CH='Hết hàng'" class="w-full hover:bg-blue-600 px-2 py-1 rounded-b">Hết hàng</button>
                                </div>
                            </div>
                            <div class="w-[13%] flex relative ">
                                <button v-on:click="counter.Show_CHT=index+i+j.Ten" class="bg-blue-500  px-2 py-1 shrink-0 rounded">{{ j.CHT }}</button>
                                <div v-show="counter.Show_CHT==index+i+j.Ten" class="bg-blue-500 flex flex-col  absolute z-50 top-10  cursor-pointer rounded">
                                    <button v-on:click="counter.Show_CHT=0; j.CHT='Hoàn thành'" class="w-full hover:bg-blue-600 px-2 py-1 rounded-t">Hoàn thành</button>
                                    <button v-on:click="counter.Show_CHT=0; j.CHT='Chưa hoàn thành'" class="w-full hover:bg-blue-600 px-2 py-1 rounded-b">Chưa hoàn thành</button>
                                </div>
                            </div>
                        </div>
                        <div v-for=" (j,index) in i.Cacloaithit" v-show="j.SL>0" :class="{'opacity-50':j.CH=='Hết hàng'}"  class="flex text-18px font-medium text-gray-200 pl-3 py-2 border-b-[1px] border-slate-700">
                            <h1 class="w-[46%]">{{ j.Ten }}</h1>
                            <h1 class="w-[10%]">{{ j.SL }}</h1>
                            <h1 class="w-[10%]">{{ j.Gia }}</h1>
                            <h1 class="w-[10%]">{{ j.Gia*j.SL }}</h1>
                            <div class="w-[11%] flex relative ">
                                <button v-on:click="counter.Show_CH=index+i+j.Ten" class="bg-blue-500  px-2 py-1 shrink-0 rounded">{{ j.CH }}</button>
                                <div v-show="counter.Show_CH==index+i+j.Ten" class="bg-blue-500 flex flex-col  absolute z-50 top-10  cursor-pointer rounded">
                                    <button v-on:click="counter.Show_CH=0; j.CH='Còn hàng'" class="w-full hover:bg-blue-600 px-2 py-1 rounded-t">Còn hàng</button>
                                    <button v-on:click="counter.Show_CH=0; j.CH='Hết hàng'" class="w-full hover:bg-blue-600 px-2 py-1 rounded-b">Hết hàng</button>
                                </div>
                            </div>
                            <div class="w-[13%] flex relative ">
                                <button v-on:click="counter.Show_CHT=index+i+j.Ten" class="bg-blue-500  px-2 py-1 shrink-0 rounded">{{ j.CHT }}</button>
                                <div v-show="counter.Show_CHT==index+i+j.Ten" class="bg-blue-500 flex flex-col  absolute z-50 top-10  cursor-pointer rounded">
                                    <button v-on:click="counter.Show_CHT=0; j.CHT='Hoàn thành'" class="w-full hover:bg-blue-600 px-2 py-1 rounded-t">Hoàn thành</button>
                                    <button v-on:click="counter.Show_CHT=0; j.CHT='Chưa hoàn thành'" class="w-full hover:bg-blue-600 px-2 py-1 rounded-b">Chưa hoàn thành</button>
                                </div>
                            </div>
                        </div>
                        <div v-for=" (j,index) in i.Khac" v-show="j.SL>0" :class="{'opacity-50':j.CH=='Hết hàng'}"  class="flex text-18px font-medium text-gray-200 pl-3 py-2 border-b-[1px] border-slate-700">
                            <h1 class="w-[46%]">{{ j.Ten }}</h1>
                            <h1 class="w-[10%]">{{ j.SL }}</h1>
                            <h1 class="w-[10%]">{{ j.Gia }}</h1>
                            <h1 class="w-[10%]">{{ j.Gia*j.SL }}</h1>
                            <div class="w-[11%] flex relative ">
                                <button v-on:click="counter.Show_CH=index+i+j.Ten" class="bg-blue-500  px-2 py-1 shrink-0 rounded">{{ j.CH }}</button>
                                <div v-show="counter.Show_CH==index+i+j.Ten" class="bg-blue-500 flex flex-col  absolute z-50 top-10  cursor-pointer rounded">
                                    <button v-on:click="counter.Show_CH=0; j.CH='Còn hàng'" class="w-full hover:bg-blue-600 px-2 py-1 rounded-t">Còn hàng</button>
                                    <button v-on:click="counter.Show_CH=0; j.CH='Hết hàng'" class="w-full hover:bg-blue-600 px-2 py-1 rounded-b">Hết hàng</button>
                                </div>
                            </div>
                            <div class="w-[13%] flex relative ">
                                <button v-on:click="counter.Show_CHT=index+i+j.Ten" class="bg-blue-500  px-2 py-1 shrink-0 rounded">{{ j.CHT }}</button>
                                <div v-show="counter.Show_CHT==index+i+j.Ten" class="bg-blue-500 flex flex-col  absolute z-50 top-10  cursor-pointer rounded">
                                    <button v-on:click="counter.Show_CHT=0; j.CHT='Hoàn thành'" class="w-full hover:bg-blue-600 px-2 py-1 rounded-t">Hoàn thành</button>
                                    <button v-on:click="counter.Show_CHT=0; j.CHT='Chưa hoàn thành'" class="w-full hover:bg-blue-600 px-2 py-1 rounded-b">Chưa hoàn thành</button>
                                </div>
                            </div>
                        </div>
                        <div v-for=" (j,index) in i.Douong" v-show="j.SL>0" :class="{'opacity-50':j.CH=='Hết hàng'}"  class="flex text-18px font-medium text-gray-200 pl-3 py-2 border-b-[1px] border-slate-700">
                            <h1 class="w-[46%]">{{ j.Ten }}</h1>
                            <h1 class="w-[10%]">{{ j.SL }}</h1>
                            <h1 class="w-[10%]">{{ j.Gia }}</h1>
                            <h1 class="w-[10%]">{{ j.Gia*j.SL }}</h1>
                            <div class="w-[11%] flex relative ">
                                <button v-on:click="counter.Show_CH=index+i+j.Ten" class="bg-blue-500  px-2 py-1 shrink-0 rounded">{{ j.CH }}</button>
                                <div v-show="counter.Show_CH==index+i+j.Ten" class="bg-blue-500 flex flex-col  absolute z-50 top-10  cursor-pointer rounded">
                                    <button v-on:click="counter.Show_CH=0; j.CH='Còn hàng'" class="w-full hover:bg-blue-600 px-2 py-1 rounded-t">Còn hàng</button>
                                    <button v-on:click="counter.Show_CH=0; j.CH='Hết hàng'" class="w-full hover:bg-blue-600 px-2 py-1 rounded-b">Hết hàng</button>
                                </div>
                            </div>
                            <div class="w-[13%] flex relative ">
                                <button v-on:click="counter.Show_CHT=index+i+j.Ten" class="bg-blue-500  px-2 py-1 shrink-0 rounded">{{ j.CHT }}</button>
                                <div v-show="counter.Show_CHT==index+i+j.Ten" class="bg-blue-500 flex flex-col  absolute z-50 top-10  cursor-pointer rounded">
                                    <button v-on:click="counter.Show_CHT=0; j.CHT='Hoàn thành'" class="w-full hover:bg-blue-600 px-2 py-1 rounded-t">Hoàn thành</button>
                                    <button v-on:click="counter.Show_CHT=0; j.CHT='Chưa hoàn thành'" class="w-full hover:bg-blue-600 px-2 py-1 rounded-b">Chưa hoàn thành</button>
                                </div>
                            </div>
                        </div>
                        <div v-for=" (j,index) in i.Trangmieng" v-show="j.SL>0" :class="{'opacity-50':j.CH=='Hết hàng'}"  class="flex text-18px font-medium text-gray-200 pl-3 py-2 border-b-[1px] border-slate-700">
                            <h1 class="w-[46%]">{{ j.Ten }}</h1>
                            <h1 class="w-[10%]">{{ j.SL }}</h1>
                            <h1 class="w-[10%]">{{ j.Gia }}</h1>
                            <h1 class="w-[10%]">{{ j.Gia*j.SL }}</h1>
                            <div class="w-[11%] flex relative ">
                                <button v-on:click="counter.Show_CH=index+i+j.Ten" class="bg-blue-500  px-2 py-1 shrink-0 rounded">{{ j.CH }}</button>
                                <div v-show="counter.Show_CH==index+i+j.Ten" class="bg-blue-500 flex flex-col  absolute z-50 top-10  cursor-pointer rounded">
                                    <button v-on:click="counter.Show_CH=0; j.CH='Còn hàng'" class="w-full hover:bg-blue-600 px-2 py-1 rounded-t">Còn hàng</button>
                                    <button v-on:click="counter.Show_CH=0; j.CH='Hết hàng'" class="w-full hover:bg-blue-600 px-2 py-1 rounded-b">Hết hàng</button>
                                </div>
                            </div>
                            <div class="w-[13%] flex relative ">
                                <button v-on:click="counter.Show_CHT=index+i+j.Ten" class="bg-blue-500  px-2 py-1 shrink-0 rounded">{{ j.CHT }}</button>
                                <div v-show="counter.Show_CHT==index+i+j.Ten" class="bg-blue-500 flex flex-col  absolute z-50 top-10  cursor-pointer rounded">
                                    <button v-on:click="counter.Show_CHT=0; j.CHT='Hoàn thành'" class="w-full hover:bg-blue-600 px-2 py-1 rounded-t">Hoàn thành</button>
                                    <button v-on:click="counter.Show_CHT=0; j.CHT='Chưa hoàn thành'" class="w-full hover:bg-blue-600 px-2 py-1 rounded-b">Chưa hoàn thành</button>
                                </div>
                            </div>
                        </div>
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

<style>
#cjss::-webkit-scrollbar {
  width: 10px;               /* Chiều rộng vùng chứa scrollbar */
}
#cjss::-webkit-scrollbar-track {
  background: #334155;        /* Màu nền ngoài của thanh scrollbar */
}
#cjss::-webkit-scrollbar-thumb {
  background-color: #1e293b;    /* Màu của thanh cuộn (scroll thumb) */
  border-radius: 5px;       /* Bo góc scroll thumb */
  /* border: 2px solid #ccc;  Không hỗ trợ padding, margin, transition nên dùng viền cùng màu nên để padding scroll thumb */
}
#cjss::-webkit-scrollbar-thumb:hover {
    background-color: #334155; /* Hiệu ứng di chuột đổi màu*/
}
</style>
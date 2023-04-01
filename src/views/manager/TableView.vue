<template>
    <div v-show="counter.Tab_Manager==1" class="bg-slate-700 min-h-screen w-full ml-[310px] relative">
        <div class="flex flex-col bg-slate-800 min-h-screen w-full  px-[20px] py-[15px] gap-3">
            <h1 class="text-[25px] font-bold text-gray-300">Chi tiết hóa đơn thanh toán  bàn số 1</h1>
            <div class="flex justify-between px-3 items-center bg-slate-700 max-w-[300px] h-[40px] rounded" >
                <div class="flex items-center gap-3 w-full">
                    <font-awesome-icon icon="fa-solid fa-magnifying-glass"  class="cursor-pointer text-gray-300" />
                    <input v-model="counter.Search"  placeholder="Tìm kiếm ..." class="bg-transparent outline-none w-full grow text-gray-300"/>
                </div>
                <font-awesome-icon icon="fa-solid fa-xmark" v-on:click="counter.Search=''"  class="pl-3 cursor-pointer text-gray-300"/>
            </div>
            <div class="flex flex-col">
                <div class="flex text-18px font-semibold bg-slate-700 text-blue-400 pl-3 py-2 rounded-t">
                    <h1 class="w-[40%]">Mã hóa đơn</h1>
                    <h1 class="w-[40%]">Thời gian thanh toán</h1>
                    <h1 class="w-[20%] flex justify-center">Xem chi tiết</h1>
                </div>
                <div class="flex text-18px font-medium text-gray-200 pl-3 py-5 border-b-[1px] border-slate-700">
                    <h1 class="w-[40%]">123456789</h1>
                    <h1 class="w-[40%]">7:45 31-3-2023 </h1>
                    <div v-on:click="counter.Show_chitiet_HD=1" class="w-[20%] flex justify-center"><button class="px-1 py-1 flex justify-center bg-blue-500 rounded shrink-0 whitespace-nowrap font-semibold">Xem chi tiết</button></div>
                </div>
                <div class="flex text-18px font-medium text-gray-200 pl-3 py-5 border-b-[1px] border-slate-700">
                    <h1 class="w-[40%]">456789</h1>
                    <h1 class="w-[40%]">20:45 31-3-2023 </h1>
                    <div v-on:click="counter.Show_chitiet_HD=1" class="w-[20%] flex justify-center"><button class="px-1 py-1 flex justify-center bg-blue-500 rounded shrink-0 whitespace-nowrap font-semibold">Xem chi tiết</button></div>
                </div>
                <div class="flex text-18px font-medium text-gray-200 pl-3 py-5 border-b-[1px] border-slate-700">
                    <h1 class="w-[40%]">34789</h1>
                    <h1 class="w-[40%]">19:00 31-3-2023 </h1>
                    <div v-on:click="counter.Show_chitiet_HD=1" class="w-[20%] flex justify-center"><button class="px-1 py-1 flex justify-center bg-blue-500 rounded shrink-0 whitespace-nowrap font-semibold">Xem chi tiết</button></div>
                </div>
                <div class="flex text-18px font-medium text-gray-200 pl-3 py-5 border-b-[1px] border-slate-700">
                    <h1 class="w-[40%]">123456789</h1>
                    <h1 class="w-[40%]">7:45 31-3-2023 </h1>
                    <div v-on:click="counter.Show_chitiet_HD=1" class="w-[20%] flex justify-center"><button class="px-1 py-1 flex justify-center bg-blue-500 rounded shrink-0 whitespace-nowrap font-semibold">Xem chi tiết</button></div>
                </div>
                <div class="flex text-18px font-medium text-gray-200 pl-3 py-5 border-b-[1px] border-slate-700">
                    <h1 class="w-[40%]">456789</h1>
                    <h1 class="w-[40%]">20:45 31-3-2023 </h1>
                    <div v-on:click="counter.Show_chitiet_HD=1" class="w-[20%] flex justify-center"><button class="px-1 py-1 flex justify-center bg-blue-500 rounded shrink-0 whitespace-nowrap font-semibold">Xem chi tiết</button></div>
                </div>
                <div class="flex text-18px font-medium text-gray-200 pl-3 py-5 border-b-[1px] border-slate-700">
                    <h1 class="w-[40%]">34789</h1>
                    <h1 class="w-[40%]">19:00 31-3-2023 </h1>
                    <div v-on:click="counter.Show_chitiet_HD=1" class="w-[20%] flex justify-center"><button class="px-1 py-1 flex justify-center bg-blue-500 rounded shrink-0 whitespace-nowrap font-semibold">Xem chi tiết</button></div>
                </div>
            </div>
            <!-- chi tiết bảng hóa đơn -->
            <div v-show="counter.Show_chitiet_HD==1" class="flex flex-col absolute inset-0 mx-auto my-auto bg-slate-600 px-2 py-2 w-[700px] h-[500px] rounded-[20px]">
                <div class="flex items-center justify-center text-gray-300 font-semibold text-[25px] relative my-3">
                    <h1 class=" flex justify-center ">Bảng chi tiết hóa đơn</h1>
                    <font-awesome-icon icon="fa-solid fa-xmark" v-on:click="counter.Show_chitiet_HD=0"  class=" absolute top-0 right-2 cursor-pointer text-gray-300"/>
                </div>
                <div class="flex flex-col gap-1 text-lime-400 w-[100%] justify-center items-center text-[15px]">
                    <h1>Mã hóa đơn : 123456789</h1>
                    <h1>Thời gian : 7:45 31/3/2023</h1>
                </div>
                <div id="cjss" class="flex flex-col overflow-auto ">
                    <div class="flex flex-col my-5">
                        <div class="flex text-18px font-semibold bg-slate-700 text-blue-400 pl-3 py-2 rounded-t">
                            <div class="flex gap-2 w-[65%]">
                                <h1 class="bg-slate-800 rounded px-2 shadow-inner text-[14px]">Lần 1 - 22:10 - 31/3/2023</h1>
                                <h1 class="">Danh sách món ăn</h1>
                            </div>
                            <h1 class="w-[15%]">Số lượng</h1>
                            <h1 class="w-[15%]">Đơn giá</h1>
                            <h1 class="w-[15%]">Thành tiền</h1>
                        </div>
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
                        <div class="flex text-18px font-semibold bg-slate-700 text-blue-400 pl-3 py-2 rounded-t">
                            <div class="flex gap-2 w-[65%]">
                                <h1 class="bg-slate-800 rounded px-2 shadow-inner text-[14px]">Lần 2 - 22:10 - 31/3/2023</h1>
                                <h1 class="">Danh sách món ăn</h1>
                            </div>
                            <h1 class="w-[15%]">Số lượng</h1>
                            <h1 class="w-[15%]">Đơn giá</h1>
                            <h1 class="w-[15%]">Thành tiền</h1>
                        </div>
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
                        <div class="flex text-18px font-semibold bg-slate-700 text-blue-400 pl-3 py-2 rounded-t">
                            <div class="flex gap-2 w-[65%]">
                                <h1 class="bg-slate-800 rounded px-2 shadow-inner text-[14px]">Lần 3 - 22:10 - 31/3/2023</h1>
                                <h1 class="">Danh sách món ăn</h1>
                            </div>
                            <h1 class="w-[15%]">Số lượng</h1>
                            <h1 class="w-[15%]">Đơn giá</h1>
                            <h1 class="w-[15%]">Thành tiền</h1>
                        </div>
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
                    <div class="flex text-yellow-300 font-semibold text-[16px]">
                        <h1 class="w-[65%] ml-2">Tổng</h1>
                        <h1 class="w-[15%]">5</h1>
                        <h1 class="w-[15%]"></h1>
                        <h1 class="w-[15%]">500k</h1>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-show="counter.Tab_Manager==2" class="bg-slate-700 min-h-screen w-full ml-[310px] relative">
        <div class="flex flex-col bg-slate-800 min-h-screen w-full  px-[20px] py-[15px] gap-3">
            <h1 class="text-[25px] font-bold text-gray-300">Chi tiết hóa đơn thanh toán  bàn số 2</h1>
            <div class="flex justify-between px-3 items-center bg-slate-700 max-w-[300px] h-[40px] rounded" >
                <div class="flex items-center gap-3 w-full">
                    <font-awesome-icon icon="fa-solid fa-magnifying-glass"  class="cursor-pointer text-gray-300" />
                    <input v-model="counter.Search"  placeholder="Tìm kiếm ..." class="bg-transparent outline-none w-full grow text-gray-300"/>
                </div>
                <font-awesome-icon icon="fa-solid fa-xmark" v-on:click="counter.Search=''"  class="pl-3 cursor-pointer text-gray-300"/>
            </div>
            <div class="flex flex-col">
                <div class="flex text-18px font-semibold bg-slate-700 text-blue-400 pl-3 py-2 rounded-t">
                    <h1 class="w-[40%]">Mã hóa đơn</h1>
                    <h1 class="w-[40%]">Thời gian thanh toán</h1>
                    <h1 class="w-[20%] flex justify-center">Xem chi tiết</h1>
                </div>
                <div class="flex text-18px font-medium text-gray-200 pl-3 py-5 border-b-[1px] border-slate-700">
                    <h1 class="w-[40%]">123456789</h1>
                    <h1 class="w-[40%]">7:45 31-3-2023 </h1>
                    <div v-on:click="counter.Show_chitiet_HD=1" class="w-[20%] flex justify-center"><button class="px-1 py-1 flex justify-center bg-blue-500 rounded shrink-0 whitespace-nowrap font-semibold">Xem chi tiết</button></div>
                </div>
                <div class="flex text-18px font-medium text-gray-200 pl-3 py-5 border-b-[1px] border-slate-700">
                    <h1 class="w-[40%]">456789</h1>
                    <h1 class="w-[40%]">20:45 31-3-2023 </h1>
                    <div v-on:click="counter.Show_chitiet_HD=1" class="w-[20%] flex justify-center"><button class="px-1 py-1 flex justify-center bg-blue-500 rounded shrink-0 whitespace-nowrap font-semibold">Xem chi tiết</button></div>
                </div>
                <div class="flex text-18px font-medium text-gray-200 pl-3 py-5 border-b-[1px] border-slate-700">
                    <h1 class="w-[40%]">34789</h1>
                    <h1 class="w-[40%]">19:00 31-3-2023 </h1>
                    <div v-on:click="counter.Show_chitiet_HD=1" class="w-[20%] flex justify-center"><button class="px-1 py-1 flex justify-center bg-blue-500 rounded shrink-0 whitespace-nowrap font-semibold">Xem chi tiết</button></div>
                </div>
                <div class="flex text-18px font-medium text-gray-200 pl-3 py-5 border-b-[1px] border-slate-700">
                    <h1 class="w-[40%]">123456789</h1>
                    <h1 class="w-[40%]">7:45 31-3-2023 </h1>
                    <div v-on:click="counter.Show_chitiet_HD=1" class="w-[20%] flex justify-center"><button class="px-1 py-1 flex justify-center bg-blue-500 rounded shrink-0 whitespace-nowrap font-semibold">Xem chi tiết</button></div>
                </div>
                <div class="flex text-18px font-medium text-gray-200 pl-3 py-5 border-b-[1px] border-slate-700">
                    <h1 class="w-[40%]">456789</h1>
                    <h1 class="w-[40%]">20:45 31-3-2023 </h1>
                    <div v-on:click="counter.Show_chitiet_HD=1" class="w-[20%] flex justify-center"><button class="px-1 py-1 flex justify-center bg-blue-500 rounded shrink-0 whitespace-nowrap font-semibold">Xem chi tiết</button></div>
                </div>
                <div class="flex text-18px font-medium text-gray-200 pl-3 py-5 border-b-[1px] border-slate-700">
                    <h1 class="w-[40%]">34789</h1>
                    <h1 class="w-[40%]">19:00 31-3-2023 </h1>
                    <div v-on:click="counter.Show_chitiet_HD=1" class="w-[20%] flex justify-center"><button class="px-1 py-1 flex justify-center bg-blue-500 rounded shrink-0 whitespace-nowrap font-semibold">Xem chi tiết</button></div>
                </div>
            </div>
            <!-- chi tiết bảng hóa đơn -->
            <div v-show="counter.Show_chitiet_HD==1" class="flex flex-col absolute inset-0 mx-auto my-auto bg-slate-600 px-2 py-2 w-[700px] h-[500px] rounded-[20px]">
                <div class="flex items-center justify-center text-gray-300 font-semibold text-[25px] relative my-3">
                    <h1 class=" flex justify-center ">Bảng chi tiết hóa đơn</h1>
                    <font-awesome-icon icon="fa-solid fa-xmark" v-on:click="counter.Show_chitiet_HD=0"  class=" absolute top-0 right-2 cursor-pointer text-gray-300"/>
                </div>
                <div class="flex flex-col gap-1 text-lime-400 w-[100%] justify-center items-center text-[15px]">
                    <h1>Mã hóa đơn : 123456789</h1>
                    <h1>Thời gian : 7:45 31/3/2023</h1>
                </div>
                <div id="cjss" class="flex flex-col overflow-auto ">
                    <div class="flex flex-col my-5">
                        <div class="flex text-18px font-semibold bg-slate-700 text-blue-400 pl-3 py-2 rounded-t">
                            <div class="flex gap-2 w-[65%]">
                                <h1 class="bg-slate-800 rounded px-2 shadow-inner text-[14px]">Lần 1 - 22:10 - 31/3/2023</h1>
                                <h1 class="">Danh sách món ăn</h1>
                            </div>
                            <h1 class="w-[15%]">Số lượng</h1>
                            <h1 class="w-[15%]">Đơn giá</h1>
                            <h1 class="w-[15%]">Thành tiền</h1>
                        </div>
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
                        <div class="flex text-18px font-semibold bg-slate-700 text-blue-400 pl-3 py-2 rounded-t">
                            <div class="flex gap-2 w-[65%]">
                                <h1 class="bg-slate-800 rounded px-2 shadow-inner text-[14px]">Lần 2 - 22:10 - 31/3/2023</h1>
                                <h1 class="">Danh sách món ăn</h1>
                            </div>
                            <h1 class="w-[15%]">Số lượng</h1>
                            <h1 class="w-[15%]">Đơn giá</h1>
                            <h1 class="w-[15%]">Thành tiền</h1>
                        </div>
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
                        <div class="flex text-18px font-semibold bg-slate-700 text-blue-400 pl-3 py-2 rounded-t">
                            <div class="flex gap-2 w-[65%]">
                                <h1 class="bg-slate-800 rounded px-2 shadow-inner text-[14px]">Lần 3 - 22:10 - 31/3/2023</h1>
                                <h1 class="">Danh sách món ăn</h1>
                            </div>
                            <h1 class="w-[15%]">Số lượng</h1>
                            <h1 class="w-[15%]">Đơn giá</h1>
                            <h1 class="w-[15%]">Thành tiền</h1>
                        </div>
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
                    <div class="flex text-yellow-300 font-semibold text-[16px]">
                        <h1 class="w-[65%] ml-2">Tổng</h1>
                        <h1 class="w-[15%]">5</h1>
                        <h1 class="w-[15%]"></h1>
                        <h1 class="w-[15%]">500k</h1>
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

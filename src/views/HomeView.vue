<template>
    <div class="flex flex-col bg-slate-800 w-full h-screen items-center justify-center">
        <h1 class="text-yellow-500 text-[50px] font-bold">Chào mừng bạn đến với Food King</h1>
        <h1 class="text-lime-500 text-[25px] font-bold mt-5">Bạn có thể lựa chọn các món ăn theo danh mục bên dưới</h1>
        <font-awesome-icon icon="fa-regular fa-hand-point-down" class="text-lime-500 text-[35px] font-bold my-3"/>
        <div class="flex  text-slate-100 px-3 mt-2 gap-3 text-[19px]">
            <router-link to="/SeaFood" class="flex bg-lime-900 px-2 py-1 rounded-full font-bold items-center gap-2 hover:ml-2 hover:bg-lime-700 cursor-pointer duration-100" v-bind:class="{'text-yellow-500':counter. Path_Route.path=='/SeaFood'}"><h1>Hải sản</h1></router-link>
            <router-link to="/WaterFood" class="flex bg-lime-900 px-2 py-1 rounded-full font-bold items-center gap-2 hover:ml-2 hover:bg-lime-700 cursor-pointer duration-100" v-bind:class="{'text-yellow-500':counter. Path_Route.path=='/WaterFood'}"><h1>Thủy sản</h1></router-link>
            <router-link to="/Cachloroathite" class="flex bg-lime-900 px-2 py-1 rounded-full font-bold items-center gap-2 hover:ml-2 hover:bg-lime-700 cursor-pointer duration-100" v-bind:class="{'text-yellow-500':counter. Path_Route.path=='/Cachloroathite'}"><h1>Các loại thịt</h1></router-link>
            <router-link to="/Other" class="flex bg-lime-900 px-2 py-1 rounded-full font-bold items-center gap-2 hover:ml-2 hover:bg-lime-700 cursor-pointer duration-100" v-bind:class="{'text-yellow-500':counter. Path_Route.path=='/Other'}"><h1>Khác</h1></router-link>
            <router-link to="/Drinks" class="flex bg-lime-900 px-2 py-1 rounded-full font-bold items-center gap-2 hover:ml-2 hover:bg-lime-700 cursor-pointer duration-100" v-bind:class="{'text-yellow-500':counter. Path_Route.path=='/Drinks'}"><h1>Đồ uống</h1></router-link>
            <router-link to="/Dessert" class="flex bg-lime-900 px-2 py-1 rounded-full font-bold items-center gap-2 hover:ml-2 hover:bg-lime-700 cursor-pointer duration-100" v-bind:class="{'text-yellow-500':counter. Path_Route.path=='/Dessert'}"><h1>Tráng miệng</h1></router-link>
        </div>
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
    fetchData() {
            fetch(
                `http://localhost:3300/api/v1/category/get-all`
                )
                .then((res) => res.json())
                .then((res) => {
                    console.log(res);
                    // let dataHome = res.data.items;
                    // dataHome.forEach((dataItem) => {
                    // return dataItem.sectionType == "playlist"
                    //     ? this.playList.push(dataItem)
                    //     : "";
                    // });
                });
  
    },
    mounted:function(){
        fetch(
                `http://localhost:3300/api/v1/category/get-all`
                )
                .then((res) => res.json())
                .then((res) => {
                    console.log(res);
                    // let dataHome = res.data.items;
                    // dataHome.forEach((dataItem) => {
                    // return dataItem.sectionType == "playlist"
                    //     ? this.playList.push(dataItem)
                    //     : "";
                    // });
                });
    },
    components: {
    }
    }
</script>
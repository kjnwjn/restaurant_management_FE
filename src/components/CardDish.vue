<template>
    <div class="card-app-wrapper p-2">
        <div id="card-app" :class="{ active: dish.status }">
            <div class="card-app-img" :class="{ active: !dish.status }">
                <img src="@/assets/dish.jpeg" width="100%" />
            </div>
            <div class="py-4 flex justify-center items-center btn-gr" :class="{ active: !dish.status }">
                <!-- <button class="text-base inline-flex items-center px-2 text-sm font-medium text-white-500 bg-red-500 rounded-full" type="button">-</button>
                <input type="number" class="w-1/6 text-black outline-none rounded-xl text-center" min="0" max="10" /> -->
                <button class="text-base inline-flex items-center px-2 text-sm font-medium text-white-500 bg-green-500 rounded-full" @click="addToCart(dish)" type="button">+</button>
            </div>
            <div class="flex justify-between items-baseline">
                <span>name :</span>
                <h2 class="text-2xl uppercase font-medium">{{ dish.name }}</h2>
            </div>
            <div class="flex justify-between items-baseline">
                <span>price :</span>
                <h2 class="text-xl uppercase font-medium">{{ priceFormat(dish.price) }}</h2>
            </div>
            <p :class="{ 'text-green-600': dish.status, 'text-red-500': !dish.status }" class="font-medium">{{ dish.status ? "Available" : "Unavailable" }}</p>
        </div>
    </div>
</template>

<script>
import priceFormat from "@/helpers/priceFormat";
import { mapState } from "vuex";
export default {
    props: {
        dish: Object,
    },
    methods: {
        priceFormat,
        addToCart(dish) {
            // let index;
            // let listData = localStorage.getItem("pendingOrderData") ? localStorage.getItem("pendingOrderData") : [];
            // if (this.pendingOrderData && this.pendingOrderData.length <= 0) {
            //     localStorage.setItem("pendingOrderData", JSON.stringify([dish]));
            //     this.$store.commit("set_pendingOrderData", dish);
            // } else {
            //     let isExist = this.pendingOrderData.filter((item, i) => {
            //         if (item.dishId == dish.dishId) {
            //             index = i;
            //             return item;
            //         }
            //     });
            //     if (isExist.length > 0) {
            //         isExist[0].qty += 1;
            //         listData[index] = isExist[0];
            //         localStorage.setItem("pendingOrderData", JSON.stringify(listData));
            //         this.$store.commit("set_pendingItem", isExist[0], index);
            //     } else {
            //         console.log("item add success");
            //     }
            // }
        },
    },
    computed: {
        ...mapState(["pendingOrderData"]),
    },
};
</script>

<style>
#card-app {
    padding: 10px;
    border-radius: 10px;
    color: #eef2e6;

    background: white;
    transition: all 0.2s linear;
    box-shadow: 0px 3px 9px -2px rgba(0, 0, 0, 0.4);
}
#card-app.active {
    background: #1c6758;
}
.card-app-img.active {
    opacity: 0.5;
}
.btn-gr.active {
    visibility: hidden;
}
#card-app:hover {
    /* transform: scale(1.1); */
    box-shadow: 0px 3px 9px 2px rgba(0, 0, 0, 0.4);
}
</style>

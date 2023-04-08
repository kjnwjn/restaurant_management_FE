<template>
    <div class="card-app-wrapper">
        <div id="card-app" :class="{ active: dish.status }">
            <div class="card-app-img mb-4" :class="{ active: !dish.status }">
                <img :src="`${base_url}/uploads/` + dish.thumbnail" width="100%" />
            </div>
            <div class="py-4 flex justify-center items-center btn-gr" :class="{ active: !dish.status }" v-if="tableData?.tableData">
                <button class="px-8 py-1 text-lg font-bold hover:opacity-80 bg-red-500" type="button" @click="removeFromCart(dish)">-</button>
                <button class="px-8 py-1 text-lg font-bold hover:opacity-80 bg-green-500" type="button" @click="addToCart(dish)">+</button>
            </div>
            <div class="flex justify-between items-baseline">
                <span>Status :</span>
                <p :class="{ 'text-green-400': dish.status, 'text-red-400': !dish.status }" class="font-medium">{{ dish.status ? "Available" : "Unavailable" }}</p>
            </div>
            <div class="flex justify-between items-baseline">
                <span>Name :</span>
                <h2 class="uppercase font-medium">{{ dish.name }}</h2>
            </div>
            <div class="flex justify-between items-baseline">
                <span>Price :</span>
                <h2 class="uppercase font-medium">{{ priceFormat(dish.price) }}</h2>
            </div>
        </div>
    </div>
</template>

<script>
import priceFormat from "@/helpers/priceFormat";
import { mapState } from "vuex";
export default {
    data: () => {
        return {
            base_url: process.env.VUE_APP_API_URL,
        };
    },
    props: {
        dish: Object,
    },
    methods: {
        priceFormat,
        addToCart(dish) {
            let index;
            let listData = this.pendingOrderData;
            if (listData && listData.length <= 0) {
                // localStorage.setItem("pendingOrderData", JSON.stringify([{ dish: dish, qty: 1 }]));
                this.$store.commit("set_pendingOrderData", { dish: dish, qty: 1 });
            } else {
                let isExist = this.pendingOrderData.filter((item, i) => {
                    if (item.dish.dishId == dish.dishId) {
                        index = i;
                        return item;
                    }
                });
                if (isExist.length > 0) {
                    listData[index].qty += 1;
                } else {
                    listData.push({ dish, qty: 1 });
                }
                // localStorage.setItem("pendingOrderData", JSON.stringify(listData));
                this.$store.commit("set_defaultPOD", listData);
            }
        },
        removeFromCart(dish) {
            let index;
            let listData = this.pendingOrderData;
            if (listData && listData.length > 0) {
                let isExist = this.pendingOrderData.filter((item, i) => {
                    if (item.dish.dishId == dish.dishId) {
                        index = i;
                        return item;
                    }
                });
                if (isExist.length > 0) {
                    if (listData[index].qty <= 1) {
                        listData.splice(index, 1);
                    } else {
                        listData[index].qty -= 1;
                    }
                }
                // localStorage.setItem("pendingOrderData", JSON.stringify(listData));
                this.$store.commit("set_defaultPOD", listData);
            }
        },
    },
    computed: {
        ...mapState(["pendingOrderData", "tableData"]),
    },
};
</script>

<style>
#card-app {
    padding: 24px;
    border-radius: 10px;
    color: #eef2e6;
    background: white;
    transition: all 0.2s linear;
    box-shadow: 0px 3px 9px -2px rgba(0, 0, 0, 0.4);
}
#card-app.active {
    background: #797cbd;
}
.card-app-img.active {
    opacity: 0.5;
}
.card-app-img img {
    border-radius: 10px;
}
.btn-gr.active {
    visibility: hidden;
}
#card-app:hover {
    /* transform: scale(1.1); */
    /* box-shadow: 0px 3px 9px 2px rgba(0, 0, 0, 0.4); */
}
</style>

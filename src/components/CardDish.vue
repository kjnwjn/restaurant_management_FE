<template>
    <div class="card-app-wrapper p-2">
        <div id="card-app" :class="{ active: status }">
            <div class="card-app-img">
                <img src="@/assets/dish.jpeg" width="100%" />
            </div>
            <div class="py-4 flex justify-center items-center">
                <button class="text-xl inline-flex items-center px-3 text-sm font-medium text-white-500 bg-red-500 rounded-md border border-gray-300" type="button">-</button>
                <button class="text-xl inline-flex items-center px-3 text-sm font-medium text-white-500 bg-green-500 rounded-md border border-gray-300" type="button">+</button>
            </div>
            <div class="flex justify-between items-baseline">
                <span>name :</span>
                <h2 class="text-2xl uppercase font-medium">{{ dishId }}</h2>
            </div>
            <div class="flex justify-between items-baseline">
                <span>price :</span>
                <h2 class="text-xl uppercase font-medium">{{ priceFormat(200000) }}</h2>
            </div>
            <p :class="{ 'text-green-600': status, 'text-red-500': !status }" class="font-medium">{{ status ? "Available" : "Unavailable" }}</p>
        </div>
    </div>
</template>

<script>
import priceFormat from "@/helpers/priceFormat";
export default {
    props: {
        dishId: String,
        status: Boolean,
    },
    methods: { priceFormat },
    components: {},
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
#card-app:hover {
    /* transform: scale(1.1); */
    box-shadow: 0px 3px 9px 2px rgba(0, 0, 0, 0.4);
}
</style>

<template>
    <div class="card-app-wrapper p-2">
        <div id="card-app" :class="{ active: status }">
            <div class="card-app-img">
                <img src="@/assets/plate.png" width="100%" />
            </div>
            <div class="py-4 flex justify-center items-center">
                <button class="inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white rounded-full border border-gray-300" type="button">
                    <svg class="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path>
                    </svg>
                </button>
                <div>
                    <input type="number" class="px-3 py-1 bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg" />
                </div>
                <button class="inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white rounded-full border border-gray-300" value="0" type="button">
                    <svg class="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path>
                    </svg>
                </button>
            </div>
            <p>{{ dishId }}</p>
            <p>{{ status ? "Unavailable" : "Available" }}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        dishId: String,
        status: Boolean,
    },
};
</script>

<style>
#card-app {
    padding: 10px;
    border-radius: 10px;
    color: white;
    background: white;
    transition: all 0.2s linear;
    box-shadow: 0px 3px 9px -2px rgba(0, 0, 0, 0.4);
}
#card-app.active {
    background: #b5b5b5;
}
#card-app:hover {
    /* transform: scale(1.1); */
    box-shadow: 0px 3px 9px 2px rgba(0, 0, 0, 0.4);
}
</style>

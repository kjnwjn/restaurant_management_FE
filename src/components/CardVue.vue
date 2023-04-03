<template>
    <div class="card-app-wrapper p-6">
        <div id="card-app" :class="{ active: status }">
            <div class="card-app-img p-6">
                <img src="@/assets/plate.png" width="100%" />
            </div>
            <p>{{ tableId }}</p>
            <p>{{ status ? "Unavailable" : "Available" }}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        tableId: String,
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
    transform: scale(1.1);
    box-shadow: 0px 3px 9px 2px rgba(0, 0, 0, 0.4);
}
</style>

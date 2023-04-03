<template>
    <div>
        <DashboardMenu />
        <main class="main-container">
            <div class="flex items-center justify-center h-full pt-10">
                <div class="text-center">
                    <h1 class="font-bold text-3xl mb-3"><span class="text-yellow-600">404</span> Not Found</h1>
                    <p class="mb-1">
                        Oops! The page you are looking for
                        <span class="text-yellow-600">does not exist</span> or <span class="text-red-600 line-through">has been removed</span>!
                    </p>
                    <p class="mb-1">Please contact administrator for more information, thanks!</p>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import DashboardMenu from "@/components/DashboardMenu.vue";
export default {
    components: { DashboardMenu },
};
</script>

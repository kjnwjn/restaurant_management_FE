<template>
    <div class="flex min-h-screen min-w-screen bg-slate-600  " >
        <chef-table class=""/>
        <router-view class=""/>
    </div>
    <div v-show="counter.Show_Table_Hoa_don == false" class="flex flex-col justify-center items-center fixed inset-0 z-50 h-screen w -screen bg-slate-800 gap-5">
      <div class="flex flex-col">
        <img src="@/assets/logo.png" class="text-[30px] text-cyan-600 w-[150px]"/>
        <h1 class="font-bold text-yellow-500 text-[35px]">Food King</h1>
      </div>
      <div class="flex  gap-2">
        <router-link to="/"  class=" font-semibold text-gray-200 px-2 py-1 rounded">Đăng nhập bàn</router-link>
        <router-link to="/manager"  class=" text-gray-200 font-semibold  px-2 py-1 rounded">Đăng nhập NVQL</router-link>
        <router-link to="/chef"  class=" text-gray-200 border-b-[2px] border-lime-500 font-semibold   px-2 py-1 rounded">Đăng nhập NVB</router-link>
        <!-- <h1>{{ counter.Path_Route.path }}</h1> -->
      </div>
      <div class="flex flex-col justify-center items-center gap-3 border-[1px] border-lime-500 px-5 py-5 rounded">
        <h1 class="font-bold text-gray-300 text-[23px]">Đăng nhập NVB</h1>
        <input placeholder="Tài khoản" v-model="counter.Username" type="text" class="bg-gray-700 py-2 px-2 border-slate-500 rounded text-gray-200 w-[300px]" />
        <input placeholder="Mật khẩu" v-model="counter.Password"  type="password" class="bg-gray-700 py-2 px-2 border-slate-500 rounded text-gray-200 w-[300px]"/>
        <button class="font-bold text-lime-500 text-[15px] hover:bg-slate-600 bg-slate-700 px-2 py-2 rounded border-b-[2px] border-lime-500" v-on:click="counter.Login_Account(); counter.Show_Table_Hoa_don = true;">Đăng nhập</button>
        <!-- <input placeholder="Số bàn" type="text" class="bg-gray-700 py-2 px-2 border-slate-500 rounded text-gray-200 w-[300px]"/> -->
      </div>
    </div>
</template>
  

  <script>
  // Import thành phần (components) NavBar, SideBar, FooterBar để sử dụng
  import HeaDer from '@/components/HeaDer.vue'
  import FooTer from '@/components/FooTer.vue'
  import ChefTable from '@/components/ChefTable.vue';

  import { useCounterStore } from '@/stores/counter';

  
  // Để sử dụng được các thẻ (tag) của các component tương ứng
  // <nav-bar />     -> component NavBar
  // <side-bar />    -> component SideBar
  // <footer-bar />  -> component FooterBar
  // Chúng ta phải khai báo trong thuộc tính `components` của phần export default {}
  export default {
    setup() {
    const counter = useCounterStore();
    return {counter}
  },
    components: {
      HeaDer,
      FooTer,
      ChefTable,
    }
  }
  </script>
  
  
  
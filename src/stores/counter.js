import { defineStore } from "pinia";

import axios from "axios";
import VueCookies from "vue-cookies";
import { fa0 } from "@fortawesome/free-solid-svg-icons";

import { useRoute } from "vue-router";
const Route = useRoute();

export const useCounterStore = defineStore("counter", {
  state: () => {
    return {
      domain_Backend: "https://todayserver.store",
      domain_Frontend: "https://www.webtoday.store/",
      Language: "vi",
      Dark: true,
      Table_Language: false,
      Table_Language_sm: false,
      Open_Dark: "darkk",
      Table_Nav: 1,
      Table_Sidebar: 1,
      Path_Route: useRoute(),
      // Link_Path_Route: { "Home": "/", "Web_Template": { Sell_Accounts: "/Product/SellAccounts", Construction_Industry: "/Product/ConstructionIndustry", Cosmetics_Industry: "/Product/CosmeticsIndustry", Fashion_Industry: "/Product/FashionIndustry", Electronic_Industry: "/Product/ElectronicIndustry", Food_Industry: "/Product/FoodIndustry" }, Introduce: "/Introduce", Contact: "/Contact" },
      // Link_Image: ["https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-photography_1645.jpg", "https://img.meta.com.vn/Data/image/2022/01/13/anh-dep-thien-nhien-3.jpg", "https://d1hjkbq40fs2x4.cloudfront.net/2020-01-09/files/canon-landscape-photography-preparation-tips_1968-1s.jpg"],
      // Oder_Image: 0, count: 0, Table_Informations: false, Image_Language: '/assets/vn-2ac15179.svg', Text_Array: ['Facebook', 'Zalo', 'Gọi điện'], class_1: 'bg-gray-100 w-[15px] h-[5px] rounded opacity-50',
      // class_2: 'bg-gray-100 w-[15px] h-[5px] rounded opacity-100', Data_List_Product: [{ 'Category_Industry': '' }], Data_List_Product_Home: [], Loading: 1, Search: '', Show_Search: 1, Search_ListProduct_Today1: null, Open_Scroll: 2,

      Number_Table: 1,
      Show_Table_Information: false,
      Show_Table_Oder: false,
      Update_Code_Oder: 1,
      Menu: false,
      HD: false,
      Data_Food_King: {
        Ban_so: 1,
        Ma_HD: 555554,
        Ghi_chu: "",
        Show_ghi_chu: 0,
        Thoi_gian: "10:23 31/3/2023",
        Haisan: [
          {
            Ten: "Tôm sú",
            Thongtin: "Tươi ngon\r\nSize M",
            Gia: 1000,
            Anh: "https://i.ytimg.com/vi/cZ1SBk313C4/maxresdefault.jpg",
            SL: 0,
            DG: 0,
            CH: "Còn hàng",
            CHT: "Chưa hoàn thành",
            Show_CH: 0,
            Show_CHT: 0,
          },
          {
            Ten: "Cá hồi",
            Thongtin: "Tươi ngon\r\nSize M",
            Gia: 1000,
            Anh: "https://i.ytimg.com/vi/cZ1SBk313C4/maxresdefault.jpg",
            SL: 0,
            DG: 0,
            CH: "Còn hàng",
            CHT: "Chưa hoàn thành",
            Show_CH: 0,
            Show_CHT: 0,
          },
          {
            Ten: "Cá thu",
            Thongtin: "Tươi ngon\r\nSize M",
            Gia: 1000,
            Anh: "https://i.ytimg.com/vi/cZ1SBk313C4/maxresdefault.jpg",
            SL: 0,
            DG: 0,
            CH: "Còn hàng",
            CHT: "Chưa hoàn thành",
            Show_CH: 0,
            Show_CHT: 0,
          },
        ],
        Thuysan: [
          {
            Ten: "Cá chép",
            Thongtin: "Tươi ngon\r\nSize M",
            Gia: 1000,
            Anh: "https://i.ytimg.com/vi/cZ1SBk313C4/maxresdefault.jpg",
            SL: 0,
            DG: 0,
            CH: "Còn hàng",
            CHT: "Chưa hoàn thành",
            Show_CH: 0,
            Show_CHT: 0,
          },
          {
            Ten: "Ốc bươu",
            Thongtin: "Tươi ngon\r\nSize M",
            Gia: 1000,
            Anh: "https://i.ytimg.com/vi/cZ1SBk313C4/maxresdefault.jpg",
            SL: 0,
            DG: 0,
            CH: "Còn hàng",
            CHT: "Chưa hoàn thành",
            Show_CH: 0,
            Show_CHT: 0,
          },
          {
            Ten: "Ngao",
            Thongtin: "Tươi ngon\r\nSize M",
            Gia: 1000,
            Anh: "https://i.ytimg.com/vi/cZ1SBk313C4/maxresdefault.jpg",
            SL: 0,
            DG: 0,
            CH: "Còn hàng",
            CHT: "Chưa hoàn thành",
            Show_CH: 0,
            Show_CHT: 0,
          },
        ],
        Cacloaithit: [
          {
            Ten: "Thịt bò mỹ",
            Thongtin: "Tươi ngon\r\nSize M",
            Gia: 1000,
            Anh: "https://i.ytimg.com/vi/cZ1SBk313C4/maxresdefault.jpg",
            SL: 0,
            DG: 0,
            CH: "Còn hàng",
            CHT: "Chưa hoàn thành",
            Show_CH: 0,
            Show_CHT: 0,
          },
          {
            Ten: "Thịt lợn",
            Thongtin: "Tươi ngon\r\nSize M",
            Gia: 1000,
            Anh: "https://i.ytimg.com/vi/cZ1SBk313C4/maxresdefault.jpg",
            SL: 0,
            DG: 0,
            CH: "Còn hàng",
            CHT: "Chưa hoàn thành",
            Show_CH: 0,
            Show_CHT: 0,
          },
          {
            Ten: "Thịt cừu",
            Thongtin: "Tươi ngon\r\nSize M",
            Gia: 1000,
            Anh: "https://i.ytimg.com/vi/cZ1SBk313C4/maxresdefault.jpg",
            SL: 0,
            DG: 0,
            CH: "Còn hàng",
            CHT: "Chưa hoàn thành",
            Show_CH: 0,
            Show_CHT: 0,
          },
        ],
        Khac: [
          {
            Ten: "Trứng hấp",
            Thongtin: "Tươi ngon\r\nSize M",
            Gia: 1000,
            Anh: "https://i.ytimg.com/vi/cZ1SBk313C4/maxresdefault.jpg",
            SL: 0,
            DG: 0,
            CH: "Còn hàng",
            CHT: "Chưa hoàn thành",
            Show_CH: 0,
            Show_CHT: 0,
          },
          {
            Ten: "Canh rong biển",
            Thongtin: "Tươi ngon\r\nSize M",
            Gia: 1000,
            Anh: "https://i.ytimg.com/vi/cZ1SBk313C4/maxresdefault.jpg",
            SL: 0,
            DG: 0,
            CH: "Còn hàng",
            CHT: "Chưa hoàn thành",
            Show_CH: 0,
            Show_CHT: 0,
          },
          {
            Ten: "Bánh mì",
            Thongtin: "Tươi ngon\r\nSize M",
            Gia: 1000,
            Anh: "https://i.ytimg.com/vi/cZ1SBk313C4/maxresdefault.jpg",
            SL: 0,
            DG: 0,
            CH: "Còn hàng",
            CHT: "Chưa hoàn thành",
            Show_CH: 0,
            Show_CHT: 0,
          },
        ],
        Douong: [
          {
            Ten: "Cocacola",
            Thongtin: "Tươi ngon\r\nSize M",
            Gia: 1000,
            Anh: "https://i.ytimg.com/vi/cZ1SBk313C4/maxresdefault.jpg",
            SL: 0,
            DG: 0,
            CH: "Còn hàng",
            CHT: "Chưa hoàn thành",
            Show_CH: 0,
            Show_CHT: 0,
          },
          {
            Ten: "Rượu vang đỏ",
            Thongtin: "Tươi ngon\r\nSize M",
            Gia: 1000,
            Anh: "https://i.ytimg.com/vi/cZ1SBk313C4/maxresdefault.jpg",
            SL: 0,
            DG: 0,
            CH: "Còn hàng",
            CHT: "Chưa hoàn thành",
            Show_CH: 0,
            Show_CHT: 0,
          },
          {
            Ten: "Sữa dê",
            Thongtin: "Tươi ngon\r\nSize M",
            Gia: 1000,
            Anh: "https://i.ytimg.com/vi/cZ1SBk313C4/maxresdefault.jpg",
            SL: 0,
            DG: 0,
            CH: "Còn hàng",
            CHT: "Chưa hoàn thành",
            Show_CH: 0,
            Show_CHT: 0,
          },
        ],
        Trangmieng: [
          {
            Ten: "Chè đậu ngự",
            Thongtin: "Tươi ngon\r\nSize M",
            Gia: 1000,
            Anh: "https://i.ytimg.com/vi/cZ1SBk313C4/maxresdefault.jpg",
            SL: 0,
            DG: 0,
            CH: "Còn hàng",
            CHT: "Chưa hoàn thành",
            Show_CH: 0,
            Show_CHT: 0,
          },
          {
            Ten: "Chè bưởi",
            Thongtin: "Tươi ngon\r\nSize M",
            Gia: 1000,
            Anh: "https://i.ytimg.com/vi/cZ1SBk313C4/maxresdefault.jpg",
            SL: 0,
            DG: 0,
            CH: "Còn hàng",
            CHT: "Chưa hoàn thành",
            Show_CH: 0,
            Show_CHT: 0,
          },
          {
            Ten: "chè mít",
            Thongtin: "Tươi ngon\r\nSize M",
            Gia: 1000,
            Anh: "https://i.ytimg.com/vi/cZ1SBk313C4/maxresdefault.jpg",
            SL: 0,
            DG: 0,
            CH: "Còn hàng",
            CHT: "Chưa hoàn thành",
            Show_CH: 0,
            Show_CHT: 0,
          },
        ],
        Tong: { SL: 0, TT: 0, DG: 0 },
      },
      Data_Food_King_NVQL: [],
      Data_Food_King_NVB: [],
      Table_Code_Oder: {
        Number_Table_Oder: 1,
        Coder_Oder: "012356",
        Status: "Chưa thanh toán",
        List_Food: [],
      },
      newTable: "",
      ALL_Table: "",
      orderId: "",
      dist_new: "",
      Update_Dist_New: "",
      Username: "",
      Pasword: "",
      Show_Table_Hoa_don: false,
      Tab_Manager: 1,
      Tab_Chef: 1,
      Show_bang_khach_hang: false,
      Show_chitiet_HD: 0,
      Search: "",
      Show_luachon_NL: false,
      Show_luachon_TT: false,
      Bep_HT: "Còn hàng",
      Bep_TT: "Hoàn thành",
    };
  },

  getters: {
    // cookievalue: (state) => state.openthongtincanhan.token + "(Theta)" + state.openthongtincanhan.id,
  },

  actions: {
    //  * Account ================================================================
    // Router.post("/account/login", login);

    async Login_Account() {
      this.Data_login = await axios({
        method: "post",
        url: this.URLServer + "/account/login",
        data: { userCode: this.Username, password: this.Pasword },
      });
      this.Data_login = await this.Data_login.data;
      this.Show_Table_Hoa_don = true;
    },

    // Table ////////////////////////////////////
    // Router.post("/table/new-table", authentication, newTable);
    // Router.get("/table/get-all", getAllTable);

    async Set_Table_New() {
      this.Table_New = await axios({
        method: "post",
        url: this.URLServer + "/order/new",
        data: { newTable: newTable },
      });
      this.Table_New = await this.Table_New.data;
    },
    async Get_ALL_Table() {
      this.ALL_Table = await axios({
        method: "get",
        url: this.URLServer + "/table/get-all",
      });
      this.ALL_Table = this.ALL_Table.data;
    },

    // Oder //////////////////////////////////
    // Router.post("/order/new", authentication, admin, newOrder);
    // Router.delete("/order/remove-order", authentication, removeOrder);
    // Router.put("/order/update-order", authentication, addToCart);
    // Router.post("/order/payment/:orderId", authentication, payOrder);

    async Oder_New() {
      this.Oder_New = await axios({
        method: "post",
        url: this.URLServer + "/order/new",
        data: {
          userCode: this.Table_Code_Oder.Coder_Oder,
          tableId: this.Table_Code_Oder.Number_Table_Oder,
        },
      });
      this.Oder_New = await this.Oder_New.data;
    },
    async Delete_Oder() {
      this.delete_oder = await axios({
        method: "delete",
        url: this.URLServer + "/order/remove-order",
        params: { orderId: this.orderId },
      });
      this.delete_oder = await this.delete_oder.data;
    },

    // \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
    // Router.post("/dish/new-dish", multerUpload, createNewDish);
    // Router.put("/dish/update-dish-status", authentication, updateDishStatus);

    async Dist_New() {
      this.dist_new = await axios({
        method: "post",
        url: this.URLServer + "/dish/new-dish",
        data: { Tong_hop_mon_an: this.Data_Food_King },
      });
      this.dist_new = await this.dist_new.data;
    },
    async Update_Dist_New() {
      this.update_dist_new = await axios({
        method: "post",
        url: this.URLServer + "/dish/update-dish-status",
        data: { Update_mon_an: this.Data_Food_King },
      });
      this.update_dist_new = await this.update_dist_new.data;
    },

    //////////////////////////////////////////////////////////////////////////
    Dat_hang_theo_lan() {
      this.Data_Food_King.Thoi_gian = 123;
      this.Data_Food_King_NVB.push(
        JSON.parse(JSON.stringify(this.Data_Food_King))
      );
    },

    Reset_Ban() {
      this.Data_Food_King.Ghi_chu = "";
      this.Data_Food_King.Thoi_gian = "";
      this.Data_Food_King.Tong = { SL: 0, TT: 0, DG: 0 };
      for (let i = 0; i < this.Data_Food_King.Haisan.length; i++) {
        this.Data_Food_King.Haisan[i].SL = 0;
      }
      for (let i = 0; i < this.Data_Food_King.Thuysan.length; i++) {
        this.Data_Food_King.Thuysan[i].SL = 0;
      }
      for (let i = 0; i < this.Data_Food_King.Cacloaithit.length; i++) {
        this.Data_Food_King.Cacloaithit[i].SL = 0;
      }
      for (let i = 0; i < this.Data_Food_King.Khac.length; i++) {
        this.Data_Food_King.Khac[i].SL = 0;
      }
      for (let i = 0; i < this.Data_Food_King.Douong.length; i++) {
        this.Data_Food_King.Douong[i].SL = 0;
      }
      for (let i = 0; i < this.Data_Food_King.Trangmieng.length; i++) {
        this.Data_Food_King.Trangmieng[i].SL = 0;
      }
    },

    F_Table_Code_Oder() {
      for (let i1 = 0; i1 < this.Data_Food_King.Haisan.length; i1++) {
        if (this.Data_Food_King.Haisan[i1].SL > 0) {
          this.Table_Code_Oder.List_Food.push(this.Data_Food_King.Haisan[i1]);
        }
      }
      for (let i1 = 0; i1 < this.Data_Food_King.Thuysan.length; i1++) {
        if (this.Data_Food_King.Thuysan[i1].SL > 0) {
          this.Table_Code_Oder.List_Food.push(this.Data_Food_King.Thuysan[i1]);
        }
      }
      for (let i1 = 0; i1 < this.Data_Food_King.Cacloaithit.length; i1++) {
        if (this.Data_Food_King.Cacloaithit[i1].SL > 0) {
          this.Table_Code_Oder.List_Food.push(
            this.Data_Food_King.Cacloaithit[i1]
          );
        }
      }
      for (let i1 = 0; i1 < this.Data_Food_King.Khac.length; i1++) {
        if (this.Data_Food_King.Khac[i1].SL > 0) {
          this.Table_Code_Oder.List_Food.push(this.Data_Food_King.Khac[i1]);
        }
      }
      for (let i1 = 0; i1 < this.Data_Food_King.Trangmieng.length; i1++) {
        if (this.Data_Food_King.Trangmieng[i1].SL > 0) {
          this.Table_Code_Oder.List_Food.push(
            this.Data_Food_King.Trangmieng[i1]
          );
        }
      }
      for (let i1 = 0; i1 < this.Data_Food_King.Douong.length; i1++) {
        if (this.Data_Food_King.Douong[i1].SL > 0) {
          this.Table_Code_Oder.List_Food.push(this.Data_Food_King.Douong[i1]);
        }
      }
    },
    F_Tong() {
      this.Data_Food_King.Tong.SL = 0;
      for (let i1 = 0; i1 < this.Data_Food_King.Haisan.length; i1++) {
        this.Data_Food_King.Tong.SL =
          this.Data_Food_King.Tong.SL + this.Data_Food_King.Haisan[i1].SL;
      }
      this.Data_Food_King.Tong.TT = 0;
      for (let i1 = 0; i1 < this.Data_Food_King.Haisan.length; i1++) {
        this.Data_Food_King.Tong.TT =
          this.Data_Food_King.Tong.TT +
          this.Data_Food_King.Haisan[i1].SL *
            this.Data_Food_King.Haisan[i1].Gia;
      }
      this.Data_Food_King.Tong.DG = 0;
      for (let i1 = 0; i1 < this.Data_Food_King.Haisan.length; i1++) {
        this.Data_Food_King.Tong.DG =
          this.Data_Food_King.Tong.DG + this.Data_Food_King.Haisan[i1].DG;
      }

      for (let i1 = 0; i1 < this.Data_Food_King.Thuysan.length; i1++) {
        this.Data_Food_King.Tong.SL =
          this.Data_Food_King.Tong.SL + this.Data_Food_King.Thuysan[i1].SL;
      }
      for (let i1 = 0; i1 < this.Data_Food_King.Thuysan.length; i1++) {
        this.Data_Food_King.Tong.TT =
          this.Data_Food_King.Tong.TT +
          this.Data_Food_King.Thuysan[i1].SL *
            this.Data_Food_King.Thuysan[i1].Gia;
      }
      for (let i1 = 0; i1 < this.Data_Food_King.Thuysan.length; i1++) {
        this.Data_Food_King.Tong.DG =
          this.Data_Food_King.Tong.DG + this.Data_Food_King.Thuysan[i1].DG;
      }

      for (let i1 = 0; i1 < this.Data_Food_King.Cacloaithit.length; i1++) {
        this.Data_Food_King.Tong.SL =
          this.Data_Food_King.Tong.SL + this.Data_Food_King.Cacloaithit[i1].SL;
      }
      for (let i1 = 0; i1 < this.Data_Food_King.Cacloaithit.length; i1++) {
        this.Data_Food_King.Tong.TT =
          this.Data_Food_King.Tong.TT +
          this.Data_Food_King.Cacloaithit[i1].SL *
            this.Data_Food_King.Cacloaithit[i1].Gia;
      }
      for (let i1 = 0; i1 < this.Data_Food_King.Cacloaithit.length; i1++) {
        this.Data_Food_King.Tong.DG =
          this.Data_Food_King.Tong.DG + this.Data_Food_King.Cacloaithit[i1].DG;
      }

      for (let i1 = 0; i1 < this.Data_Food_King.Khac.length; i1++) {
        this.Data_Food_King.Tong.SL =
          this.Data_Food_King.Tong.SL + this.Data_Food_King.Khac[i1].SL;
      }
      for (let i1 = 0; i1 < this.Data_Food_King.Khac.length; i1++) {
        this.Data_Food_King.Tong.TT =
          this.Data_Food_King.Tong.TT +
          this.Data_Food_King.Khac[i1].SL * this.Data_Food_King.Khac[i1].Gia;
      }
      for (let i1 = 0; i1 < this.Data_Food_King.Khac.length; i1++) {
        this.Data_Food_King.Tong.DG =
          this.Data_Food_King.Tong.DG + this.Data_Food_King.Khac[i1].DG;
      }

      for (let i1 = 0; i1 < this.Data_Food_King.Douong.length; i1++) {
        this.Data_Food_King.Tong.SL =
          this.Data_Food_King.Tong.SL + this.Data_Food_King.Douong[i1].SL;
      }
      for (let i1 = 0; i1 < this.Data_Food_King.Douong.length; i1++) {
        this.Data_Food_King.Tong.TT =
          this.Data_Food_King.Tong.TT +
          this.Data_Food_King.Douong[i1].SL *
            this.Data_Food_King.Douong[i1].Gia;
      }
      for (let i1 = 0; i1 < this.Data_Food_King.Douong.length; i1++) {
        this.Data_Food_King.Tong.DG =
          this.Data_Food_King.Tong.DG + this.Data_Food_King.Douong[i1].DG;
      }

      for (let i1 = 0; i1 < this.Data_Food_King.Trangmieng.length; i1++) {
        this.Data_Food_King.Tong.SL =
          this.Data_Food_King.Tong.SL + this.Data_Food_King.Trangmieng[i1].SL;
      }
      for (let i1 = 0; i1 < this.Data_Food_King.Trangmieng.length; i1++) {
        this.Data_Food_King.Tong.TT =
          this.Data_Food_King.Tong.TT +
          this.Data_Food_King.Trangmieng[i1].SL *
            this.Data_Food_King.Trangmieng[i1].Gia;
      }
      for (let i1 = 0; i1 < this.Data_Food_King.Trangmieng.length; i1++) {
        this.Data_Food_King.Tong.DG =
          this.Data_Food_King.Tong.DG + this.Data_Food_King.Trangmieng[i1].DG;
      }
    },
    // F_Open_Dark() {
    //   if (this.Dark == true) {
    //     this.Open_Dark = 'darkk'
    //   }
    //   if (this.Dark == false) {
    //     this.Open_Dark = 'dark'
    //   }
    // },
    Count() {
      count++;
    },
    async F_Data_List_Product() {
      this.Data_List_Product = await axios({
        method: "get",
        url: this.domain_Backend + "/ListProduct",
      });
      this.Data_List_Product = await this.Data_List_Product.data;
    },
    F_Loading() {
      this.Loading = 2;
    },
    async F_Data_List_Product_Home() {
      try {
        this.Data_List_Product_Home = await axios({
          method: "get",
          url: this.domain_Backend + "/ListProductHome",
        });
        this.Data_List_Product_Home = await this.Data_List_Product_Home.data;
      } catch (error) {
        this.Data_List_Product_Home = [];
      }
    },
    async F_Search() {
      this.Search_ListProduct_Today1 = await axios({
        method: "get",
        params: { search: this.Search },
        url: this.domain_Backend + "/SearchListProduct",
      });
      this.Search_ListProduct_Today1 = await this.Search_ListProduct_Today1
        .data;
    },
    showModal() {
      this.isModalVisible = true;
    },
  },
});

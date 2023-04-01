"use strict";(self["webpackChunkstore_system"]=self["webpackChunkstore_system"]||[]).push([[162],{7084:function(t,a,e){e.r(a),e.d(a,{default:function(){return v}});var s=function(){var t=this,a=t._self._c;return a("main",[a("Loading",{attrs:{active:t.isLoading,"is-full-page":!0,"can-cancel":!1}}),a("div",{staticClass:"flex items-center mb-4 text-green-700 font-bold text-lg uppercase"},[a("ThemifyIcon",{attrs:{icon:"menu"}}),a("h1",{staticClass:"ml-2"},[t._v("Finance Sales")])],1),a("div",{staticClass:"grid grid-cols-3"},[a("div",{staticClass:"col-span-2"},[a("div",{staticClass:"overflow-x-auto relative"},[a("table",{staticClass:"overflow-scroll w-full text-sm text-left text-gray-500 dark:text-gray-400 mb-4"},[t._m(0),t.dataList.length>0?a("tbody",[t._l(t.dataList,(function(e,s){return a("tr",{key:s,staticClass:"bg-white border-b dark:bg-gray-800 dark:border-gray-700"},[a("th",{staticClass:"py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white",attrs:{scope:"row"}},[t._v(" "+t._s(e.id)+" ")]),a("td",{staticClass:"py-4 px-6"},[t._v(t._s(e.dateString))]),a("td",{staticClass:"py-4 px-6"},[t._v(t._s(t.priceFormat(e.cash)))]),a("td",{staticClass:"py-4 px-6"},[t._v(t._s(e.totalProduct))]),a("td",{staticClass:"py-4 px-6"},[t._v(t._s(t.priceFormat(e.totalPrice)))])])})),a("tr",{staticClass:"font-bold bg-gray-50 text-black"},[a("th",{staticClass:"py-4 px-6",attrs:{colspan:"4"}},[t._v("Total sales:")]),a("td",{staticClass:"py-4 px-6"},[t._v(t._s(t.totalSale))])])],2):t._e()]),t.dataList.length<=0?a("div",{staticClass:"flex w-full justify-center p-8"},[a("h1",{},[t._v("Empty list, there is no data!")])]):t._e()])]),a("div",{staticClass:"px-2"},[a("div",{staticClass:"mb-8"},[a("div",{staticClass:"mb-4 flex items-center text-green-900 font-bold text-md"},[a("ThemifyIcon",{attrs:{icon:"settings"}}),a("h1",{staticClass:"ml-2"},[t._v("Select the start and the end date for detail:")])],1),a("div",{staticClass:"grid grid-cols-2 bg-gray-200 rounded-md mt-5"},[a("div",{staticClass:"flex flex-col p-4"},[a("label",{staticClass:"mb-2 font-bold"},[t._v("Date Start:")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.startDate,expression:"startDate"}],staticClass:"px-3 py-2 rounded-sm focus:outline-none",attrs:{type:"date",placeholder:"dd-mm-yyyy"},domProps:{value:t.startDate},on:{input:function(a){a.target.composing||(t.startDate=a.target.value)}}})]),a("div",{staticClass:"flex flex-col p-4"},[a("label",{staticClass:"mb-2 font-bold"},[t._v("Date End:")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.endDate,expression:"endDate"}],staticClass:"px-3 py-2 rounded-sm focus:outline-none",attrs:{type:"date",placeholder:"dd-mm-yyyy"},domProps:{value:t.endDate},on:{input:function(a){a.target.composing||(t.endDate=a.target.value)}}})])]),a("button",{staticClass:"text-white py-2 w-full my-4 rounded-md transition-all",class:{"bg-blue-400 hover:bg-blue-500 cursor-pointer":t.startDate&&t.endDate,"bg-gray-400 cursor-default":!t.startDate||!t.endDate},on:{click:t.visualizeHandler}},[t._v(" Confirm ")])]),t.dataList.length>0?a("div",{staticClass:"mb-8"},[a("div",{staticClass:"mb-4 text-md font-medium text-gray-900 flex items-center"},[a("ThemifyIcon",{attrs:{icon:"settings"}}),a("p",{staticClass:"ml-2"},[t._v("Export to excel file:")])],1),a("div",{staticClass:"flex justify-center items-center transition-all text-white w-full py-2 text-center rounded bg-blue-400 hover:bg-blue-500 cursor-pointer",on:{click:t.exportHandler}},[a("ThemifyIcon",{attrs:{icon:"export"}}),a("button",{staticClass:"ml-2"},[t._v("Export")])],1)]):t._e()])])],1)},i=[function(){var t=this,a=t._self._c;return a("thead",{staticClass:"text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"},[a("tr",[a("th",{staticClass:"py-3 px-6",attrs:{scope:"col"}},[t._v("ID")]),a("th",{staticClass:"py-3 px-6",attrs:{scope:"col"}},[t._v("Sale date")]),a("th",{staticClass:"py-3 px-6",attrs:{scope:"col"}},[t._v("Cash")]),a("th",{staticClass:"py-3 px-6",attrs:{scope:"col"}},[t._v("Products")]),a("th",{staticClass:"py-3 px-6",attrs:{scope:"col"}},[t._v("Price")])])])}],l=e(196),r=e(629),o=e(8510),n=e(1876),c=e(7398),d=e.n(c),p={data(){return{isLoading:!1,startDate:null,endDate:null,dataList:[],totalSale:this.priceFormat(0)}},methods:{dateFormat:o.Z,priceFormat:n.Z,async visualizeHandler(){if(this.startDate&&this.endDate){this.isLoading=!0;const t=this.startDate.split("-")[2],a=this.startDate.split("-")[1],e=this.startDate.split("-")[0],s=this.endDate.split("-")[2],i=this.endDate.split("-")[1],r=this.endDate.split("-")[0],o=`${t}/${a}/${e}`,n=`${s}/${i}/${r}`;await l.ZP.get(`http://localhost:3000/api/v1/transaction/visualize/?dateFrom=${o}&dateTo=${n}&token=${this.accessToken}`).then((t=>{t.data.status&&t.data.result.data.length>0&&(this.dataList=t.data.result.data,this.totalSale=this.priceFormat(t.data.result.totalSale))})),this.isLoading=!1}},async exportHandler(){const t=this.startDate.split("-")[2],a=this.startDate.split("-")[1],e=this.startDate.split("-")[0],s=this.endDate.split("-")[2],i=this.endDate.split("-")[1],r=this.endDate.split("-")[0],o=`${t}/${a}/${e}`,n=`${s}/${i}/${r}`;await(0,l.ZP)({url:`http://localhost:3000/api/v1/transaction/visualize/export?dateFrom=${o}&dateTo=${n}&token=${this.accessToken}`,method:"GET",responseType:"blob"}).then((t=>{const a=window.URL.createObjectURL(new Blob([t.data])),e=document.createElement("a");e.href=a;const s=`finance-sales-reports-${o}-${n}-${Date.now()}.xlsx`;e.setAttribute("download",s),e.setAttribute("target","_blank"),document.body.appendChild(e),e.click(),e.remove()}))}},computed:{...(0,r.rn)(["accessToken","payload","toastify"])},components:{Loading:d()}},u=p,h=e(1001),m=(0,h.Z)(u,s,i,!1,null,null,null),v=m.exports},1876:function(t,a,e){function s(t){if(t&&t>=1e6){let a=Math.floor(t/1e6),e=Math.floor(t%1e6/1e3),s=Math.floor(t%1e6%1e3);return e=e<100?e<10?`00${e}`:`0${e}`:e,s=s<100?s<10?`00${s}`:`0${s}`:s,`${a},${e},${s} vnđ`}if(t&&t<1e6){let a=Math.floor(t/1e3),e=Math.floor(t)%1e3;return e=e<100?e<10?`00${e}`:`0${e}`:e,`${a},${e} vnđ`}return"0 vnđ"}e.d(a,{Z:function(){return s}})}}]);
//# sourceMappingURL=financeSales.6f412409.js.map
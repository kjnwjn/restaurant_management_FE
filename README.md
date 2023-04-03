<<<<<<< HEAD
# Service-Oriented Architecture

Đồ án môn học: **KIẾN TRÚC HƯỚNG DỊCH VỤ**
Giảng viên hướng dẫn: [**Dương Hữu Phúc**][dhp]

Thành viên tham gia:

-   Phạm Nguyễn Hoàng Quân - 51900419
-   Nguyễn Minh Phước -
-   Phạm

## Giới thiệu đề tài

-   Tên đề tài: **PHÂN TÍCH VÀ THIẾT KẾ HỆ THỐNG CỬA HÀNG BÁN LẺ**
-   Giới thiệu: Trong xu hướng đổi mới, hòa nhập, phát triển đất nước và công nghệ ngày càng được áp dụng rộng rãi thì việc áp dụng CNTT vào các lĩnh vực ngày càng phổ biến, nhất là trong việc mua bán kinh doanh. Để nâng cao hiểu quả trong việc quản lý, việc áp dụng kinh doanh theo mô hình điểm bán lẻ - quản lý theo một hệ thống đang mang đến một giải pháp mới, phù hợp, dễ dàng, tiện lợi, và mang lại hiệu suất cao hơn rất nhiều so với cách làm việc truyền thống. Chính vì vậy, chúng em đã quyết định chọn đề tài "Phân tích và thiết kế hệ thống cửa hàng bán lẻ" để tìm hiểu về hệ thống kinh doanh này. Bên canh đó việc chọn đề tài này cũng giúp chúng em có thể nâng cao hiểu biết về kĩ năng nghiệp vụ, cũng như các vấn đề thường gặp trong quá trình quản lý .

## Những tính năng chính

-   Nhập toàn bộ danh sách sản phẩm bằng file excel
-   Quản lý danh sách tài khoản người dùng, nhân viên
-   Tạo giao dịch, thực hiện giao dịch và thanh toán
-   Điểm tích luỹ dành cho khách hàng, áp dụng điểm tích luỹ cho mỗi giao dịch nếu muốn
-   Hệ thống điểm danh dành cho nhân viên cửa hàng
-   Xuất file excel báo cáo danh sách các mặt hàng hết hàng
-   Xuất file excel báo cáo doanh số bán hàng theo ngày tháng năm

## Công nghê sử dụng

Công nghệ sử dụng cho việc xây dụng hệ thống API BACK-END:

-   [Node.js] - evented I/O for the backend
-   [Express] - fast node.js network app framework

Công nghệ sử dụng xây dựng giao diện người dùng:

-   [VueJS] - HTML enhanced for web apps!

Hệ cơ sở dũ liệu : [MongoDB]

## Cài đặt

Yêu cầu tối thiểu [Node.js](https://nodejs.org/) v10+

Tài xuống bằng [git] bằng cách sao chép dòng lệnh dưới đây và chạy trong cmd:

```
git clone https://github.com/kjnwjn/-Customer-order-management-module
```

Tiến hành cài đặt các gói thư viện cần thiết:

```sh
cd store-system
npm install
```

Cấu hình các biến môi trường:

-   Đổi tên tệp **default.env** thành **.env**
-   **SERVER_PORT**: chỉ định port mặc định cho việc khởi chạy server.
-   **SECRET_KEY**: chìa khoá bảo mật sử dụng cho jwt.
-   **ADMIN_PASSWORD**: Mật khẩu mặc định của tài khoản ADMIN.
-   **DB_URL**: chỉ định url cho việc kết nối database.
-   **SERVER_BASE_URL**: địa chỉ mặc định của server.
-   **VUE_APP_BASE_URL**: địa chỉ mặc định của VueJS font-end chạy ở môi trường DEV.
-   **VUE_APP_API_URL**: chỉ định địa chỉ API cho việc call API ở phía font-end.

Cài đặt MongoDB, xem thêm cách cài đặt tại đây [MongoDB - Document]

## Khởi chạy hệ thống

Dưới đây là các bước chi tiết khởi chạy hệ thông sau khi hoàn thành các yêu cầu tối thiểu phía trên.

##### 1. Khởi chạy ở môi trường phát triển:

-   Khởi chạy môi trường Server:

```
npm start
```

Khi đó API Server sẽ khởi chạy tại PORT đã được chỉ định.

-   Khởi chạy Vue app:

```
npm run serve
```

Ứng dụng Vue sẽ được khởi chạy mặc định tại [localhost:8080](http://localhost:8080)

##### 2. Build ứng dụng Vue

Sau khi hoàn tất việc phát triển, để build ứng dụng VUE bằng cách chạy dòng lệnh sau:

```
npm run build
```

Sau khi hoàn tất quá trình build ứng dụng, các tài nguyên được tạo trong thư mục **/server/client**

Để khởi chạy hệ tthống sau khi build ứng dụng, bằng cách tương tự sau:

```
npm start
```

Khi đó ứng dụng được chạy ở PORT đã được chỉ định [localhost:3000](localhost:3000)

API hệ thống sẽ chạy ở [localhost:3000/api/v1](localhost:3000/api/v1)

## License

MIT

**Thanks!**

[//]: # "These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax"
[dhp]: https://github.com/duonghuuphuc
[git]: https://git-scm.com/
[node.js]: http://nodejs.org
[express]: http://expressjs.com
[vuejs]: http://vuejs.org
[mongodb]: https://www.mongodb.com
[mongodb - document]: https://www.mongodb.com/docs/
=======
# SERVICE ORIENTED ARCHITECTURE

Đồ án môn học: **Kiến trúc hướng dịch vụ**
Giảng viên hướng dẫn: [**Dương Hữu Phúc**][dhp]

Thành viên tham gia:

-   Phạm Nguyễn Hoàng Quân - 51900419
-   Trần Hữu Nhất - 519H0210
-   Nguyễn Minh Phước - 51900770

## Giới thiệu đề tài

-   Tên đề tài: **TÌM HIỂU VÀ PHÂN TÍCH PHÂN HỆ**
-   Đề tài "Quản lý đơn hàng của thực khách trong nhà hàng ăn uống" là một phân hệ quản lý đơn hàng trong ngành dịch vụ nhà hàng, giúp cho quản lý và nhân viên trong nhà hàng có thể quản lý và xử lý các đơn hàng của khách hàng một cách nhanh chóng và hiệu quả.
-   Phân hệ này sẽ cung cấp các chức năng như quản lý menu, đặt hàng, xử lý đơn hàng, thanh toán, quản lý thông tin khách hàng và lưu trữ dữ liệu. Các tính năng này sẽ giúp nhà hàng tăng hiệu quả trong quản lý đơn hàng, tiết kiệm thời gian và tăng khả năng tương tác với khách hàng.

## Những tính năng chính

-   Đăng nhập/Đăng xuất
-   Quản lý nhân viên
-   Quản lý hóa đơn
-   Quản lý đơn hàng
-   Quản lý menu
-   Thanh toán
-   Báo cáo và thống kê

## Công nghê sử dụng

Công nghệ sử dụng cho việc xây dụng hệ thống API BACK-END:

-   [Node.js] - evented I/O for the backend
-   [Express] - fast node.js network app framework

Công nghệ sử dụng xây dựng giao diện người dùng:

-   [VueJS] - HTML enhanced for web apps!

Hệ cơ sở dũ liệu : [MongoDB]

## Cài đặt

Yêu cầu tối thiểu [Node.js](https://nodejs.org/) v10+

Tiến hành cài đặt các gói thư viện cần thiết:

```sh
npm install
```

Cấu hình các biến môi trường:

-   **SERVER_BASE_URL**: địa chỉ mặc định của server.
-   **VUE_APP_BASE_URL**: địa chỉ mặc định của VueJS font-end chạy ở môi trường DEV.
-   **VUE_APP_API_URL**: chỉ định địa chỉ API cho việc call API ở phía font-end.

Cài đặt MongoDB, xem thêm cách cài đặt tại đây [MongoDB - Document]

## Khởi chạy hệ thống

Dưới đây là các bước chi tiết khởi chạy hệ thông sau khi hoàn thành các yêu cầu tối thiểu phía trên.

##### 1. Chạy ứng dụng Vue:

-   Khởi chạy Vue app:

```
npm serve
```

Ứng dụng Vue sẽ được khởi chạy mặc định tại [localhost:8080](http://localhost:8080)

##### 2. Build ứng dụng Vue:

Để build ứng dụng VUE bằng cách chạy dòng lệnh sau:

```
npm build
```

Sau khi hoàn tất quá trình build ứng dụng, các tài nguyên được tạo trong thư mục **/dist**

## License

MIT

**Thanks!**

[//]: # "These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax"
[dhp]: https://github.com/duonghuuphuc
[git]: https://git-scm.com/
[node.js]: http://nodejs.org
[express]: http://expressjs.com
[vuejs]: http://vuejs.org
[mongodb]: https://www.mongodb.com
[mongodb - document]: https://www.mongodb.com/docs/
>>>>>>> ebc2fa626c6f337e2e9a8c7db50a6fe2c41d5f38

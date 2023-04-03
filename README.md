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

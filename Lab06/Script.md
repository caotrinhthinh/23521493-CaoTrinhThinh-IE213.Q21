# Báo cáo Lab 06 - Phát triển hệ thống Web

## 1. Yêu cầu của bài thực hành
Bài thực hành Lab 06 yêu cầu triển khai các chức năng phía Frontend trên nền tảng ReactJS kết nối với Backend API (Lab 03), bao gồm:
- **Tạo Login Component:** Cho phép người dùng đăng nhập hệ thống bằng Username và ID.
- **Thêm và Sửa Review (Add / Edit Review):** Cho phép người dùng đánh giá phim và chỉnh sửa đánh giá đã có.
- **Xóa Review (Delete Review):** Cho phép người dùng xóa đánh giá của chính mình (cập nhật state trực tiếp không tải lại trang).
- **Phân trang (Pagination):** Hiển thị số trang hiện tại và lấy dữ liệu trang tiếp theo trên danh sách phim.

## 2. Quá trình thực hiện & Kết quả

Các chức năng đã được implement bằng React Hooks (`useState`, `useEffect`) và React Router DOM v6 (`useNavigate`, `useLocation`, `useParams`), thay thế cho các API cũ (v5) được đề cập trong tài liệu gốc để đảm bảo tương thích với phiên bản hiện tại của dự án.

### 2.1. Tính năng tạo Review
Người dùng sau khi đăng nhập có thể truy cập vào một phim và tiến hành đánh giá.
![Tạo review](./image/Tạo%20review.png)

### 2.2. Tính năng thêm và sửa Review
Khi người dùng bấm vào nút "Edit" tại bài review cũ, hệ thống chuyển sang chế độ "Edit Review" với nội dung cũ được điền sẵn trong form. Nếu lưu thành công, hệ thống thông báo trạng thái.
![Thêm và sửa review](./image/Thêm%20và%20sửa%20review.png)

### 2.3. Quyền Edit và Delete
Người dùng chỉ có quyền nhìn thấy nút Edit và Delete ở những đánh giá (review) do chính mình tạo ra (Dựa vào đối chiếu `user.id`). Khi nhấn Xoá, phần tử này biến mất lập tức khỏi giao diện.
![Chỉ có quyền edit và delete review cua minh](./image/Chỉ%20có%20quyền%20edit%20và%20delete%20review%20cua%20minh.png)

### 2.4. Phân trang
Ở danh sách phim, thêm nút "Get next X results". Chức năng tự động gọi API với tham số `page` tiếp theo để lấy nội dung phim.

## 3. Tổng kết
- Hoàn thành thiết lập kết nối Frontend tới Backend.
- Hoàn thiện xử lý CRUD cho Review (Thêm/Sửa/Xoá) cho người dùng cụ thể.
- Tối ưu hoá hiển thị dữ liệu qua kĩ thuật phân trang.

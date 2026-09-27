# Thư mời tốt nghiệp

Chạy `npm run dev` rồi mở http://127.0.0.1:4173.

## Mời riêng từng người

- `/macnhuhuu` hoặc `/macnhuhuu/`: “Mời bạn Hữu”.
- Thêm người vào `dist/guests.js`, ví dụ `nguyenthilan: 'Lan'`. Chạy `npm run build` để tạo sẵn các đường dẫn này khi đưa lên hosting tĩnh.
- Có thể tạo ngay một lời mời mới bằng `/minh-anh?ten=Minh%20Anh`. Tham số `ten` giữ đúng dấu tiếng Việt, không cần sửa danh sách.
- Với tên chưa có trong danh sách, dấu gạch ngang trở thành khoảng trắng. URL không dấu viết liền không thể tự suy ra dấu tiếng Việt, vì vậy nên thêm tên chính xác vào danh sách.

Khi đưa lên hosting: dùng thư mục `dist`. Máy chủ cần đưa các đường dẫn không có đuôi tệp về `index.html` (SPA fallback). `_redirects` đã có sẵn cho các dịch vụ hỗ trợ định dạng này. Các đường dẫn trong danh sách cũng được xuất thành thư mục thật để tải trực tiếp.

Các link là lời mời cá nhân hóa nội dung, không phải liên kết xác thực danh tính hoặc kiểm soát quyền truy cập.

## Dây ảnh kỷ niệm
12 ảnh đã chọn nằm trong dist/photos. Thứ tự ảnh gốc được lưu ở photo-selection.json. Hành trình gồm bay lên, bay ngang dọc dây ảnh, hạ xuống rồi phóng lớn thiệp. Không có nút bỏ qua. Bấm phong bì luôn chạy từ mở nắp, rút thiệp đến bay dọc dây ảnh. Xem lại hành trình phát lại từ phong bì; Escape đóng.

## Giấy 3D từ Blender
Nguồn: graduation-paper.blend. Mesh và 24 dáng uốn được xuất ở dist/models/paper-mesh.json, hiển thị bằng WebGL trong paper3d.js. graduation-paper.glb là bản mô hình có vật liệu tham chiếu. Web dùng nội dung tên khách hiện tại làm bề mặt giấy. Nếu WebGL không có, hiệu ứng giấy CSS vẫn chạy đủ hành trình. Bộ đếm chỉ tính khung hình đã phát, không bỏ đoạn khi chuyển tab.

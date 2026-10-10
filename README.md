# Kai Café Dashboard

Dashboard nội bộ Kai Café (429 Phan Huy Ích). Trang tĩnh trên GitHub Pages, số liệu lấy từ API Apps Script của bot Telegram (đọc Google Sheet "[Kai Café] Internal Dashboard").

- `index.html` – toàn bộ giao diện (4 tab: Hôm nay · Bán hàng · Thu chi · Nhân sự).
- Dữ liệu KHÔNG nằm trong repo. Đăng nhập bằng **tài khoản + mật khẩu**, mỗi máy nhập 1 lần, trình duyệt sẽ nhớ.
- Link API (…/exec) chỉ lưu trong `index.html` ở dạng **đã mã hoá** (`API_ENC`), giải mã được khi nhập đúng tài khoản + mật khẩu.
- Đổi tài khoản / mật khẩu (DASH_KEY) / link API: mở `tools/ma-hoa-link.html` (hoặc `https://<user>.github.io/<repo>/tools/ma-hoa-link.html`), dán kết quả đè dòng `const API_ENC = …` trong `index.html` rồi push.
- Bật GitHub Pages: Settings → Pages → Branch `main` / root.
- Vẫn mở nhanh được: `https://<user>.github.io/<repo>/?api=<link exec>&k=<mật khẩu>` (trang tự xoá mật khẩu khỏi thanh địa chỉ).
- **Cài như app trên điện thoại (PWA):** Android/Chrome: mở trang → bấm **📲 Cài app** (hoặc menu ⋮ → Cài đặt ứng dụng). iPhone: mở bằng **Safari** → nút Chia sẻ → **Thêm vào MH chính**. Mất mạng vẫn mở được, hiện số liệu lần tải gần nhất (đăng xuất là xoá).

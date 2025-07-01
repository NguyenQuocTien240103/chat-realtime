# Chat Realtime App

**Chat Realtime** là một ứng dụng web cho phép người dùng trò chuyện với nhau theo thời gian thực. Dự án được xây dựng với kiến trúc tách biệt giữa frontend và backend.

## Công nghệ sử dụng

### Frontend

- **React** – Thư viện xây dựng giao diện người dùng.
- **Vite** – Công cụ build nhanh và hiện đại cho React.
- **Material-UI** – Thư viện giao diện thân thiện và dễ dùng.
- **React Hook Form** – Thư viện quản lý biểu mẫu hiệu quả.
- **Zod** – Xác thực và kiểm tra kiểu dữ liệu.
- **i18next** – Hỗ trợ đa ngôn ngữ.

### Backend

- **Node.js** – Nền tảng máy chủ JavaScript.
- **Express** – Framework xây dựng RESTful API.
- **Prisma** – ORM giúp thao tác với cơ sở dữ liệu dễ dàng.
- **Socket.IO** – Thư viện hỗ trợ giao tiếp thời gian thực.
- **Zod** – Xác thực và kiểm tra dữ liệu gửi đến API.

---

## Hướng dẫn cài đặt

1. Clone repository:
  - git clone: https://github.com/NguyenQuocTien240103/chat-realtime.git
  - cd chat-realtime

2. Cài đặt dependencies:

  **Frontend:**
  - cd fe
  - npm install

  **Backend:**
  - cd be
  - npm install

3. Cấu hình biến môi trường:

  **Frontend:**
  - VITE_API_BASE_URL=http://localhost:port

  **Backend:**
  - DATABASE_URL=MYSQL://USER:PASSWORD@HOST:PORT/DATABASE

4. Chạy migrate:
  - cd be
  - npx prisma migrate dev

5. Chạy ứng dụng:

  **Frontend:**
  - cd fe
  - npm run dev
  
  **Backend:**
  - cd be
  - npm run dev

# Unit test:
docker exec -it node_app_local bash
npm test -- tests/unit/grade.test.js
npm test -- tests/integration/student.test.js
npm test

# CI/CD Pipeline Demo

**CI/CD** bao gồm kiểm thử tự động, đóng gói Container và triển khai liên tục

## Công nghệ sử dụng
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **Testing:** Jest, Supertest
- **DevOps:** Docker, GitHub Actions
- **Cloud:** Render, Docker Hub

## Quy trình CI/CD (Pipeline)
Hệ thống tự động thực hiện các bước sau mỗi khi có mã nguồn mới được đẩy lên nhánh `main`:

1.  **Chất lượng mã nguồn (Quality Check):**
    *   Kiểm tra lỗi cú pháp (Linting).
    *   Chạy **Unit Test** cho các hàm xử lý logic.
    *   Khởi tạo Database Postgres ảo để chạy **Integration Test** cho API.
2.  **Đóng gói (Containerization):**
    *   Build Docker Image từ Dockerfile (Multi-stage build tối ưu dung lượng).
    *   Đẩy Image lên **Docker Hub**.
3.  **Triển khai (Deployment):**
    *   Gửi tín hiệu (Webhook) tới **Render.com**.
    *   Render tự động kéo Image mới nhất và cập nhật ứng dụng.

## Hướng dẫn chạy dưới máy Local

### 1. Yêu cầu hệ thống
- Node.js v20+
- Docker & Docker Compose

### 2. Cài đặt
```bash
# Clone dự án
git clone ...
cd demo-cicd

# Cài đặt thư viện
npm install
```

### 3. Biến môi trường
Tạo file `.env` tại thư mục gốc:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/school_db
PORT=3000
```

### 4. Kiểm thử (Testing)
```bash
# Chạy toàn bộ test
npm test

# Chạy test và xem độ bao phủ (Coverage)
npm run test:coverage
```

## Triển khai với Docker
```bash
# Build image
docker build -t student-api .

# Chạy container
docker run -p 3000:3000 --env-file .env student-api
```

## Cấu hình GitHub Secrets cần thiết
Để Pipeline chạy thành công, cần cấu hình các biến sau trong phần **Settings > Secrets**:
- `DOCKER_USERNAME`: Tài khoản Docker Hub.
- `DOCKER_PASSWORD`: Personal Access Token của Docker Hub.
- .....

---
© 2026 - Demo CICD

postgresql://school_db:YPHNSYKYHYtHjdCddnAJL9EWnp6nSFAU@dpg-d7rsde8sfn5c73cfogg0-a/school_db_3bup

postgresql://school_db:YPHNSYKYHYtHjdCddnAJL9EWnp6nSFAU@dpg-d7rsde8sfn5c73cfogg0-a.singapore-postgres.render.com/school_db_3bup
# Nodejs + Express + Prisma + Typescript

## Các bước khởi tạo dự án Nodejs + Typescript

- Khởi tạo Nodejs project: npm init
- Cài Typescript: npm i typescript
- Khởi tạo tsconfig.json: npx tsc --init
- Bỏ comment "outDir" và sửa thành: "outDir": "./dist",

## Prisma
### CLI
- Khởi tạo Prisma: npx prisma init
- Cài đặt Prisma Client: npm install @prisma/client
- Tạo Prisma Client dựa trên file schema.prisma: npx prisma generate
- Tạo migration: npx prisma migrate dev --name ten_migration (tự động generate + tự động ánh xạ cấu trúc schema.prisma lên DB)
- Đẩy schema.prisma lên DB (không tạo migration): npx prisma db push
- Pull DB về schema.prisma: npx prisma db pull
### Query
- Lấy data từ các quan hệ (lấy toàn bộ fields): dùng include
- Lấy các fields được chỉ định: dùng select

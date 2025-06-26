# chat-realtime

# Tổng quan dự án
Hệ thống gara xe thông minh được xây dựng với mục tiêu tự động hóa việc kiểm soát và bảo vệ khu vực để xe tại gia đình, nhà trọ hoặc khu dân cư nhỏ. Hệ thống sử dụng Raspberry Pi 4 làm trung tâm điều khiển, kết hợp với các mô hình AI hiện đại để thực hiện 3 chức năng chính:

- Nhận diện khuôn mặt: Xác thực người dùng hợp lệ để mở cửa tự động (sử dụng thư viện face_recognition với mô hình ResNet-34).

- Phát hiện người: Cảnh báo khi có người lạ xâm nhập bằng mô hình YOLOv8n đã fine-tune cho điều kiện ánh sáng yếu.

- Nhận diện giọng nói: Điều khiển thiết bị như đèn, cửa, còi bằng lệnh thoại, sử dụng mô hình nhận dạng tiếng nói VOSK.

Ngoài ra, hệ thống còn được tích hợp với các thiết bị như Arduino, động cơ servo, động cơ bước, đèn LED, buzzer và có giao diện web điều khiển từ xa qua mạng. Giải pháp có tính mở rộng cao, chi phí thấp và dễ dàng triển khai thực tế trong môi trường gia đình hoặc bán chuyên nghiệp.


# Client:
## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

# Server:
## Set up back-end

b1: cd ../pbl5/be

b2: python -m venv .venv

b3: .venv\Scripts\Activate.ps1

b4: python -m pip install --upgrade pip

b5: pip install -r requirements.txt

## run server

fastapi dev main.py

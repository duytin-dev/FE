# Hướng dẫn deploy Frontend lên Render (free)

Stack: **React + Vite** → build ra static files → **Nginx** (Docker) hoặc **Static Site** trên Render.

Backend đã deploy: **`https://be-2-emw3.onrender.com/api/v1`** (đã cấu hình trong `.env.production`).

---

## Tổng quan

```
GitHub (FE)  →  Render
                    ↓
              https://<TEN-FE>.onrender.com
                    ↓ (gọi API)
              https://<TEN-BACKEND>.onrender.com/api/v1
```

**Quan trọng:** `VITE_BACKEND_URL` phải được set **lúc build** (Vite không đọc env lúc runtime trong browser).

---

## Bước 0: Lấy URL backend

Backend của bạn:

```text
https://be-2-emw3.onrender.com/api/v1
```

Test nhanh:

```powershell
Invoke-RestMethod -Uri "https://be-2-emw3.onrender.com/api/v1/users"
```

---

## Bước 1: Đưa code FE lên GitHub

Đứng trong thư mục `FE/KTPM` (có `package.json`, `Dockerfile`):

```bash
git init
git add .
git commit -m "prepare frontend render deploy"
git branch -M main
git remote add origin https://github.com/<TEN-BAN>/<TEN-REPO-FE>.git
git push -u origin main
```

> Backend bạn đang ở repo `BE` riêng — FE nên repo riêng (vd: `FE`) hoặc monorepo; Render chỉ cần repo có folder app.

---

## Cách A — Static Site (khuyên dùng, đơn giản)

1. https://dashboard.render.com → **New +** → **Static Site**.
2. Connect repo FE.
3. Điền:

| Trường | Giá trị |
|--------|---------|
| **Name** | `tin-react-demo` |
| **Branch** | `main` |
| **Root Directory** | *(để trống nếu repo chỉ có FE; nếu monorepo: `FE/KTPM`)* |
| **Build Command** | `npm install && npm run build` |
| **Publish Directory** | `dist` |

4. **Environment** → thêm:

| Key | Value |
|-----|--------|
| `VITE_BACKEND_URL` | `https://be-2-emw3.onrender.com/api/v1` |

> Nếu không set trên Render, build vẫn dùng `.env.production` trong repo.

5. **Create Static Site** → đợi build xong → mở URL Render cấp.

---

## Cách B — Web Service (Docker + Nginx)

Dùng khi muốn giống `Dockerfile` sẵn có (SPA routing qua `nginx.conf`).

1. **New +** → **Web Service** → connect repo.
2. Form:

| Trường | Giá trị |
|--------|---------|
| **Name** | `tin-react-demo` |
| **Root Directory** | *(trống hoặc `FE/KTPM` nếu monorepo)* |
| **Runtime** | **Docker** |
| **Instance Type** | **Free** |

3. **Environment** → thêm (Render tự truyền vào `ARG` cùng tên lúc `docker build`):

| Key | Value |
|-----|--------|
| `VITE_BACKEND_URL` | `https://be-2-emw3.onrender.com/api/v1` |

4. Deploy → mở `https://<TEN-FE>.onrender.com`.

---

## Chạy local trước khi deploy

```bash
cd FE/KTPM
cp .env.example .env
# Sửa .env: local backend http://localhost:8080/api/v1
npm install
npm run dev
```

Build thử giống production:

```bash
# PowerShell
$env:VITE_BACKEND_URL="https://<TEN-BACKEND>.onrender.com/api/v1"
npm run build
npm run preview
```

Docker local:

```bash
docker build -t react-app --build-arg VITE_BACKEND_URL=https://<TEN-BACKEND>.onrender.com/api/v1 .
docker run -p 3000:80 react-app
```

Mở http://localhost:3000

---

## Lỗi thường gặp

| Triệu chứng | Nguyên nhân | Cách sửa |
|-------------|-------------|----------|
| Network Error / CORS | Sai URL API | `VITE_BACKEND_URL` phải kết thúc bằng `/api/v1`, không slash thừa cuối |
| Vẫn gọi `localhost:8080` | Build không có env | Set `VITE_BACKEND_URL` trên Render **trước** khi deploy; **Clear build cache** → redeploy |
| Trang trắng sau refresh route | Thiếu SPA fallback | Dùng Docker (`try_files` trong `nginx.conf`) hoặc Static Site của Render (đã hỗ trợ SPA) |
| API chậm 30–60s lần đầu | Backend free sleep | Đợi wake up; bình thường với gói free |

---

## Cập nhật FE sau này

```bash
git add .
git commit -m "update ui"
git push
```

Render tự build lại. Nếu đổi URL backend → sửa `VITE_BACKEND_URL` → redeploy (build lại).

---

## Checklist

- [ ] Backend chạy: `GET /api/v1/users` OK
- [ ] `VITE_BACKEND_URL` = `https://...onrender.com/api/v1`
- [ ] Repo FE đã push GitHub
- [ ] Render build thành công, mở URL FE
- [ ] Trên FE: thêm/sửa/xóa user hoạt động

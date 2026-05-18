# Deploy FE lên Vercel (fix 404)

## Nguyên nhân lỗi `404: NOT_FOUND`

Repo GitHub nằm ở folder **`FE`**, nhưng app React/Vite nằm trong **`FE/KTPM`**.

Nếu Vercel build từ root `FE` → không có `npm run build` đúng → không ra file `dist` → **404**.

---

## Cấu hình đúng trên Vercel

Vào project → **Settings** → **General** → **Build & Development Settings**:

| Trường | Giá trị |
|--------|---------|
| **Root Directory** | `KTPM` |
| **Framework Preset** | Vite |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Install Command** | `npm install` |

**Environment Variables**:

| Key | Value |
|-----|--------|
| `VITE_BACKEND_URL` | `https://be-2-emw3.onrender.com/api/v1` |

Sau đó: **Deployments** → **Redeploy** (hoặc push code mới).

---

## Sau khi deploy

- Trang chủ: `https://fe-fawn-seven.vercel.app/`
- Quản lý user: `https://fe-fawn-seven.vercel.app/users`

File `vercel.json` trong `KTPM` giúp route `/users` không bị 404 khi refresh.

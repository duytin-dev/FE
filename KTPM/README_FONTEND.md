## Nhớ enable file docker-comse của thư mục FE lên

## Reactjs Demo (Nếu muốn chạy độc lập FontEnd)

## Bạn đứng trong thư mục FE (nơi có Dockerfile)

## Build Image

```bash
 docker build -t react-app .
```

## Chay container

```bash
 docker run -p 3000:80 react-app
```

## Sau đó mở :http://localhost:3000

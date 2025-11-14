# DocNova
DocNova, Vite + React + JavaScript ile yapılmış fatura listeleme uygulaması.

## Kullanılan Teknolojiler
* React
* JavaScript
* Vite
* Redux Toolkit
* Ant-Design
* i18next
* React Router
* dayjs

## Özellikler
* Fatura listesi ve detay görüntüleme
* Fetch ile API iletişimi
* Redux Toolkit ile state yönetimi
* i18next ile çoklu dil desteği
* Ant-Design ile responsive tasarım
* Route koruması

## Gereksinimler:

* Node.js
* npm veya yarn

## Kurulum:

```
git clone <repository-url>
npm install
npm run dev
```

## Extra
* Cors için proxy ayarınızı vite.config.js içinde aşağıdaki gibi yapın.
```
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://api-dev.docnova.ai",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
        configure: (proxy) => proxy.on("proxyReq", (req) => req.removeHeader("origin")),
      }
    }
  }
})
```

## Demo:
![image](/img/loginEn.png)
![image](/img/loginTr.png)
![image](/img/homeTr.png)
![image](/img/homeEn.png)
![image](/img/detailsTr.png)
![image](/img/detailsEn.png)

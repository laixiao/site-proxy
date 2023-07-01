const path = require("path");
const express = require("express");
const PORT = 8082;

const { createProxyMiddleware } = require("http-proxy-middleware");
const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use(
  "/cdndiscordapp/",
  createProxyMiddleware({
    target: "https://cdn.discordapp.com",
    changeOrigin: true,
    pathRewrite: {
      "^/cdndiscordapp": "", // 将路径中的 /cdndiscordapp 替换为空字符串
    },
    onProxyReq: (proxyReq, req, res) => {
      console.log(req.originalUrl);
      //proxyReq.setHeader("Authorization", `Bearer ${process.env.API_KEY}`);
    },
    onProxyRes: (proxyRes, req, res) => {
      proxyRes.headers["Access-Control-Allow-Origin"] = "*";
      proxyRes.headers["Access-Control-Allow-Headers"] =
        "Content-Type,Content-Length, Authorization, Accept,X-Requested-With";
    },
  })
);
app
  .listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}/cdndiscordapp`);
  })
  .on("error", (err) => {
    console.log(err);
  });
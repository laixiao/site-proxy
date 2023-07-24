const path = require("path");
const express = require("express");

const PORT = 8086;
const target = "https://raw.githubusercontent.com";

const { createProxyMiddleware } = require("http-proxy-middleware");
const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use(
  "/8086",
  createProxyMiddleware({
    target: target,
    changeOrigin: true,
    pathRewrite: {
      "^/8086": "", // 将路径中的 /gpt 替换为空字符串
    },
    onProxyReq: (proxyReq, req, res) => {
      console.log(req.url);
    },
    onProxyRes: (proxyRes, req, res) => {
      proxyRes.headers["Access-Control-Allow-Origin"] = "*";
      proxyRes.headers["Access-Control-Allow-Headers"] = "Content-Type,Content-Length, Authorization, Accept,X-Requested-With";
    },
  })
);

app
  .listen(PORT, () => {
    console.log(`server running on http://www.jxit114.xyz:${PORT}/8086`);
  })
  .on("error", (err) => {
    console.log(err);
  });
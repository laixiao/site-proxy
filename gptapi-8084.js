const path = require("path");
const express = require("express");
const PORT = 8084;

const { createProxyMiddleware } = require("http-proxy-middleware");
const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use(
  "/gptapi",
  createProxyMiddleware({
    target: "https://api.chatanywhere.com.cn",
    changeOrigin: true,
    pathRewrite: {
      "^/gptapi": "", // 将路径中的 /gpt 替换为空字符串
    },
    onProxyReq: (proxyReq, req, res) => {
      console.log(req.url);
        proxyReq.setHeader("Authorization", `Bearer sk-FZNYq968eJkMik6rhdGPgHzXAX0fWVH08BzguizNMIZbBdd9`);
        proxyReq.setHeader("api-key", `sk-FZNYq968eJkMik6rhdGPgHzXAX0fWVH08BzguizNMIZbBdd9`);
    },
    onProxyRes: (proxyRes, req, res) => {
      proxyRes.headers["Access-Control-Allow-Origin"] = "*";
      proxyRes.headers["Access-Control-Allow-Headers"] = "Content-Type,Content-Length, Authorization, Accept,X-Requested-With";
    },
  })
);

app
  .listen(PORT, () => {
    console.log(`server running on http://www.jxit114.xyz:${PORT}/gptapi`);
  })
  .on("error", (err) => {
    console.log(err);
  });
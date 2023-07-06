const path = require("path");
const express = require("express");
const PORT = 8084;

const { createProxyMiddleware } = require("http-proxy-middleware");
const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use(
  "/gptapi",
  createProxyMiddleware({
    target: "https://ai.fakeopen.com",
    changeOrigin: true,
    pathRewrite: {
      "^/gptapi": "", // 将路径中的 /gpt 替换为空字符串
    },
    onProxyReq: (proxyReq, req, res) => {
      console.log(req.url);
      if (proxyReq.getHeader("Authorization") == "Bearer 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") {
        proxyReq.setHeader("Authorization", `Bearer pk-this-is-a-real-free-pool-token-for-everyone`);
        proxyReq.setHeader("api-key", `pk-this-is-a-real-free-pool-token-for-everyone`);
      }
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
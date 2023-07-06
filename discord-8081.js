const path = require("path");
const express = require("express");
const PORT = 8081;

const { createProxyMiddleware } = require("http-proxy-middleware");
const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use(
  "/discord/",
  createProxyMiddleware({
    target: "https://discord.com",
    changeOrigin: true,
    pathRewrite: {
      "^/discord": "", // 将路径中的 /discord 替换为空字符串
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
    console.log(`server running on http://www.jxit114.xyz:${PORT}/discord`);
  })
  .on("error", (err) => {
    console.log(err);
  });
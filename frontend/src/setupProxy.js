const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/users/login",
    createProxyMiddleware({
      target: "http://localhost:8080/users/login",
      changeOrigin: true,
    })
  );
};

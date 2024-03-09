const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/users",
    createProxyMiddleware({
      target: "http://localhost:8080",
      changeOrigin: true,
    })
  );
  
  app.use(
    "/rooms",
    createProxyMiddleware({
      target: "http://localhost:8080",
      changeOrigin: true,
    })
  );

  app.use(
    "/desks",
    createProxyMiddleware({
      target: "http://localhost:8080",
      changeOrigin: true,
    })
  );

  app.use(
    "/bookings",
    createProxyMiddleware({
      target: "http://localhost:8080",
      changeOrigin: true,
    })
  );
};

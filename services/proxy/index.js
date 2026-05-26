const express = require("express");
const proxy = require("express-http-proxy");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/../../pkg/config/config.env` });

const app = express();
// dont use parser let services on its own parse
const port = process.env.PORT;
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));

app.get("/health", (req, res) => {
  res
    .status(200)
    .json({ status: "health ok", timestamp: new Date().toISOString() });
});

function createServiceProxy(targetHost, servicePrefix) {
  return proxy(targetHost, {
    proxyReqPathResolver: (req) => {
      const resolvedPath = `${servicePrefix}${req.url}`;
      console.log(`  → proxying to ${targetHost}${resolvedPath}`);
      return resolvedPath;
    },
  });
}

// const authProxy = proxy("http://localhost:3300", {
//   proxyReqPathResolver: (req) => {
//     return `/api/v1/auth${req.url}`;
//   },
// });

// Route specific endpoints to their respective paths

// AUTH paths
app.use(
  "/api/v1/signup",
  createServiceProxy("http://localhost:3501", "/api/v1/signup"),
);
app.use(
  "/api/v1/login",
  createServiceProxy("http://localhost:3501", "/api/v1/login"),
);
app.use(
  "/api/v1/forgotPassword",
  createServiceProxy("http://localhost:3501", "/api/v1/forgotPassword"),
);
app.use(
  "/api/v1/resetPassword",
  createServiceProxy("http://localhost:3501", "/api/v1/resetPassword"),
);
app.use("/api/v1/logout", createServiceProxy("http://localhost:3501", "/api/v1/logout"));

// WORKOUT paths

app.use(
  "/api/v1/workouts",
  createServiceProxy("http://localhost:3502", "/api/v1/workouts"),
);

app.listen(port, () => {
  console.log(`Express HTTP Proxy Gateway running on port ${port}`);
});

import { createProxyMiddleware } from "http-proxy-middleware";

// Create proxy instance outside of request handler function to avoid unnecessary re-creation
const apiProxy = createProxyMiddleware({
  target: "http://localhost:3000/hpi",
  changeOrigin: true,
  pathRewrite: { [`^/api/proxy/active-slug/`]: "" },
  secure: false,
});

export default function (req, res) {
  apiProxy(req, res, (result) => {
    if (result instanceof Error) {
      throw result;
    }

    throw new Error(
      `Request '${req.url}' is not proxied! We should never reach here!`
    );
  });
}

export const config = {
  api: {
    externalResolver: true,
    bodyParser: false,
  },
};

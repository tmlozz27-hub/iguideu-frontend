import "dotenv/config";
import express from "express";
import paymentsStub from "./src/routes/payments.stub.js";
import paymentsRouter from "./src/routes/payments.routes.js";

const app = express();
const PORT = Number(process.env.PORT || 4020);
const HOST = "127.0.0.1";
const useStripe = (process.env.PAYMENTS_PROVIDER || "stub") === "stripe";

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    provider: useStripe ? "stripe" : "stub",
    t: Date.now(),
    port: PORT,
  });
});

app.use("/api/payments", useStripe ? paymentsRouter : paymentsStub);

app.listen(PORT, HOST, () => {
  console.log(`✅ Express ON http://${HOST}:${PORT} (provider=${useStripe ? "stripe" : "stub"}) PID=${process.pid}`);
});

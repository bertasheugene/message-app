import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import messageRoutes from "./routes/messages";
import { initDatabase } from "./config/database";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "1mb" }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

app.use("/api", messageRoutes);

app.get("/check", (req, res) => {
  res.status(200).json({ message: "OK" });
});

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.status(500).json({ error: "Something wrong" });
  }
);

const startServer = async () => {
  try {
    await initDatabase();
    app.listen(PORT, () => {
      console.log(`Server: success`);
      console.log(`Port: ${PORT}`);
    });
  } catch (error) {
    console.error("Failed:", error);
    process.exit(1);
  }
};

startServer();

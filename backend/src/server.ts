import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import patientRouter from "./routes/patient.route.js";
import authRouter from "./routes/auth.route.js";
import morgan from "morgan";
import helmet from "helmet";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); 
// logger
app.use(morgan("dev"));
// security
app.use(helmet());
const PORT: string | number = process.env.PORT || 3000;

app.use("/api/patients", patientRouter); //handles patient API requests
app.use("/api/auth", authRouter)
// health check
app.get('/healthz', (req, res) => res.sendStatus(200));

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

export default app;

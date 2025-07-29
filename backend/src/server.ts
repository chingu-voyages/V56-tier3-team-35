import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import patientRouter from "./routes/patient.route.js";
import authRouter from "./routes/auth.route.js";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser()); 

const PORT: string | number = process.env.PORT || 3000;

app.use("/api/patients", patientRouter); //handles patient API requests
app.use("/api/auth", authRouter)

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

export default app;

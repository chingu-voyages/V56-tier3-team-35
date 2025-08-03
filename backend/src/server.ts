import express, { Application } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import patientRouter from "./routes/patient.route.js";
import authRouter  from './routes/auth.route.js'
import { testConn } from "./config/supabaseClient.js";
import helmet from "helmet";
import { corsOptions } from "./config/cors.config.js";
import morgan from "morgan";

const app: Application = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(helmet()); // Adds security headers
app.use(morgan("dev"));

const PORT: string | number = process.env.PORT || 3000;

//test supabase connection
testConn()

app.use("/api/patients", patientRouter); //handles patient API requests
app.use('/api/auth', authRouter)

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

export default app;
 
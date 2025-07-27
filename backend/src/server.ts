import express, { Application } from "express";
import cors from "cors";
import patientRouter from "./routes/patient.route.js";
import morgan from "morgan";
import { testConn } from "./config/supabaseClient.js";
const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

const PORT: string | number = process.env.PORT || 3000;

//test supabase connection
testConn()

app.use("/api/patients", patientRouter); //handles patient API requests
app.use('/', (req, res) => res.send('Hello from the backend!'));

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

export default app;
 
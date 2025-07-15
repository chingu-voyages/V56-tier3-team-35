import express, { Application } from "express";
import cors from "cors";
import patientRouter from "./routes/patient.route.js";

const app: Application = express();

app.use(cors());
app.use(express.json());

const PORT: string | number = process.env.PORT || 3000;

app.use("/api/patients", patientRouter);  //handles patient API requests 

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

export default app;

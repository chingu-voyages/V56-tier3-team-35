import { Router } from "express";
import { signup, login, logout, refresh, getDashboard} from "../controllers/auth.controller";
import { authToken } from "../middleware/auth.middleware";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh", refresh);
router.get("/dash", authToken, getDashboard);
export default router;
import express from "express";
import { login, logOut, Me, register } from "../controllers/auth.js";
import { checkAuth, verifyEmail, verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/me", checkAuth, Me);
router.post("/register", register);
router.post("/login", verifyEmail, login);
router.get("/logout", logOut);

export default router;

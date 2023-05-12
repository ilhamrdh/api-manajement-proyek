import express from "express";
import { login, logOut, register } from "../controllers/auth.js";
import { checkAuth, verifyEmail, verifyUser } from "../middleware/authUser.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", verifyEmail, login);
router.get("/logout", logOut);

export default router;

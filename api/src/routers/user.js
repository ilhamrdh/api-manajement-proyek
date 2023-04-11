import express from "express";
import { invite, verify, verifyInvite } from "../controllers/user.js";
import { checkAuth } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/verify-email", verify);
router.post("/verify-invite", verifyInvite);
router.post("/invite", checkAuth, invite);

export default router;

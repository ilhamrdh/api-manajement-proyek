import express from "express";
import { inviteUser, verify, verifyInvite } from "../controllers/user.js";
import { checkAuth } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/verify-email", verify);
router.post("/verify-invite", verifyInvite);
router.post("/invite-user", checkAuth, inviteUser);

export default router;

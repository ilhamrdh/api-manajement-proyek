import express from "express";
import {
    changeEmail,
    changePassword,
    inviteUser,
    verify,
    verifyInvite,
} from "../controllers/user.js";
import { checkAuth } from "../middleware/authUser.js";

const router = express.Router();

router.get("/verify-email", verify);
router.post("/verify-invite", verifyInvite);
router.post("/invite-user", checkAuth, inviteUser);
router.patch("/password", checkAuth, changePassword);
router.patch("/email", checkAuth, changeEmail);

export default router;

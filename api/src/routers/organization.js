import express from "express";
import { listAnggotaOrganization } from "../controllers/organization.js";
import { checkAuth } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/anggota/:id", checkAuth, listAnggotaOrganization);

export default router;

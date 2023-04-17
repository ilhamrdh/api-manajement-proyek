import express from "express";
import { anggotaOrganization } from "../controllers/organization.js";
import { checkAuth } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/anggota/:orgKey", checkAuth, anggotaOrganization);

export default router;

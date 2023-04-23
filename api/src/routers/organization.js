import express from "express";
import {
    findOrganization,
    listOrganization,
} from "../controllers/organization.js";
import { checkAuth } from "../middleware/AuthUser.js";

const router = express.Router();

router.get("/members", checkAuth, listOrganization);
router.get("/:org_key", checkAuth, findOrganization);

export default router;

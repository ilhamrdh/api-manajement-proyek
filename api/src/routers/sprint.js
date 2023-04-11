import express from "express";
import { createSprint } from "../controllers/sprint.js";
import { checkAuth } from "../middleware/AuthUser.js";

const router = express.Router();

router.post("/", checkAuth, createSprint);

export default router;

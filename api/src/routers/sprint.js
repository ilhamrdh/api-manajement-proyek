import express from "express";
import { createSprint } from "../controllers/sprint.js";
import { checkAuth } from "../middleware/authUser.js";

const router = express.Router();

router.post("/:keyProject", checkAuth, createSprint);

export default router;

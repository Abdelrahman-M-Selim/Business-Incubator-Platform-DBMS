import { Router } from "express";
import {AuthRouter} from "./auth/auth.js";
import workshopRoutes from "./workshop/workshop.js";
import projectRouter from "./projects/project.js";

const router = Router();

router.use("/auth" , AuthRouter);
router.use('/workshops', workshopRoutes);
router.use("/projects", projectRouter);

export {router as GlobalRouter};
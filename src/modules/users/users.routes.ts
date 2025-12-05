import { Router } from "express";
import { UserControllers } from "./users.controllers";

const router = Router();

router.get("/", UserControllers.retrieves);
router.get("/:userId", UserControllers.retrieve);

export const UserRouter = router;

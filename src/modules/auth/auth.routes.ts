import { Router } from "express";
import { AuthControllers } from "./auth.controllers";

const router = Router();

router.post("/signup", AuthControllers.signup);
router.post("/signin", AuthControllers.login);

export const AuthRouter = router;

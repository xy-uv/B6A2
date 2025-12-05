import { Router } from "express";
import { AuthControllers } from "./auth.controllers";

const router = Router();

router.post("/signup", AuthControllers.insert);

export const AuthRouter = router;

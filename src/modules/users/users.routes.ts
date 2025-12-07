import { Router } from "express";
import { UserControllers } from "./users.controllers";
import auth, { isOwnership } from "../../middlewares/auth";
import { ROLE } from "../auth/auth.constrain";

const router = Router();

router.get("/", auth(ROLE.admin), UserControllers.retrieves);
router.get(
  "/:userId",
  auth(ROLE.admin, ROLE.customer),
  isOwnership(),
  UserControllers.retrieve
);
router.put(
  "/:userId",
  auth(ROLE.admin, ROLE.customer),
  isOwnership(),
  UserControllers.modify
);
router.delete("/:userId", UserControllers.destroy);
export const UserRouter = router;

import { Router } from "express";
import { UserRouter } from "../modules/users/users.routes";

const router = Router();

type IModuleRoutes = { path: string; route: Router };

const modules: IModuleRoutes[] = [
  {
    path: "/users",
    route: UserRouter,
  },
];

modules.forEach((module) => router.use(module.path, module.route));

export default router;

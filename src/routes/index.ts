import { Router } from "express";
// import { UserRouter } from "../modules/users/users.routes";
import { AuthRouter } from "../modules/auth/auth.routes";

const router = Router();

type IModuleRoutes = { path: string; route: Router };

const modules: IModuleRoutes[] = [
  //   {
  //     path: "/users",
  //     route: UserRouter,
  //   },
  {
    path: "/auth",
    route: AuthRouter,
  },
];

modules.forEach((module) => router.use(module.path, module.route));

export default router;

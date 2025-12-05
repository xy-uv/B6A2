import { Router } from "express";
// import { UserRouter } from "../modules/users/users.routes";
import { AuthRouter } from "../modules/auth/auth.routes";
import { VehiclesRouter } from "../modules/vehicles/vehicles.routes";

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
  {
    path: "/vehicles",
    route: VehiclesRouter,
  },
];

modules.forEach((module) => router.use(module.path, module.route));

export default router;

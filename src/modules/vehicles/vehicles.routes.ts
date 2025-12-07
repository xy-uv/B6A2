import { Router } from "express";
import { VehiclesControllers } from "./vehicles.controllers";
import auth from "../../middlewares/auth";
import { ROLE } from "../auth/auth.constrain";

const router = Router();

router.post("/", auth(ROLE.admin), VehiclesControllers.insert);
router.get("/", VehiclesControllers.retrieves);
router.get("/:vehicleId", VehiclesControllers.retrieve);
router.put("/:vehicleId", auth(ROLE.admin), VehiclesControllers.modify);
router.delete("/:vehicleId", auth(ROLE.admin), VehiclesControllers.destroy);

export const VehiclesRouter = router;

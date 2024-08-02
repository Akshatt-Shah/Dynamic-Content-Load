import { Router } from "express";
import { AreaControlleres } from "../controlleres";
const AreaController = new AreaControlleres();
const Arearoutes = Router();

Arearoutes.post("/Area/create", AreaController.createArea);

Arearoutes.get("/Area/get", AreaController.getArea);

Arearoutes.delete(
  "/Area/delete/:id",
  AreaController.deleteArea
);

Arearoutes.put("/Area/update/:id", AreaController.updateArea);

export { Arearoutes };

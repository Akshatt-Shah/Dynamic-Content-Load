import { Router } from "express";
import { categorysequenceControlleres } from "../controlleres";
const categorysequenceController = new categorysequenceControlleres();
const areaItemroute = Router();

areaItemroute.post(
  "/areaItem/create",
  categorysequenceController.createcategorysequence
);

areaItemroute.get(
  "/areaItem/get",
  categorysequenceController.getcategorysequence
);
areaItemroute.get(
  "/areaItem/getAreaItem/:id",
  categorysequenceController.getItemArea
);

areaItemroute.delete(
  "/areaItem/delete/:id",
  categorysequenceController.deletecategorysequence
);

areaItemroute.put(
  "/areaItem/update",
  categorysequenceController.updatecategorysequence
);

export { areaItemroute };

import { Router } from "express";
import { areaItemroute } from "./area_item.routes";
import { Arearoutes } from "./area.routes";
import { Itemroutes } from "./item.routes";

const route = Router();
route.use(areaItemroute);
route.use(Arearoutes);
route.use(Itemroutes);

export { route };

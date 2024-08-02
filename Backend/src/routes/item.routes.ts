import { Router } from "express";
import { ItemControlleres } from "../controlleres";
const ItemController = new ItemControlleres();
const Itemroutes = Router();

Itemroutes.post("/Item/create", ItemController.createItem);

Itemroutes.get("/Item/get", ItemController.getItem);

Itemroutes.delete("/Item/delete/:id", ItemController.deleteItem);

Itemroutes.put("/Item/update/:id", ItemController.updateItem);

export { Itemroutes };

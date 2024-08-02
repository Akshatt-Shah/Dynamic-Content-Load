import { Request, Response } from "express";
import { Item } from "../models";
import { ItemService } from "../services";
import { IItem } from "../interfaces";
const ItemServices = new ItemService();
export class ItemControlleres {
  async createItem(req: Request, res: Response) {
    try {
      const newItem: IItem = req.body;
      const Itemdata = await ItemServices.createItem(newItem);
      res.status(201).json(Itemdata);
    } catch (error) {
      res.status(400).json({ message: error.message, status: false });
    }
  }
  async getItem(req: Request, res: Response) {
    try {
      const { page, size } = req.query;
      const Itemdata = await ItemServices.getItem(Number(page),Number(size));
      res.status(201).json(Itemdata);
    } catch (error) {
      res.status(400).json({ message: error.message, status: false });
    }
  }
  async deleteItem(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const Itemdata = await ItemServices.deleteItem(id);
      res.status(201).json(Itemdata);
    } catch (error) {
      res.status(400).json({ message: error.message, status: false });
    }
  }
  async updateItem(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data: IItem = req.body;
      const Itemdata = await ItemServices.updateItem(id, data);
      res.status(201).json(Itemdata);
    } catch (error) {
      res.status(400).json({ message: error.message, status: false });
    }
  }
}

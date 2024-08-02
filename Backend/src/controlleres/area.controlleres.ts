import { Request, Response } from "express";
import { Area } from "../models";
import { AreaService } from "../services";
import { IArea } from "../interfaces";
const AreaServices = new AreaService();
export class AreaControlleres {
  async createArea(req: Request, res: Response) {
    try {
      const newArea: IArea = req.body;
      const Areadata = await AreaServices.createArea(newArea);
      res.status(201).json(Areadata);
    } catch (error) {
      res.status(400).json({ message: error.message, status: false });
    }
  }
  async getArea(req: Request, res: Response) {
    try {
      const { page, size } = req.query;
      const Areadata = await AreaServices.getArea(Number(page),Number(size));
      res.status(201).json(Areadata);
    } catch (error) {
      res.status(400).json({ message: error.message, status: false });
    }
  }
  async deleteArea(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const Areadata = await AreaServices.deleteArea(id);
      res.status(201).json(Areadata);
    } catch (error) {
      res.status(400).json({ message: error.message, status: false });
    }
  }
  async updateArea(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data: IArea = req.body;
      const Areadata = await AreaServices.updateArea(id, data);
      res.status(201).json(Areadata);
    } catch (error) {
      res.status(400).json({ message: error.message, status: false });
    }
  }
}

import { Request, Response } from "express";
import { categorySequenceService } from "../services";
import { IAreaItem } from "../interfaces";
const categorySequenceServices = new categorySequenceService();
export class categorysequenceControlleres {
  async createcategorysequence(req: Request, res: Response) {
    try {
      const newcategorysequence: IAreaItem = req.body;
      const categorysequencedata =
        await categorySequenceServices.createcategorySequence(
          newcategorysequence
        );
      res.status(201).json(categorysequencedata);
    } catch (error) {
      res.status(400).json({ message: error.message, status: false });
    }
  }
  async getcategorysequence(req: Request, res: Response) {
    try {
      const categorysequencedata =
        await categorySequenceServices.getcategorySequence();
      res.status(201).json(categorysequencedata);
    } catch (error) {
      res.status(400).json({ message: error.message, status: false });
    }
  }
  async getItemArea(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const categorysequencedata = await categorySequenceServices.getItemArea(
        id
      );
      res.status(201).json(categorysequencedata);
    } catch (error) {
      res.status(400).json({ message: error.message, status: false });
    }
  }
  async deletecategorysequence(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const categorysequencedata =
        await categorySequenceServices.deletecategorySequence(id);
      res.status(201).json(categorysequencedata);
    } catch (error) {
      res.status(400).json({ message: error.message, status: false });
    }
  }
  async updatecategorysequence(req: Request, res: Response) {
    try {
      const data: IAreaItem = req.body;
      const categorysequencedata =
        await categorySequenceServices.updatecategorySequence(data);
      res.status(201).json(categorysequencedata);
    } catch (error) {
      res.status(400).json({ message: error.message, status: false });
    }
  }
}

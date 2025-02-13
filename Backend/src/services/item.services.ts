import { Item } from "../models";
import { IItem } from "../interfaces";
import mongoose from "mongoose";

export class ItemService {
  async createItem(Itemdata: IItem) {
    try {
      const newItem = await Item.create(Itemdata);
      return {
        message: "Item created successfully",
        status: true,
        data: newItem,
      };
    } catch (error) {
      return { message: error.message, status: false };
    }
  }
  async getItem(page?: number, size?: number) {
    try {
     
      if (page!==undefined && size!==undefined) {
        if (page <= 0) {
          page = 1;
        }
        if (size <= 1) {
          size = 1;
        }

        console.log(page, size);
        const newItem = await Item.find({ isdeleted: false })
          .skip((page - 1) * size)
          .limit(size);
        return {
          message: "Item retriewed successfully",
          status: true,
          data: newItem,
        };
      } else {
        const newItem = await Item.find({ isdeleted: false });
        return {
          message: "Item retriewed successfully",
          status: true,
          data: newItem,
        };
      }
    } catch (error) {
      return { message: error.message, status: false };
    }
  }
  async deleteItem(id: string) {
    try {
      const data = await Item.findOneAndUpdate(
        { _id: id },
        { isdeleted: true }
      );
      if (data) {
        return { message: "Item deleted successfully", status: true };
      } else {
        return { message: "Item not found", status: false };
      }
    } catch (error) {
      return { message: error.message, status: false };
    }
  }
  async updateItem(id: string, data: IItem) {
    try {
      const updatedata = await Item.findOneAndUpdate({ _id: id }, data, {
        new: true,
      });
      if (updatedata) {
        return {
          message: "Item updated successfully",
          status: true,
          data: updatedata,
        };
      } else {
        return { message: "Item not found", status: false };
      }
    } catch (error) {
      return { message: "Item Not Updated Successfully", status: false };
    }
  }
}

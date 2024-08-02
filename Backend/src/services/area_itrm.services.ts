import { Area_Item } from "../models";
import { IAreaItem } from "../interfaces";
import mongoose from "mongoose";
export class categorySequenceService {
  async createcategorySequence(areaItem: IAreaItem) {
    try {
      const catdata = await Area_Item.find({ Area: areaItem.Area });
      if (areaItem.sequence === null || areaItem.sequence === undefined) {
        areaItem.sequence = catdata.length + 1;
      }
      const newcategorySequence = await Area_Item.create(areaItem);
      return {
        message: "categorySequence created successfully",
        status: true,
        data: newcategorySequence,
      };
    } catch (error) {
      return { message: error.message, status: false };
    }
  }
  async getcategorySequence() {
    try {
      const newcategorySequence = await Area_Item.aggregate([
        {
          $lookup: {
            from: "areas",
            localField: "Area",
            foreignField: "_id",
            as: "Areadata",
          },
        },
        {
          $lookup: {
            from: "items",
            localField: "Item",
            foreignField: "_id",
            as: "Itemdata",
          },
        },
        {
          $project: {
            AreaId: { $first: ["$Areadata"] },
            ItemId: { $first: ["$Itemdata"] },
            sequence: 1,
          },
        },
      ]);
      return {
        message: "categorySequence retriewed successfully",
        status: true,
        data: newcategorySequence,
      };
    } catch (error) {
      return { message: error.message, status: false };
    }
  }
  async getItemArea(area: string) {
    try {
      const newcategorySequence = await Area_Item.aggregate([
        {
          $match: {
            Area: new mongoose.Types.ObjectId(area),
          },
        },
        {
          $lookup: {
            from: "areas",
            localField: "Area",
            foreignField: "_id",
            as: "Areadata",
          },
        },
        {
          $lookup: {
            from: "items",
            localField: "Item",
            foreignField: "_id",
            as: "Itemdata",
          },
        },
        {
          $project: {
            AreaId: { $first: ["$Areadata"] },
            ItemId: { $first: ["$Itemdata"] },
            sequence: 1,
          },
        },
      ]);
      return {
        message: "categorySequence retriewed successfully",
        status: true,
        data: newcategorySequence,
      };
    } catch (error) {
      return { message: error.message, status: false };
    }
  }
  async deletecategorySequence(id: string) {
    const session = await mongoose.startSession();
    try {
      session.startTransaction();
      const newcategorySequence = await Area_Item.findOne({ _id: id });
      if (newcategorySequence) {
        await Area_Item.deleteOne({ _id: id });
        await Area_Item.updateMany(
          {
            sequence: { $gt: newcategorySequence.sequence },
            Area: newcategorySequence.Area,
          },
          {
            $inc: { sequence: -1 },
          }
        );
        await session.commitTransaction();
        return { message: "Transaction committed successfully", status: true };
      } else {
        return { message: "CategorySequence not found", status: false };
      }
    } catch (error) {
      await session.abortTransaction();
      await session.endSession();
      return { message: error.message, status: false };
    }
  }
  async updatecategorySequence(data: IAreaItem) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      let oldSequence;
      let newSequence = data.sequence;
      const newcategorySequence = await Area_Item.findOne({
        Area: data.Area,
      }).session(session);
      //   console.log(newcategorySequence);
      oldSequence = newcategorySequence?.sequence;
      const lengthdata = await Area_Item.find({ Area: data.Area });
      if (newSequence !== undefined && newSequence > lengthdata.length) {
        session.abortTransaction();
        session.endSession();
        return {
          message: "New Sequence beyond the Boundary of the length",
          status: false,
        };
      }
      if (oldSequence !== undefined && newSequence !== undefined) {
        if (oldSequence <= newSequence) {
          console.log(data.Area);
          const s = await Area_Item.updateMany(
            {
              Area: data.Area,
              sequence: { $gt: oldSequence, $lte: newSequence },
            },
            { $inc: { sequence: -1 } },
            { session }
          );
        } else {
          const c = await Area_Item.updateMany(
            {
              sequence: { $gte: newSequence, $lt: oldSequence },
              Area: data.Area,
            },
            { $inc: { sequence: +1 } },
            { session }
          );
        }
        const sequencedata = await Area_Item.findOneAndUpdate(
          { Area: data.Area },
          { sequence: newSequence },
          { new: true, session }
        );

        await session.commitTransaction();
        session.endSession();
        return {
          message: "Area-Item Sequence updated successfully",
          data: sequencedata,
          status: true,
        };
      } else {
        await session.abortTransaction();
        session.endSession();
        return { message: "Old or New Sequence is not defined", status: false };
      }
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      return { message: error.message, status: false };
    }
  }
}

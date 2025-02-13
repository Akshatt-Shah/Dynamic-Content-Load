import { Area } from "../models";
import { IArea } from "../interfaces";
import mongoose from "mongoose";

export class AreaService {
  async createArea(Areadata: IArea) {
    try {
      const data = await Area.find();
      Areadata.sequence = data.length + 1;
      const newArea = await Area.create(Areadata);
      return {
        message: "Area created successfully",
        status: true,
        data: newArea,
      };
    } catch (error) {
      return { message: error.message, status: false };
    }
  }
  async getArea(page?: number, size?: number) {
    try {
      const totalRecords = await Area.countDocuments();
      // console.log(page,size)
      if (page && size) {
        if(page <=0 ){
          page = 1;
        }
        if(size <=1 ){
          size = 1;
        }
        const newArea = await Area.find()
          .skip((page - 1) * size)
          .limit(size)
          .sort({ sequence: 1 });
        return {
          message: "Area retriewed successfully",
          status: true,
          data: newArea,
          total:totalRecords
        };
      } else {
        const newArea = await Area.find().sort({ sequence: 1 });
        return {
          message: "Area retriewed successfully",
          status: true,
          data: newArea,
          total:totalRecords
        };
      }
    } catch (error) {
      return { message: error.message, status: false };
    }
  }
  async deleteArea(id: string) {
    const session = await mongoose.startSession();
    try {
      session.startTransaction();
      const newArea = await Area.findByIdAndDelete(id);
      if (newArea) {
        const Areasequence = await Area.updateMany(
          {
            sequence: { $gt: newArea.sequence },
          },
          {
            $inc: { sequence: -1 },
          },
          {
            session,
          }
        );
        await session.commitTransaction();
        return {
          message: "Area deleted successfully",
          status: true,
          data: newArea,
        };
      } else {
        session.abortTransaction();
        session.endSession();
        return { message: "No Area found with this id", status: false };
      }
    } catch (error) {
      session.abortTransaction();
      session.endSession();
      return { message: error.message, status: false };
    } finally {
      session.endSession();
    }
  }
  async updateArea(id: string, data: IArea) {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      // console.log("object")
      const newArea = await Area.findOne({ _id: id });
      if (newArea) {
        let oldSequence = newArea.sequence;
        let newSequence = data.sequence;
        console.log(oldSequence, newSequence);
        const lengthdata = await Area.find();
        if (newSequence !== undefined && newSequence >= lengthdata.length) {
          session.abortTransaction();
          session.endSession();
          return {
            message: "New Sequence beyond the Boundary of the length",
            status: false,
          };
        }
        if (oldSequence !== undefined && newSequence !== undefined) {
          if (oldSequence < newSequence) {
            await Area.updateMany(
              { sequence: { $gt: oldSequence, $lte: newSequence } },
              { $inc: { sequence: -1 } },
              { session }
            );
            await Area.updateOne(
              { _id: id },
              { sequence: newSequence },
              { session }
            );
            const sequencedata = await Area.findOneAndUpdate(
              { _id: id },
              { sequence: newSequence },
              { new: true, session }
            );

            await session.commitTransaction();
            session.endSession();
            return {
              message: "Area updated successfully",
              data: sequencedata,
              status: true,
            };
          } else {
            await Area.updateMany(
              { sequence: { $gte: newSequence, $lt: oldSequence } },
              { $inc: { sequence: +1 } },
              { session }
            );
            await Area.updateOne(
              { _id: id },
              { sequence: newSequence },
              { session }
            );
            const sequencedata = await Area.findOneAndUpdate(
              { _id: id },
              { sequence: newSequence },
              { new: true, session }
            );

            await session.commitTransaction();
            session.endSession();
            return {
              message: "Area updated successfully",
              data: sequencedata,
              status: true,
            };
          }
        } else {
          await session.abortTransaction();
          session.endSession();
          return {
            message: "Old or New Sequence is not defined",
            status: false,
          };
        }
      } else {
        session.abortTransaction();
        session.endSession();
        return { message: "No Area found with this id", status: false };
      }
    } catch (error) {
      return { message: error.message, status: false };
    }
  }
}

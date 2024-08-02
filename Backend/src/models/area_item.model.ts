import mongoose, { Schema } from "mongoose";
import { Item } from "./Item.model";
import { Area } from "./area.model";

const productSequenceSchema = new Schema({
  Area: { type: mongoose.Types.ObjectId, ref: Area, required: true },
  Item: { type: mongoose.Types.ObjectId, ref: Item, required: true },
  sequence: { type: Number, required: true },
});

const Area_Item = mongoose.model("Area_Item", productSequenceSchema);
export { Area_Item };

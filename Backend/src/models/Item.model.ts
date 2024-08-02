import mongoose, { Schema } from "mongoose";
import { Area } from "./area.model";

const ItemSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String },
    isdeleted: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

const Item = mongoose.model("Item", ItemSchema);
export { Item };

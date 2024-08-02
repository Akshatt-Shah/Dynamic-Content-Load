import mongoose, { Schema } from "mongoose";

const CategorySchema = new Schema(
  {
    type: {
      type: String,
      enum: {
        values: ["Item", "Banner"],
        message: "${VALUE} Does not exist on this type ",
      },
    },
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    image: { type: String },
    sequence: { type: Number, required: true },
    isdeleted: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

const Area = mongoose.model("Area", CategorySchema);
export { Area };

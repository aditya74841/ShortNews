import mongoose, { Schema } from "mongoose";

const categorySchema = new Schema(
  {
    type: {
      type: Schema.Types.ObjectId,
      ref: "Type",
      required: [true, "Type Name is Required"],
      default: null,
    },
    name: {
      type: String,
      required: [true, "Category Name is Required"],
      default: "",
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

export const Category = mongoose.model("Category", categorySchema);

import mongoose, { Schema } from "mongoose";

const typeSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Type Name is Required"],
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

export const Type = mongoose.model("Type", typeSchema);

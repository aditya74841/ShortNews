import mongoose, { Schema } from "mongoose";

const newsSchema = new Schema(
  {
    type: {
      type: Schema.Types.ObjectId,
      ref: "Type",
      required: [true, "Type  is Required"],
      default: null,
    },
    image: {
      type: {
        url: String,
        localPath: String,
      },
      default: {
        url: `https://via.placeholder.com/200x200.png`,
        localPath: "",
      },
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category  is Required"],
      default: null,
    },
    heading: {
      type: String,
      required: [true, "Heading is Required"],
      default: "",
    },
    description: {
      type: String,
      required: [true, "Description  is Required"],
      default: "",
    },
    isEdited: {
      type: Boolean,
      default: false,
    },
    link: {
      type: String,
      default: "",
    },
    linkTitle: {
      type: String,
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

export const News = mongoose.model("News", newsSchema);

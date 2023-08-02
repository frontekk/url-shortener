import mongoose, { mongo } from "mongoose";

const urlSchema = mongoose.Schema(
  {
    urlString: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Url = mongoose.model("Url", urlSchema);

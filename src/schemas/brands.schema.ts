
import mongoose from "mongoose";

export const brandsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"
  },
  image: {
    img_url: {type: String},
    img_id: {type: String},
   }
}, {timestamps: true , toJSON: { virtuals: true }  , toObject: { virtuals: true } });

brandsSchema.virtual("categoryName", {
  ref: "Category",
  localField: "category_id",
  foreignField: "_id",
});

const Brand = mongoose.models?.Brand || mongoose.model("Brand", brandsSchema);

export default Brand; 
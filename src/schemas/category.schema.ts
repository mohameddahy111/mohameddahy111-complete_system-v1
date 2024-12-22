import mongoose from "mongoose";

export const categorySchema = new mongoose.Schema({
 title: {
  type: String,
  required: true,
  unique: true
 },
 description: {
  type: String
 },
 image: {
    img_url: {type: String},
    img_id: {type: String},
   }
} , {timestamps: true , toJSON: { virtuals: true }, toObject: { virtuals: true }});

const Category = mongoose.models?.Category || mongoose.model("Category", categorySchema);

export default Category;

import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    link: { type: String, },
    isRead: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    role:{type:[String]},
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Notifications =
  mongoose.models.Notifications ||
  mongoose.model("Notifications", notificationSchema);

export default Notifications;

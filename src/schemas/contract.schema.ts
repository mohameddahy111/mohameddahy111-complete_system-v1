import mongoose from "mongoose";

const contaractSchema = new mongoose.Schema(
  {
    employee: { type: mongoose.Types.ObjectId, ref: "Employee" },
    end_date: { type: String, required: true },
    start_date: { type: String, required: true },
    salary: { type: Number, required: true },
    holidays: { type: Number, required: true },
    created_by: { type: String, required: true },
    _isActive: { type: Boolean, default: true },
    notes: { type: String }
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

contaractSchema.virtual("employee_details", {
  ref: "Employee",
  localField: "employee",
  foreignField: "_id"
});
contaractSchema.pre("find", async function () {
  console.log(this);

  // const lastDate = new Date(this.start_date).getTime()
  // const toDay = new Date().getTime()
  // if (toDay>lastDate) {
  //   this._isActive = false
  // }
});

const Contract =
  mongoose.models.Contract || mongoose.model("Contract", contaractSchema);

export default Contract;

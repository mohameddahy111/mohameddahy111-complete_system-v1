import mongoose from "mongoose";

const employeesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      minlength: 8,
      maxlength: 20
    },
    branch: { type: String, required: true },
    department: { type: String, required: true },
    phone: { type: String, required: true, length: 11, unique: true },
    age: { type: String, required: true },
    birthday: { type: String, required: true },
    position: {
      type: String,
      required: true,
      enum: ["manager", "admin", "employee", "supervisor", "head manager", "hr"]
    },
    last_active: { type: String },
    start_date: { type: String, required: true },
    shift_time: { type: String, required: true },
    insurance: { type: Boolean, default: false },
    insurance_number: { type: String,},
    _isAdmin: { type: Boolean, default: false },
    _isBacked: { type: Boolean, default: false },

    // secondary_Info:{}
  },
  { timestamps: true  , toJSON: { virtuals: true } , toObject: { virtuals: true } }
);
// AdminSchema.pre("save", function () {
//     this.password =  bcryptjs.hashSync(this?.password, 10);
// });
// AdminSchema.pre("findOneAndUpdate", function () {
//   if (this._update.password) {
//     this._update.password = bcrypt.hashSync(this._update.password, 10);
//   }
// });

employeesSchema.virtual('all_contract' , {
  ref: 'Contract',
  localField: '_id',
  foreignField: 'employee',
})

const Employee =
  mongoose.models.Employee || mongoose.model("Employee", employeesSchema);

export default Employee;

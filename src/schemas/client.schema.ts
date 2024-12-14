import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  verfiy_email: {
    type: Boolean,
    default: false
  },
} , {timestamps: true});

clientSchema.pre("save", async function () {
    this.password =  bcryptjs.hashSync(this.password, 10);

});
clientSchema.pre("findOneAndUpdate", async function () {
//   if (this._update.password) {
//     this._update.password = bcryptjs.hashSync(this._update.password, 10);
//   }
console.log(this)
});
  
const Client = mongoose.models.Client || mongoose.model("Client", clientSchema);

export default Client;
import mongoose from "mongoose";

const CompanySchema = new mongoose.Schema({
 company_name: { type: String, required: true },
 company_address: { type: String, required: true },
 company_phone: { type: String, required: true },
 company_email: { type: String, required: true },
 company_website: { type: String, },
 company_activity: { type: String, required: true },
 company_logo: {
  logo_url: { type: String, required: true },
  logo_id: { type: String, required: true }
 },
 company_google_location: { type: String,  },
 company_description: { type: String, required: true },
 company_title: { type: String, required: true }
},{timestamps: true});

const Company =mongoose.models.Company || mongoose.model("Company", CompanySchema);

export default Company;
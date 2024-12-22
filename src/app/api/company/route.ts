import Company from "@/schemas/company.schema";
import { dbContact } from "@/utils/connects/db.connect";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
 dbContact(process.env.MONGODB_PRODUCT as string);
 const data = await req.json();
 const isExist = await Company.findOne({ company_name: data.company_name });
 if (isExist)
  return NextResponse.json({ message: "Company already exist"},{status: 404});
 await Company.insertMany(data);
 return NextResponse.json({
  message: "Company created successfully",
  
 } ,{status: 201});
}

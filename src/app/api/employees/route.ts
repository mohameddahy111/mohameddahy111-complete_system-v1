import Employee from "@/schemas/employees.schema";
import { dbContact } from "@/utils/connects/db.connect";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
      dbContact(process.env.MONGODB_PRODUCT as string);
    
  const data = await req.json();
  const isExist = await Employee.findOne({ phone: data?.basic_Info?.phone });
  if (isExist) {
    return NextResponse.json(
      { message: "Phone is already exist" },
      { status: 400 }
    );
  }
  await Employee.insertMany({...data.basic_Info})
  return NextResponse.json(
    { message: "Employee created successfully" },
    { status: 201 }
  );
}

export async function PUT(request: NextRequest) {
  
  const data = await request.json();
  const employee = await Employee.findById(data.basic_Info._id);
  if (!employee) {
    return NextResponse.json({ message: "Employee not found" }, { status: 404 });
  }
  if (employee.phone !== data.basic_Info.phone) {
    const findPhone = await Employee.findOne({ phone: data.basic_Info.phone });
    if (findPhone) {
      return NextResponse.json({ message: "Phone is already exist" }, { status: 400 });
    }
  }
  await Employee.findByIdAndUpdate(data.basic_Info._id, { ...data.basic_Info });
  return NextResponse.json(
    { message: "Employee updated successfully" },
    { status: 200 }
  );
}

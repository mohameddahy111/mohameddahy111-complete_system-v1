import Client from "@/schemas/client.schema";
import { dbContact } from "@/utils/connects/db.connect";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import Admin from "@/schemas/employees.schema";

export async function POST(req: NextRequest) {
  dbContact(process.env.MONGODB_PRODUCT as string);
  const { phone, password } = await req.json();
  const isAdmin = await Admin.findOne({ phone });
  // --------------------- Admin case ---------------------
  if (isAdmin) {
    if (!isAdmin.password) {
      return NextResponse.json({ message: `welcome ${isAdmin.name}` }, {
        status: 202
      });
      
    }
    const isPasswordMatch = bcryptjs.compareSync(password, isAdmin.password);
    if (!isPasswordMatch)
      return NextResponse.json(
        { message: " Password is invalid" },
        { status: 400 }
      );
    const token = jwt.sign(
      { adminId: isAdmin._id, admin_position: isAdmin.position },
      process.env.JWT_SECRET as string
    );
    (await cookies()).set("admin_token", token, { maxAge: 24 * 60 * 60 });
    await Admin.findOneAndUpdate(
      { phone },
      { last_active: new Date().toISOString() }
    );
    return NextResponse.json(
      { message: "Sign in successfully" , isAdmin: true },
      { status: 200 }
    );
  } else {
    // --------------------- Client case ---------------------
    const client = await Client.findOne({ phone });
    if (!client)
      return NextResponse.json(
        { message: "Email is invalid" },
        { status: 400 }
      );
    const isPasswordMatch = bcryptjs.compareSync(password, client.password);
    if (!isPasswordMatch)
      return NextResponse.json(
        { message: " Password is invalid" },
        { status: 400 }
      );
    const token = jwt.sign(
      { id: client._id },
      process.env.JWT_SECRET as string
    );
    if (!token)
      return NextResponse.json({ message: "Sign in failed" }, { status: 400 });
    (await cookies()).set("client_token", token, { maxAge: 24 * 60 * 60 });
    return NextResponse.json(
      { message: "Sign in successfully" },
      { status: 200 }
    );
  }
}

import Notifications from "@/schemas/notifications.schema";
import { dbContact } from "@/utils/connects/db.connect";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
 dbContact(process.env.MONGODB_PRODUCT as string);
 const { role } = await req.json();
 const list = await Notifications.find({ role, isRead: false });
 return NextResponse.json(list);
}
export async function PUT(req: NextRequest) {
 dbContact(process.env.MONGODB_PRODUCT as string);
 const { id } = await req.json();
const link= await Notifications.findOneAndUpdate({ _id: id }, { isRead: true } , {new: true});
 return NextResponse.json(
  { message: "Notification read successfully" , link: link?.link },
  { status: 200 }
 );
}

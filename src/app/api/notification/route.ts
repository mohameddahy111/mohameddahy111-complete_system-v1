import Notifications from "@/schemas/notifications.schema";
import { dbContact } from "@/utils/connects/db.connect";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req :NextRequest) {
    dbContact(process.env.MONGODB_PRODUCT as string);
    const {role} = await req.json();
    // const notifications = await Notifications.find({});
    // const list  = notifications.filter((ele)=>{
    //     if(ele.role.includes(role)){
    //         return ele;
    //     }
    // });
    const list = await Notifications.find({role});
    return NextResponse.json(list);
}
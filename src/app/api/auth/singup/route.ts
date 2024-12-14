import Client from "@/schemas/client.schema";
import { dbContact } from "@/utils/connects/db.connect";
import { NextRequest, NextResponse } from "next/server";

export  async function POST(req:NextRequest) {
    dbContact(process.env.MONGODB_PRODUCT as string);
    const { name, email, password, phone } = await req.json();
    const isExist = await Client.findOne().or([
        {email: email },{ phone: phone}
    ])
    if(isExist) return NextResponse.json({message: "Email or phone already exist"}, {status: 400})
    const client = new Client({
        name,
        email,
        password,
        phone
    })
    await client.save()
  
  return  NextResponse.json({message: "Sign up successfully"}, {status: 201})

}

// export async function PUT(req:NextRequest) {
//   dbContact(process.env.MONGODB_PRODUCT as string);
//   const client = await Client.findOneAndUpdate({email:'moq@moa.com'} , {name:"ali"})
//   return NextResponse.json(client)
  
// }
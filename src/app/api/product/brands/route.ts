import Brand from "@/schemas/brands.schema";
import { dbContact } from "@/utils/connects/db.connect";
import { NextResponse } from "next/server";

export async function GET(){
    dbContact(process.env.MONGODB_PRODUCT as string);
    const brands = await Brand.find().populate({
        path: "categoryName",
        select: ["title", "id"]
    });
    return NextResponse.json(brands);

}
export async function POST(req: Request){
    dbContact(process.env.MONGODB_PRODUCT as string);
    const data = await req.json();
    const isExist = await Brand.findOne({title: data.title});
    if(isExist){
        return NextResponse.json({message: "Brand already exist"}, {status: 400});
    }
    const newCategory = new Brand(data);
    await newCategory.save();
    return NextResponse.json({message: "Brand created successfully"} , {status: 201});
}

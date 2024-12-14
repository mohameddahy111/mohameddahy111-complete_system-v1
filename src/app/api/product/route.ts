import Product from "@/schemas/product.schema";
import { dbContact } from "@/utils/connects/db.connect";
import { NextRequest, NextResponse } from "next/server";

export async function POST(res: NextRequest) {
 dbContact(process.env.MONGODB_PRODUCT as string);
 const data = await res.json();
 const isExist = await Product.findOne({ name: data.name });
 if (isExist)
  return NextResponse.json({ message: "Product already exist"} , {status: 400 });
 const product = await Product.insertMany(data);
 return NextResponse.json({
  message: "Product created successfully",
  
  data: product
 },{ status: 201});
}


export async function GET() {
    const products = await Product.find();
    return NextResponse.json(products);
}
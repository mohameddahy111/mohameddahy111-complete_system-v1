import Product from "@/schemas/product.schema";
import { dbContact } from "@/utils/connects/db.connect";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";

export async function POST(res: NextRequest) {
 dbContact(process.env.MONGODB_PRODUCT as string);
 const data = await res.json();
 const slug = slugify(data.name , "_").toLowerCase() ;
 const isExist = await Product.findOne().or([{name: data.name},{slug:slug}]);
 if (isExist)
  return NextResponse.json(
   { message: "Product already exist" },
   { status: 400 }
  );
 const product = await Product.insertMany({...data,slug:slug});
 return NextResponse.json(
  {
   message: "Product created successfully",
   data: product
  },
  { status: 201 }
 );
}

export async function GET() {
 dbContact(process.env.MONGODB_PRODUCT as string);
 const products = await Product.find()
  .populate("categoryId", "title")
  .populate("brandId", "title");
 return NextResponse.json(products);
}

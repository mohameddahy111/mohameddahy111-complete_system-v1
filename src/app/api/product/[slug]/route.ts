import Product from "@/schemas/product.schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
 req: NextRequest,
 { params }: { params: Promise<{ slug: string }> }
) {
 const slug = (await params).slug;
 const product = await Product.findOne({ slug: slug })
  .populate("categoryId", "title")
  .populate("brandId", "title");
 return NextResponse.json( product );
}

import Category from "@/schemas/category.schema";
import { dbContact } from "@/utils/connects/db.connect";
import { NextResponse } from "next/server";


export async function GET(){
    dbContact(process.env.MONGODB_PRODUCT as string);
    const categories = await Category.find();
    return NextResponse.json(categories);

}
export async function POST(req: Request){
    dbContact(process.env.MONGODB_PRODUCT as string);
    const data = await req.json();
    const isExist = await Category.findOne({title: data.title});
    if(isExist){
        return NextResponse.json({message: "Category already exist"}, {status: 400});
    }
    const newCategory = new Category(data);
    await newCategory.save();
    return NextResponse.json({message: "Category created successfully"} , {status: 201});
}
export async function PUT(req: Request){
    dbContact(process.env.MONGODB_PRODUCT as string);
    const data = await req.json();
    const isExist = await Category.findOne({name: data.name});
    if(!isExist){
        return NextResponse.json({message: "Category not found"}, {status: 400});
    }
   await Category.findOneAndUpdate({name: data.name}, data, {new: true});
    return NextResponse.json({message: "Category updated successfully"} , {status: 201});
}
export async function DELETE(req: Request){
    dbContact(process.env.MONGODB_PRODUCT as string);
    const data = await req.json();
    const isExist = await Category.findOne({name: data.name});
    if(!isExist){
        return NextResponse.json({message: "Category not found"}, {status: 400});
    }
   await Category.findOneAndDelete({name: data.name});
    return NextResponse.json({message: "Category deleted successfully"} , {status: 201});
}
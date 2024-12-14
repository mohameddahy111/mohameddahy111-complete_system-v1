"use server";

import Employee from "@/schemas/employees.schema";
import { redirect } from "next/navigation";
import bcryptjs from "bcryptjs";
import { dbContact } from "@/utils/connects/db.connect";
import Contract from "@/schemas/contract.schema";
import Notifications from "@/schemas/notifications.schema";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { UTApi } from "uploadthing/server";


export const AdminRedirect = async () => {
  redirect("/auth/login/create_password");
};
export async function createPassword({
  phone,
  password
}: {
  phone: string;
  password: string;
}) {
  dbContact(process.env.MONGODB_PRODUCT as string);
  const hashPassword = bcryptjs.hashSync(password, 10);
  const admin = await Employee.findOneAndUpdate(
    { phone },
    { password: hashPassword }
  );
  if (!admin) {
    return {
      message: "Admin not found",
      status: 400
    };
  }
  redirect("/auth/login");
}

export async function getEmployeeById(id: string) {
  dbContact(process.env.MONGODB_PRODUCT as string);
  const active_Contract = await Contract.findOne({
    employee: id,
    _isActive: true
  }).populate([
    {
      path: "employee_details",
      select: { name: 1, _id: 1 }
    }
  ]);
  if (active_Contract) {
    const today = new Date().getTime();
    const endDay = new Date(active_Contract.end_date).getTime();
    if (today > endDay) {
      await Contract.findByIdAndUpdate(
        active_Contract._id,
        { _isActive: false },
        { new: true }
      );
    } else if (today - endDay < 1000 * 60 * 60 * 24 * 7) {
      const isExits = await Notifications.findOne({
        title: `Employee ${active_Contract.employee_details[0].name} contract`
      });
      if (!isExits) {
        await Notifications.insertMany({
          title: `Employee ${active_Contract.employee_details[0].name} contract`,
          description: `Your contract with ${active_Contract.employee_details[0].name} is overdue`,
          link: `/dashboard/employees/${active_Contract.employee_details._id}/profile`,
          role: ["hr", "head manager"]
        });
      }
    }
  }
    const employee = await Employee.findOne({ _id: id })
      .populate([
        {
          path: "all_contract"
        }
      ])
      .select({ password: 0 });
    if (!employee) {
      return {
        message: "Employee not found",
        status: 400
      };
    }
    return JSON.parse(JSON.stringify(employee));
  
}

//--------------------- Create contract  ---------------------//
export async function createContract(data: any) {
  dbContact(process.env.MONGODB_PRODUCT as string);
  const { employee, created_id } = data;
  const admin = await Employee.findById(created_id);
  if (!admin) {
    return {
      message: "Admin not found",
      status: 400
    };
  }
  data.created_by = admin.name;
  if (data._isActive) {
    const isActive = await Contract.findOne({ employee, _isActive: 1 });
    if (isActive) {
      return {
        message: "This Employee Has an active contract",
        status: 400
      };
    }
  }
  await Contract.insertMany({ ...data });
  return {
    message: "Contract created successfully",
    status: 201
  };
}
//--------------------- get Admin promit  ---------------------//
export async function getAdminPosition() {
  const adminCookie = (await cookies()).get("admin_token")?.value;
  const token = jwt.verify(
    adminCookie as string,
    process.env.JWT_SECRET as string,
    (err, res) => {
      if (err) {
       redirect("/auth/login");
      }
      return res;
    }
  );
  return token;
}
export async function deleteImageApi(key: string) {
  const utapi = new UTApi()
  const res = await utapi.deleteFiles(key);
  return { success: res? res.success : false };
}
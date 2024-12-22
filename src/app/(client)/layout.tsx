import * as React from "react";
import { getCompany } from "../actions";
import Clientbar from "@/components/client/client-bar";

export interface IClientLayoutProps {
 children: React.ReactNode;
}

export default async function ClientLayout({ children }: IClientLayoutProps) {
 const data = await getCompany();

 return (
   <Clientbar comanyData={data} children={children} />
 );
}

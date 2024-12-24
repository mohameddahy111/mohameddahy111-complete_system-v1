import * as React from "react";
import { getCompany } from "../actions";
import Clientbar from "@/components/client/client-bar";
import CartDailog from "@/components/client/cart/cart-dailog";
import { Box } from "@mui/material";
import { CartStoreProvider } from "../context/CartSrore";

export interface IClientLayoutProps {
 children: React.ReactNode;
}

export default async function ClientLayout({ children }: IClientLayoutProps) {
 const data = await getCompany();

 return (
  <Box position={"relative"}>
    <CartStoreProvider>

    <Clientbar comanyData={data} children={children} />
    </CartStoreProvider>
    

  </Box>
 );
}

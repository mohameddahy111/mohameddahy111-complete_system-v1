"use client";
import AddBrand from "@/components/dashboard/product/add-brand";
import AddCategory from "@/components/dashboard/product/add-category";
import { Box, Button, ButtonGroup } from "@mui/material";
import { indigo } from "@mui/material/colors";
import { usePathname } from "next/navigation";
import * as React from "react";

export interface IProductsLayoutProps {
  children: React.ReactNode;
}

export default function ProductsLayout({ children }: IProductsLayoutProps) {
  const pathname = usePathname();
  return (
    <div>
      <Box
        width={"100%"}
        display={"flex"}
        gap={1}
        flexWrap={"wrap"}
        justifyContent={"center"}
      >
        <Button
          sx={
            pathname === "/dashboard/products"
              ? {
                  bgcolor: indigo[500],
                  color: "white"
                }
              : { borderRight: "1px solid #D9D9D9" }
          }
          LinkComponent={"a"}
          href="/dashboard/products"
        >
          All productes
        </Button>
        <Button
          sx={
            pathname === "/dashboard/products/categories"
              ? {
                  bgcolor: indigo[500],
                  color: "white"
                }
              : { borderRight: "1px solid #D9D9D9" }
          }
          LinkComponent={"a"}
          href="/dashboard/products/categories"
        >
          All Categories
        </Button>
        <Button
          sx={
            pathname === "/dashboard/products/brandes"
              ? {
                  bgcolor: indigo[500],
                  color: "white"
                }
              : { borderRight: "1px solid #D9D9D9" }
          }
          LinkComponent={"a"}
          href="/dashboard/products/brands"
        >
          All Brandes
        </Button>
        <Button
          sx={
            pathname === "/dashboard/products/add_product"
              ? {
                  bgcolor: indigo[500],
                  color: "white"
                }
              : { borderRight: "1px solid #D9D9D9" }
          }
          LinkComponent={"a"}
          href="/dashboard/products/add_product"
        >
          Add productes
        </Button>
        <AddCategory />
        <AddBrand />
      </Box>
      {children}
    </div>
  );
}

"use client";

import TablePublic from "@/components/table-container";
import { useGetData } from "@/hooks/hook";
import {
 Box,
 Skeleton,
 TableBody,
 TableCell,
 TableRow,
 Typography
} from "@mui/material";
import Image from "next/image";
import * as React from "react";

export interface IBrasndsPageProps {}

export default function BrasndsPage({}: IBrasndsPageProps) {
 const brands = useGetData("/api/product/brands");
 console.log(brands.data);
 return (
  <Box
   // bgcolor={"white"}
   className={"bg_box_gradient"}
   width={"100%"}
   p={2}
   boxShadow={2}
   borderRadius={2}
   pb={4}
   mt={5}
  >
   <Typography
    py={3}
    align="center"
    variant="h5"
    component="h5"
    fontWeight={600}
    color={"primary.main"}
   >
    All Brands
   </Typography>
   <TablePublic headers={["Image", "Title", "Description", "Actions"]}>
    <TableBody>
     {brands.loading ? (
      <TableRow>
       <TableCell align="center">
        <Skeleton variant="circular" width={40} height={40} />
       </TableCell>
       <TableCell>
        <Skeleton variant="rectangular" />
       </TableCell>
       <TableCell>
        <Skeleton variant="rectangular" />
       </TableCell>
       <TableCell>
        <Skeleton variant="rectangular" />
       </TableCell>
       <TableCell>
        <Skeleton variant="rectangular" />
       </TableCell>
       <TableCell>
        <Skeleton variant="rectangular" />
       </TableCell>
      </TableRow>
     ) : (
      <>
       {brands?.data?.map((item: any, index: number) => (
        <TableRow key={index}>
         <TableCell align="center">
          <Image src={item.image.img_url} alt="image" width={40} height={50} />
         </TableCell>
         <TableCell align="center">
          <Typography color="primary.main" fontWeight={600} variant="body1">
           {item.title}
          </Typography>
         </TableCell>
         <TableCell align="center">
          <Typography variant="caption">{item.description}</Typography>
         </TableCell>
         <TableCell></TableCell>
        </TableRow>
       ))}
      </>
     )}
    </TableBody>
   </TablePublic>
  </Box>
 );
}

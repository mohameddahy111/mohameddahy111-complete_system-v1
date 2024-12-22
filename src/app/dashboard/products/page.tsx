"use client";

import TablePublic from "@/components/table-container";
import { useGetData } from "@/hooks/hook";
import {
 Box,
 Skeleton,
 TableBody,
 TableCell,
 TableRow,
 Tooltip,
 Typography
} from "@mui/material";
import * as React from "react";

export interface IProductsPageProps {}

export default function ProductsPage(props: IProductsPageProps) {
 const { data, loading } = useGetData("/api/product");


 return (
  <Box
   mt={5}
   bgcolor={"white"}
   width={"100%"}
   display={"flex"}
   flexDirection={"column"}
   gap={4}
   p={2}
   borderRadius={3}
   boxShadow={2}
   className={"bg_box_gradient"}
  >
   <TablePublic
    headers={["Image", "Name", "Serial Number", "Category", "Brand", "Stock"]}
   >
    <TableBody>
     {loading ? (
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
       {data?.map((ele: any, index: number) => (
        <TableRow key={index}>
         <TableCell align="center">
          <img
           src={ele?.main_img?.url}
           alt={ele?.name}
           width={40}
           height={50}
          />
         </TableCell>
         <TableCell align="center">
          <Tooltip title={ele?.name}>
           <Typography
         
            maxWidth={"100%"}
            overflow={"hidden"}
            textOverflow={"ellipsis"}
            textTransform={"capitalize"}
            variant="h6"
            component="h6"
           >
            {ele?.name}
           </Typography>
          </Tooltip>
         </TableCell>
         <TableCell align="center">
          <Typography
           textTransform={"capitalize"}
           variant="body1"
           component="p"
          >
           {ele?.serial_number}
          </Typography>
         </TableCell>
         <TableCell align="center">
          <Typography
           textTransform={"capitalize"}
           variant="body1"
           component="p"
          >
           {ele?.categoryId.title}
          </Typography>
         </TableCell>
         <TableCell align="center">
          <Typography
           textTransform={"capitalize"}
           variant="body1"
           component="p"
          >
           {ele?.brandId.title}
          </Typography>
         </TableCell>
         <TableCell align="center">
          <Typography
           textTransform={"capitalize"}
           variant="body1"
           component="p"
          >
           {ele?.stock}
          </Typography>
         </TableCell>
        </TableRow>
       ))}
      </>
     )}
    </TableBody>
   </TablePublic>
  </Box>
 );
}

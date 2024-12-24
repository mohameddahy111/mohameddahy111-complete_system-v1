import { getProducts } from "@/app/actions";
import { ArrowRightOutlined } from "@mui/icons-material";
import {
 Box,
 Card,
 CardContent,
 CardMedia,
 Grid2,
 Typography
} from "@mui/material";
import * as React from "react";

export interface IPageProps {}

export default async function Page(props: IPageProps) {
 const products = await getProducts();

 return (
  <Box>
   {products ? (
    <Box p={5}>
     {products.length > 0 ? (
      <Grid2 container spacing={2}>
       {products.map((product: any, index: number) => (
        <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={index}>
         <Card>
          <CardContent>
           <CardMedia
            component={"img"}
            src={product?.main_img?.url}
            alt={product?.name}
            width={300}
            height={400}
           />
           <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            py={1}
           >
            <Typography variant="h6" component="h2">
             {product?.name}
            </Typography>
            <Typography variant="h6" component="h2">
             {product?.pricing_policy?.price_type === "flexible"
              ? product?.pricing_policy?.flexible[0].price
              : product?.pricing_policy?.fixed?.price}{" "}
             $
            </Typography>
           </Box>
           <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
           >
            <Typography
             flexWrap={"wrap"}
             variant="body1"
             color="text.secondary"
           
            >
             {product?.description.split(" ").slice(0, 6).join(" ")+ ' ...'}
            </Typography>
            <Typography
             sx={{ display: "flex", alignItems: "center" }}
             component={"a"}
             href={`/shop/${product?.slug}`}
             variant="body1"
             color="secondary"
            >
             More.. <ArrowRightOutlined />
            </Typography>
           </Box>
          </CardContent>
         </Card>
        </Grid2>
       ))}
      </Grid2>
     ) : (
      <Box
       height={"600px"}
       width={"100%"}
       display={"flex"}
       justifyContent={"center"}
       alignItems={"center"}
      >
       <Typography align={"center"} variant="h6" component="h2">
        Add Products to your shop
       </Typography>
      </Box>
     )}
    </Box>
   ) : (
    <Box
     height={"600px"}
     width={"100%"}
     display={"flex"}
     justifyContent={"center"}
     alignItems={"center"}
    >
     <Typography align={"center"} variant="h6" component="h2">
      No Products Found
     </Typography>
    </Box>
   )}
  </Box>
 );
}

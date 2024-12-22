"use client";

import LoadingPage from "@/components/loading-page";
import { useGetData } from "@/hooks/hook";
import LoadingButton from "@mui/lab/LoadingButton";
import {
 Box,
 Card,
 CardMedia,
 FormControl,
 FormControlLabel,
 FormLabel,
 Grid2,
 List,
 ListItem,
 Radio,
 RadioGroup,
 Typography,
 useTheme
} from "@mui/material";
import { green, red } from "@mui/material/colors";
import * as React from "react";

export interface IProductIdProps {
 params: Promise<{ slug: string }>;
}

export default function ProductId({ params }: IProductIdProps) {
 const theme = useTheme();
 const { slug } = React.use(params);
 const { data, loading } = useGetData(`/api/product/${slug}`);
 const [image, setImage] = React.useState<string>("");
 const [selectPrice, setSelectPrice] = React.useState<{
  price: number;
  oldPrice: number;
  offer: boolean;
  id: string;
 }>({
  price: 0,
  oldPrice: 0,
  offer: false,
  id: ""
 });
 console.log(data);
 function changeImage(url: string) {
  setImage(url);
 }
 const priceValue = (value: string) => {
  const item = data?.pricing_policy?.flexible?.find(
   (item: any) => item._id === value
  );
  if (!item.offer) {
   setSelectPrice({
    oldPrice: item.price,
    offer: item.offer,
    price: item.price,
    id: item.id
   });
  } else {
   if (item.offer_value_type === "pre") {
    setSelectPrice({
     oldPrice: item.price,
     id: item.id,

     offer: item.offer,
     price: Math.floor(item.price - (item.price * item.offer_value) / 100)
    });
   } else {
    setSelectPrice({
     oldPrice: item.price,
     id: item.id,
     offer: item.offer,
     price: item.price - item.offer_value
    });
   }
  }
 };
 return (
  <Box p={5}>
   {/* {loading ? <LoadingPage />:( */}
   <React.Suspense fallback={<LoadingPage />}>
   <Grid2 container spacing={2}>
    <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
     <Card>
      <Box
       height={"100%"}
       width={"100%"}
      >
       <img
        src={image ? image : data?.main_img?.url}
        alt={data?.name}
        width={"100%"}
        height={"100%"}
       />
      </Box>
     </Card>
     <Box
      my={2}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      gap={2}
     >
      {data?.swiper_images?.map((item: any, index: number) => (
       <Card
        key={index}
        sx={{
         width: "200px",
         height: "150",
         cursor: "pointer",
         boxShadow: 1,
         ":active": { boxShadow: 3 }
        }}
        onClick={() => {
         changeImage(item?.url);
        }}
       >
        <CardMedia
         component="img"
         height={150}
         width={200}
         image={item?.url}
         alt={item?.img_id}
        />
       </Card>
      ))}
      <Card
       sx={{
        width: "200px",
        height: "150",
        cursor: "pointer",
        boxShadow: 1,
        ":active": { boxShadow: 3 }
       }}
       onClick={() => {
        changeImage(data?.main_img?.url);
       }}
      >
       <CardMedia
        component="img"
        height={150}
        width={200}
        image={data?.main_img?.url}
        alt={data?.name}
       />
      </Card>
     </Box>
    </Grid2>
    <Grid2 size={{ xs: 12, sm: 6, lg: 5 }}>
     <List>
      <ListItem>
       <Typography
        fontWeight={700}
        color={theme.palette.primary.contrastText}
        variant="h4"
        component="h2"
        textTransform={"capitalize"}
       >
        {data?.name}
       </Typography>
      </ListItem>
      <ListItem>
       <Typography
        color={theme.palette.secondary.main}
        variant="body1"
        component="h2"
       >
        {data?.description}
       </Typography>
      </ListItem>
      <ListItem
       sx={{
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        gap: 2
       }}
      >
       <Typography
        boxShadow={1}
        p={1}
        borderRadius={4}
        bgcolor={theme.palette.secondary.dark}
        color={theme.palette.secondary.contrastText}
        variant="body1"
        component="h2"
       >
        {data?.categoryId?.title}
       </Typography>
       <Typography
        boxShadow={1}
        p={1}
        borderRadius={4}
        bgcolor={theme.palette.primary.main}
        color={theme.palette.secondary.contrastText}
        variant="body1"
        component="h2"
       >
        {data?.brandId?.title}
       </Typography>
      </ListItem>
      {data?.pricing_policy?.price_type === "flexible" ? (
       <ListItem sx={{ mt: 2 }}>
        <FormControl variant="outlined">
         <FormLabel id="demo-radio-buttons-group-label">
          Choose what suits you
         </FormLabel>
         <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
          defaultValue={data?.pricing_policy?.flexible?.[0]?.price}
          onChange={(e: any) => priceValue(e.target.value)}
         >
          {data?.pricing_policy?.flexible?.map((value: any, index: number) => (
           <Box
            key={index}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-between"}
            gap={1}
           >
            <FormControlLabel
             value={value._id}
             control={<Radio />}
             label={value.title}
             disabled={value.stock === 0}
            />
            {value.offer ? (
             <Box display={"flex"} alignItems={"center"} gap={3}>
              <Typography variant="body1" color={green[500]} fontWeight={600}>
               {value.offer_value} % save
              </Typography>
              {value.stock === 0 && (
               <Typography variant="body1" color={red[500]} fontWeight={600}>
                Out of stock
               </Typography>
              )}
             </Box>
            ) : null}
           </Box>
          ))}
         </RadioGroup>
        </FormControl>
       </ListItem>
      ) : (
       <>
        <ListItem>
         <Typography variant="h6" color={red[600]}>
          Fixed price
         </Typography>
        </ListItem>
        <ListItem>
         {data?.pricing_policy?.fixed?.offer ? (
          <Box
           display={"flex"}
           justifyContent={"start"}
           flexDirection={{ xs: "column", md: "row" }}
           alignItems={{ xs: "start", md: "center" }}
           gap={{ xs: 2, md: 6 }}
          >
           <Typography color={red[500]} sx={{ textDecoration: "line-through" }}>
            {data?.pricing_policy?.fixed?.price}
           </Typography>
           <Typography>
            {data?.pricing_policy?.fixed?.price -
             data?.pricing_policy?.fixed?.price *
              (data?.pricing_policy?.fixed?.offer_value / 100)}{" "} $
           </Typography>
          </Box>
         ) : (
          <Typography>{data?.pricing_policy?.fixed?.price}{" "}$ </Typography>
         )}
        </ListItem>
       </>
      )}
     </List>
    </Grid2>
    <Grid2 size={{ xs: 12, sm: 6, lg: 3 }}>
     {data?.pricing_policy?.price_type === "flexible" ? (
      <Card>
       <List>
        <ListItem>
         <Grid2 size={{ xs: 12 }}>
          <Typography>price </Typography>
         </Grid2>
         <Grid2 size={{ xs: 12 }}>
          {selectPrice.offer ? (
           <Box
            display={"flex"}
            justifyContent={"start"}
            alignItems={"center"}
            gap={1}
           >
            <Typography
             color={red[500]}
             sx={{ textDecoration: "line-through" }}
            >
             {selectPrice.oldPrice} $
            </Typography>
            <Typography>{selectPrice.price} $</Typography>
           </Box>
          ) : (
           <Typography>{selectPrice.oldPrice} $</Typography>
          )}
         </Grid2>
        </ListItem>
        <ListItem>
         <Grid2 size={{ xs: 12 }}>
          <Typography>Add to cart</Typography>
         </Grid2>
         <Grid2 size={{ xs: 12 }}>
          <LoadingButton variant="contained">Add to cart</LoadingButton>
         </Grid2>
        </ListItem>
       </List>
      </Card>
     ) : (
      <Card>
       <List>
        <ListItem>
         <Grid2 size={{ xs: 12 }}>
          <Typography>price </Typography>
         </Grid2>
         <Grid2 size={{ xs: 12 }}>
          {selectPrice.offer ? (
           <Box
            display={"flex"}
            justifyContent={"start"}
            alignItems={"center"}
            gap={1}
           >
           <Typography color={red[500]} sx={{ textDecoration: "line-through" }}>
            {data?.pricing_policy?.fixed?.price}
           </Typography>
           <Typography>
            {data?.pricing_policy?.fixed?.price -
             data?.pricing_policy?.fixed?.price *
              (data?.pricing_policy?.fixed?.offer_value / 100)}{" "} $
           </Typography>
           </Box>
          ) : (
           <Typography>{data?.pricing_policy?.fixed?.price} $</Typography>
          )}
         </Grid2>
        </ListItem>
        <ListItem>
         <Grid2 size={{ xs: 12 }}>
          <Typography>Add to cart</Typography>
         </Grid2>
         <Grid2 size={{ xs: 12 }}>
          <LoadingButton variant="contained">Add to cart</LoadingButton>
         </Grid2>
        </ListItem>
       </List>
      </Card>
     )}
    </Grid2>
   </Grid2>
   </React.Suspense>

   {/* )} */}
  </Box>
 );
}

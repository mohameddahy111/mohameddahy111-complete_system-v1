"use client";

import {
 ArrowDownwardOutlined,
 AttachMoneyOutlined,
 DeleteOutline,
 PaidOutlined,
 QrCode2Outlined,
 WarehouseOutlined
} from "@mui/icons-material";
import {
 Box,
 Button,
 Checkbox,
 CircularProgress,
 FormControl,
 FormControlLabel,
 FormGroup,
 FormLabel,
 Grid2,
 IconButton,
 InputAdornment,
 MenuItem,
 Radio,
 RadioGroup,
 TextField,
 Typography
} from "@mui/material";
import { indigo, red } from "@mui/material/colors";
import { useFormik } from "formik";
import * as React from "react";
import Image from "next/image";
import { UploadButton, UploadDropzone } from "@/utils/uploadthing";
import { enqueueSnackbar, useSnackbar } from "notistack";
import { deleteImageApi } from "@/app/actions";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useGetData } from "@/hooks/hook";
import { LoadingButton } from "@mui/lab";

export interface IAddProductProps {}

export interface IItem {
 titel: string;
 price: string;
 offer: boolean;
 offer_value: string;
 offer_value_type: string;
}

export default function AddProduct({}: IAddProductProps) {
 const [brandList, setBrandList] = React.useState<any>([]);
 const [lowestPrice, setLowestPrice] = React.useState<number>(0);
 const brands = useGetData("/api/product/brands");
 const categories = useGetData("/api/product/category");
 const router = useRouter();
 const formik = useFormik({
  initialValues: {
   name: "",
   price: "",
   categoryId: "",
   brandId: "",
   serial_number: "",
   description: "",
   pricing_policy: {
    purchase_price: 0,
    additionalـcosts: 0,
    profitـrate: 0,
    profitـrate_type: "pre",
    value_added_tex: 0,
    adds_consts: 0,
    price_type: "fixed",
    fixed: {
     price: "",
     offer: false,
     offer_value: "",
     offer_value_type: "pre",
     stock: 0,
     stock_min: 0
    },
    flexible: [
     {
      title: "",
      price: "",
      offer: false,
      offer_value: "",
      offer_value_type: "pre",
      stock: 0,
      stock_min: 0
     }
    ]
   },
   main_img: {
    url: "",
    img_id: ""
   },
   swiper_images: []
  },
  onSubmit: async (values) => {
    console.log(values)
   await axios
    .post("/api/product", values)
    .then((response) => {
     if (response.status === 201) {
      enqueueSnackbar(response.data.message, {
       variant: "success"
      });
      formik.resetForm();
      localStorage.removeItem("swiper_images");
      localStorage.removeItem("uploader");
      router.push("/dashboard/products");
     }
    })
    .catch((error) => {
     enqueueSnackbar(error.response.data.message, {
      variant: "error"
     });
    });
  }
 });
 React.useEffect(() => {
  const price =
   formik.values.pricing_policy.purchase_price +
   formik.values.pricing_policy.additionalـcosts +
   (formik.values.pricing_policy.profitـrate_type === "pre"
    ? (formik.values.pricing_policy.purchase_price *
       formik.values.pricing_policy.profitـrate) /
      100
    : formik.values.pricing_policy.profitـrate) +
   formik.values.pricing_policy.adds_consts;
  setLowestPrice(
   Math.ceil(
    price + (price * formik.values.pricing_policy.value_added_tex) / 100
   )
  );
 }, [formik.values.pricing_policy]);

 function addNewPrice() {
  const item = {
   titel: "",
   price: "",
   offer: false,
   offer_value: "",
   offer_value_type: "pre"
  };
  formik.setFieldValue("pricing_policy.flexible", [
   ...formik.values.pricing_policy.flexible,
   item
  ]);
 }
 React.useEffect(() => {
  if (formik.values.pricing_policy.price_type === "flexible") {
   formik.setFieldValue("pricing_policy.fixed", {
    price: "",
    offer: false,
    offer_value: ""
   });
  } else {
   formik.setFieldValue("pricing_policy.flexible", [
    {
     title: "",
     price: "",
     offer: false,
     offer_value: "",
     offer_value_type: "pre"
    }
   ]);
  }
 }, [formik.values.pricing_policy.price_type]);

 React.useEffect(() => {
  const imageFind = localStorage.getItem("uploader");
  if (imageFind) {
   formik.setFieldValue("main_img", JSON.parse(imageFind));
  }
  const swiperImages = localStorage.getItem("swiper_images");
  if (swiperImages) {
   formik.setFieldValue("swiper_images", JSON.parse(swiperImages));
  }
 }, []);
 async function deleteImage(key: string) {
  const res = await deleteImageApi(key);
  if (res?.success === true) {
   enqueueSnackbar("Image deleted successfully", {
    variant: "success"
   });
   const list = formik.values.swiper_images.filter(
    (item: any) => item.img_id != key
   );

   formik.setFieldValue("swiper_images", list);
   list.length === 0
    ? localStorage.removeItem("swiper_images")
    : localStorage.setItem("swiper_images", JSON.stringify(list));
  } else {
   enqueueSnackbar("Error while deleting image", {
    variant: "error"
   });
  }
 }
 React.useEffect(() => {
  if (brands?.data) {
   const list = brands?.data?.filter(
    (item: any) => item.category_id === formik.values.categoryId
   );
   setBrandList(list);
  }
 }, [formik.values.categoryId]);
 return (
  <form onSubmit={formik.handleSubmit}>
   <Box
    sx={{
     display: "flex",
     flexDirection: "column",
     gap: 4,
     width: "100%",
     borderRadius: 3,
     mt: 5
    }}
   >
    <Box
     // bgcolor={"white"}
     className={"bg_box_gradient"}
     width={"100%"}
     p={2}
     boxShadow={2}
     borderRadius={2}
     pb={4}
    >
     <Grid2 container spacing={2}>
      <Grid2 size={{ xs: 12 }}>
       <Typography
        color={"primary.main"}
        my={5}
        variant={"h5"}
        component={"h5"}
        fontWeight={600}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
       >
        <Image
         width={50}
         height={50}
         src={"/wired-lineal-2912-price-up-hover-pinch.gif"}
         alt={"wired-lineal-2912-price-up-in-reveal.svg"}
        />
        Product Information
       </Typography>
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
       <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <label>Product Name</label>
        <TextField
         name="name"
         placeholder="Enter Product Name"
         fullWidth
         size="small"
         onChange={formik.handleChange}
         value={formik.values.name}
         error={formik.touched.name && Boolean(formik.errors.name)}
         helperText={formik.touched.name && formik.errors.name}
         sx={{
          boxShadow: "0px 0px 2px  rgb(189, 184, 241)",
          borderRadius: 4
         }}
         slotProps={{
          input: {
           sx: { borderRadius: 4 }
          }
         }}
        />
       </Box>
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
       <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <label>Category</label>
        {categories.loading ? (
         <Box
          sx={{
           display: "flex",
           flexDirection: "column",
           gap: 2,
           justifyContent: "center",
           alignItems: "center"
          }}
         >
          <CircularProgress />
          <Typography>loading ....</Typography>
         </Box>
        ) : (
         <TextField
          name="categoryId"
          placeholder="Enter Category"
          fullWidth
          size="small"
          onChange={formik.handleChange}
          value={formik.values.categoryId}
          error={formik.touched.categoryId && Boolean(formik.errors.categoryId)}
          helperText={formik.touched.categoryId && formik.errors.categoryId}
          select
          label="Category"
          sx={{
           boxShadow: "0px 0px 2px  rgb(189, 184, 241)",
           borderRadius: 4
          }}
          slotProps={{
           input: {
            sx: { borderRadius: 4 }
           }
          }}
         >
          {categories?.data?.map((item: any, index: number) => (
           <MenuItem key={index} value={item._id}>
            {item.title}
           </MenuItem>
          ))}
         </TextField>
        )}
       </Box>
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
       <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <label>Brand</label>
        {brands.loading ? (
         <Box
          sx={{
           display: "flex",
           flexDirection: "column",
           gap: 2,
           justifyContent: "center",
           alignItems: "center"
          }}
         >
          <CircularProgress />
          <Typography>loading ....</Typography>
         </Box>
        ) : (
         <TextField
          name="brandId"
          placeholder="Enter brand"
          fullWidth
          size="small"
          onChange={formik.handleChange}
          value={formik.values.brandId}
          error={formik.touched.brandId && Boolean(formik.errors.brandId)}
          helperText={formik.touched.brandId && formik.errors.brandId}
          select
          label="Brand"
          sx={{
           boxShadow: "0px 0px 2px  rgb(189, 184, 241)",
           borderRadius: 4
          }}
          slotProps={{
           input: {
            sx: { borderRadius: 4 }
           }
          }}
         >
          {/* {brandList.length>0 ?} */}
          {brandList?.map((item: any, index: number) => (
           <MenuItem key={index} value={item._id}>
            {item.title}
           </MenuItem>
          ))}
         </TextField>
        )}
       </Box>
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
       <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <label>Serial number</label>
        <TextField
         name="serial_number"
         placeholder="Enter Serial Number"
         fullWidth
         size="small"
         onChange={formik.handleChange}
         value={formik.values.serial_number}
         error={
          formik.touched.serial_number && Boolean(formik.errors.serial_number)
         }
         helperText={
          formik.touched.serial_number && formik.errors.serial_number
         }
         slotProps={{
          input: {
           endAdornment: (
            <InputAdornment position="end">
             <QrCode2Outlined />
            </InputAdornment>
           ),
           sx: { borderRadius: 4 }
          }
         }}
         sx={{
          boxShadow: "0px 0px 2px  rgb(189, 184, 241)",
          borderRadius: 4
         }}
        />
       </Box>
      </Grid2>

      <Grid2 size={{ xs: 12 }}>
       <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <label>Description</label>
        <TextField
         name="description"
         placeholder="Enter Description"
         fullWidth
         multiline
         rows={5}
         onChange={formik.handleChange}
         value={formik.values.description}
         error={
          formik.touched.description && Boolean(formik.errors.description)
         }
         helperText={formik.touched.description && formik.errors.description}
         sx={{
          boxShadow: "0px 0px 2px  rgb(189, 184, 241)",
          borderRadius: 4
         }}
         slotProps={{
          input: {
           sx: { borderRadius: 4 }
          }
         }}
        />
       </Box>
      </Grid2>
     </Grid2>
    </Box>
    <Box
     className={"bg_box_gradient"}
     width={"100%"}
     p={2}
     boxShadow={2}
     borderRadius={2}
     pb={4}
    >
     <Typography
      my={5}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      color={"primary.main"}
      variant={"h5"}
      component={"h5"}
      align={"center"}
      fontWeight={600}
     >
      <Image
       src={"/wired-lineal-291-coin-dollar-loop-cycle.gif"}
       alt="wired-lineal-291-coin-dollar-loop-cycle"
       width={30}
       height={30}
      />
      Pricing Policy
     </Typography>
     <Grid2 container spacing={2}>
      <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
       <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <label>Purchase price</label>

        <TextField
         name="pricing_policy.purchase_price"
         placeholder="Enter Purchase price"
         fullWidth
         size="small"
         type="number"
         onChange={formik.handleChange}
         value={formik.values.pricing_policy.purchase_price}
         error={
          formik.touched.pricing_policy?.purchase_price &&
          Boolean(formik.errors.pricing_policy?.purchase_price)
         }
         helperText={
          formik.touched.pricing_policy?.purchase_price &&
          formik.errors.pricing_policy?.purchase_price
         }
         slotProps={{
          input: {
           endAdornment: (
            <InputAdornment position="end">
             <AttachMoneyOutlined />{" "}
            </InputAdornment>
           ),
           sx: { borderRadius: 4 }
          }
         }}
         sx={{
          boxShadow: "0px 0px 2px  rgb(189, 184, 241)",
          borderRadius: 4
         }}
        />
       </Box>
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
       <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <label>Additional costs</label>
        <TextField
         name="pricing_policy.additionalـcosts"
         placeholder="Enter Additional costs"
         fullWidth
         type="number"
         size="small"
         onChange={formik.handleChange}
         value={formik.values.pricing_policy.additionalـcosts}
         error={
          formik.touched.pricing_policy?.additionalـcosts &&
          Boolean(formik.errors.pricing_policy?.additionalـcosts)
         }
         helperText={
          formik.touched.pricing_policy?.additionalـcosts &&
          formik.errors.pricing_policy?.additionalـcosts
         }
         slotProps={{
          input: {
           endAdornment: (
            <InputAdornment position="end">
             <PaidOutlined />{" "}
            </InputAdornment>
           ),
           sx: { borderRadius: 4 }
          }
         }}
         sx={{
          boxShadow: "0px 0px 2px  rgb(189, 184, 241)",
          borderRadius: 4
         }}
        />
       </Box>
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
       <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <label>Profit rate</label>
        <TextField
         name="pricing_policy.profitـrate"
         type="number"
         placeholder="Enter Profit rate"
         fullWidth
         size="small"
         slotProps={{
          input: {
           endAdornment: (
            <InputAdornment position="end">
             <TextField
              size={"small"}
              value={formik.values.pricing_policy.profitـrate_type}
              variant={"standard"}
              onChange={formik.handleChange}
              name={"pricing_policy.profitـrate_type"}
              select
             >
              <MenuItem value={"pre"}>%</MenuItem>
              <MenuItem value={"num"}>$</MenuItem>
             </TextField>
            </InputAdornment>
           ),
           sx: { borderRadius: 4 }
          }
         }}
         sx={{
          boxShadow: "0px 0px 2px  rgb(189, 184, 241)",
          borderRadius: 4
         }}
         onChange={formik.handleChange}
         value={formik.values.pricing_policy.profitـrate}
         error={
          formik.touched.pricing_policy?.profitـrate &&
          Boolean(formik.errors.pricing_policy?.profitـrate)
         }
         helperText={
          formik.touched.pricing_policy?.profitـrate &&
          formik.errors.pricing_policy?.profitـrate
         }
        />
       </Box>
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
       <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <label>Adds costs </label>
        <TextField
         name="pricing_policy.adds_consts"
         placeholder="Enter Adds costs"
         fullWidth
         type="number"
         size="small"
         slotProps={{
          input: {
           sx: { borderRadius: 4 }
          }
         }}
         sx={{
          boxShadow: "0px 0px 2px  rgb(189, 184, 241)",
          borderRadius: 4
         }}
         onChange={formik.handleChange}
         value={formik.values.pricing_policy.adds_consts}
         error={
          formik.touched.pricing_policy?.adds_consts &&
          Boolean(formik.errors.pricing_policy?.adds_consts)
         }
         helperText={
          formik.touched.pricing_policy?.adds_consts &&
          formik.errors.pricing_policy?.adds_consts
         }
        />
       </Box>
      </Grid2>{" "}
      <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
       <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <label>Value Added Tax </label>
        <TextField
         name="pricing_policy.value_added_tex"
         placeholder="Enter Value Added Tax"
         fullWidth
         type="number"
         size="small"
         slotProps={{
          input: {
           endAdornment: <InputAdornment position="end">%</InputAdornment>,

           sx: { borderRadius: 4 }
          }
         }}
         sx={{
          boxShadow: "0px 0px 2px  rgb(189, 184, 241)",
          borderRadius: 4
         }}
         onChange={formik.handleChange}
         value={formik.values.pricing_policy.value_added_tex}
         error={
          formik.touched.pricing_policy?.value_added_tex &&
          Boolean(formik.errors.pricing_policy?.value_added_tex)
         }
         helperText={
          formik.touched.pricing_policy?.value_added_tex &&
          formik.errors.pricing_policy?.value_added_tex
         }
        />
       </Box>
      </Grid2>{" "}
      <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
       <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <label>Lowest price</label>
        <Typography>{lowestPrice} $</Typography>
       </Box>
      </Grid2>
      <Grid2 size={{ xs: 12 }}>
       <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <FormControl>
         <FormLabel id="demo-radio-buttons-group-label">
          <Typography color={"primary.main"} fontWeight={600}>
           Price Type
          </Typography>
         </FormLabel>
         <RadioGroup
          row
          aria-labelledby="demo-radio-buttons-group-label"
          //  defaultValue={'flexible'}
          name="pricing_policy.price_type"
          onChange={formik.handleChange}
          value={formik.values.pricing_policy.price_type}
         >
          <FormControlLabel
           value="fixed"
           control={<Radio />}
           label="Fixed price"
          />
          <FormControlLabel
           value="flexible"
           control={<Radio />}
           label="Flexible price"
          />
         </RadioGroup>
        </FormControl>
        {formik.values.pricing_policy.price_type === "fixed" ? (
         <Box className={"move_box"}>
          <Grid2 container spacing={2} alignItems={"center"}>
           <Grid2 size={{ xs: 12, md: 6, lg: 6 }}>
            <Box
             sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2
             }}
            >
             <label>Fixed Price</label>
             <Box
              display={"flex"}
              justifyContent={"start"}
              flexDirection={{ xs: "column", md: "row" }}
              alignItems={{ xs: "start", md: "center" }}
              gap={{ xs: 2, md: 6, lg: 6 }}
             >
              <TextField
               type="number"
               name="pricing_policy.fixed.price"
               placeholder="Enter Price "
               size="small"
               onChange={formik.handleChange}
               value={formik.values.pricing_policy.fixed?.price}
               error={
                formik.touched.pricing_policy?.fixed?.price &&
                Boolean(formik.errors.pricing_policy?.fixed?.price)
               }
               helperText={
                formik.touched.pricing_policy?.fixed?.price &&
                formik.errors.pricing_policy?.fixed?.price
               }
               slotProps={{
                input: {
                 endAdornment: (
                  <InputAdornment position="end">
                   <PaidOutlined />{" "}
                  </InputAdornment>
                 ),
                 sx: { borderRadius: 4 }
                },
                htmlInput: {
                 min: 0
                }
               }}
               sx={{
                boxShadow: "0px 0px 2px  rgb(189, 184, 241)",
                borderRadius: 4
               }}
              />

              <Box>
               <FormGroup>
                <FormControlLabel
                 value={formik.values.pricing_policy.fixed.offer}
                 name={"pricing_policy.fixed.offer"}
                 control={
                  <Checkbox
                   onChange={formik.handleChange}
                   name={"pricing_policy.fixed.offer"}
                   checked={formik.values.pricing_policy.fixed.offer}
                  />
                 }
                 label={"Offer"}
                />
               </FormGroup>
              </Box>
              {formik.values.pricing_policy.fixed.offer ? (
               <Box>
                <TextField
                 type="number"
                 name="pricing_policy.fixed.offer_value"
                 placeholder="Enter Offer Value"
                 size="small"
                 onChange={formik.handleChange}
                 value={formik.values.pricing_policy.fixed.offer_value}
                 error={
                  formik.touched.pricing_policy?.fixed?.offer_value &&
                  Boolean(formik.errors.pricing_policy?.fixed?.offer_value)
                 }
                 helperText={
                  formik.touched.pricing_policy?.fixed?.offer_value &&
                  formik.errors.pricing_policy?.fixed?.offer_value
                 }
                 slotProps={{
                  input: {
                   endAdornment: (
                    <InputAdornment position="end">
                     <TextField
                      size={"small"}
                      value={
                       formik.values.pricing_policy.fixed.offer_value_type
                      }
                      variant={"standard"}
                      onChange={formik.handleChange}
                      name={`pricing_policy.fixed.offer_value_type`}
                      select
                     >
                      <MenuItem value={"pre"}>%</MenuItem>
                      <MenuItem value={"num"}>$</MenuItem>
                     </TextField>
                    </InputAdornment>
                   ),
                   sx: { borderRadius: 4 }
                  },
                  htmlInput: {
                   min: 0
                  }
                 }}
                 sx={{
                  boxShadow: "0px 0px 2px  rgb(189, 184, 241)",
                  borderRadius: 4
                 }}
                />
               </Box>
              ) : null}
             </Box>
            </Box>
           </Grid2>
           <Grid2 size={{ xs: 12, sm: 6, lg: 3 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
             <label>Stock</label>
             <TextField
              name="pricing_policy.fixed.stock"
              placeholder="Enter stock"
              fullWidth
              size="small"
              onChange={formik.handleChange}
              value={formik.values.pricing_policy.fixed.stock}
              error={
               formik.touched.pricing_policy?.fixed?.stock &&
               Boolean(formik.errors.pricing_policy?.fixed?.stock)
              }
              helperText={
               formik.touched.pricing_policy?.fixed?.stock &&
               formik.errors.pricing_policy?.fixed?.stock
              }
              slotProps={{
               input: {
                endAdornment: (
                 <InputAdornment position="end">
                  <WarehouseOutlined />{" "}
                 </InputAdornment>
                ),
                sx: { borderRadius: 4 }
               }
              }}
              sx={{
               boxShadow: "0px 0px 2px  rgb(189, 184, 241)",
               borderRadius: 4
              }}
             />
            </Box>
           </Grid2>
           <Grid2 size={{ xs: 12, sm: 6, lg: 3 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
             <label> Min number of stock</label>
             <TextField
              sx={{
               boxShadow: "0px 0px 2px  rgb(189, 184, 241)",
               borderRadius: 4
              }}
              name="pricing_policy.fixed.stock_min"
              placeholder="Enter Min number of stock"
              fullWidth
              size="small"
              onChange={formik.handleChange}
              value={formik.values.pricing_policy.fixed.stock_min}
              error={
               formik.touched.pricing_policy?.fixed?.stock_min &&
               Boolean(formik.errors.pricing_policy?.fixed?.stock_min)
              }
              helperText={
               formik.touched.pricing_policy?.fixed?.stock_min &&
               formik.errors.pricing_policy?.fixed?.stock_min
              }
              slotProps={{
               input: {
                endAdornment: (
                 <InputAdornment position="end">
                  <ArrowDownwardOutlined sx={{ color: red[300] }} />{" "}
                  <WarehouseOutlined sx={{ color: red[300] }} />{" "}
                 </InputAdornment>
                ),
                sx: { borderRadius: 4 }
               }
              }}
             />
            </Box>
           </Grid2>
          </Grid2>
         </Box>
        ) : null}
        {formik.values.pricing_policy.price_type === "flexible" ? (
         <Box className={"move_box"}>
          <Grid2 container spacing={2} alignItems={"center"}>
           <Grid2 size={{ xs: 12 }}>
            {formik.values.pricing_policy.flexible.map(
             (item, index: number) => (
              <Box
               key={index}
               flexDirection={"column"}
               sx={{ display: "flex", gap: 1 }}
               my={1}
              >
               <Box
                display={"flex"}
                justifyContent={"start"}
                flexDirection={{ xs: "column", md: "row" }}
                alignItems={{ xs: "start", md: "center" }}
                gap={{ xs: 2, md: 5 }}
               >
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                 <label> Title </label>
                 <TextField
                  name={`pricing_policy.flexible[${index}].title`}
                  placeholder="Enter Title "
                  size="small"
                  type={"text"}
                  onChange={formik.handleChange}
                  defaultValue={item.title}
                  //  error={
                  //   formik.touched.pricing_policy?.flexible?.[index]?.price &&
                  //   Boolean(
                  //    formik.errors.pricing_policy?.flexible?.[index]
                  //     ?.price as boolean
                  //   )
                  //  }
                  //  helperText={
                  //   formik.touched.pricing_policy?.flexible?.[index]?.price &&
                  //   (formik.errors.pricing_policy?.flexible?.[index]
                  //    ?.price as string)
                  //  }
                  slotProps={{
                   input: {
                    sx: { borderRadius: 4 }
                   }
                  }}
                  sx={{
                   boxShadow: "0px 0px 2px  rgb(189, 184, 241)",
                   borderRadius: 4
                  }}
                 />
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                 <label> Price </label>
                 <TextField
                  name={`pricing_policy.flexible[${index}].price`}
                  placeholder="Enter Price "
                  size="small"
                  type={"number"}
                  onChange={formik.handleChange}
                  defaultValue={item.price}
                  //  error={
                  //   formik.touched.pricing_policy?.flexible?.[index]?.price &&
                  //   Boolean(
                  //    formik.errors.pricing_policy?.flexible?.[index]
                  //     ?.price as boolean
                  //   )
                  //  }
                  //  helperText={
                  //   formik.touched.pricing_policy?.flexible?.[index]?.price &&
                  //   (formik.errors.pricing_policy?.flexible?.[index]
                  //    ?.price as string)
                  //  }
                  slotProps={{
                   input: {
                    endAdornment: (
                     <InputAdornment position="end">
                      <PaidOutlined />{" "}
                     </InputAdornment>
                    ),
                    sx: { borderRadius: 4 }
                   },
                   htmlInput: {
                    min: 0
                   }
                  }}
                  sx={{
                   boxShadow: "0px 0px 2px  rgb(189, 184, 241)",
                   borderRadius: 4
                  }}
                 />
                </Box>
                <Box mt={{ xs: 0, md: 4 }}>
                 <FormGroup>
                  <FormControlLabel
                   value={item.offer}
                   name={`pricing_policy.flexible[${index}].offer`}
                   control={
                    <Checkbox
                     onChange={formik.handleChange}
                     name={`pricing_policy.flexible[${index}].offer`}
                     checked={item.offer}
                    />
                   }
                   label={"Offer"}
                  />
                 </FormGroup>
                </Box>
                {item.offer ? (
                 <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <label>Offer</label>
                  <TextField
                   name={`pricing_policy.flexible[${index}].offer_value`}
                   placeholder="Enter Offer Value"
                   type={"number"}
                   size="small"
                   onChange={formik.handleChange}
                   value={item.offer_value}
                   error={
                    formik.touched.pricing_policy?.fixed?.offer_value &&
                    Boolean(formik.errors.pricing_policy?.fixed?.offer_value)
                   }
                   helperText={
                    formik.touched.pricing_policy?.fixed?.offer_value &&
                    formik.errors.pricing_policy?.fixed?.offer_value
                   }
                   slotProps={{
                    input: {
                     endAdornment: (
                      <InputAdornment position="end">
                       <TextField
                        size={"small"}
                        value={item.offer_value_type}
                        variant={"standard"}
                        onChange={formik.handleChange}
                        name={`pricing_policy.flexible[${index}].offer_value_type`}
                        select
                       >
                        <MenuItem value={"pre"}>%</MenuItem>
                        <MenuItem value={"num"}>$</MenuItem>
                       </TextField>
                      </InputAdornment>
                     ),
                     sx: { borderRadius: 4 }
                    },
                    htmlInput: {
                     min: 0
                    }
                   }}
                   sx={{
                    boxShadow: "0px 0px 2px  rgb(189, 184, 241)",
                    borderRadius: 4
                   }}
                  />
                 </Box>
                ) : null}
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                 <label>Stock</label>
                 <TextField
                  name={`pricing_policy.flexible[${index}].stock`}
                  placeholder="Enter stock"
                  fullWidth
                  size="small"
                  onChange={formik.handleChange}
                  defaultValue={item.stock}
                  // error={
                  //  formik.touched.pricing_policy?.flexible?.stock &&
                  //  Boolean(formik.errors.pricing_policy?.fixed?.stock)
                  // }
                  // helperText={
                  //  formik.touched.pricing_policy?.fixed?.stock &&
                  //  formik.errors.pricing_policy?.fixed?.stock
                  // }
                  slotProps={{
                   input: {
                    endAdornment: (
                     <InputAdornment position="end">
                      <WarehouseOutlined />{" "}
                     </InputAdornment>
                    ),
                    sx: { borderRadius: 4 }
                   }
                  }}
                  sx={{
                   boxShadow: "0px 0px 2px  rgb(189, 184, 241)",
                   borderRadius: 4
                  }}
                 />
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                 <label> Min number of stock</label>
                 <TextField
                  sx={{
                   boxShadow: "0px 0px 2px  rgb(189, 184, 241)",
                   borderRadius: 4
                  }}
                  name={`pricing_policy.flexible[${index}].stock_min`}
                  placeholder="Enter Min number of stock"
                  fullWidth
                  size="small"
                  onChange={formik.handleChange}
                  defaultValue={item.stock_min}
                  // error={
                  //  formik.touched.pricing_policy?.fixed?.stock_min &&
                  //  Boolean(formik.errors.pricing_policy?.fixed?.stock_min)
                  // }
                  // helperText={
                  //  formik.touched.pricing_policy?.fixed?.stock_min &&
                  //  formik.errors.pricing_policy?.fixed?.stock_min
                  // }
                  slotProps={{
                   input: {
                    endAdornment: (
                     <InputAdornment position="end">
                      <ArrowDownwardOutlined sx={{ color: red[300] }} />{" "}
                      <WarehouseOutlined sx={{ color: red[300] }} />{" "}
                     </InputAdornment>
                    ),
                    sx: { borderRadius: 4 }
                   }
                  }}
                 />
                </Box>
               </Box>
              </Box>
             )
            )}
            <Box py={2}>
             <Button variant="contained" onClick={addNewPrice}>
              add
             </Button>
            </Box>
           </Grid2>
          </Grid2>
         </Box>
        ) : null}
       </Box>
      </Grid2>
     </Grid2>
    </Box>
    {/* Add photos */}
    <Box
     className={"bg_box_gradient"}
     width={"100%"}
     p={2}
     boxShadow={2}
     borderRadius={2}
     pb={4}
     display={"flex"}
     justifyContent={"center"}
     alignItems={"center"}
     gap={2}
     flexDirection={"column"}
    >
     <Typography
      color={"primary.main"}
      my={5}
      variant={"h5"}
      component={"h5"}
      fontWeight={600}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
     >
      <Image
       width={50}
       height={50}
       src={"/wired-lineal-129-folder-camera-hover-adding-files.gif"}
       alt={"wired-lineal-129-folder-camera-hover-adding-files"}
      />
      Add photes to the product
     </Typography>
     <Typography
      // alignSelf={"self-start"}
      variant="h6"
      component="h2"
      fontWeight={600}
      color={"primary.main"}
     >
      Add Main photo to show in the product
     </Typography>

     {formik.values?.main_img?.url ? (
      <Box
       p={3}
       display={"flex"}
       justifyContent={"center"}
       alignItems={"center"}
      >
       <Box position={"relative"}>
        <Image
         width={200}
         height={200}
         src={formik.values?.main_img?.url}
         alt={"min_image"}
         priority={true}
         style={{
          boxShadow: "0px 0px 2px  rgb(189, 184, 241)",
          borderRadius: 4
         }}
        />
        <Box position={"absolute"} top={0} right={0}>
         <IconButton
          onClick={async () => {
           const res: { success: boolean } = await deleteImageApi(
            formik.values?.main_img?.img_id
           );
           if (res?.success === true) {
            enqueueSnackbar("Image deleted successfully", {
             variant: "success"
            });
            formik.setFieldValue("main_img", null);
            localStorage.removeItem("uploader");
           } else {
            enqueueSnackbar("Error while deleting image", {
             variant: "error"
            });
           }
          }}
         >
          <DeleteOutline color="error" />
         </IconButton>
        </Box>
       </Box>
      </Box>
     ) : null}

     {!formik.values?.main_img?.url ? (
      <Box
       borderRadius={2}
       // width={"100%"}
       my={3}
       // height={"300px"}
       display={"flex"}
       justifyContent={"center"}
       alignItems={"center"}
       flexDirection={"column"}
       gap={2}
       p={10}
      >
       <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res: any) => {
         formik.setFieldValue("main_img", {
          url: res[0].url,
          img_id: res[0].key
         });
         enqueueSnackbar("Upload Completed", {
          variant: "success"
         });
         localStorage.setItem(
          "uploader",
          JSON.stringify({ img_id: res[0].key, url: res[0].url })
         );
        }}
        onUploadError={(error: Error) => {
         // Do something with the error.
         console.log(`ERROR! ${JSON.parse(JSON.stringify(error))}`);
        }}
       />
      </Box>
     ) : null}
     <Typography
      // alignSelf={"self-start"}
      variant="h6"
      component="h2"
      fontWeight={600}
      color={"primary.main"}
     >
      Add 4 photos to show in the product
     </Typography>
     {formik.values.swiper_images.length > 0 ? (
      <Box
       p={3}
       display={"flex"}
       justifyContent={"center"}
       alignItems={"center"}
       gap={2}
       sx={{
        boxShadow: "0px 0px 2px  rgb(189, 184, 241)",
        borderRadius: 4
       }}
      >
       {formik.values.swiper_images.map((item: any, index) => (
        <Box position={"relative"} key={index}>
         <Image
          width={200}
          height={200}
          src={item?.url}
          alt={`image-${index}`}
          priority={true}
          style={{
           boxShadow: "0px 0px 2px  rgb(189, 184, 241)",
           borderRadius: 4
          }}
         />

         <Box position={"absolute"} top={0} right={0}>
          <IconButton onClick={() => deleteImage(item?.img_id)}>
           <DeleteOutline color="error" />
          </IconButton>
         </Box>
        </Box>
       ))}
      </Box>
     ) : null}

     <Box>
      <UploadDropzone
       endpoint="imageUploaderCollection"
       onClientUploadComplete={(res: any) => {
        const list = res.map((item: any) => {
         return {
          url: item.url,
          img_id: item.key
         };
        });
        formik.setFieldValue("swiper_images", list);
        enqueueSnackbar("Upload Completed", {
         variant: "success"
        });
        localStorage.setItem("swiper_images", JSON.stringify(list));
       }}
       onUploadError={(error: Error) => {
        // Do something with the error.
        console.log(`ERROR! ${JSON.parse(JSON.stringify(error))}`);
       }}
      />
     </Box>
    </Box>
    <Box display={"flex"} justifyContent={"end"} gap={2}>
     <LoadingButton
      loading={formik.isSubmitting}
      variant="contained"
      type="submit"
     >
      save
     </LoadingButton>
    </Box>
   </Box>
  </form>
 );
}

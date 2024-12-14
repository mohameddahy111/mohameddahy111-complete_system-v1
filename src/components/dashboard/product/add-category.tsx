"use client";

import { UploadButton } from "@/utils/uploadthing";
import {
 Box,
 Button,
 Dialog,
 DialogContent,
 DialogTitle,
 Grid2,
 TextField,
 Typography
} from "@mui/material";
import { indigo } from "@mui/material/colors";
import axios from "axios";
import { useFormik } from "formik";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import * as React from "react";

export interface IAddCategoryProps {}

export default function AddCategory({}: IAddCategoryProps) {
 const router = useRouter();
 const pathName = usePathname();
 const [open, setOpen] = React.useState(false);
 function openHandler() {
  setOpen(true);
 }
 function closeHandler() {
    formik.resetForm();
  setOpen(false);
 }
 const formik = useFormik({
  initialValues: {
   title: "",
   description: "",
   image: {
    img_url: "",
    img_id: ""
   }
  },
  onSubmit: async (values) => {
   await axios
    .post("/api/product/category", values)
    .then((response) => {
     if (response.status === 201) {
      enqueueSnackbar(response.data.message, {
       variant: "success"
      });
  
      closeHandler();
      if (pathName === "/dashboard/products/categories") {
       window.location.reload();
      } else {
       router.push("/dashboard/products/categories");
      }
     }
    })
    .catch((error) => {
     enqueueSnackbar(error.response.data.message, {
      variant: "error"
     });
    });
  }
 });
 return (
  <Box>
   <Button sx={{ borderRight: "1px solid #D9D9D9" }} onClick={openHandler}>
    Add Category
   </Button>
   <Dialog fullWidth maxWidth="sm" open={open} onClose={closeHandler}>
    <DialogTitle>ADD New Category</DialogTitle>
    <DialogContent>
     <form onSubmit={formik.handleSubmit}>
      <Grid2 alignItems={"center"} container spacing={2} my={2}>
       <Grid2 size={{ xs: 12, sm: 6 }}>
        <Box
         border={`2px dashed ${indigo[400]}`}
         borderRadius={2}
         width={"100%"}
         my={3}
         height={"300px"}
         display={"flex"}
         justifyContent={"center"}
         alignItems={"center"}
         flexDirection={"column"}
         gap={2}
        >
         {formik.values.image.img_url ? (
          <Image
           src={formik.values.image.img_url}
           alt="image"
           width={200}
           height={200}
           priority={false}
           style={{ width: "100%", height: "100%", padding: "10px" }}
          />
         ) : (
          <UploadButton
           endpoint="imageUploader"
           onClientUploadComplete={(res: any) => {
            formik.setFieldValue("image", {
             img_url: res[0].url,
             img_id: res[0].key
            });
           }}
          />
         )}
        </Box>
       </Grid2>
       <Grid2 size={{ xs: 12, sm: 6 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
         <TextField
          label="Title"
          name="title"
          placeholder="Enter Title"
          fullWidth
          size="small"
          onChange={formik.handleChange}
          value={formik.values.title}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
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
         <TextField
          label="Description"
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
         <Typography component={"label"} color="warning" variant="body2">
          you can add url of image here
         </Typography>
         <TextField
          label="Url of image"
          name="image.img_url"
          placeholder="Enter Url of image"
          fullWidth
          size="small"
          onChange={formik.handleChange}
          value={formik.values.image.img_url}
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
<Box sx={{ display: "flex", gap: 2  , justifyContent: "space-between"}}>
         <Button fullWidth  onClick={closeHandler}>
          Cansel
         </Button>
         <Button fullWidth variant="contained" type="submit">
          Save
         </Button>

</Box>
        </Box>
       </Grid2>
      </Grid2>
     </form>
    </DialogContent>
   </Dialog>
  </Box>
 );
}

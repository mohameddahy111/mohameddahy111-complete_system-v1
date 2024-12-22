"use client";

import { deleteImageApi } from "@/app/actions";
import { UploadButton } from "@/utils/uploadthing";
import { DeleteOutline } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Grid2, IconButton, TextField, Typography } from "@mui/material";
import { indigo } from "@mui/material/colors";
import axios from "axios";
import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import * as React from "react";

export interface ICompanyPageProps {}

export default function CompanyPage(props: ICompanyPageProps) {
    const router = useRouter();
 const formik = useFormik({
  initialValues: {
   company_name: "",
   company_address: "",
   company_phone: "",
   company_email: "",
   company_website: "",
   company_activity: "",
   company_logo: {
    logo_url: "",
    logo_id: ""
   },
   company_description: "",
   company_title: ""
  },
  onSubmit: async (values) => {
  await axios
    .post("/api/company", values)
    .then((response) => {
     if (response.status === 201) {
      enqueueSnackbar(response.data.message, {
       variant: "success"
      });
      formik.resetForm();
      router.push("/dashboard/settings");
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
  <Box
   width={"100%"}
   sx={{ display: "flex", flexDirection: "column" }}
   gap={5}
   className={"bg_box_gradient"}
   mt={5}
   borderRadius={2}
   boxShadow={1}
  >
   <Box p={2} borderRadius={2}>
    <Typography variant="h6" fontWeight={600} sx={{ color: "primary.main" }}>
     Company Profile
    </Typography>
   </Box>
   <Box p={2} borderRadius={2}>
    <form onSubmit={formik.handleSubmit}>
     <Grid2 container spacing={2}>
      <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
       <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <label>Company Name</label>
        <TextField
         name="company_name"
         placeholder="Enter Company Name"
         fullWidth
         size="small"
         onChange={formik.handleChange}
         value={formik.values.company_name}
         error={
          formik.touched.company_name && Boolean(formik.errors.company_name)
         }
         helperText={formik.touched.company_name && formik.errors.company_name}
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
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
       <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <label>Company Address</label>
        <TextField
         name="company_address"
         placeholder="Enter Company Address"
         fullWidth
         size="small"
         onChange={formik.handleChange}
         value={formik.values.company_address}
         error={
          formik.touched.company_address &&
          Boolean(formik.errors.company_address)
         }
         helperText={
          formik.touched.company_address && formik.errors.company_address
         }
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
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
       <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <label>Company Phone Number</label>
        <TextField
         name="company_phone"
         placeholder="Enter Company Phone Number"
         fullWidth
         size="small"
         onChange={formik.handleChange}
         value={formik.values.company_phone}
         error={
          formik.touched.company_phone && Boolean(formik.errors.company_phone)
         }
         helperText={
          formik.touched.company_phone && formik.errors.company_phone
         }
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
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
       <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <label>Company Email</label>
        <TextField
         name="company_email"
         placeholder="Enter Company Email"
         fullWidth
         type="email"
         size="small"
         onChange={formik.handleChange}
         value={formik.values.company_email}
         error={
          formik.touched.company_email && Boolean(formik.errors.company_email)
         }
         helperText={
          formik.touched.company_email && formik.errors.company_email
         }
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
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
       <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <label>Company Website</label>
        <TextField
         name="company_website"
         placeholder="Enter Company Website"
         fullWidth
         size="small"
         onChange={formik.handleChange}
         value={formik.values.company_website}
         error={
          formik.touched.company_website &&
          Boolean(formik.errors.company_website)
         }
         helperText={
          formik.touched.company_website && formik.errors.company_website
         }
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
      </Grid2>
      <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
       <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <label>Company Activity</label>
        <TextField
         name="company_activity"
         placeholder="Enter Company Activity"
         fullWidth
         size="small"
         onChange={formik.handleChange}
         value={formik.values.company_activity}
         error={
          formik.touched.company_activity &&
          Boolean(formik.errors.company_activity)
         }
         helperText={
          formik.touched.company_activity && formik.errors.company_activity
         }
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
      </Grid2>
      <Grid2 size={{ xs: 12 }}>
       <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <label>Company Description</label>
        <TextField
         type="textarea"
         name="company_description"
         placeholder="Enter Short Description"
         fullWidth
         size="small"
         onChange={formik.handleChange}
         multiline
         rows={5}
         value={formik.values.company_description}
         error={
          formik.touched.company_description &&
          Boolean(formik.errors.company_description)
         }
         helperText={
          formik.touched.company_description &&
          formik.errors.company_description
         }
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
      </Grid2>
      <Grid2 size={{ xs: 12 }}>
       <Box
        sx={{
         display: "flex",
         flexDirection: "column",
         gap: 2,
         justifyContent: "center",
         alignItems: "center",
         mt: 6
        }}
       >
        <Typography component={"label"} variant="h6" fontWeight={600}>
         Company Logo
        </Typography>
        {formik.values.company_logo.logo_url ? (
         <Box
          position={"relative"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          border={`2px dashed ${indigo[400]}`}
          borderRadius={2}
          p={2}
         >
          <Image
           width={"200"}
           height={"200"}
           src={formik.values.company_logo.logo_url}
           alt={"company_logo"}
          />
          <IconButton
           sx={{ position: "absolute", right: "10px", top: "5px" }}
           onClick={async () => {
            const res: { success: boolean } = await deleteImageApi(
             formik.values.company_logo?.logo_id
            );
            if (res?.success === true) {
             enqueueSnackbar("Image deleted successfully", {
              variant: "success"
             });
             formik.setFieldValue("company_logo", {
              logo_id: null,
              logo_url: null
             });
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
        ) : (
         <Box
          width={"300px"}
          height={"200px"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={2}
          border={`2px dashed ${indigo[400]}`}
          borderRadius={2}
         >
          <UploadButton
           endpoint="imageUploader"
           onClientUploadComplete={(res: any) => {
            formik.setFieldValue("company_logo", {
             logo_url: res[0].url,
             logo_id: res[0].key
            });
            enqueueSnackbar("Upload Completed", {
             variant: "success"
            });
           }}
           onUploadError={(error: Error) => {
            // Do something with the error.
            console.log(`ERROR! ${JSON.parse(JSON.stringify(error))}`);
           }}
          />
         </Box>
        )}
       </Box>
      </Grid2>
      <Grid2 size={{ xs: 12 , sm: 6, lg: 4 }}>  
       <Box
        sx={{
         display: "flex",
         flexDirection: "column",
         gap: 2,
         mt: 5,
         py:10
        }}
       >
        <Typography component={"label"} variant="h6" fontWeight={600}>
         {" "}
        Main Title 
        </Typography>
        <TextField
         name="company_title"
         placeholder="Enter Company Title"
         size="small"
         onChange={formik.handleChange}
         value={formik.values.company_title}
         error={
          formik.touched.company_title && Boolean(formik.errors.company_title)
         }
         helperText={
          formik.touched.company_title && formik.errors.company_title
         }
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
      </Grid2>
     </Grid2>
        <Box display={'flex'} justifyContent={'end'}>
            <LoadingButton type='submit' variant='contained' loading={formik.isSubmitting}>
                Save
            </LoadingButton>
        </Box>
    </form>
   </Box>
  </Box>
 );
}

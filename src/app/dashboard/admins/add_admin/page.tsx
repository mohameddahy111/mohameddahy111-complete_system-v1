import AddAdminForm from "@/components/dashboard/add-admin-form";
import { Box, Grid2, Typography } from "@mui/material";
import * as React from "react";

export interface IAddAdminProps {}

export default function AddAdmin(props: IAddAdminProps) {
  return (
    <Box
      width={"100%"}
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        gap: 5,
      }}
    >
      <Typography variant="h1" component="h1">
        add new admin
      </Typography>
      <Box
      display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        bgcolor={"white"}
        height={"530px"}
        p={3}
        sx={{ borderRadius: 3 }}
        boxShadow='0px 0px 10px rgba(0, 0, 0, 0.1)'

      >
        <AddAdminForm />
      </Box>
    </Box>
  );
}

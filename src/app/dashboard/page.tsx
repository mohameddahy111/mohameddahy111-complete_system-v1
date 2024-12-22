import { Box, Typography } from "@mui/material";
import * as React from "react";
import { getDashboard } from "../actions";

export interface IDashboardProps {}

export default async function Dashboard({}: IDashboardProps) {
  await getDashboard();
//  console.log(data)
  return (
    <Box
      width={"100%"}
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column"
      }}
    >
      <Typography variant="h1" sx={{ color: "primary.main" }}>
        Dashboard
      </Typography>
      <Box bgcolor={"white"}>

      </Box>

    </Box>
  );
}

import { Box, Typography } from "@mui/material";
import * as React from "react";

export interface IDashboardProps {}

export default function Dashboard({}: IDashboardProps) {
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

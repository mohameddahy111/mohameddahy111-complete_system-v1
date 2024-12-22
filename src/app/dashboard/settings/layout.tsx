'use client';

import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import Image from "next/image";
import { usePathname } from "next/navigation";
import * as React from "react";

export interface ISettingLayoutProps {
 children: React.ReactNode;
}

export default function SettingLayout({ children }: ISettingLayoutProps) {
  const pathName =usePathname();

 return (
  <Box width={"100%"} sx={{ display: "flex", flexDirection: "column" }}>
   <Box display={"flex"} justifyContent={"center"} alignItems={"center"} gap={2}>
    <Image
     src={"/wired-lineal-1030-service-alt-hover-pinch.gif"}
     alt="setting_image"
     width={50}
     height={50}
    />
    <Typography variant="h1" sx={{ color: "primary.main" }}>
     Settings
    </Typography>
   </Box>
   <Box>
    <ButtonGroup>
      <Button sx={pathName === "/dashboard/settings/company" ? { bgcolor: "primary.main" , color: "white"} : {}}
       LinkComponent={'a'} href="/dashboard/settings/company">Company Profile</Button>
      <Button>Account</Button>
    </ButtonGroup>
   </Box>

   {children}
  </Box>
 );
}

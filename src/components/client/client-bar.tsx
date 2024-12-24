"use client";

import { ThemeProvider } from "@emotion/react";
import {
 EmailOutlined,
 LanguageOutlined,
 LocationOnOutlined,
 LoginOutlined,
 PhoneOutlined
} from "@mui/icons-material";
import {
 AppBar,
 Box,
 createTheme,
 CssBaseline,
 Grid2,
 Link,
 List,
 ListItem,
 ListItemButton,
 ListItemIcon,
 ListItemText,
 Toolbar,
 Typography
} from "@mui/material";
import Image from "next/image";
import * as React from "react";
import TemporaryDrawer from "./mobile-drawer";
import CartDailog from "./cart/cart-dailog";

export interface IClientbarProps {
 comanyData: any;
 children: React.ReactNode;
}

export default function Clientbar({ comanyData, children }: IClientbarProps) {
 const theme = createTheme({
  typography: {
   h6: {
    textTransform: "capitalize",
    fontWeight: 600
   }
  },
  palette: {
   mode: "light",
   primary: {
    main: "#203040",
    light: "#203040",
    dark: "#203060",
    contrastText: "#f0c000"
   },
   secondary: {
    main: "#208080",
    light: "#b2dfdb",
    dark: "#00897b",
    contrastText: "#ffffff"
   }
  }
 });

 return (
  <ThemeProvider theme={theme}>
   <CssBaseline />
   <AppBar position="static">
    <Toolbar
     sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
     }}
    >
     <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <Image
       src={comanyData.company_logo.logo_url}
       alt={comanyData.company_title}
       width={50}
       height={50}
      />
      <Typography sx={{ textDecoration: "none" }} variant="h6" component={"h6"}>
       <Link sx={{ textDecoration: "none" }} href={"/"} color={"inherit"}>
        {comanyData.company_title || "complete system"}
       </Link>
      </Typography>
     </Box>
     <Box display={{ xs: "none", md: "flex" }}>
      <List
       sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
       <ListItemButton LinkComponent={"a"} href="/">
        Home
       </ListItemButton>
       <ListItemButton LinkComponent={"a"} href="/shop">
        Shop
       </ListItemButton>
       <ListItemButton LinkComponent={"a"} href="/about">
        About Us
       </ListItemButton>
       <ListItemButton LinkComponent={"a"} href="/contact">
        Contact Us
       </ListItemButton>
      </List>
     </Box>
     <Box>
      <Typography
       component={"a"}
       href="/auth/login"
       sx={{
        textDecoration: "none",
        display: { xs: "none", md: "flex" },
        alignItems: "center",
        gap: 1
       }}
       color="primary.contrastText"
      >
       <LoginOutlined />
       login
      </Typography>
      <TemporaryDrawer
       logo={comanyData.company_logo.logo_url as string}
       company_name={comanyData.company_title}
      />
     </Box>
    </Toolbar>
   </AppBar>
   <Box minHeight={"640px"}>{children}</Box>
   <footer>
    <Box p={1}>
     <Box
      bgcolor={"primary.main"}
      width={"100%"}
      display={"flex"}
      flexDirection={"column"}
      gap={2}
      color={"secondary.main"}
      p={2}
      boxShadow={2}
      borderRadius={2}
     >
      <Grid2 container spacing={2}>
       <Grid2 display={"flex"} size={{ xs: 12, sm: 6, lg: 4 }}>
        <Box
         width={"100%"}
         display={"flex"}
         alignItems={{ xs: "center", md: "flex-start" }}
         flexDirection={"column"}
         gap={2}
        >
         <Typography variant="h6" component={"h6"}>
          {comanyData.company_title || "complete system"}
         </Typography>
         <Typography>{comanyData.company_description || ""}</Typography>
        </Box>
       </Grid2>
       <Grid2 size={{ xs: 12, sm: 6, lg: 4 }}>
        <List
         sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
         }}
        >
         <ListItem>
          <ListItemIcon>
           <LocationOnOutlined sx={{ color: "primary.contrastText" }} />
          </ListItemIcon>
          <ListItemText>{comanyData.company_address || ""}</ListItemText>
         </ListItem>
         <ListItem>
          <ListItemIcon>
           <PhoneOutlined sx={{ color: "primary.contrastText" }} />
          </ListItemIcon>
          <ListItemText>{comanyData.company_phone}</ListItemText>
         </ListItem>
         <ListItem>
          <ListItemIcon>
           <EmailOutlined sx={{ color: "primary.contrastText" }} />
          </ListItemIcon>

          <ListItemText>{comanyData.company_email}</ListItemText>
         </ListItem>
         {comanyData.company_website && (
          <ListItem>
           <ListItemIcon>
            <LanguageOutlined sx={{ color: "primary.contrastText" }} />
           </ListItemIcon>
           <ListItemText>{comanyData.company_address}</ListItemText>
          </ListItem>
         )}
        </List>
       </Grid2>
       <Grid2 size={{ xs: 12,  lg: 4 }}>
        <Box
         flex={"flex"}
         justifyContent={"center"}
         alignItems={"center"}
         boxShadow={"0px 0px 2px  rgb(211, 211, 218)"}
         borderRadius={2}
         p={0.5}
         width={"100%"}
        >
         <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13644.979465827144!2d29.985615150000005!3d31.24164405!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f5dacc0a5a1f69%3A0xadc185b2c738a988!2z2qTZg9iq2YjYsdmK2Kcg2YPZiNmE2YrYr9qG!5e0!3m2!1sar!2seg!4v1734383724564!5m2!1sar!2seg"
          width="100%"
          height="100%"
          style={{ border: "0", borderRadius: "5px", width: "100%" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
         ></iframe>{" "}
        </Box>
       </Grid2>
      </Grid2>
     </Box>
    </Box>
   </footer>
   <CartDailog />
  </ThemeProvider>
 );
}

"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Close, Groups2Outlined, Home, HomeOutlined, LoginOutlined, LogoutOutlined, Menu, PhoneOutlined, ShoppingCart, ShoppingCartOutlined } from "@mui/icons-material";
import Image from "next/image";
import { IconButton, Typography, useTheme } from "@mui/material";
import { usePathname } from "next/navigation";

interface ITemporaryDrawerProps {
 logo: string;
 company_name: string;
}

export default function TemporaryDrawer({
 logo,
 company_name
}: ITemporaryDrawerProps) {
 const [open, setOpen] = React.useState(false);
 const pathName = usePathname();
 const theme = useTheme();

 const toggleDrawer = (newOpen: boolean) => () => {
  setOpen(newOpen);
 };

 const DrawerList = (
  <Box
   sx={{
    width: 300,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    py:2
   }}
   role="presentation"
   onClick={toggleDrawer(false)}
  >
   <List>
    <ListItem>
     <ListItemButton
      sx={{
       boxShadow:
        pathName === "/home"
         ? `0px 0px 5px ${theme.palette.secondary.main}`
         : 1,
       borderRadius: "20px"
      }}
      LinkComponent={"a"}
      href="/"
     >
      <ListItemIcon>
       <HomeOutlined sx={{ color: "secondary.main" }} />
      </ListItemIcon>
      <ListItemText primary="Home" />
     </ListItemButton>
    </ListItem>
    <ListItem>
     <ListItemButton
      sx={{
       boxShadow:
        pathName === "/shop"
         ? `0px 0px 5px ${theme.palette.secondary.main}`
         : 1,
       borderRadius: "20px"
      }}
      LinkComponent={"a"}
      href="/shop"
     >
      <ListItemIcon>
       <ShoppingCartOutlined sx={{ color: "secondary.main" }} />
      </ListItemIcon>
      <ListItemText primary="Shop" />
     </ListItemButton>
    </ListItem>
    <ListItem>
     <ListItemButton
      sx={{
       boxShadow:
        pathName === "/about"
         ? `0px 0px 5px ${theme.palette.secondary.main}`
         : 1,
       borderRadius: "20px"
      }}
      LinkComponent={"a"}
      href="/about"
     >
      <ListItemIcon>
       <Groups2Outlined sx={{ color: "secondary.main" }} />
      </ListItemIcon>
      <ListItemText primary="About Us" />
     </ListItemButton>
    </ListItem>

    <ListItem>
     <ListItemButton
      sx={{
       boxShadow:
        pathName === "/contact_us"
         ? `0px 0px 5px ${theme.palette.secondary.main}`
         : 1,
       borderRadius: "20px"
      }}
      LinkComponent={"a"}
      href="/contact_us"
     >
      <ListItemIcon>
       <PhoneOutlined sx={{ color: "secondary.main" }} />
      </ListItemIcon>
      <ListItemText primary="Contact Us" />
     </ListItemButton>
    </ListItem>
    <ListItem>
     <ListItemButton
      sx={{
       boxShadow:
        pathName === "/auth/login"
         ? `0px 0px 5px ${theme.palette.secondary.main}`
         : 1,
       borderRadius: "20px"
      }}
      LinkComponent={"a"}
      href="/auth/login"
     >
      <ListItemIcon>
       <LoginOutlined sx={{ color: "secondary.main" }} />
      </ListItemIcon>
      <ListItemText primary="Login" />
     </ListItemButton>
    </ListItem>
   </List>
   <List>
    <ListItem>
     <ListItemButton
      sx={{
       boxShadow:1,
       borderRadius: "20px"
      }}
     >
      <ListItemIcon>
       <LogoutOutlined sx={{ color: "secondary.main" }} />
      </ListItemIcon>
      <ListItemText primary="Log Out" />
     </ListItemButton>
     </ListItem>
   </List>
  </Box>
 );

 return (
  <Box display={{ sx: "block", md: "none" }}>
   <Button onClick={toggleDrawer(true)}>
    <Menu sx={{ color: "white" }} />
   </Button>
   <Drawer open={open} onClose={toggleDrawer(false)}>
    <Box
     p={1}
     sx={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
     }}
    >
     <Box

      gap={2}
      sx={{ display: "flex", justifyContent: "start", alignItems: "center" }}
     >
      <Image
       src={logo ? logo : "/v904-nunny-012.jpg"}
       alt="Image"
       width={"50"}
       height={"50"}
      />
      <Typography textTransform={"capitalize"} variant="h6" component={"h6"}>
       {company_name}
      </Typography>
     </Box>
     <IconButton onClick={toggleDrawer(false)}>
      <Close />
     </IconButton>
    </Box>
    <Divider />
    {DrawerList}
   </Drawer>
  </Box>
 );
}

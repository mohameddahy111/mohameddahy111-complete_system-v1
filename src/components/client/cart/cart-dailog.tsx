"use client";
import { useCartStore } from "@/app/context/CartSrore";
import { ShoppingCartOutlined } from "@mui/icons-material";
import { Badge, Box, Button, Drawer, IconButton, useTheme } from "@mui/material";
import * as React from "react";

export interface ICartDailogProps {}

export default function CartDailog(props: ICartDailogProps) {
 const [open, setOpen] = React.useState(false);
 const theme = useTheme();
 const {cartItems} = useCartStore();

 const toggleDrawer = (newOpen: boolean) => () => {
  setOpen(newOpen);
 };
 return (
  <div>
   <IconButton
    sx={{
        position: "absolute",
        top: "30%",
        right: "1%",
        boxShadow: 1,
        bgcolor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
    }}
    onClick={toggleDrawer(true)}
    >
       <Badge badgeContent={cartItems?.length} anchorOrigin={{horizontal:"left"}} color="secondary">
    <ShoppingCartOutlined />
    </Badge>
   </IconButton>

   <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
    <Box width={"250px"}>

    </Box>
   </Drawer>
  </div>
 );
}

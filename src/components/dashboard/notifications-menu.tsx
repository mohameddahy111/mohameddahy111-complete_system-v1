"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { NotificationsActive } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { useRouter } from "next/navigation";

export default function NotificationsMenu({
 notifications,
 fun
}: {
 notifications: [];
 fun: Function;
}) {
 const router = useRouter();
 const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
 const open = Boolean(anchorEl);
 const handleClick = (event: React.MouseEvent<HTMLElement>) => {
  setAnchorEl(event.currentTarget);
 };
 const handleClose = () => {
  setAnchorEl(null);
 };
 async function readNotifications({ id }: { id: string }) {
  await axios
   .put("/api/notification", { id })
   .then(async (res) => {
    if (res.status === 200) {
     enqueueSnackbar(res.data.message, {
      variant: "success"
     });
     fun();
     router.push(res.data.link);
     handleClose();
    }
   })
   .catch((error) => {
    enqueueSnackbar(error.respone.data.message, { variant: "error" });
   });
 }
 return (
  <React.Fragment>
   <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
    <Tooltip title="Notifications">
     <IconButton
      onClick={handleClick}
      size="small"
      sx={{ ml: 2, boxShadow: 2 }}
      aria-controls={open ? "account-menu" : undefined}
      aria-haspopup="true"
      aria-expanded={open ? "true" : undefined}
     >
      <NotificationsActive sx={{ color: "#fff" }} />
     </IconButton>
    </Tooltip>
   </Box>
   <Menu
    anchorEl={anchorEl}
    id="account-menu"
    open={open}
    onClose={handleClose}
    onClick={handleClose}
    slotProps={{
     paper: {
      elevation: 0,
      sx: {
       backgroundColor: "transparent",

       px: 1,
       overflow: "visible",
       filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
       mt: 1.5,
       "& .MuiAvatar-root": {
        width: 32,
        height: 32,
        ml: -0.5,
        mr: 1
       },
          // "&::before": {
          //  content: '""',
          //  display: "block",
          //  position: "absolute",
          //  top: 0,
          //  right: 14,
          //  width: 10,
          //  height: 10,
          //  bgcolor: "background.paper",
          //  transform: "translateY(-50%) rotate(45deg)",
          //  zIndex: 0
          // }
      }
     }
    }}
    transformOrigin={{ horizontal: "right", vertical: "top" }}
    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
   >
    {!notifications || notifications.length === 0 ? (
      <Box>
     <MenuItem
      sx={{
       boxShadow: 2,
       borderRadius: "10px",
       my: 1,
       bgcolor: "#fff",
       ":hover": { bgcolor: "#fff" }
      }}
     >
      <Typography variant="caption" sx={{ color: "#000" }}>
       No notifications
      </Typography>

     </MenuItem>

      </Box>
    ) : (
     <Box>
      {notifications?.map((ele: any, index: number) => (
       <MenuItem
        key={index}
        sx={{
         boxShadow: 2,
         borderRadius: "10px",
         my: 1,
         bgcolor: "#fff",
         ":hover": { bgcolor: "#fff" }
        }}
        onClick={() => {
         readNotifications({ id: ele.id });
        }}
       >
        <Box
         sx={{
          display: "flex",
          alignItems: "start",
          gap: 1,
          flexDirection: "column",
          justifyContent: "center"
         }}
        >
         <Typography variant="body1" fontWeight={600} color={red[300]}>
          {ele.title}
         </Typography>
         <Typography variant="subtitle1" color={"#000"}>
          {ele.description}
         </Typography>
         <Typography variant="caption" color={"#000"}>
          {Intl.DateTimeFormat("en-US", {
           year: "numeric",
           month: "short",
           day: "numeric"
          }).format(new Date(ele.createdAt))}
         </Typography>
        </Box>
       </MenuItem>
      ))}
     </Box>
    )}
   </Menu>
  </React.Fragment>
 );
}

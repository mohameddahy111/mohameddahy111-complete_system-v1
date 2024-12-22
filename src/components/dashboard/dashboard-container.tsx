"use client";

import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { menuSidebar } from "@/utils/data/data";
import { grey } from "@mui/material/colors";
import { LogoutOutlined, NotificationsOutlined } from "@mui/icons-material";
import { Badge, Tooltip } from "@mui/material";
import { usePathname } from "next/navigation";
import axios from "axios";
import NotificationsMenu from "./notifications-menu";
import { Logout } from "@/app/actions";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
 width: drawerWidth,
 transition: theme.transitions.create("width", {
  easing: theme.transitions.easing.sharp,
  duration: theme.transitions.duration.enteringScreen
 }),
 overflowX: "hidden"
});

const closedMixin = (theme: Theme): CSSObject => ({
 transition: theme.transitions.create("width", {
  easing: theme.transitions.easing.sharp,
  duration: theme.transitions.duration.leavingScreen
 }),
 overflowX: "hidden",
 width: `calc(${theme.spacing(7)} + 1px)`,
 [theme.breakpoints.up("sm")]: {
  width: `calc(${theme.spacing(8)} + 1px)`
 }
});

const DrawerHeader = styled("div")(({ theme }) => ({
 display: "flex",
 alignItems: "center",
 justifyContent: "flex-end",
 padding: theme.spacing(0, 1),
 // necessary for content to be below app bar
 ...theme.mixins.toolbar
}));

interface AppBarProps extends MuiAppBarProps {
 open?: boolean;
}

const AppBar = styled(MuiAppBar, {
 shouldForwardProp: (prop) => prop !== "open"
})<AppBarProps>(({ theme }) => ({
 zIndex: theme.zIndex.drawer + 1,
 transition: theme.transitions.create(["width", "margin"], {
  easing: theme.transitions.easing.sharp,
  duration: theme.transitions.duration.leavingScreen
 }),
 variants: [
  {
   props: ({ open }) => open,
   style: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
     easing: theme.transitions.easing.sharp,
     duration: theme.transitions.duration.enteringScreen
    })
   }
  }
 ]
}));

const Drawer = styled(MuiDrawer, {
 shouldForwardProp: (prop) => prop !== "open"
})(({ theme }) => ({
 width: drawerWidth,
 flexShrink: 0,
 whiteSpace: "nowrap",
 boxSizing: "border-box",
 variants: [
  {
   props: ({ open }) => open,
   style: {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme)
   }
  },
  {
   props: ({ open }) => !open,
   style: {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme)
   }
  }
 ]
}));

export default function MiniDrawer({
 childrin,
 admin_position
}: {
 childrin: React.ReactNode;
 admin_position: any;
}) {
 const theme = useTheme();
 const [open, setOpen] = React.useState(false);
 const pathname = usePathname();

 const handleDrawerOpen = () => {
  setOpen(true);
 };

 const handleDrawerClose = () => {
  setOpen(false);
 };
 const [notifications, setNotifications] = React.useState<any>("");
 async function getNotifications() {
  await axios
   .post("/api/notification", { role: admin_position.admin_position })
   .then((res) => {
    setNotifications(res.data);
   })
   .catch((err) => {
    console.log(err);
   });
 }

 React.useEffect(() => {
  getNotifications();
 }, []);
 return (
  <Box sx={{ display: "flex" }}>
   <CssBaseline />
   <AppBar position="fixed" open={open}>
    <Toolbar>
     <IconButton
      color="inherit"
      aria-label="open drawer"
      onClick={handleDrawerOpen}
      edge="start"
      sx={[
       {
        marginRight: 5,
        color: "secondary.main"
       },
       open && { display: "none" }
      ]}
     >
      <MenuIcon />
     </IconButton>
     <Box
      width={"100%"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={"space-between"}
     >
      <Typography variant="h5" color="secondary.main" noWrap component="div">
       complete system
      </Typography>
      <Box>
       <Box>
        <Badge
         overlap="circular"
         color="error"
         badgeContent={notifications.length}
        >
         <NotificationsMenu notifications={notifications} fun={getNotifications} />
        </Badge>
       </Box>
      </Box>
     </Box>
    </Toolbar>
   </AppBar>
   <Drawer variant="permanent" open={open}>
    <DrawerHeader>
     <IconButton onClick={handleDrawerClose}>
      {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}
     </IconButton>
    </DrawerHeader>
    <Divider />
    <Box
     sx={{
      display: "flex",
      flexDirection: "column",
      height: "90%",
      justifyContent: "space-between"
     }}
    >
     <List sx={{ height: "85%", overflowY: "auto" }}>
      {menuSidebar.map((ele, index) => (
       <ListItem key={index} disablePadding sx={{ display: "block", p: 1 }}>
        <Tooltip title={ele.title}>
         <ListItemButton
          LinkComponent={"a"}
          href={ele.path}
          sx={[
           {
            minHeight: 48,
            px: 2.5,
            boxShadow: pathname.includes(ele.title.toLowerCase())
             ? "0px 0px 10px rgb(92,107,192)"
             : "0px 0px 2px rgba(0,0,0,0.3)",
            borderRadius: "10px"
           },
           open
            ? {
               justifyContent: "initial"
              }
            : {
               justifyContent: "center"
              }
          ]}
         >
          <ListItemIcon
           sx={[
            {
             minWidth: 0,
             justifyContent: "center"
            },
            open
             ? {
                mr: 3
               }
             : {
                mr: "auto"
               }
           ]}
          >
           {ele.icon}
          </ListItemIcon>
          <ListItemText
           primary={ele.title}
           sx={[
            open
             ? {
                opacity: 1
               }
             : {
                opacity: 0
               }
           ]}
          />
         </ListItemButton>
        </Tooltip>
       </ListItem>
      ))}
     </List>
     <List>
      <ListItem
       onClick={() => {
        Logout();
       }}
       disablePadding
       sx={{ display: "block", p: 1 }}
      >
       <Tooltip title="Logout">
        <ListItemButton
         sx={[
          {
           minHeight: 48,
           px: 2.5,
           boxShadow: "0px 0px 2px rgba(0,0,0,0.3)",
           borderRadius: "10px"
          },
          open
           ? {
              justifyContent: "initial"
             }
           : {
              justifyContent: "center"
             }
         ]}
        >
         <ListItemIcon
          sx={[
           {
            minWidth: 0,
            justifyContent: "center"
           },
           open
            ? {
               mr: 3
              }
            : {
               mr: "auto"
              }
          ]}
         >
          <LogoutOutlined sx={{ color: "primary.main" }} />
         </ListItemIcon>
         <ListItemText
          primary={"Logout"}
          sx={[
           open
            ? {
               opacity: 1
              }
            : {
               opacity: 0
              }
          ]}
         />
        </ListItemButton>
       </Tooltip>
      </ListItem>
     </List>
    </Box>
   </Drawer>
   <Box
    component="main"
    sx={{ flexGrow: 1, p: 3, bgcolor: grey[100], height: "100%" }}
   >
    <DrawerHeader />
    {childrin}
   </Box>
  </Box>
 );
}

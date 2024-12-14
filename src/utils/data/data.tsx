import {
  ApartmentOutlined,
  DashboardOutlined,
  Diversity1,
  Diversity2Outlined,
  GroupsOutlined,
  Inventory2Outlined,
  ListAltOutlined,
  ReportOffOutlined,
  ReportOutlined,
  SettingsOutlined,
  WarehouseOutlined
} from "@mui/icons-material";

export const menuSidebar = [
  {
    title: "Main Dashboard",
    path: "/dashboard",
    icon: <DashboardOutlined sx={{ color: "primary.main" }} />
  },
  {
    title: "Clients",
    path: "/dashboard/clients",
    icon: <GroupsOutlined sx={{ color: "primary.main" }} />
  },
  {
    title: "Products",
    path: "/dashboard/products",
    icon: <Inventory2Outlined sx={{ color: "primary.main" }} />
  },
  {
    title: "Orders",
    path: "/dashboard/orders",
    icon: <ListAltOutlined sx={{ color: "primary.main" }} />
  },
  {
    title: "Reports",
    path: "/dashboard/reports",
    icon: <ReportOutlined sx={{ color: "primary.main" }} />
  },
  {
    title: "Storage",
    path: "/dashboard/storage",
    icon: <WarehouseOutlined sx={{ color: "primary.main" }} />
  },
  {
    title: "Admins",
    path: "/dashboard/admins",
    icon: <Diversity2Outlined sx={{ color: "primary.main" }} />
  },
  {
    title: "Employees",
    path: "/dashboard/employees",
    icon: <Diversity1 sx={{ color: "primary.main" }} />
  },
  {
    title: "Settings",
    path: "/dashboard/settings",
    icon: <SettingsOutlined sx={{ color: "primary.main" }} />,
    subMenu: [
      {
        title: "Company",
        path: "/settings/company",
        icon: <ApartmentOutlined sx={{ color: "primary.main" }} />
      },
      {}
    ]
  }
];

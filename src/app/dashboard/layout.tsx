import MiniDrawer from "@/components/dashboard/dashboard-container";
import Theme from "@/components/dashboard/theme";
import { Box,} from "@mui/material";
import type { Metadata } from "next";
import { getAdminPosition } from "../actions";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "A complete system for your next project"
};

export  default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {

const token  = await getAdminPosition()

  return (
    <Box>
      <Theme>
        <MiniDrawer childrin={children} admin_position={token} />
      </Theme>
      
    </Box>
  );
}

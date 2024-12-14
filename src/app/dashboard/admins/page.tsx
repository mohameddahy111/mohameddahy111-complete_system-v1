import TablePublic from "@/components/table-container";
import Employee from "@/schemas/employees.schema";
import { dbContact } from "@/utils/connects/db.connect";
import { AddOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  TableBody,
  TableCell,
  TableRow,
  Typography
} from "@mui/material";
import * as React from "react";

export interface IAdminPageProps {}

export default async function AdminPage(props: IAdminPageProps) {
  dbContact(process.env.MONGODB_PRODUCT as string);

  const data = await Employee.find({ _isAdmin: true }).select({
    name: 1,
    email: 1,
    phone: 1,
    position: 1,
    last_active: 1,
    _id: 1
  });

  return (
    <Box
      width={"100%"}
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        gap: 5
      }}
    >
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        sx={{ marginBottom: "20px" }}
      >
        <Typography variant="h1" sx={{ color: "primary.main" }}>
          Admins
        </Typography>
        <Button
          LinkComponent={"a"}
          href="/dashboard/admins/add_admin"
          variant="contained"
          sx={{ color: "white" }}
          startIcon={<AddOutlined />}
        >
          Add Admin
        </Button>
      </Box>
      <Box bgcolor={"white"} borderRadius={"10px"}>
        <TablePublic
          headers={["Name", "Email", "Phone", "Position", "Last Active"]}
        >
          <TableBody>
            {data.map((ele, index) => (
              <TableRow key={index}>
                <TableCell align="center">{ele.name}</TableCell>
                <TableCell align="center">{ele.email}</TableCell>
                <TableCell align="center">{ele.phone}</TableCell>
                <TableCell align="center">{ele.position}</TableCell>
                <TableCell align="center">
                  {ele.last_active
                    ? Intl.DateTimeFormat("en-US" ,{
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                        }).format(
                        new Date(ele.last_active)
                      )
                    : "New"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TablePublic>
      </Box>
    </Box>
  );
}

import ShowDetailsButton from "@/components/showDetailsButton";
import TablePublic from "@/components/table-container";
import Employee from "@/schemas/employees.schema";
import { dbContact } from "@/utils/connects/db.connect";
import { AddOutlined, EditOutlined } from "@mui/icons-material";
import { Box, Button, IconButton, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import * as React from "react";

export interface IEmployeesPageProps {}

export default async function EmployeesPage({}: IEmployeesPageProps) {
  dbContact(process.env.MONGODB_PRODUCT as string)
  const data = await Employee.find().select({
    name: 1,
    email: 1,
    phone: 1,
    position: 1,
    branch: 1,
    _id: 1,
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
          Employees
        </Typography>
        <Button
          LinkComponent={"a"}
          href="/dashboard/employees/add_employee"
          variant="contained"
          sx={{ color: "white" }}
          startIcon={<AddOutlined />}
        >
          Add Employee
        </Button>
      </Box>
      <Box bgcolor={"white"} borderRadius={"10px"}>
        <TablePublic
          headers={["#", "Name", "Email", "Phone", "Position", "Branch" , ""]}
        >
        <TableBody>
          {data.map((ele, index) => (
            <TableRow key={index}>
              <TableCell align="center" >{index + 1}</TableCell>
              <TableCell align="center" >{ele.name}</TableCell>
              <TableCell align="center" >{ele.email}</TableCell>
              <TableCell align="center" >{ele.phone}</TableCell>
              <TableCell align="center" >{ele.position}</TableCell>
              <TableCell align="center" >{ele.branch}</TableCell>
              <TableCell align="center" >
                <ShowDetailsButton id={JSON.parse(JSON.stringify(ele._id))} />
                <IconButton LinkComponent={'a'} href={`employees/${ele._id}/edit`}>
<EditOutlined/>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        </TablePublic>
      </Box>
    </Box>
  );
}

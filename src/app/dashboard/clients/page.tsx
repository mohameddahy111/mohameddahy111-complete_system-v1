import ShowDetailsButton from "@/components/showDetailsButton";
import TablePublic from "@/components/table-container";
import Client from "@/schemas/client.schema";
import Employee from "@/schemas/employees.schema";
import { dbContact } from "@/utils/connects/db.connect";
import { AddOutlined } from "@mui/icons-material";
import { Box, Button, TableBody, TableCell, TableRow, Typography } from "@mui/material";
import * as React from "react";


export interface ICustomerPageProps {
}

export default async function CustomerPage (props: ICustomerPageProps) {
    dbContact(process.env.MONGODB_PRODUCT as string)
  
  const data = await Client.find()
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
    Clients
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
          headers={["#", "Name", "Email", "Phone" , ""]}
        >
        <TableBody>
          {data.map((ele, index) => (
            <TableRow key={index}>
              <TableCell align="center" >{index + 1}</TableCell>
              <TableCell align="center" >{ele.name}</TableCell>
              <TableCell align="center" >{ele.email}</TableCell>
              <TableCell align="center" >{ele.phone}</TableCell>
              <TableCell align="center" >
                <ShowDetailsButton id={JSON.parse(JSON.stringify(ele._id))} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        </TablePublic>
      </Box>
    </Box>
  );
}

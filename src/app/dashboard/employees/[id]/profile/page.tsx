import { getAdminPosition, getEmployeeById } from "@/app/actions";
import NewContarct from "@/components/dashboard/employees/contract/new-contract";
import {
  Box,
  Button,
  Grid2,
  IconButton,
  TableBody,
  TableCell,
  TableRow,
  Typography
} from "@mui/material";
import * as React from "react";
import TablePublic from "@/components/table-container";
import { VisibilityOutlined } from "@mui/icons-material";
import { green, red } from "@mui/material/colors";

export interface IProfilePageProps {
  params: Promise<{ id: string }>;
}

export default async function ProfilePage(params: IProfilePageProps) {
  const { id } = await params.params;
  const data = await getEmployeeById(id);
  const adminId = await getAdminPosition()
  return (
    <div>
      <Box
        display={"flex"}
        justifyContent={"center"}
        flexDirection={"column"}
        gap={5}
      >
        <Typography variant="h1" component="h1">
          {data.name} profile
        </Typography>
        <Box p={3} bgcolor={"white"} borderRadius={"10px"}>
          <Typography
            py={4}
            fontWeight={600}
            color={"primary.main"}
            variant="h5"
            component="h4"
          >
            Basic information
          </Typography>
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <Typography
                display={"flex"}
                alignItems={"center"}
                gap={1}
                variant="h6"
                component="h6"
              >
                Name :
                <Typography variant="body1" component="p">
                  {data.name}
                </Typography>
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <Typography
                display={"flex"}
                alignItems={"center"}
                gap={1}
                variant="h6"
                component="h6"
              >
                Email :
                <Typography variant="body1" component="p">
                  {data.email}
                </Typography>
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <Typography
                display={"flex"}
                alignItems={"center"}
                gap={1}
                variant="h6"
                component="h6"
              >
                Phone Number :
                <Typography variant="body1" component="p">
                  {data.phone}
                </Typography>
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <Typography
                display={"flex"}
                alignItems={"center"}
                gap={1}
                variant="h6"
                component="h6"
              >
                Age :
                <Typography variant="body1" component="p">
                  {data.age} years
                </Typography>
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <Typography
                display={"flex"}
                alignItems={"center"}
                gap={1}
                variant="h6"
                component="h6"
              >
                Birthday:
                <Typography variant="body1" component="p">
                  {data.birthday}
                </Typography>
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <Typography
                display={"flex"}
                alignItems={"center"}
                gap={1}
                variant="h6"
                component="h6"
              >
                Position :
                <Typography variant="body1" component="p">
                  {data.position}
                </Typography>
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <Typography
                display={"flex"}
                alignItems={"center"}
                gap={1}
                variant="h6"
                component="h6"
              >
                Start Date :
                <Typography variant="body1" component="p">
                  {data.start_date}
                </Typography>
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <Typography
                display={"flex"}
                alignItems={"center"}
                gap={1}
                variant="h6"
                component="h6"
              >
                Shift Time
                <Typography variant="body1" component="p">
                  {data.shift_time}
                </Typography>
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <Typography
                display={"flex"}
                alignItems={"center"}
                gap={1}
                variant="h6"
                component="h6"
              >
                Insurance :
                <Typography variant="body1" component="p">
                  {data.insurance ? "Yes" : "No"}
                </Typography>
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <Typography
                display={"flex"}
                alignItems={"center"}
                gap={1}
                variant="h6"
                component="h6"
              >
                Insurance Number :
                <Typography variant="body1" component="p">
                  {data.insurance_number}
                </Typography>
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <Typography
                display={"flex"}
                alignItems={"center"}
                gap={1}
                variant="h6"
                component="h6"
              >
                Is Admin :
                <Typography variant="body1" component="p">
                  {data._isAdmin ? "Yes" : "No"}
                </Typography>
              </Typography>
            </Grid2>
            {data._isAdmin && (
              <Grid2 size={{ xs: 12, sm: 4 }}>
                <Typography
                  display={"flex"}
                  alignItems={"center"}
                  gap={1}
                  variant="h6"
                  component="h6"
                >
                  Last Active :
                  {data.last_active ? (
                    <Typography variant="body1" component="p">
                      {Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric"
                      }).format(new Date(data.last_active))}
                    </Typography>
                  ) : (
                    " _"
                  )}
                </Typography>
              </Grid2>
            )}
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <Typography
                display={"flex"}
                alignItems={"center"}
                gap={1}
                variant="h6"
                component="h6"
              >
                Create at :
                <Typography variant="body1" component="p">
                  {Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric"
                  }).format(new Date(data.createdAt))}
                </Typography>
              </Typography>
            </Grid2>
          </Grid2>
        </Box>
        <Box p={3} bgcolor={"white"} borderRadius={"10px"}>
          <Typography
            py={4}
            fontWeight={600}
            color={"primary.main"}
            variant="h5"
            component="h4"
          >
            Secondary information
          </Typography>

          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <Typography
                display={"flex"}
                alignItems={"center"}
                gap={1}
                variant="h6"
                component="h6"
              >
                Name :
                <Typography variant="body1" component="p">
                  {data.name}
                </Typography>
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <Typography
                display={"flex"}
                alignItems={"center"}
                gap={1}
                variant="h6"
                component="h6"
              >
                Email :
                <Typography variant="body1" component="p">
                  {data.email}
                </Typography>
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <Typography
                display={"flex"}
                alignItems={"center"}
                gap={1}
                variant="h6"
                component="h6"
              >
                Phone Number :
                <Typography variant="body1" component="p">
                  {data.phone}
                </Typography>
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <Typography
                display={"flex"}
                alignItems={"center"}
                gap={1}
                variant="h6"
                component="h6"
              >
                Age :
                <Typography variant="body1" component="p">
                  {data.age} years
                </Typography>
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <Typography
                display={"flex"}
                alignItems={"center"}
                gap={1}
                variant="h6"
                component="h6"
              >
                Birthday:
                <Typography variant="body1" component="p">
                  {data.birthday}
                </Typography>
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <Typography
                display={"flex"}
                alignItems={"center"}
                gap={1}
                variant="h6"
                component="h6"
              >
                Position :
                <Typography variant="body1" component="p">
                  {data.position}
                </Typography>
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <Typography
                display={"flex"}
                alignItems={"center"}
                gap={1}
                variant="h6"
                component="h6"
              >
                Start Date :
                <Typography variant="body1" component="p">
                  {data.start_date}
                </Typography>
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <Typography
                display={"flex"}
                alignItems={"center"}
                gap={1}
                variant="h6"
                component="h6"
              >
                Shift Time
                <Typography variant="body1" component="p">
                  {data.shift_time}
                </Typography>
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <Typography
                display={"flex"}
                alignItems={"center"}
                gap={1}
                variant="h6"
                component="h6"
              >
                Insurance :
                <Typography variant="body1" component="p">
                  {data.insurance ? "Yes" : "No"}
                </Typography>
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <Typography
                display={"flex"}
                alignItems={"center"}
                gap={1}
                variant="h6"
                component="h6"
              >
                Insurance Number :
                <Typography variant="body1" component="p">
                  {data.insurance_number}
                </Typography>
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <Typography
                display={"flex"}
                alignItems={"center"}
                gap={1}
                variant="h6"
                component="h6"
              >
                Is Admin :
                <Typography variant="body1" component="p">
                  {data._isAdmin ? "Yes" : "No"}
                </Typography>
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <Typography
                display={"flex"}
                alignItems={"center"}
                gap={1}
                variant="h6"
                component="h6"
              >
                Create at :
                <Typography variant="body1" component="p">
                  {Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric"
                  }).format(new Date(data.createdAt))}
                </Typography>
              </Typography>
            </Grid2>
          </Grid2>
        </Box>
        <Box p={3} bgcolor={"white"} borderRadius={"10px"}>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            px={3}
          >
            <Typography
              py={4}
              fontWeight={600}
              color={"primary.main"}
              variant="h5"
              component="h4"
            >
              Contracts
            </Typography>
            <NewContarct
              decoded={adminId}
              employeeId={id}
              employeeName={data.name}
            />
          </Box>
          {data.all_contract.length === 0 ? (
            <Typography
              color="error"
              align="center"
              variant="body1"
              component="p"
            >
              No contracts
            </Typography>
          ) : (
            <Box>
              <TablePublic
                headers={[
                  "Start Date",
                  "End Date",
                  "Status",
                  "Salary",
                  "Holidays",
                  ""
                ]}
              >
                <TableBody>
                  {data.all_contract
                    .sort((a: any, b: any) =>
                      a.end_date < b.end_date ? 1 : -1
                    )
                    .map((contract: any) => (
                      <TableRow key={contract._id}>
                        <TableCell align="center">
                          {contract.start_date}
                        </TableCell>
                        <TableCell align="center">
                          {contract.end_date}
                        </TableCell>
                        <TableCell align="center">
                          {contract._isActive ? (
                            <Typography
                              borderRadius={2}
                              fontWeight={600}
                              sx={{ bgcolor: green[100] }}
                              color="green"
                            >
                              Active
                            </Typography>
                          ) : (
                            <Typography
                              fontWeight={600}
                              bgcolor={red[100]}
                              borderRadius={2}
                              color={red[500]}
                            >
                              Inactive
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell align="center">{contract.salary}</TableCell>
                        <TableCell align="center">
                          {contract.holidays}
                        </TableCell>
                        <TableCell align="center">
                          {contract._isActive?(
                          <Button variant="contained" color="error">
                            End contract
                          </Button>

                          ):(<Typography>Finshed </Typography>)}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </TablePublic>
            </Box>
          )}
        </Box>
      </Box>
    </div>
  );
}

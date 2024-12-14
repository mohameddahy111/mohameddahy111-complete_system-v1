"use client";

import { LoadingButton } from "@mui/lab";
import {
  Box,
  Grid2,
  InputBase,
  MenuItem,
  Switch,
  TextField,
  Typography
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import * as React from "react";

export interface IAddEmployessProps {}

export default function AddEmployess({}: IAddEmployessProps) {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      basic_Info: {
        name: "",
        email: "",
        phone: "",
        position: "",
        branch: "",
        department: "",
        _isAdmin: false,
        insurance: false,
        insurance_number: "",
        start_date: "",
        shift_time:"",
        age:'',
        birthday:''
      },
      secondary_Info: {
        whatsapp: ""
      }
    },
    onSubmit: async (values) => {
      console.log(values)
      await axios
        .post("/api/employees", values)
        .then((res) => {
          if (res.status === 201) {
            enqueueSnackbar("Employee created successfully", {
              variant: "success"
            });
            router.push("/dashboard/employees");
            formik.resetForm();
          }
        })
        .catch((err) => {
          enqueueSnackbar(err.response.data.message, {
            variant: "error"
          });
        });
    }
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Box
        width={"100%"}
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          gap: 5
        }}
      >
        <Typography variant="h1" component="h1">
          add new employee
        </Typography>
        <Box p={3} bgcolor={"white"} borderRadius={"10px"}>
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 12 }}>
              <Typography variant="h6" component="h6">
                Basic information
              </Typography>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <TextField
                name="basic_Info.name"
                label="Name"
                variant="outlined"
                fullWidth
                required
                autoComplete="name"
                value={formik.values.basic_Info.name}
                onChange={formik.handleChange}
                error={
                  formik.touched.basic_Info?.name &&
                  Boolean(formik.errors.basic_Info?.name)
                }
                helperText={
                  formik.touched.basic_Info?.name &&
                  (formik.errors.basic_Info?.name as string)
                }
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <TextField
                name="basic_Info.email"
                label="Email"
                variant="outlined"
                fullWidth
                required
                autoComplete="email"
                value={formik.values.basic_Info.email}
                onChange={formik.handleChange}
                error={
                  formik.touched.basic_Info?.email &&
                  Boolean(formik.errors.basic_Info?.email)
                }
                helperText={
                  formik.touched.basic_Info?.email &&
                  (formik.errors.basic_Info?.email as string)
                }
              />
            </Grid2>

            <Grid2 size={{ xs: 12, sm: 4 }}>
              <TextField
                name="basic_Info.phone"
                label="Phone"
                variant="outlined"
                fullWidth
                required
                autoComplete="phone"
                value={formik.values.basic_Info.phone}
                onChange={formik.handleChange}
                error={
                  formik.touched.basic_Info?.phone &&
                  Boolean(formik.errors.basic_Info?.phone)
                }
                helperText={
                  formik.touched.basic_Info?.phone &&
                  (formik.errors.basic_Info?.phone as string)
                }
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <TextField
                name="basic_Info.age"
                label="age"
                variant="outlined"
                fullWidth
                required
                autoComplete="age"
                value={formik.values.basic_Info.age}
                onChange={formik.handleChange}
                error={
                  formik.touched.basic_Info?.age &&
                  Boolean(formik.errors.basic_Info?.age)
                }
                helperText={
                  formik.touched.basic_Info?.age &&
                  (formik.errors.basic_Info?.age as string)
                }
              />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <TextField
                name="basic_Info.position"
                label="Position"
                variant="outlined"
                fullWidth
                required
                autoComplete="position"
                value={formik.values.basic_Info.position}
                onChange={formik.handleChange}
                error={
                  formik.touched.basic_Info?.position &&
                  Boolean(formik.errors.basic_Info?.position)
                }
                helperText={
                  formik.touched.basic_Info?.position &&
                  (formik.errors.basic_Info?.position as string)
                }
                select
              >
                <MenuItem value="manager">Manager</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="employee">Employee</MenuItem>
                <MenuItem value="supervisor">Supervisor</MenuItem>
                <MenuItem value="head manager">Head Manager</MenuItem>
              </TextField>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <TextField
                select
                name="basic_Info.branch"
                label="Branch"
                variant="outlined"
                fullWidth
                required
                autoComplete="branch"
                value={formik.values.basic_Info.branch}
                onChange={formik.handleChange}
                error={
                  formik.touched.basic_Info?.branch &&
                  Boolean(formik.errors.basic_Info?.branch)
                }
                helperText={
                  formik.touched.basic_Info?.branch &&
                  (formik.errors.basic_Info?.branch as string)
                }
              >
                <MenuItem value="alex">Alex</MenuItem>
                <MenuItem value="cairo">Cairo</MenuItem>
              </TextField>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <TextField
                select
                name="basic_Info.department"
                label="Department"
                variant="outlined"
                fullWidth
                required
                autoComplete="department"
                value={formik.values.basic_Info.department}
                onChange={formik.handleChange}
                error={
                  formik.touched.basic_Info?.department &&
                  Boolean(formik.errors.basic_Info?.department)
                }
                helperText={
                  formik.touched.basic_Info?.department &&
                  (formik.errors.basic_Info?.department as string)
                }
              >
                <MenuItem value="IT">IT</MenuItem>
                <MenuItem value="HR">HR</MenuItem>
                <MenuItem value="Finance">Finance</MenuItem>
                <MenuItem value="Marketing">Marketing</MenuItem>
              </TextField>
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 4 }}>
              <TextField
                select
                name="basic_Info.shift_time"
                label="Shift Time"
                variant="outlined"
                fullWidth
                required
                autoComplete="shift_time"
                value={formik.values.basic_Info.shift_time}
                onChange={formik.handleChange}
                error={
                  formik.touched.basic_Info?.shift_time &&
                  Boolean(formik.errors.basic_Info?.shift_time)
                }
                helperText={
                  formik.touched.basic_Info?.shift_time &&
                  (formik.errors.basic_Info?.shift_time as string)
                }
              >
                <MenuItem value="morning shift">morning shift</MenuItem>
                <MenuItem value="afternoon shift">afternoon shift</MenuItem>
                <MenuItem value="evening shift">evening shift</MenuItem>
              </TextField>
            </Grid2>
            <Grid2  size={{ xs:12 ,sm:5}} display={'flex'} flexDirection={'column'} gap={2}>
              <label> Start Date</label>
              <TextField
                name="basic_Info.start_date"
                variant="outlined"
                required
                type="date"
                size="small"
                autoComplete="start_date"
                value={formik.values.basic_Info.start_date}
                onChange={formik.handleChange}
                error={
                  formik.touched.basic_Info?.start_date &&
                  Boolean(formik.errors.basic_Info?.start_date)
                }
                helperText={
                  formik.touched.basic_Info?.start_date &&
                  formik.errors.basic_Info?.start_date
                }
              />
            </Grid2>
            <Grid2 size={{ xs:12 ,sm:5}} offset={1} display={'flex'} flexDirection={'column'} gap={2}>
              <label> Birthday</label>
              <TextField
                name="basic_Info.birthday"
                variant="outlined"
                required
                type="date"
                size="small"
                autoComplete="birthday"
                value={formik.values.basic_Info.birthday}
                onChange={formik.handleChange}
                error={
                  formik.touched.basic_Info?.birthday &&
                  Boolean(formik.errors.basic_Info?.birthday)
                }
                helperText={
                  formik.touched.basic_Info?.birthday &&
                  formik.errors.basic_Info?.birthday
                }
              />
            </Grid2>
            <Grid2
              size={{ xs: 12, sm: 4 }}
              display={"flex"}
              alignItems={"center"}
            >
              <Typography> Is Admin </Typography>
              <Switch
                name="basic_Info._isAdmin"
                checked={formik.values.basic_Info._isAdmin}
                onChange={formik.handleChange}
                inputProps={{ "aria-label": "controlled" }}
              />
            </Grid2>
            <Grid2
              size={{ xs: 12, sm: 8 }}
              display={"flex"}
              alignItems={"center"}
              gap={3}
            >
              <Typography> Is Insurance </Typography>
              <Switch
                name="basic_Info.insurance"
                checked={formik.values.basic_Info.insurance}
                onChange={formik.handleChange}
                inputProps={{ "aria-label": "controlledq" }}
              />
            {formik.values.basic_Info.insurance && (
              <Grid2 size={{ xs: 12, sm: 4 }}>
                <TextField
                  name="basic_Info.insurance_number"
                  label="Insurance Number"
                  fullWidth
                  size="small"
                  value={formik.values.basic_Info.insurance_number}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.basic_Info?.insurance_number &&
                    Boolean(formik.errors.basic_Info?.insurance_number)
                  }
                  helperText={
                    formik.touched.basic_Info?.insurance_number &&
                    (formik.errors.basic_Info?.insurance_number as string)
                  }
                />
              </Grid2>
            )}
            </Grid2>
          </Grid2>
        </Box>
        <Box bgcolor={"white"} p={3} borderRadius={"10px"}>
          <Grid2 container spacing={2}>
            <Grid2 size={{ xs: 12, sm: 8 }}>
              <Typography variant="h6" component="h6" py={2}>
                Secondary information
              </Typography>
              <Grid2 size={{ xs: 12, sm: 6 }}>
                <TextField
                  name="secondary_Info.whatsapp"
                  label="Whatsapp"
                  variant="outlined"
                  fullWidth
                  autoComplete="whatsapp"
                  value={formik.values.secondary_Info.whatsapp}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.secondary_Info?.whatsapp &&
                    Boolean(formik.errors.secondary_Info?.whatsapp)
                  }
                  helperText={
                    formik.touched.secondary_Info?.whatsapp &&
                    (formik.errors.secondary_Info?.whatsapp as string)
                  }
                />
              </Grid2>
            </Grid2>
          </Grid2>
        </Box>
        <Box display={"flex"} justifyContent={"end"}>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={formik.isSubmitting}
          >
            Submit
          </LoadingButton>
        </Box>
      </Box>
    </form>
  );
}

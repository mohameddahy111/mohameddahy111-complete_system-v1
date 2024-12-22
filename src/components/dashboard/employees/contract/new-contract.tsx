"use client";

import { createContract } from "@/app/actions";
import { AddOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid2,
  InputAdornment,
  InputLabel,
  MenuItem,
  TextField,
  Typography
} from "@mui/material";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import * as React from "react";

export interface INewContarctProps {
  decoded: any;
  employeeId: string;
  employeeName: string;
}

export default function NewContarct({
  decoded,
  employeeId,
  employeeName
}: INewContarctProps) {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const router = useRouter()
  const handleClose = () => {
    formik.resetForm();
    setOpen(false);
  };
  const formik = useFormik({
    initialValues: {
      employee: employeeId,
      end_date: "",
      start_date: "",
      salary: 0,
      holidays: 0,
      created_id: decoded.adminId,
      created_by: "",
      _isActive: 1,
      notes: ""
    },
    onSubmit: async (values) => {
        console.log(values)
      const result = await createContract(values);
      if (result.status === 201) {
        enqueueSnackbar(result.message, {
          variant: "success"
        });
        router.push("/dashboard/employees")
        handleClose()
      } else {
        enqueueSnackbar(result.message, {
          variant: "error"
        });
      }
    }
  });
  return (
    <React.Fragment>
      <Button
        onClick={handleOpen}
        variant="contained"
        sx={{ color: "white" }}
        startIcon={<AddOutlined />}
      >
        Add Contract
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"md"}
      >
        <DialogTitle textTransform={"capitalize"}>
          new Contarct to{" "}
          <Typography
            component={"span"}
            fontWeight={600}
            variant="h6"
            color="primary.main"
          >
            ( {employeeName})
          </Typography>
        </DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <Grid2 container spacing={3} sx={{ marginTop: "20px" }}>
              <Grid2 size={{ xs: 12, sm: 6 }}>
                <Box display={"flex"} gap={1} flexDirection={"column"}>
                  <InputLabel>Start Date</InputLabel>
                  <TextField
                    type="date"
                    fullWidth
                    name="start_date"
                    required
                    onChange={formik.handleChange}
                    value={formik.values.start_date}
                    error={
                      formik.touched.start_date &&
                      Boolean(formik.errors.start_date)
                    }
                    helperText={
                      formik.touched.start_date && formik.errors.start_date
                    }
                  />
                </Box>
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 6 }}>
                <Box display={"flex"} gap={1} flexDirection={"column"}>
                  <InputLabel>End Date</InputLabel>
                  <TextField
                    type="date"
                    fullWidth
                    name="end_date"
                    required
                    onChange={formik.handleChange}
                    value={formik.values.end_date}
                    error={
                      formik.touched.end_date && Boolean(formik.errors.end_date)
                    }
                    helperText={
                      formik.touched.end_date && formik.errors.end_date
                    }
                  />
                </Box>
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 6 }}>
                <Box display={"flex"} gap={1} flexDirection={"column"}>
                  <InputLabel>Salary</InputLabel>
                  <TextField
                    name="salary"
                    type="number"
                    required
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position="start"> $ </InputAdornment>
                        )
                      }
                    }}
                    onChange={formik.handleChange}
                    value={formik.values.salary}
                    error={
                      formik.touched.salary && Boolean(formik.errors.salary)
                    }
                    helperText={formik.touched.salary && formik.errors.salary}
                  />
                </Box>
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 6 }}>
                <Box display={"flex"} gap={1} flexDirection={"column"}>
                  <InputLabel sx={{ textTransform: "capitalize" }}>
                    {" "}
                    holidays{" "}
                  </InputLabel>
                  <TextField
                    name="holidays"
                    type="number"
                    required
                    slotProps={{
                      input: {
                        endAdornment: (
                          <InputAdornment position="start">
                            {" "}
                            Days{" "}
                          </InputAdornment>
                        )
                      }
                    }}
                    onChange={formik.handleChange}
                    value={formik.values.holidays}
                    error={
                      formik.touched.holidays && Boolean(formik.errors.holidays)
                    }
                    helperText={
                      formik.touched.holidays && formik.errors.holidays
                    }
                  />
                </Box>
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 6 }}>
                <Box display={"flex"} gap={1} flexDirection={"column"}>
                  <InputLabel sx={{ textTransform: "capitalize" }}>
                    {" "}
                    holidays{" "}
                  </InputLabel>
                  <TextField
                    name="_isActive"
                    required
                    select
                    onChange={formik.handleChange}
                    value={formik.values._isActive}
                    error={
                      formik.touched._isActive &&
                      Boolean(formik.errors._isActive)
                    }
                    helperText={
                      formik.touched._isActive && formik.errors._isActive
                    }
                  >
                    <MenuItem value={1}>Active</MenuItem>
                    <MenuItem value={0}>Ended</MenuItem>
                  </TextField>
                </Box>
              </Grid2>
            </Grid2>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <LoadingButton
                variant="contained"
                loading={formik.isSubmitting}
                type="submit"
              >
                Save
              </LoadingButton>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

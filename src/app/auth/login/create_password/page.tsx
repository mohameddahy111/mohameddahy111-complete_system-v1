"use client";

import { createPassword } from "@/app/actions";
import { singInSchema } from "@/utils/vailditon/auth.yup";
import { SaveOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, List, ListItem, TextField, Typography } from "@mui/material";
import { grey, indigo } from "@mui/material/colors";
import { useFormik } from "formik";
import { useSnackbar } from "notistack";
import * as React from "react";

export interface ICreatePasswordProps {}

export default function CreatePassword(props: ICreatePasswordProps) {
  const { enqueueSnackbar } = useSnackbar();
  const formik = useFormik({
    validationSchema: singInSchema.unknown(),
    initialValues: {
      password: "",
      cPassword: "",
      phone: ""
    },
    onSubmit: async (values) => {
      if (values.password !== values.cPassword) {
        enqueueSnackbar("Passwords do not match", {
          variant: "error"
        });
        return;
      }
     const result = await createPassword(values);
     if (result.status === 400) {
       enqueueSnackbar(result.message, {
         variant: "error",
       });
     }
    }
  });
  return (
    <div className="bg_gradient">
      <Typography
        align="center"
        variant="h4"
        color={grey[700]}
        fontWeight={700}
        component={"h1"}
      >
        <Typography
          align="center"
          color={indigo[400]}
          fontWeight={700}
          display={"block"}
          variant="h4"
          component="span"
        >
          Welcome
        </Typography>
        we are glad to have you join us.
      </Typography>
      <Box>
        <Typography>Create your password and start your journey</Typography>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <List>
          <ListItem>
            <TextField
              name="phone"
              label="Phone Number"
              variant="outlined"
              fullWidth
              required
              size="small"
              slotProps={{
                input: {
                  sx: {
                    borderRadius: "15px",
                    backgroundColor: "white",
                    width: "300px"
                  }
                }
              }}
              autoComplete="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
          </ListItem>
          <ListItem>
            <TextField
              name="password"
              label="password"
              variant="outlined"
              fullWidth
              required
              type="password"
              size="small"
              slotProps={{
                input: {
                  sx: {
                    borderRadius: "15px",
                    backgroundColor: "white",
                    width: "300px"
                  }
                }
              }}
              autoComplete="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </ListItem>
          <ListItem>
            <TextField
              name="cPassword"
              label="Confirm Password"
              variant="outlined"
              type="password"
              fullWidth
              required
              size="small"
              slotProps={{
                input: {
                  sx: {
                    borderRadius: "15px",
                    backgroundColor: "white",
                    width: "300px"
                  }
                }
              }}
              autoComplete="cPassword"
              value={formik.values.cPassword}
              onChange={formik.handleChange}
              error={
                formik.touched.cPassword && Boolean(formik.errors.cPassword)
              }
              helperText={formik.touched.cPassword && formik.errors.cPassword}
            />
          </ListItem>
          <ListItem>
            <LoadingButton
              type="submit"
              loading={formik.isSubmitting}
              sx={{ borderRadius: "20px", bgcolor: indigo[500] }}
              variant="contained"
              fullWidth
              startIcon={<SaveOutlined />}
            >
              Save
            </LoadingButton>
          </ListItem>
        </List>
      </form>
    </div>
  );
}

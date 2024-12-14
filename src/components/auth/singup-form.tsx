import { singupSchema } from "@/utils/vailditon/auth.yup";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  TextField,
  Typography
} from "@mui/material";
import { useFormik } from "formik";
import * as React from "react";
import { LoadingButton } from "@mui/lab";
import Link from "next/link";
import { useSnackbar } from "notistack";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";

export interface ISingUpFormProps {
  fun: Function
}

export default function SingUpForm({fun}: ISingUpFormProps) {
  const { enqueueSnackbar } = useSnackbar();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      cpassword: ""
    },
    validationSchema: singupSchema.noUnknown(),
    onSubmit: async (values) => {
      if (values.password !== values.cpassword) {
        enqueueSnackbar("Passwords do not match", {
          variant: "error"
        });
      }
      await axios
        .post("/api/auth/singup", values)
        .then((response) => {
          if (response.status === 201) {
            enqueueSnackbar(response.data.message, {
              variant: "success"
            });
            formik.resetForm();
            fun(0)
          } else {
            enqueueSnackbar(response.data.message, {
              variant: "error"
            });
          }
        })
        .catch((error) => {
          enqueueSnackbar(error.response.data.message, {
            variant: "error"
          });
        });
    }
  });
  return (
    <Box>
      <form onSubmit={formik.handleSubmit}>
        <List>
          <ListItem>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              required
              slotProps={{
                input: {
                  sx: {
                    borderRadius: "15px"
                  }
                }
              }}
            />
          </ListItem>
          <ListItem>
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              required
              slotProps={{
                input: {
                  sx: {
                    borderRadius: "15px"
                  }
                }
              }}
            />
          </ListItem>
          <ListItem>
            <TextField
              fullWidth
              label="Confirm Password"
              name="cpassword"
              type="password"
              value={formik.values.cpassword}
              onChange={formik.handleChange}
              error={
                formik.touched.cpassword && Boolean(formik.errors.cpassword)
              }
              helperText={formik.touched.cpassword && formik.errors.cpassword}
              required
              slotProps={{
                input: {
                  sx: {
                    borderRadius: "15px"
                  }
                  // endAdornment: (
                  //   <InputAdornment position="end">
                  //     <IconButton
                  //     >
                  //       <VisibilityOff />
                  //     </IconButton>
                  //   </InputAdornment>
                  // )
                }
              }}
            />
          </ListItem>
          <ListItem>
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              required
              slotProps={{
                input: {
                  sx: {
                    borderRadius: "15px"
                  }
                }
              }}
            />
          </ListItem>
          <ListItem>
            <TextField
              fullWidth
              label="Phone Number"
              name="phone"
              type="tel"
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
              required
              slotProps={{
                input: {
                  sx: {
                    borderRadius: "15px"
                  }
                }
              }}
            />
          </ListItem>
          <ListItem>
            <LoadingButton
              fullWidth
              loading={formik.isSubmitting}
              type="submit"
              variant="contained"
              sx={{
                borderRadius: "20px",
                backgroundColor: "primary.main",
                color: "white",
                "&:hover": {
                  backgroundColor: "primary.dark"
                }
              }}
            >
              Sing Up
            </LoadingButton>
          </ListItem>
          <ListItem>
            <Button variant='text' onClick={()=>fun(0)}>
              <Typography variant="body2" sx={{ color: "primary.main" }}>
                Already have an account? Sign in
              </Typography>
            </Button>
          </ListItem>
        </List>
      </form>
    </Box>
  );
}

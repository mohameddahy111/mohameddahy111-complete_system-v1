import { singInSchema } from "@/utils/vailditon/auth.yup";
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
import { useSnackbar } from "notistack";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { AdminRedirect } from "@/app/actions";
import { useRouter } from "next/navigation";

export interface ISingInFormProps {
  fun: Function;
}

export default function SingInForm({ fun }: ISingInFormProps) {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      password: "",
      phone: ""
    },
    validationSchema: singInSchema,
    onSubmit: async (values) => {
      await axios
        .post("/api/auth/singin", values)
        .then((response) => {
          if (response.status === 200) {
            enqueueSnackbar(response.data.message, {
              variant: "success"
            });
            formik.resetForm();
            if (response.data.isAdmin) {
              router.push("/dashboard");
            }else{
              router.push("/");
            }
          } else if (response.status === 202) {
            enqueueSnackbar(response.data.message, {
              variant: "success"
            });
            AdminRedirect()
          }
          else {
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
    <Box >
      <form onSubmit={formik.handleSubmit}>
        <List>
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
              Sing in
            </LoadingButton>
          </ListItem>
          <ListItem>
            <Button variant="text" onClick={() => fun(1)}>
              <Typography variant="body2" sx={{ color: "primary.main" }}>
                I don't have an account / sing up
              </Typography>
            </Button>
          </ListItem>
        </List>
      </form>
    </Box>
  );
}

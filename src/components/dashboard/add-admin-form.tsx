"use client";

import {
  Box,
  Button,
  Grid2,
  MenuItem,
  TextField,
  Typography
} from "@mui/material";
import { red } from "@mui/material/colors";
import { useFormik } from "formik";
import * as React from "react";

export interface IAddAdminFormProps {}

export default function AddAdminForm(props: IAddAdminFormProps) {
  const [gPassword, setGPassword] = React.useState("");
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: gPassword ?? "",
      position: "",
      phone: ""
    },
    onSubmit: (values) => {
      console.log(values);
    }
  });
  function generatePassword() {
    const length = 12;
    const characters =
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$";
    const reuselt = Array.from(crypto.getRandomValues(new Uint32Array(length)))
      .map((x) => characters[x % characters.length])
      .join("");
    setGPassword(reuselt);
  }
  React.useMemo(() => {
    formik.values.password = gPassword;
  }, [gPassword]);
  return (
    <form>
      <Typography variant="body1" component="p" my={2} color={red[400]}>
        * password create automatically when you press create password button
      </Typography>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            required
            autoComplete="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            required
            autoComplete="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            required
            autoComplete="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button onClick={generatePassword}>create password</Button>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <TextField
            label="Phone"
            variant="outlined"
            fullWidth
            required
            autoComplete="phone"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
          />
        </Grid2>
        <Grid2 size={{ xs: 12 }}>
          <TextField
            label="Position"
            variant="outlined"
            fullWidth
            required
            autoComplete="position"
            name="position"
            value={formik.values.position}
            onChange={formik.handleChange}
            error={formik.touched.position && Boolean(formik.errors.position)}
            helperText={formik.touched.position && formik.errors.position}
            select
          >
            <MenuItem value="manager">Manager</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="employee">Employee</MenuItem>
            <MenuItem value="supervisor">Supervisor</MenuItem>
            <MenuItem value="head manager">Head Manager</MenuItem>
          </TextField>
        </Grid2>
      </Grid2>
      <Box my={3} display={"flex"} justifyContent={"end"}>
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Box>
    </form>
  );
}

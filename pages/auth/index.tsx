import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import capitalize from "lodash/capitalize";
import {
  Card,
  CardContent,
  FormControl,
  TextField,
  Grid,
  Button,
  LinearProgress,
} from "@material-ui/core";

import LoadingSpinner from "../../components/ui/LoadingSpinner/LoadingSpinner";
import CustomDialog from "../../components/ui/CustomDialog/CustomDialog";
import authCtx from "../../ctxStore/authCtx";
import cartCtx from "../../ctxStore/cartCtx";
import { onLogin } from "./util/index.util";

const validationSchema = yup.object({
  email: yup
    .string()
    .required("email is requierd")
    .email("enter a valid email")
    .max(40, "too long email"),
  password: yup
    .string()
    .required("password is requierd")
    .min(6, "password must be more than 6")
    .max(40, "password must be less than too 40"),
});

const inputs: { name: "email" | "password"; type: string }[] = [
  { name: "email", type: "text" },
  { name: "password", type: "password" },
];

const Login = () => {
  const [dialog, setDialog] = useState(false);
  const { authSuccess, startRefreshTokenTimer } = useContext(authCtx);
  const { loadCart } = useContext(cartCtx);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema,
    onSubmit: () => {},
  });

  const login = async () => {
    await onLogin(
      formik.values.email,
      formik.values.password,
      authSuccess,
      loadCart,
      startRefreshTokenTimer
    );
  };

  const isFieldsCompleted = !!formik.values.email && !!formik.values.password;

  return (
    <Grid container justifyContent="center">
      <LoadingSpinner open={false} renderLoader={false} />
      <CustomDialog
        open={dialog}
        title="error"
        text={false || "issue with user end point !"}
        onLastButtonClicked={() => setDialog(false)}
        hideFirstButton={true}
      />
      <Grid item lg={4}>
        {false && <LinearProgress />}
        <Card>
          <CardContent>
            {inputs.map(({ name, type }) => (
              <FormControl fullWidth key={name}>
                <TextField
                  id={name}
                  label={capitalize(name)}
                  type={type}
                  value={formik.values[name]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched[name] && !!formik.errors[name]}
                  helperText={formik.touched[name] && formik.errors[name]}
                />
              </FormControl>
            ))}
            <Button
              onClick={login}
              color="primary"
              variant="outlined"
              disabled={!formik.isValid || !isFieldsCompleted}
              style={{ display: "Block", marginTop: "15px" }}
            >
              login
            </Button>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Login;

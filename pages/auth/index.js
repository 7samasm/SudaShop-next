import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  CardContent,
  FormControl,
  TextField,
  Grid,
  Button,
  LinearProgress,
} from "@material-ui/core";

import { useHttp } from "../../hooks/http";
import Axios from "../../axios";
import authCtx from "../../ctxStore/auth_ctx";
import LoadingSpinner from "../../components/ui/LoadingSpinner/LoadingSpinner";
import CustomDialog from "../../components/ui/CustomDialog/CustomDialog";
import cartCtx from "../../ctxStore/cart_ctx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const changeEmail = (e) => setEmail(e.target.value);
  const changePassword = (e) => setPassword(e.target.value);
  const [dialog, setDialog] = useState(false);

  const authContext = useContext(authCtx);
  const { setCart } = useContext(cartCtx);
  const { data, loading, error, sendRequest } = useHttp();

  useEffect(() => {
    if (error) {
      console.log(error);
      setDialog(true);
    }
    if (data) {
      const { token, userId } = data;
      Axios(token)
        .get("/admin/user")
        .then(({ data: { user } }) => {
          localStorage.setItem("isLoggedIn", !!token);
          localStorage.setItem("user", JSON.stringify(user));
          authContext.authSuccess(token, userId, user);
          return Axios(token).get("/admin/cart");
        })
        .then(({ data }) => {
          setCart(data);
          authContext.startRefreshTokenTimer(token);
        })
        .catch((err) => {
          console.log(err);
          setDialog(true);
        });
    }
  }, [data, error]);
  const login = () => {
    sendRequest("/admin/login", "post", { email, password });
  };
  return (
    <Grid container justifyContent="center">
      <LoadingSpinner open={loading} renderLoader={false} />
      <CustomDialog
        open={dialog}
        title="error"
        text={error || "issue with user end point !"}
        onLastButtonClicked={() => setDialog(false)}
        hideFirstButton={true}
      />
      <Grid item lg={4}>
        {loading && <LinearProgress />}
        <Card>
          <CardContent>
            <FormControl fullWidth>
              <TextField label="Email" onChange={changeEmail} value={email} />
            </FormControl>
            <FormControl fullWidth>
              <TextField
                label="Password"
                onChange={changePassword}
                value={password}
                type="password"
              />
            </FormControl>
            <Button
              onClick={() => login()}
              color="primary"
              variant="outlined"
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

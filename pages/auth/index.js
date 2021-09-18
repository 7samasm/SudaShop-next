import React, { useState, useContext } from "react";
import {
  Card,
  CardContent,
  FormControl,
  TextField,
  Grid,
  Button,
  LinearProgress,
} from "@material-ui/core";

import { signin, getSession } from "next-auth/client";

import { useHttp } from "../../hooks/http";
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

  const { authSuccess, startRefreshTokenTimer } = useContext(authCtx);
  const { getAndSetCart } = useContext(cartCtx);
  // const [session] = useSession();
  const { data, loading, error, sendRequest } = useHttp();

  const login = async () => {
    try {
      const result = await signin("credentials", {
        redirect: false,
        email,
        password,
      });
      if (result.error) {
        throw new Error(result.error);
      }
      const { accessToken, refreshToken, user } = await getSession();
      authSuccess(accessToken, user.userId, user);
      await getAndSetCart(accessToken);
      startRefreshTokenTimer(accessToken, refreshToken);
    } catch (error) {
      console.log(error.message);
    }
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
              onClick={login}
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

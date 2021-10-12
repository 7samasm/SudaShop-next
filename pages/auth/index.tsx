import React, { useState, useContext, ChangeEvent } from "react";
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
import LoadingSpinner from "../../components/ui/LoadingSpinner/LoadingSpinner";
import CustomDialog from "../../components/ui/CustomDialog/CustomDialog";
import authCtx from "../../ctxStore/authCtx";
import cartCtx from "../../ctxStore/cartCtx";
import { onLogin } from "./util/index.util";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const changeEmail = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const changePassword = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);
  const [dialog, setDialog] = useState(false);

  const { authSuccess, startRefreshTokenTimer } = useContext(authCtx);
  const { getAndSetCart } = useContext(cartCtx);
  // const [session] = useSession();
  const { data, loading, error, sendRequest } = useHttp();

  const login = async () => {
    await onLogin(
      email,
      password,
      authSuccess,
      getAndSetCart,
      startRefreshTokenTimer
    );
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

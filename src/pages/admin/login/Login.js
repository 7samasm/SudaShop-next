import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Card,
  CardContent,
  FormControl,
  TextField,
  Grid,
  Button,
  LinearProgress,
} from "@material-ui/core";

import { useHttp } from "../../../hooks/http";
import {
  authSuccess,
  startRefreshTokenTimer,
  setCart,
} from "../../../store/actions";
import Axios from "../../../axios";
import LoadingSpinner from "../../../components/ui/LoadingSpinner/LoadingSpinner";
import CustomDialog from "../../../components/ui/CustomDialog/CustomDialog";

const Login = (props) => {
  const { authSuccess, startRefreshTokenTimer, setCart } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const changeEmail = (e) => setEmail(e.target.value);
  const changePassword = (e) => setPassword(e.target.value);
  const [dialog, setDialog] = useState(false);

  const { data, loading, error, sendRequest } = useHttp();

  useEffect(() => {
    if (error) {
      setDialog(true);
    }
    if (data) {
      const { token, userId, tokenExpiration } = data;
      Axios(token)
        .get("/admin/user")
        .then(({ data: { user } }) => {
          const expirationDate = new Date(
            new Date().getTime() + tokenExpiration * 1000
          );
          localStorage.setItem("isLoggedIn", !!token);
          localStorage.setItem("user", JSON.stringify(user));
          authSuccess(token, userId, expirationDate, user);
          return Axios(token).get("/admin/cart");
        })
        .then(({ data }) => {
          setCart(data);
          startRefreshTokenTimer();
        })
        .catch((err) => {
          setDialog(true);
        });
    }
  }, [data, error, startRefreshTokenTimer, authSuccess, setCart]);
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

export default connect(null, {
  authSuccess,
  startRefreshTokenTimer,
  setCart,
})(Login);

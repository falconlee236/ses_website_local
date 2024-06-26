import React, { useState, useCallback, Fragment } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { Button,  Typography } from "@mui/material";
import withStyles from '@mui/styles/withStyles';
import FormDialog from "../../../shared/components/FormDialog";
import ButtonCircularProgress from "../../../shared/components/ButtonCircularProgress";
import {GoogleOAuthProvider, useGoogleLogin} from "@react-oauth/google";
import axios from "axios";
import Cookies from "js-cookie";

const styles = (theme) => ({
  forgotPassword: {
    marginTop: theme.spacing(2),
    color: theme.palette.primary.main,
    cursor: "pointer",
    "&:enabled:hover": {
      color: theme.palette.primary.dark,
    },
    "&:enabled:focus": {
      color: theme.palette.primary.dark,
    },
  },
  disabledText: {
    cursor: "auto",
    color: theme.palette.text.disabled,
  },
  formControlLabel: {
    marginRight: 0,
  },
});

const GoogleLoginButton = (props) => {
  const {history, setIsLoading, setStatus, onClose} = props;
  const redirectUrI = process.env.REACT_APP_REDIRECT_URI;

  const signIn = useGoogleLogin({
    onSuccess: (res) => {
      console.dir(res);
      axios.post(
        `https://soundeffect-search.p-e.kr:8443/accounts/google/callback/re/?code=${res?.code}`
      )
        .then(
        response => {
          const {access_token, refresh_token} = response.data.token;
          const userData = response.data.user;

          setTimeout(() => {
            Cookies.set('accessToken', access_token);
            Cookies.set('refreshToken', refresh_token);
            localStorage.setItem('userinfo', JSON.stringify(userData));
            console.log(response.data);
            history.push("/");
            onClose();
            window.location.reload();
          }, 150);
        }
      )
        .catch(error => {
          console.log(error);
          onClose();
        });
    },
    onError: (error) =>{
      setTimeout(() => {
        setStatus("loginFailed");
        setIsLoading(false);
      }, 1500);
      console.log(error);
    },
    flow: "auth-code",
    redirect_uri: redirectUrI,
  });

  const login = useCallback(() => {
    setIsLoading(true);
    setStatus(null);
    signIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setIsLoading, history, setStatus]);

  return (
    <div onClick={() => login()} style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
      <img src={`${process.env.PUBLIC_URL}/images/logged_out/google_logo.png`} alt="Login with Google" style={{ cursor: 'pointer', marginRight: "1rem" }} />
      <Typography variant="h6" component="h2">
        Login with Google
      </Typography>
    </div>
  );
};

function LoginDialog(props) {
  const {
    setStatus,
    history,
    onClose,
  } = props;
  const [isLoading, setIsLoading] = useState(false);
  const clientId = process.env.REACT_APP_CLIENT_ID

  return (
    <Fragment>
      <FormDialog
        open
        onClose={onClose}
        loading={isLoading}
        hideBackdrop
        onFormSubmit={e => {
          e.preventDefault();
        }}
        headline="Login"
        content={
          <Fragment>
            <Typography sx={{ fontWeight: 'bold' }}>
              Sign With Google
            </Typography>
          </Fragment>
        }
        actions={
          <Fragment>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              disabled={isLoading}
              size="large"
            >
              <GoogleOAuthProvider clientId={clientId}>
                <GoogleLoginButton
                  history={history}
                  setIsLoading={setIsLoading}
                  setStatus={setStatus}
                  onClose={onClose}
                />
              </GoogleOAuthProvider>
              {isLoading && <ButtonCircularProgress />}
            </Button>
          </Fragment>
        }
      />
    </Fragment>
  );
}

LoginDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired,
  openChangePasswordDialog: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  status: PropTypes.string,
};

export default withRouter(withStyles(styles)(LoginDialog));

import React, {useEffect} from "react";
import { withStyles } from "@mui/styles";
import {
  Container,
  Paper,
  Typography,
  Avatar,
  Grid
} from "@mui/material";

const styles = (theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: theme.palette.background.default,
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(6),
    maxWidth: 400,
  },
  avatar: {
    width: theme.spacing(16),
    height: theme.spacing(16),
  },
});

function Profile(props) {
  const { classes, selectProfile} = props;
  const userObj = JSON.parse(localStorage.getItem("userinfo"));
  console.dir(userObj);

  useEffect(() => {
    selectProfile();
  }, [selectProfile]);

  return (
    <Container className={classes.container}>
      <Paper className={classes.paper}>
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          <Grid item>
            <Avatar
              alt="User Avatar"
              className={classes.avatar}
              src={userObj.picture}
            />
          </Grid>
          <Grid item>
            <Typography variant="h4" gutterBottom>
              {userObj.name}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {userObj.email}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default withStyles(styles)(Profile);
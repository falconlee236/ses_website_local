import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import format from "date-fns/format";
import classNames from "classnames";
import { Typography, Card, Box } from "@mui/material";
import withStyles from '@mui/styles/withStyles';
import WaveSurferComponent from "../home/WaveSurferComponent";

const styles = (theme) => ({
  img: {
    width: "100%",
    height: "auto",
    marginBottom: 8,
  },
  card: {
    boxShadow: theme.shadows[2],
  },
  noDecoration: {
    textDecoration: "none !important",
  },
  title: {
    transition: theme.transitions.create(["background-color"], {
      duration: theme.transitions.duration.complex,
      easing: theme.transitions.easing.easeInOut,
    }),
    cursor: "pointer",
    color: theme.palette.secondary.main,
    "&:hover": {
      color: theme.palette.secondary.dark,
    },
    "&:active": {
      color: theme.palette.primary.dark,
    },
  },
  link: {
    transition: theme.transitions.create(["background-color"], {
      duration: theme.transitions.duration.complex,
      easing: theme.transitions.easing.easeInOut,
    }),
    cursor: "pointer",
    color: theme.palette.primary.main,
    "&:hover": {
      color: theme.palette.primary.dark,
    },
  },
  showFocus: {
    "&:focus span": {
      color: theme.palette.secondary.dark,
    },
  },
  gradientContainer: {
    inset: "0",
    background: "linear-gradient(to right, #4c51bf, #6b46c1)",
    opacity: "0.5",
    width: "100%",
    height: "100%",
    marginBottom: 8,
  },
});

function SoundListCard(props) {
  const { classes, url, src, date, title, snippet, audioURL } = props;
  return (
    <Card className={classes.card}>
      {src && (
        <Link to={url} tabIndex={-1}>
          {/*<img src={src} className={classes.img} alt="" />*/}
          <div className={classes.gradientContainer}>
            {audioURL && <WaveSurferComponent audioURL={audioURL}/>}
          </div>
        </Link>
      )}
      <Box p={2}>
        <Typography variant="body2" color="textSecondary">
          {format(new Date(date * 1000), "PPP", {
            awareOfUnicodeTokens: true,
          })}
        </Typography>
        <Link
          to={url}
          className={classNames(classes.noDecoration, classes.showFocus)}
        >
          <Typography variant="h6">
            <span className={classes.title}>{title}</span>
          </Typography>
        </Link>
        <Typography variant="body1" color="textSecondary">
          {snippet}
          <Link to={url} className={classes.noDecoration} tabIndex={-1}>
            <span className={classes.link}> read more...</span>
          </Link>
        </Typography>
      </Box>
    </Card>
  );
}

SoundListCard.propTypes = {
  classes: PropTypes.object.isRequired,
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
  snippet: PropTypes.string.isRequired,
  src: PropTypes.string,
};

export default withStyles(styles, { withTheme: true })(SoundListCard);

import React from "react";
import PropTypes from "prop-types";
import { Backdrop, CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "rgb(0 0 0 / 9%)",
  },
}));

const LoadingSpinner = ({ open, renderLoader }) => {
  const classes = useStyles();
  return (
    <Backdrop open={open} className={classes.backdrop}>
      {renderLoader && <CircularProgress color="secondary" />}
    </Backdrop>
  );
};

LoadingSpinner.propTypes = {
  open: PropTypes.bool.isRequired,
  renderLoader: PropTypes.bool.isRequired,
};

export default LoadingSpinner;

import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/styles";

import PanelItem from "../PanelItem/PanelItem";

const useStyles = makeStyles((theme) => {
  return {
    "mb-2": {
      marginBottom: theme.spacing(2),
    },
    "mb-5": {
      marginBottom: theme.spacing(5),
    },
  };
});

const PanelList = React.memo((props) => {
  const { title, productList } = props;

  const classes = useStyles();
  const theme = useTheme();
  const titleAlignment = theme.direction === "ltr" ? "left" : "right";
  useEffect(() => {
    console.log("%c [Panel list useEffect 1nd]", "color:teal;");
  });

  const transformedProductList = productList.map(({ _id, title }) => (
    <PanelItem title={title} id="60036d0b89a8bf0f76b5f2d3" key={_id} />
  ));

  return (
    <Grid container direction="column" className={classes["mb-5"]}>
      <Typography
        className={classes["mb-2"]}
        variant="body1"
        color="secondary"
        align={titleAlignment}
      >
        {title}
      </Typography>
      {transformedProductList}
    </Grid>
  );
});

PanelList.propTypes = {
  title: PropTypes.string.isRequired,
  productList: PropTypes.array.isRequired,
};

export default PanelList;

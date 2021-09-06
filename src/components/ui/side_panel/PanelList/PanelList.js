import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Grid, Typography } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";

import PanelItem from "../PanelItem/PanelItem";

const PanelList = React.memo((props) => {
  const { title, productList } = props;
  const theme = useTheme();
  const titleAlignment = theme.direction === "ltr" ? "left" : "right";
  useEffect(() => {
    console.log("%c [Panel list useEffect 1nd]", "color:teal;");
  });

  const transformedProductList = productList.map(({ _id, title }) => (
    <Link to={`/product/${_id}`} key={_id}>
      <PanelItem title={title} />
    </Link>
  ));

  return (
    <Grid container direction="column" className="mb-5">
      <Typography
        className="mb-2"
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

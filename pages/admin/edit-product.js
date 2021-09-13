import React from "react";
import { Grid } from "@material-ui/core";
import ProductForm from "../../components/ui/ProductForm/ProductForm";

const EditProduct = () => {
  return (
    <Grid container justifyContent="center">
      <Grid item lg={6}>
        <ProductForm editable={true} />
      </Grid>
    </Grid>
  );
};

export default EditProduct;

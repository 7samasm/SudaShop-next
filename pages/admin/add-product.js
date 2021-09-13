import React, { Component } from "react";
import { Grid } from "@material-ui/core";
import ProductForm from "../../components/ui/ProductForm/ProductForm";

export default class AddItem extends Component {
  componentDidMount() {
    console.log(this.props);
  }
  render() {
    return (
      <Grid container justifyContent="center">
        <Grid item lg={6}>
          <ProductForm history={this.props.history} />
        </Grid>
      </Grid>
    );
  }
}

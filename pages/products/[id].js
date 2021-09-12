import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Chip,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import {
  Category,
  LocationCity,
  Money,
  Person,
  AddShoppingCart,
} from "@material-ui/icons";
import Head from "next/head";
import { useState } from "react";
import Axios from "../../axios";

import CommentsList from "../../components/ui/comments/CommentsList/CommentsList";
import PanelList from "../../components/ui/side_panel/PanelList/PanelList";
import CartDialog from "../../pages__/ProductOverView/CartDialog";
import img from "../../public/images/d.jpg";

const useStyles = makeStyles((theme) => {
  return {
    media: {
      height: 300,
      backgroundSize: "contain !important",
      backgroundPosition: "center center",
    },
    "my-1": {
      margin: `${theme.spacing(1)}px 0`,
    },
    "my-4": {
      margin: `${theme.spacing(4)}px 0`,
    },
    "mb-5": {
      marginBottom: theme.spacing(5),
    },
    "py-3": { padding: `${theme.spacing(3)}px 0` },
    "align-self-center": {
      alignSelf: "center",
    },
    paddingCol: {
      padding: "0 12PX",
    },
    changeItemOrderOnMobile: {
      [theme.breakpoints.down("md")]: {
        order: 2,
      },
    },
  };
});

export default function ProductOverView({ postState }) {
  const classes = useStyles();
  const [dialogValue, setDialogValue] = useState(false);

  const InfoOnChips = () => {
    const mapDataOnChips = [
      { name: `${postState.price} SDG`, icon: Money },
      { name: postState.userId.name, icon: Person },
      { name: "khartoum", icon: LocationCity },
      { name: postState?.section, icon: Category },
    ].map((el) => (
      <Grid item xs={6} lg={3} className={classes["my-1"]} key={Math.random()}>
        <Grid container justifyContent="center">
          <Chip
            key={el.name}
            size="small"
            color="default"
            label={el.name}
            icon={<el.icon />}
          />
        </Grid>
      </Grid>
    ));
    return (
      <Grid container alignItems="center">
        {mapDataOnChips}
      </Grid>
    );
  };

  const toggleDialogValue = () => {
    setDialogValue(!dialogValue);
  };

  return (
    <>
      <Head>
        <title>{postState.title}</title>
      </Head>
      <Grid container justifyContent="flex-end">
        {/* side panels start */}
        <Grid
          item
          xs={12}
          md={5}
          className={classes.paddingCol + " " + classes.changeItemOrderOnMobile}
        >
          <PanelList
            title="see also"
            productList={[
              { _id: "1", title: "test" },
              { _id: "2", title: "test1" },
              { _id: "3", title: "test2" },
            ]}
          />
          <PanelList
            title="most comments"
            productList={[
              { _id: "1", title: "test" },
              { _id: "2", title: "test1" },
              { _id: "3", title: "test2" },
            ]}
          />
        </Grid>
        {/* side panels end */}
        {/* post-comment  start */}
        <Grid
          item
          xs={12}
          md={7}
          className={classes.paddingCol + " " + classes["mb-5"]}
        >
          <Card
            elevation={3}
            className={classes["py-3"]}
            id="dialog-container"
            style={{ position: "relative" }}
          >
            <CartDialog
              dialogValue={dialogValue}
              onShadowClick={toggleDialogValue}
              productId={postState.id}
            />
            <Grid container direction="column">
              <Grid item className="mb-2">
                <CardMedia className={classes.media} image={img.src} />
              </Grid>
              <Grid item>{InfoOnChips()}</Grid>
              <Grid item>
                <CardContent>
                  <Typography className={classes["my-4"]}>
                    {postState?.description}
                  </Typography>
                </CardContent>
              </Grid>
              {true && (
                <Grid item className={classes["align-self-center"]}>
                  <Button
                    color="secondary"
                    startIcon={<AddShoppingCart />}
                    onClick={toggleDialogValue}
                  >
                    add to cart
                  </Button>
                </Grid>
              )}
            </Grid>
          </Card>
          <CommentsList
            comments={postState.comments}
            productId={postState.id}
          />
        </Grid>
        {/* post-comment  end */}
      </Grid>
    </>
  );
}

export async function getServerSideProps({ params }) {
  const { data } = await Axios().get(`products/${params.id}`);

  return {
    props: {
      postState: data,
    },
  };
}

import React, { useState, useEffect, Fragment, useContext } from "react";
import { CardActions, IconButton } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import { useRouter } from "next/router";

import { useHttp } from "../../hooks/http";
import authCtx from "../../ctxStore/auth_ctx";
import CardList from "../../components/containers/CardList/CardList";
import CardListSkeleton from "../../components/ui/Skeletons/CardListSkeleton";
import LoadingSpinner from "../../components/ui/LoadingSpinner/LoadingSpinner";
import CustomDialog from "../../components/ui/CustomDialog/CustomDialog";

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  const [dialog, setDialog] = useState(false);
  const [dialogText, setDialogText] = useState("");
  const { data, loading, reqIdentifier, reqExtra, sendRequest } = useHttp();
  const router = useRouter();
  const { token } = useContext(authCtx);
  useEffect(() => {
    if (
      data &&
      (reqIdentifier === "FETCH_PRODUCTS" ||
        reqIdentifier === "FETCH_PRODUCTS_AGAIN")
    )
      setProducts(data.docs);
    else if (data && reqIdentifier === "DEL_PRODUCT")
      sendRequest(
        "admin/products",
        "get",
        null,
        null,
        "FETCH_PRODUCTS_AGAIN",
        token
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, reqIdentifier, reqExtra, setProducts]);
  useEffect(() => {
    sendRequest("admin/products", "get", null, null, "FETCH_PRODUCTS", token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sendRequest]);

  const deleteBtnPressed = (productId, title) => {
    setDialogText(`do you really want to delete ${title} ?`);
    setDialog(true);
    setProductIdToDelete(productId);
  };

  const deleteProduct = () => {
    setDialog(false);
    sendRequest(
      "admin/delete-product",
      "post",
      { productId: productIdToDelete },
      productIdToDelete,
      "DEL_PRODUCT",
      token
    );
  };

  const cardListOrLoader =
    data ||
    reqIdentifier === "DEL_PRODUCT" ||
    reqIdentifier === "FETCH_PRODUCTS_AGAIN" ? (
      <CardList
        products={products}
        totalResult={data?.totalDocs || 0}
        render={(item) => (
          <CardActions about="del and edit">
            <IconButton
              onClick={() => {
                deleteBtnPressed(item._id, item.title);
              }}
            >
              <Delete color="action" />
            </IconButton>
            <div style={{ flexGrow: 1 }}></div>
            <IconButton
              onClick={() => {
                router.push(
                  `/admin/edit-product?productId=${item._id}`,
                  "/admin/edit-product"
                );
              }}
            >
              <Edit color="action" />
            </IconButton>
          </CardActions>
        )}
      />
    ) : (
      <CardListSkeleton />
    );

  return (
    <Fragment>
      <CustomDialog
        open={dialog}
        title="warning:"
        text={dialogText}
        onLastButtonClicked={deleteProduct}
        onFirstButtonClicked={() => {
          setDialog(false);
        }}
      />
      <LoadingSpinner
        open={
          loading &&
          (reqIdentifier === "DEL_PRODUCT" ||
            reqIdentifier === "FETCH_PRODUCTS_AGAIN")
        }
        renderLoader={true}
      />
      {cardListOrLoader}
    </Fragment>
  );
};

export default MyProducts;

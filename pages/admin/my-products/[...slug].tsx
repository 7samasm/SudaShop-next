import React, { useState, useEffect, useContext } from "react";
import { CardActions, IconButton } from "@material-ui/core";
import { Delete, Edit } from "@material-ui/icons";
import { useRouter } from "next/router";

import { useHttp } from "../../../hooks/http";
import authCtx from "../../../ctxStore/authCtx";
import CardListSkeleton from "../../../components/ui/Skeletons/CardListSkeleton";
import LoadingSpinner from "../../../components/ui/LoadingSpinner/LoadingSpinner";
import CustomDialog from "../../../components/ui/CustomDialog/CustomDialog";
import { IProduct } from "../../../types/Product";
import CartListWithSettingsAndPagination from "../../../components/containers/CardList/CartListWithSettingsAndPagination";
import IPagination from "../../../types/Pagination";
import { handlePaginationChange } from "../../../hooks/pagination";

const MyProducts = () => {
  const [pagination, setPagination] = useState<IPagination>();
  const [productIdToDelete, setProductIdToDelete] = useState("");
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
      setPagination(data);
    else if (
      data &&
      reqIdentifier === "DEL_PRODUCT" &&
      pagination &&
      Array.isArray(router.query.slug)
    ) {
      const [_, sort, order, page] = router.query.slug;
      /**
       * if page (n) has only result after delete this result
       * we push prev page (n - 1)
       */
      if (pagination.docs.length === 1 && +page > 1) {
        router.push(`/admin/my-products/all/${sort}/${order}/${+page - 1}`);
        // return prevent call of next sendRequest
        return;
      }
      sendRequest(
        `admin/products?sortBy=${sort}&orderBy=${order}&page=${page}`,
        "get",
        undefined,
        undefined,
        "FETCH_PRODUCTS_AGAIN",
        token!
      );
    }
  }, [data, reqIdentifier, token, pagination, setPagination, router]);

  useEffect(() => {
    if (token && Array.isArray(router.query.slug)) {
      const [_, sort, order, page] = router.query.slug;
      sendRequest(
        `admin/products?sortBy=${sort}&orderBy=${order}&page=${page}`,
        "get",
        undefined,
        undefined,
        "FETCH_PRODUCTS",
        token
      );
    }
  }, [sendRequest, token, router]);

  const deleteBtnPressed = (productId: string, title: string) => {
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
      token!
    );
  };

  const cardListOrLoader =
    data ||
    reqIdentifier === "DEL_PRODUCT" ||
    reqIdentifier === "FETCH_PRODUCTS_AGAIN" ? (
      pagination &&
      Array.isArray(router.query.slug) && (
        <CartListWithSettingsAndPagination
          products={pagination.docs}
          totalResult={pagination.totalDocs}
          totalPages={pagination.totalPages}
          baseSortUrl="/admin/my-products/all"
          onPaginationChange={handlePaginationChange(
            `/admin/my-products/all/${router.query.slug[1]}/${router.query.slug[2]}`,
            router.push
          )}
          render={(item: IProduct) => (
            <CardActions about="del and edit">
              <IconButton
                component="div"
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault();
                  deleteBtnPressed(item._id!, item.title);
                }}
              >
                <Delete color="action" />
              </IconButton>
              <div style={{ flexGrow: 1 }}></div>
              <IconButton
                component="div"
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault();
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
      )
    ) : (
      <CardListSkeleton />
    );

  return (
    <>
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
    </>
  );
};

export default MyProducts;

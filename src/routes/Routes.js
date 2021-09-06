import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Container } from "@material-ui/core";
import { connect } from "react-redux";

import LoadingSpinner from "../components/ui/LoadingSpinner/LoadingSpinner";
import CardListSkeleton from "../components/ui/Skeletons/CardListSkeleton";

/*import Index from "../pages/Index/Index";
import Sections from "../pages/Sections/Sections";
import AddItem from "../pages/admin/add_item/AddItem";
import EditProduct from "../pages/admin/EditProduct/EditProduct";
import Login from "../pages/admin/login/Login";
import Logout from "../pages/admin/Logout/Logout";
import MyProducts from "../pages/admin/MyProducts/MyProducts";
import ProductOverView from "../pages/ProductOverView/ProductOverView";*/

const Index = lazy(() => import("../pages/Index/Index"));
const IndexPage = lazy(() => import("../pages/Index/IndexPage"));
const Sort = lazy(() => import("../pages/Sort/Sort"));
const Sections = lazy(() => import("../pages/Sections/Sections"));
const AddItem = lazy(() => import("../pages/admin/add_item/AddItem"));
const Login = lazy(() => import("../pages/admin/login/Login"));
const Cart = lazy(() => import("../pages/admin/Cart/Cart"));
const Logout = lazy(() => import("../pages/admin/Logout/Logout"));
const MyProducts = lazy(() => import("../pages/admin/MyProducts/MyProducts"));
const EditProduct = lazy(() =>
  import("../pages/admin/EditProduct/EditProduct")
);
const ProductOverView = lazy(() =>
  import("../pages/ProductOverView/ProductOverView")
);

const Routes = (props) => {
  const routes = [
    <Route
      key={Math.random()}
      exact
      path="/"
      render={(props) => (
        <Suspense
          fallback={<LoadingSpinner open={true} renderLoader={false} />}
        >
          <Index {...props} />
        </Suspense>
      )}
    />,
    <Route
      key={Math.random()}
      path="/page/:page"
      render={(props) => (
        <Suspense
          fallback={<LoadingSpinner open={true} renderLoader={false} />}
        >
          <IndexPage {...props} />
        </Suspense>
      )}
    />,
    <Route
      key={Math.random()}
      path="/sort/:selector/:sort/:order/:page"
      render={(props) => (
        <Suspense
          fallback={<LoadingSpinner open={true} renderLoader={false} />}
        >
          <Sort {...props} />
        </Suspense>
      )}
    />,
    <Route
      key={Math.random()}
      path="/product/:id"
      render={(props) => (
        <Suspense
          fallback={<LoadingSpinner open={true} renderLoader={false} />}
        >
          <ProductOverView {...props} />
        </Suspense>
      )}
    />,
    <Route
      key={Math.random()}
      path="/sections/:section/:page"
      render={(props) => (
        <Suspense
          fallback={<LoadingSpinner open={true} renderLoader={false} />}
        >
          <Sections {...props} />
        </Suspense>
      )}
    />,
    !props.isLoggedIn && (
      <Route
        key={Math.random()}
        path="/auth"
        render={(props) => (
          <Suspense
            fallback={<LoadingSpinner open={true} renderLoader={false} />}
          >
            <Login {...props} />
          </Suspense>
        )}
      />
    ),
    <Redirect key={Math.random()} strict to="/" />,
  ];

  const authRoutes = [
    <Route
      key={Math.random()}
      path="/admin/add-product"
      render={(props) => (
        <Suspense
          fallback={<LoadingSpinner open={true} renderLoader={false} />}
        >
          <AddItem {...props} />
        </Suspense>
      )}
    />,
    <Route
      key={Math.random()}
      path="/admin/edit-product"
      render={(props) => (
        <Suspense
          fallback={<LoadingSpinner open={true} renderLoader={false} />}
        >
          <EditProduct {...props} />
        </Suspense>
      )}
    />,
    <Route
      key={Math.random()}
      path="/admin/logout"
      render={(props) => (
        <Suspense
          fallback={<LoadingSpinner open={true} renderLoader={false} />}
        >
          <Logout {...props} />
        </Suspense>
      )}
    />,
    <Route
      key={Math.random()}
      path="/admin/my-products"
      render={(props) => (
        <Suspense fallback={<CardListSkeleton />}>
          <MyProducts {...props} />
        </Suspense>
      )}
    />,
    <Route
      key={Math.random()}
      path="/admin/cart"
      render={(props) => (
        <Suspense fallback="cart ....">
          <Cart {...props} />
        </Suspense>
      )}
    />,
    ...routes,
  ];

  const renderRoutes = props.isLoggedIn ? authRoutes : routes;

  return (
    <Container>
      <Switch>{renderRoutes}</Switch>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Routes);

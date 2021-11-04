import React, { useState, useEffect, useContext, useRef } from "react";
import Link from "next/link";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Home from "@material-ui/icons/Home";
import Add from "@material-ui/icons/Add";
import WorkIcon from "@material-ui/icons/Work";
import CartIcon from "@material-ui/icons/ShoppingCart";
import MoreIcon from "@material-ui/icons/MoreVert";
import TheDrawer from "../TheDrawer/TheDrawer";
import drawerCtx from "../../../ctxStore/drawerCtx";
import { useAuthContext } from "../../../ctxStore/authCtx";
import cartCtx from "../../../ctxStore/cartCtx";
import callback from "./callback";
// import "./TheHeader.module.css";

const useStyles = makeStyles((theme) => {
  return {
    grow: {
      flexGrow: 1,
    },
    "menuButton-ltr": {
      marginRight: theme.spacing(2),
    },
    "menuButton-rtl": {
      marginLeft: theme.spacing(2),
    },
    title: {
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
  };
});
const PrimarySearchAppBar = () => {
  const classes = useStyles();
  const theme = useTheme();
  const { isLoggedIn } = useAuthContext();
  const { totalItems } = useContext(cartCtx);
  const { openDrawer } = useContext(drawerCtx);

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  useEffect(() => {
    callback();
    console.log("%c [TheHeader] 1st useEffect", "color:red;font-size:20px");
  });

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<any>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<any>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const listData = [
    {
      title: "Home",
      icon: Home,
      link: "/",
      render: true,
    },
    {
      title: "My Products",
      icon: WorkIcon,
      link: "/admin/my-products/1",
      render: isLoggedIn,
    },
    {
      title: "add product",
      icon: Add,
      link: "/admin/add-product",
      render: isLoggedIn,
    },
  ];

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem>Login</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {listData.map(
        (el) =>
          el.render && (
            <MenuItem key={el.title} dense>
              <IconButton aria-label="show 4 new mails" color="inherit">
                <el.icon />
              </IconButton>
              <p>{el.title}</p>
            </MenuItem>
          )
      )}

      {isLoggedIn && (
        <MenuItem dense>
          <IconButton aria-label="show 17 new notifications" color="inherit">
            <Badge badgeContent={totalItems} color="secondary">
              <CartIcon />
            </Badge>
          </IconButton>
          <p>shopping cart</p>
        </MenuItem>
      )}
    </Menu>
  );

  const navList = listData
    .filter((item) => item.render)
    .map((item) => (
      <Link href={item.link} key={item.title}>
        <IconButton
          aria-label="show 4 new mails"
          color="primary"
          className="cond-render"
        >
          <item.icon />
        </IconButton>
      </Link>
    ));

  return (
    <div className={classes.grow}>
      <TheDrawer />
      <AppBar
        dir={theme.direction}
        position="static"
        style={{ backgroundColor: "#fff" }}
        elevation={0}
      >
        <Toolbar>
          <IconButton
            edge="start"
            className={classes[`menuButton-${theme.direction}`]}
            color="primary"
            aria-label="open drawer"
            onClick={() => openDrawer()}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            className={classes.title}
            variant="h6"
            noWrap
            color="primary"
          >
            SudaShop
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {navList}
            {isLoggedIn && (
              <Link href="/admin/cart">
                <IconButton
                  className="cond-render"
                  aria-label="show 17 new notifications"
                  color="primary"
                >
                  <Badge badgeContent={totalItems} color="secondary">
                    <CartIcon />
                  </Badge>
                </IconButton>
              </Link>
            )}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="primary"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
};

export default PrimarySearchAppBar;

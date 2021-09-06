import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { connect } from "react-redux";
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

import "./TheHeader.css";
import TheDrawer from "../../ui/TheDrawer/TheDrawer";
import { setDrawer } from "../../../store/actions";

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
const PrimarySearchAppBar = (props) => {
  const { totalCartItems, isLoggedIn } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  useEffect(() => {
    console.log("%c [TheHeader] 1st useEffect", "color:red;font-size:20px");
  });

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

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
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={2} color="secondary" overlap="rectangular">
            <Home />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <Add />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const navList = [
    {
      title: "Home",
      icon: Home,
      link: "/",
      render: true,
    },
    {
      title: "My Products",
      icon: WorkIcon,
      link: "/admin/my-products",
      render: isLoggedIn,
    },
    {
      title: "add product",
      icon: Add,
      link: "/admin/add-product",
      render: isLoggedIn,
    },
  ]
    .filter((item) => item.render)
    .map((item) => (
      <NavLink to={item.link} key={item.title}>
        <IconButton aria-label="show 4 new mails" color="primary">
          <item.icon />
        </IconButton>
      </NavLink>
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
            onClick={() => props.setDrawer(true)}
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
              <NavLink to="/admin/cart">
                <IconButton
                  aria-label="show 17 new notifications"
                  color="primary"
                >
                  <Badge badgeContent={totalCartItems} color="secondary">
                    <CartIcon />
                  </Badge>
                </IconButton>
              </NavLink>
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

const mapStateToProps = (state) => ({
  isLoggedIn: state.auth.token !== null,
  totalCartItems: state.cart.totalItems,
});

export default connect(mapStateToProps, { setDrawer })(PrimarySearchAppBar);

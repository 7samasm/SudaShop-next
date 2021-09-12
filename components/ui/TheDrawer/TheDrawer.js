import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Link from "next/link";
import { makeStyles, useTheme } from "@material-ui/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import HomeIcon from "@material-ui/icons/Home";
import WorkIcon from "@material-ui/icons/Work";
import AddIcon from "@material-ui/icons/Add";
import Category from "@material-ui/icons/Category";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ExpandLess from "@material-ui/icons/ExpandLess";
import { Icon } from "@mdi/react";
import { mdiLogin, mdiLogout } from "@mdi/js";
import { setDrawer } from "../../../store/actions";
import avatarImg from "../../../public/images/react.png";
const useStyles = makeStyles((theme) => ({
  list: {
    width: 260,
    overflowX: "hidden",
  },
  fullList: {
    width: "auto",
  },
  "authBtn-ltr": {
    marginLeft: "150px",
  },
  "authBtn-rtl": {
    marginRight: "150px",
  },
  "subList-ltr": {
    paddingLeft: theme.spacing(4),
  },
}));

const TemporaryDrawer = React.memo((props) => {
  const { isLoggedIn } = props;
  const [isCollapseOpen, setIsCollapseOpen] = useState(true);
  const classes = useStyles();
  const theme = useTheme();

  useEffect(() => {
    console.log("%c [TheDrawer] 1st useEffect", "color:teal;font-size:20px");
  });

  const closeDrawer = () => props.setDrawer(false);

  const listTile = [
    {
      title: "Home",
      icon: HomeIcon,
      link: "/",
      render: true,
    },
    {
      title: "add product",
      icon: AddIcon,
      link: "/admin/add-product",
      render: props.isLoggedIn,
    },
    {
      title: "My Products",
      icon: WorkIcon,
      link: "/admin/my-products",
      render: props.isLoggedIn,
    },
  ].map((listItem) => {
    if (listItem.render) {
      return (
        <Link href={listItem.link} key={listItem.title}>
          <ListItem button onClick={closeDrawer}>
            <ListItemIcon>{<listItem.icon />}</ListItemIcon>
            <ListItemText
              primary={listItem.title}
              style={{
                color: "#000",
                textAlign: theme.direction === "ltr" ? "left" : "right",
              }}
            />
          </ListItem>
        </Link>
      );
    } else {
      return null;
    }
  });

  return (
    <Drawer dir={theme.direction} open={props.drawer} onClose={closeDrawer}>
      <List className={classes.list}>
        <ListItem>
          <ListItemAvatar>
            <Avatar src={avatarImg.src}></Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={props.user?.name}
            secondary={props.user?.email}
          />
          <ListItemIcon
            className={classes[`authBtn-${theme.direction}`]}
            onClick={closeDrawer}
          >
            <Link href={isLoggedIn ? "/admin/logout" : "/auth"}>
              <Icon
                path={isLoggedIn ? mdiLogout : mdiLogin}
                size={1}
                color="#000"
              />
            </Link>
          </ListItemIcon>
        </ListItem>
      </List>
      <Divider />
      <List>
        {listTile}
        <ListItem
          button
          onClick={() => {
            setIsCollapseOpen(!isCollapseOpen);
          }}
        >
          <ListItemIcon>
            <Category />
          </ListItemIcon>
          <ListItemText
            primary="Sections"
            style={{
              color: "#000",
              textAlign: theme.direction === "ltr" ? "left" : "right",
            }}
          />
          {isCollapseOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
      </List>
      <Collapse in={isCollapseOpen}>
        <List>
          {props.sections.map((section) => (
            <Link href={`/sections/${section.name}/1`} key={section._id}>
              <ListItem
                button
                onClick={closeDrawer}
                className={classes[`subList-${theme.direction}`]}
              >
                <ListItemText style={{ color: "#000" }}>
                  {section.name}
                </ListItemText>
              </ListItem>
            </Link>
          ))}
        </List>
      </Collapse>
    </Drawer>
  );
});

const mapStateToProps = (state) => ({
  drawer: state.config.drawer,
  isLoggedIn: state.auth.token !== null,
  user: state.auth.user,
  sections: state.config.sections,
});

export default connect(mapStateToProps, { setDrawer })(TemporaryDrawer);

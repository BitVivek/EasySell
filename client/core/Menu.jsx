import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home";
import auth from "./../auth/auth-helper";
import { Link, withRouter } from "react-router-dom";
import { WebLogo } from "../assets/images/images.js";
//add cart badge
import CartIcon from '@material-ui/icons/ShoppingCart'
import Badge from '@material-ui/core/Badge'
import cart from './../cart/cart-helper';



const isActive = (history, path) => {
  if (history.location.pathname == path) return { color: "#bef67a" };
  else return { color: "#ffffff" };
};
const isPartActive = (history, path) => {
  if (history.location.pathname.includes(path)) return { color: "#bef67a" };
  else return { color: "#ffffff" };
};
const Menu = withRouter(({ history }) => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" color="inherit">
        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6" color="inherit">
            EASYSELL
          </Typography>
          <img
            src={WebLogo}
            height={50}
            width={50}
            alt="Logo"
            style={{ marginLeft: "10px" }}
          />
        </div>
      </Typography>
      <div>
        <Link to="/">
          <IconButton aria-label="Home" style={isActive(history, "/")}>
            <HomeIcon />
          </IconButton>
        </Link>
        {/* <Link to="/shops/all">
          <Button style={isActive(history, "/shops/all")}>All Shops</Button>
        </Link> */}
         <Link to="/cart">
          <Button style={isActive(history, "/cart")}>
            Cart
            <Badge color="secondary" invisible={false} badgeContent={cart.itemTotal()} style={{'marginLeft': '7px'}}>
              <CartIcon />
            </Badge>
          </Button>
        </Link>      
      </div>
      <div style={{ position: "absolute", right: "10px" }}>
        <span style={{ float: "right" }}>
          {!auth.isAuthenticated() && (
            <span>
              <Link to="/signup">
                <Button style={isActive(history, "/signup")}>Sign up</Button>
              </Link>
              <Link to="/signin">
                <Button style={isActive(history, "/signin")}>Sign In</Button>
              </Link>
            </span>
          )}
          {auth.isAuthenticated() && (
            <span>
              {auth.isAuthenticated().user.seller && (
                <Link to="/seller/shops">
                  <Button style={isPartActive(history, "/seller/")}>
                    My Shops
                  </Button>
                </Link>
              )}
              <Link to={"/user/" + auth.isAuthenticated().user._id}>
                <Button
                  style={isActive(
                    history,
                    "/user/" + auth.isAuthenticated().user._id
                  )}
                >
                  My Profile
                </Button>
              </Link>
              <Button
                color="inherit"
                onClick={() => {
                  auth.clearJWT(() => history.push("/"));
                }}
              >
                Sign out
              </Button>
            </span>
          )}
        </span>
      </div>
    </Toolbar>
  </AppBar>
));

export default Menu;

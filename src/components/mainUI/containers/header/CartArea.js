import React from "react";
import Button from "@mui/material/Button";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Person3Icon from "@mui/icons-material/Person3";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useNavigate } from "react-router-dom";

const CartArea = () => {
  const navigate = useNavigate();
  return (
    <>
      <Tooltip title="Login/Register" placement="left">
        <IconButton onClick={() => navigate("/login")}>
          <Person3Icon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Wishlist" placement="bottom">
        <IconButton>
          <FavoriteBorderIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Cart" placement="right">
        <IconButton>
          <AddShoppingCartIcon />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default CartArea;
